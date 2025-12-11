import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { VehiclesService } from './vehicles.service';
import { JwtService } from '@nestjs/jwt';

/**
 * UK Vehicle Lookup Service
 * Uses free APIs to lookup vehicle data by registration
 * AUTO-CREATES USER ACCOUNT (We Buy Any Car style)
 */
@Injectable()
export class UkVehicleService {
  private readonly logger = new Logger(UkVehicleService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private usersService: UsersService,
    private vehiclesService: VehiclesService,
    private jwtService: JwtService,
  ) { }

  /**
   * Lookup vehicle by UK registration number
   * AUTO-CREATES USER ACCOUNT if email/phone provided (We Buy Any Car style)
   */
  async lookupByRegistration(
    registration: string,
    userInfo?: { email?: string; phone?: string },
  ): Promise<{
    vehicle: any;
    user: any;
    accessToken?: string;
    autoCreated: boolean;
  }> {
    // Clean registration
    const reg = registration.toUpperCase().replace(/\s/g, '');

    // Lookup vehicle data (always succeeds - uses realistic mock data)
    let vehicleData: any = {};
    try {
      // Try real API first (if configured)
      vehicleData = await this.lookupKeynect(reg);
    } catch (error) {
      // Fallback to mock data (works for development/testing)
      this.logger.log(`Using mock vehicle data for ${reg}`);
      vehicleData = await this.lookupKeynect(reg); // This now returns mock data
    }
    
    // Ensure we always have valid data
    if (!vehicleData.make) {
      vehicleData.make = 'UNKNOWN';
    }
    if (!vehicleData.model) {
      vehicleData.model = 'UNKNOWN';
    }
    if (!vehicleData.fuelType) {
      vehicleData.fuelType = 'PETROL';
    }

    // Check if vehicle already exists
    let existingVehicle = await this.prisma.vehicle.findFirst({
      where: { registrationNumber: reg },
      include: { user: true },
    });

    let user = existingVehicle?.user;
    let autoCreated = false;
    let accessToken: string | undefined;

    // If vehicle exists, return existing user
    if (existingVehicle && user) {
      return {
        vehicle: existingVehicle,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        autoCreated: false,
      };
    }

    // AUTO-CREATE USER if email or phone provided
    if (userInfo?.email || userInfo?.phone) {
      // Check if user exists by email
      if (userInfo.email) {
        user = await this.usersService.findByEmail(userInfo.email);
      }

      // Create user if doesn't exist
      if (!user) {
        const email = userInfo.email || `user-${reg.toLowerCase()}@carmaconcierge.com`;
        // Generate a random password (user can reset later)
        const tempPassword = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        
        user = await this.usersService.create({
          email,
          password: tempPassword, // Temporary password - user should set proper one
          firstName: 'Vehicle',
          lastName: 'Owner',
          phone: userInfo.phone,
          role: 'CUSTOMER',
        });
        autoCreated = true;
        this.logger.log(`Auto-created user account for ${email} via registration lookup`);
      }

      // Generate JWT token for auto-login
      const payload = { sub: user.id, email: user.email, role: user.role };
      accessToken = this.jwtService.sign(payload);

      // Create vehicle for this user
      if (!existingVehicle && user) {
        try {
          const vehicle = await this.vehiclesService.create(user.id, {
            make: vehicleData.make || 'Unknown',
            model: vehicleData.model || 'Unknown',
            year: vehicleData.year || new Date().getFullYear(),
            registrationNumber: reg,
            fuelType: (vehicleData.fuelType?.toUpperCase() || 'PETROL') as any,
            type: 'CAR' as any, // Default to CAR
            color: vehicleData.color,
            vin: vehicleData.vin || null,
          });

          existingVehicle = vehicle;
        } catch (error) {
          this.logger.error(`Failed to create vehicle: ${error.message}`);
          // Continue even if vehicle creation fails - return lookup data
        }
      }
    }

    // Return structured response
    const response: any = {
      vehicle: existingVehicle ? {
        id: existingVehicle.id,
        registrationNumber: existingVehicle.registrationNumber,
        make: existingVehicle.make,
        model: existingVehicle.model,
        year: existingVehicle.year,
        fuelType: existingVehicle.fuelType,
        color: existingVehicle.color,
      } : {
        registrationNumber: reg,
        make: vehicleData.make,
        model: vehicleData.model,
        year: vehicleData.year,
        fuelType: vehicleData.fuelType,
        color: vehicleData.color,
        engineSize: vehicleData.engineSize,
        motStatus: vehicleData.motStatus,
        taxStatus: vehicleData.taxStatus,
      },
      autoCreated,
    };

    if (user) {
      response.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    if (accessToken) {
      response.accessToken = accessToken;
    }

    return response;
  }

  /**
   * Keynect VRM Lookup (Free tier)
   * Returns realistic UK vehicle mock data (works without API keys)
   * In production, replace with real API call
   */
  private async lookupKeynect(registration: string): Promise<any> {
    const reg = registration.toUpperCase();
    
    // Try real API first (if configured and available)
    const apiKey = this.configService.get('KEYNECT_API_KEY');
    if (apiKey) {
      try {
        const url = `https://api.keynect.co.uk/v1/vrm/${reg}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return {
            make: data.make,
            model: data.model,
            year: data.yearOfManufacture,
            fuelType: data.fuelType?.toUpperCase() || 'PETROL',
            engineSize: data.engineSize,
            color: data.colour?.toUpperCase(),
            motStatus: data.motStatus,
            taxStatus: data.taxStatus,
            co2Emissions: data.co2Emissions,
          };
        }
      } catch (error) {
        this.logger.warn(`Keynect API call failed: ${error.message}`);
      }
    }

    // Fallback: Return realistic mock data based on registration format
    // Extract year from registration (e.g., AB12 = 2012, AB72 = 2022)
    const yearMatch = reg.match(/(\d{2})/);
    let year = new Date().getFullYear() - 5;
    if (yearMatch) {
      const yearCode = parseInt(yearMatch[1]);
      // UK registrations: 01-24 = 2001-2024, 50-99 = 2050-2099
      if (yearCode >= 1 && yearCode <= 24) {
        year = 2001 + yearCode - 1;
      } else if (yearCode >= 50) {
        year = 2000 + yearCode;
      }
    }

    // Mock vehicle data based on common UK vehicles
    const mockVehicles = [
      { make: 'FORD', model: 'FOCUS', fuelType: 'PETROL' },
      { make: 'VAUXHALL', model: 'CORSA', fuelType: 'PETROL' },
      { make: 'VOLKSWAGEN', model: 'GOLF', fuelType: 'DIESEL' },
      { make: 'BMW', model: '3 SERIES', fuelType: 'PETROL' },
      { make: 'AUDI', model: 'A3', fuelType: 'DIESEL' },
      { make: 'MERCEDES-BENZ', model: 'C-CLASS', fuelType: 'DIESEL' },
      { make: 'NISSAN', model: 'QASHQAI', fuelType: 'PETROL' },
      { make: 'PEUGEOT', model: '208', fuelType: 'PETROL' },
      { make: 'TOYOTA', model: 'COROLLA', fuelType: 'HYBRID' },
      { make: 'HYUNDAI', model: 'I10', fuelType: 'PETROL' },
    ];

    // Use registration as seed for consistent results per reg
    const seed = reg.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomVehicle = mockVehicles[seed % mockVehicles.length];
    const colors = ['BLACK', 'SILVER', 'WHITE', 'BLUE', 'RED', 'GREY'];
    const color = colors[seed % colors.length];

    return {
      make: randomVehicle.make,
      model: randomVehicle.model,
      year,
      fuelType: randomVehicle.fuelType,
      engineSize: '1600cc',
      color,
      motStatus: 'VALID',
      taxStatus: 'TAXED',
      co2Emissions: Math.floor(Math.random() * 100 + 100),
    };
  }

  /**
   * Lisense UK Vehicle Lookup (Free)
   * Fallback: Uses same mock as Keynect
   */
  private async lookupLisense(registration: string): Promise<any> {
    // Same fallback as Keynect
    return this.lookupKeynect(registration);
  }

  /**
   * Parse UK registration format as fallback
   * Format: AB12 CDE (2 letters, 2 numbers, space, 3 letters)
   */
  private parseRegistrationFormat(registration: string): any {
    // UK registration formats:
    // Current: AB12 CDE (2001-present)
    // Older: Various formats

    const match = registration.match(/^([A-Z]{2})(\d{2})\s?([A-Z]{3})$/);
    if (!match) {
      return {};
    }

    // Extract age identifier (digits)
    const ageCode = parseInt(match[2]);
    const year = this.getYearFromAgeCode(ageCode);

    return {
      year,
      // Can't determine make/model from registration alone
    };
  }

  private getYearFromAgeCode(code: number): number {
    // UK age identifiers change twice a year (March and September)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Simplified: 2001-2024 range
    // In reality, this is more complex with dual-year identifiers
    if (code >= 1 && code <= 24) {
      return 2001 + code - 1;
    }
    return currentYear;
  }

  /**
   * Check MOT status (using DVSA API if available)
   */
  async checkMotStatus(registration: string): Promise<any> {
    // DVSA MOT History API (requires registration)
    const apiKey = this.configService.get('DVSA_API_KEY');
    if (!apiKey) {
      this.logger.warn('DVSA API key not configured');
      return null;
    }

    try {
      const response = await fetch(
        `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${registration}`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`DVSA API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: data[0]?.testResult || 'UNKNOWN',
        expiryDate: data[0]?.expiryDate,
        testDate: data[0]?.completedDate,
      };
    } catch (error) {
      this.logger.error(`MOT check failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Check tax status (DVLA - via third party)
   */
  async checkTaxStatus(registration: string): Promise<any> {
    // Would use DVLA-compatible API
    // Placeholder for tax check
    return null;
  }

  /**
   * Check insurance status (MIB - requires authorization)
   */
  async checkInsuranceStatus(registration: string): Promise<any> {
    // MIB insurance check (requires special authorization)
    // Placeholder
    return null;
  }
}
