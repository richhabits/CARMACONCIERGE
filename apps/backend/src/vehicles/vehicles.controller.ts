import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { UkVehicleService } from './uk-vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly ukVehicleService: UkVehicleService,
  ) {}

  /**
   * PUBLIC ENDPOINT - Registration lookup that auto-creates account
   * This is the "We Buy Any Car" style entry point
   * NO AUTH REQUIRED - Anyone can lookup their vehicle
   */
  @Post('uk/lookup')
  @ApiOperation({ summary: 'Lookup UK vehicle by registration (creates account automatically if email/phone provided)' })
  async lookupByRegistration(@Body() body: { registration: string; email?: string; phone?: string }) {
    const result = await this.ukVehicleService.lookupByRegistration(body.registration, {
      email: body.email,
      phone: body.phone,
    });
    return result;
  }

  @Get('uk/lookup')
  @ApiOperation({ summary: 'Lookup UK vehicle by registration number (GET)' })
  async lookupByRegistrationGet(@Query('registration') registration: string) {
    return this.ukVehicleService.lookupByRegistration(registration);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Request() req, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(req.user.id, createVehicleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@Request() req) {
    return this.vehiclesService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a vehicle' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Get('uk/mot/:registration')
  @ApiOperation({ summary: 'Check MOT status for UK vehicle' })
  async checkMot(@Param('registration') registration: string) {
    return this.ukVehicleService.checkMotStatus(registration);
  }

  @Get('uk/tax/:registration')
  @ApiOperation({ summary: 'Check tax status for UK vehicle' })
  async checkTax(@Param('registration') registration: string) {
    return this.ukVehicleService.checkTaxStatus(registration);
  }
}
