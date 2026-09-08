export type TrackType = 'developer' | 'data' | 'security';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Challenge {
	id: string;
	title: string;
	slug: string;
	description?: string;
	instructions: string;
	goal?: string;
	rules: string[];
	sampleInput?: Record<string, unknown> | string;
	track: TrackType;
	difficulty: DifficultyLevel;
	xpReward: number;
	idealPrompt?: string;
	isPublished?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface PromptVersion {
	id?: string;
	versionNumber: number;
	promptContent: string;
	createdAt: string;
	score?: number;
	grade?: string;
}
