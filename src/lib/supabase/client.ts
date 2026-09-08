import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { GradingResult, UserProfile, CommunityPrompt } from '$lib/types';

// Check for client-accessible Supabase environment variables
const supabaseUrl =
	(typeof window !== 'undefined' ? (window as any).__PUBLIC_SUPABASE_URL : '') ||
	import.meta.env.VITE_PUBLIC_SUPABASE_URL ||
	import.meta.env.PUBLIC_SUPABASE_URL ||
	'';

const supabaseAnonKey =
	(typeof window !== 'undefined' ? (window as any).__PUBLIC_SUPABASE_ANON_KEY : '') ||
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ||
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
	'';

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
	return Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder') && !supabaseUrl.includes('your-project'));
}

export function getSupabase(): SupabaseClient | null {
	if (!isSupabaseConfigured()) {
		return null;
	}
	if (!client) {
		try {
			client = createClient(supabaseUrl, supabaseAnonKey);
		} catch (e) {
			console.warn('Failed to initialize Supabase client:', e);
			return null;
		}
	}
	return client;
}

export const supabase = getSupabase();

/**
 * Persist user challenge progress to Supabase (if configured)
 */
export async function syncProgressToSupabase(payload: {
	userId: string;
	challengeId: string;
	promptText: string;
	gradingResult: GradingResult;
	earnedXp: number;
	isCompleted: boolean;
}) {
	const sb = getSupabase();
	if (!sb || !payload.userId || payload.userId.startsWith('guest-')) {
		return { synced: false, reason: 'guest_or_no_supabase' };
	}

	try {
		const { error } = await sb.from('user_progress').upsert(
			{
				user_id: payload.userId,
				challenge_id: payload.challengeId,
				prompt_text: payload.promptText,
				score: payload.gradingResult.overallScore,
				grade: payload.gradingResult.grade,
				clarity_score: payload.gradingResult.scores.clarity,
				role_score: payload.gradingResult.scores.rolePersona,
				constraint_score: payload.gradingResult.scores.constraintPrecision,
				format_score: payload.gradingResult.scores.formatEnforcement,
				security_risk: payload.gradingResult.security.riskLevel,
				is_completed: payload.isCompleted,
				earned_xp: payload.earnedXp,
				completed_at: payload.isCompleted ? new Date().toISOString() : null,
				updated_at: new Date().toISOString()
			},
			{ onConflict: 'user_id,challenge_id' }
		);

		if (error) throw error;
		return { synced: true };
	} catch (err) {
		console.warn('Could not sync progress to Supabase:', err);
		return { synced: false, error: err };
	}
}

/**
 * Update total XP and streak in Supabase profiles table
 */
export async function syncProfileToSupabase(profile: UserProfile) {
	const sb = getSupabase();
	if (!sb || !profile.id || profile.id.startsWith('guest-')) {
		return { synced: false };
	}

	try {
		const { error } = await sb.from('profiles').upsert(
			{
				id: profile.id,
				username: profile.username,
				avatar_url: profile.avatarUrl,
				total_xp: profile.totalXp,
				current_streak: profile.currentStreak,
				longest_streak: profile.longestStreak,
				last_activity_date: profile.lastActivityDate || new Date().toISOString().split('T')[0],
				updated_at: new Date().toISOString()
			},
			{ onConflict: 'id' }
		);

		if (error) throw error;
		return { synced: true };
	} catch (err) {
		console.warn('Could not sync profile to Supabase:', err);
		return { synced: false, error: err };
	}
}
