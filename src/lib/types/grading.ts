export type SecurityRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface SecurityIssue {
	type: string;
	description: string;
}

export interface GradingPillars {
	clarity: number; // 0 - 25
	rolePersona: number; // 0 - 25
	constraintPrecision: number; // 0 - 25
	formatEnforcement: number; // 0 - 25
}

export interface SecurityReport {
	riskLevel: SecurityRiskLevel;
	issues: SecurityIssue[];
}

export interface GradingResult {
	overallScore: number; // 0 - 100
	grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F' | string;
	scores: GradingPillars;
	strengths: string[];
	weaknesses: string[];
	recommendations: string[];
	security: SecurityReport;
}

export interface OptimizeResult {
	optimizedPrompt: string;
	improvements: string[];
}

export interface SimulateResult {
	userOutput: string;
	idealOutput: string;
}
