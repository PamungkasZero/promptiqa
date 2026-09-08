/**
 * Promptiqa Grade Calculation & Styling Helper
 * Scoring System based on Section 19 of PRD
 */

export function calculateGrade(score: number): string {
	if (score >= 95) return 'A+';
	if (score >= 90) return 'A';
	if (score >= 85) return 'B+';
	if (score >= 80) return 'B';
	if (score >= 75) return 'C+';
	if (score >= 70) return 'C';
	if (score >= 60) return 'D';
	return 'F';
}

export function getGradeBadgeColor(grade: string): {
	bg: string;
	text: string;
	border: string;
} {
	switch (grade.toUpperCase()) {
		case 'A+':
		case 'A':
			return { bg: 'bg-[#FFE600]', text: 'text-black', border: 'border-black' };
		case 'B+':
		case 'B':
			return { bg: 'bg-[#00E5FF]', text: 'text-black', border: 'border-black' };
		case 'C+':
		case 'C':
			return { bg: 'bg-[#A855F7]', text: 'text-white', border: 'border-black' };
		case 'D':
			return { bg: 'bg-[#FF9F1C]', text: 'text-black', border: 'border-black' };
		case 'F':
		default:
			return { bg: 'bg-[#FF5964]', text: 'text-white', border: 'border-black' };
	}
}

export function getSecurityBadgeColor(riskLevel: string): {
	bg: string;
	text: string;
} {
	switch (riskLevel.toUpperCase()) {
		case 'LOW':
			return { bg: 'bg-[#10B981]', text: 'text-black' };
		case 'MEDIUM':
			return { bg: 'bg-[#FFE600]', text: 'text-black' };
		case 'HIGH':
		default:
			return { bg: 'bg-[#FF5964]', text: 'text-white' };
	}
}
