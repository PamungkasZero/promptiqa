export interface UserProfile {
	id: string;
	username: string;
	avatarUrl?: string;
	totalXp: number;
	currentStreak: number;
	longestStreak: number;
	lastActivityDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserBadge {
	id: string;
	badgeKey: string;
	title: string;
	description: string;
	icon: string;
	earnedAt: string;
}

export interface UserProgress {
	id: string;
	userId: string;
	challengeId: string;
	promptText?: string;
	score?: number;
	grade?: string;
	clarityScore?: number;
	roleScore?: number;
	constraintScore?: number;
	formatScore?: number;
	securityRisk?: string;
	isCompleted: boolean;
	attempts: number;
	earnedXp: number;
	completedAt?: string;
}

export interface CommunityPrompt {
	id: string;
	userId: string;
	username?: string;
	avatarUrl?: string;
	title: string;
	description?: string;
	promptContent: string;
	track?: string;
	tags: string[];
	visibility: 'public' | 'private';
	starsCount: number;
	forksCount: number;
	originalPromptId?: string;
	hasStarred?: boolean;
	createdAt: string;
	updatedAt: string;
}
