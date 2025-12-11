import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai.service';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * AI Mechanic - Diagnoses vehicle issues based on make/model and common problems
 */
@Injectable()
export class MechanicService {
  private readonly logger = new Logger(MechanicService.name);

  // Common problems database (would be in DB in production)
  private commonProblems = {
    'BMW': {
      '3 Series': [
        {
          issue: 'Oil Leak',
          symptoms: ['Oil spots under car', 'Low oil warning', 'Burning oil smell'],
          severity: 'WARNING',
          commonCauses: ['Valve cover gasket', 'Oil filter housing gasket', 'Oil pan gasket'],
          estimatedCost: 200,
          estimatedTime: 120,
        },
        {
          issue: 'Timing Chain Tensioner',
          symptoms: ['Rattling noise on startup', 'Engine misfire', 'Check engine light'],
          severity: 'CRITICAL',
          commonCauses: ['Worn timing chain', 'Failed tensioner'],
          estimatedCost: 1500,
          estimatedTime: 480,
        },
      ],
    },
    'AUDI': {
      'A4': [
        {
          issue: 'Coolant Leak',
          symptoms: ['Overheating', 'Low coolant warning', 'Sweet smell'],
          severity: 'CRITICAL',
          commonCauses: ['Water pump failure', 'Thermostat housing leak', 'Radiator leak'],
          estimatedCost: 300,
          estimatedTime: 180,
        },
      ],
    },
    'FORD': {
      'Focus': [
        {
          issue: 'Transmission Issues',
          symptoms: ['Jerky shifting', 'Slipping gears', 'Check engine light'],
          severity: 'CRITICAL',
          commonCauses: ['Dual-clutch transmission failure', 'Transmission control module'],
          estimatedCost: 1200,
          estimatedTime: 360,
        },
      ],
    },
  };

  constructor(
    private aiService: AiService,
    private prisma: PrismaService,
  ) {}

  /**
   * Diagnose vehicle issue using AI and common problems database
   */
  async diagnoseIssue(
    userId: string,
    vehicleId: string,
    issue: string,
    symptoms: string[],
  ) {
    // Get vehicle details
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Get common problems for this make/model
    const commonProblems = this.getCommonProblemsForVehicle(vehicle.make, vehicle.model);

    // Build AI prompt
    const prompt = `As an expert mechanic, diagnose this vehicle issue:

Vehicle: ${vehicle.make} ${vehicle.model} ${vehicle.year}
Issue: ${issue}
Symptoms: ${symptoms.join(', ')}

Common problems for this vehicle:
${commonProblems.map((p, i) => `${i + 1}. ${p.issue} - ${p.symptoms.join(', ')}`).join('\n')}

Provide:
1. Likely diagnosis
2. Severity level (INFO, WARNING, CRITICAL)
3. Estimated repair cost in GBP
4. Estimated repair time in minutes
5. Recommended action

Be specific and helpful.`;

    // Get AI analysis
    const aiAnalysis = await this.aiService.generateText(prompt);

    // Match against common problems
    const matchedProblems = this.matchCommonProblems(issue, symptoms, commonProblems);

    // Determine severity
    const severity = this.determineSeverity(matchedProblems, aiAnalysis);

    // Calculate estimates
    const estimates = this.calculateEstimates(matchedProblems);

    // Save diagnostic
    const diagnostic = await this.prisma.vehicleDiagnostic.create({
      data: {
        userId,
        vehicleId,
        issue,
        symptoms,
        aiAnalysis,
        aiRecommendations: this.extractRecommendations(aiAnalysis),
        severity: severity as any,
        estimatedCost: estimates.cost,
        estimatedTime: estimates.time,
        commonProblems: matchedProblems,
      },
      include: {
        vehicle: true,
      },
    });

    return diagnostic;
  }

  /**
   * Get common problems for vehicle make/model
   */
  private getCommonProblemsForVehicle(make: string, model: string): any[] {
    const makeUpper = make.toUpperCase();
    const modelUpper = model.toUpperCase();

    // Try exact match
    if (this.commonProblems[makeUpper]?.[modelUpper]) {
      return this.commonProblems[makeUpper][modelUpper];
    }

    // Try make only
    if (this.commonProblems[makeUpper]) {
      const models = Object.values(this.commonProblems[makeUpper]);
      return models.flat();
    }

    return [];
  }

  /**
   * Match user's issue to common problems
   */
  private matchCommonProblems(issue: string, symptoms: string[], commonProblems: any[]): any[] {
    const issueLower = issue.toLowerCase();
    const symptomsLower = symptoms.map(s => s.toLowerCase());

    return commonProblems.filter(problem => {
      const issueMatch = problem.issue.toLowerCase().includes(issueLower) ||
                        issueLower.includes(problem.issue.toLowerCase());

      const symptomMatch = problem.symptoms.some((symptom: string) =>
        symptomsLower.some(userSymptom => 
          userSymptom.includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(userSymptom)
        )
      );

      return issueMatch || symptomMatch;
    });
  }

  /**
   * Determine severity from matched problems
   */
  private determineSeverity(matchedProblems: any[], aiAnalysis: string): string {
    if (matchedProblems.some(p => p.severity === 'CRITICAL')) {
      return 'CRITICAL';
    }
    if (matchedProblems.some(p => p.severity === 'WARNING')) {
      return 'WARNING';
    }
    if (aiAnalysis.toLowerCase().includes('urgent') || 
        aiAnalysis.toLowerCase().includes('critical') ||
        aiAnalysis.toLowerCase().includes('immediate')) {
      return 'CRITICAL';
    }
    if (aiAnalysis.toLowerCase().includes('warning') ||
        aiAnalysis.toLowerCase().includes('soon')) {
      return 'WARNING';
    }
    return 'INFO';
  }

  /**
   * Calculate cost and time estimates
   */
  private calculateEstimates(matchedProblems: any[]): { cost: number; time: number } {
    if (matchedProblems.length === 0) {
      return { cost: null, time: null };
    }

    // Average of matched problems
    const avgCost = matchedProblems.reduce((sum, p) => sum + (p.estimatedCost || 0), 0) / matchedProblems.length;
    const avgTime = matchedProblems.reduce((sum, p) => sum + (p.estimatedTime || 0), 0) / matchedProblems.length;

    return {
      cost: Math.round(avgCost),
      time: Math.round(avgTime),
    };
  }

  /**
   * Extract recommendations from AI analysis
   */
  private extractRecommendations(aiAnalysis: string): string[] {
    const recommendations: string[] = [];
    const lines = aiAnalysis.split('\n');

    for (const line of lines) {
      if (line.toLowerCase().includes('recommend') ||
          line.toLowerCase().includes('should') ||
          line.toLowerCase().includes('action')) {
        recommendations.push(line.trim());
      }
    }

    return recommendations.slice(0, 5); // Top 5 recommendations
  }

  /**
   * Get diagnostic history for vehicle
   */
  async getVehicleDiagnostics(vehicleId: string) {
    return this.prisma.vehicleDiagnostic.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get user's diagnostic history
   */
  async getUserDiagnostics(userId: string) {
    return this.prisma.vehicleDiagnostic.findMany({
      where: { userId },
      include: {
        vehicle: {
          select: {
            make: true,
            model: true,
            registrationNumber: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
