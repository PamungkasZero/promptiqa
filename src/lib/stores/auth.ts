import { writable } from 'svelte/store';
import type { UserProfile } from '$lib/types';
import { toast } from '$lib/stores/toast';

export interface AuthState {
	user: UserProfile | null;
	isGuest: boolean;
	guestChallengeUsed: boolean;
	temporaryXp: number;
	completedChallengeIds: string[];
	isLoading: boolean;
	isAuthModalOpen: boolean;
}

const STORAGE_KEY = 'promptiqa_auth_state_v1';

const defaultGuestState: AuthState = {
	user: {
		id: 'guest-user-1',
		username: 'Guest Explorer',
		avatarUrl: undefined,
		totalXp: 150,
		currentStreak: 3,
		longestStreak: 5,
		lastActivityDate: new Date().toISOString().split('T')[0]
	},
	isGuest: true,
	guestChallengeUsed: false,
	temporaryXp: 150,
	completedChallengeIds: [],
	isLoading: false,
	isAuthModalOpen: false
};

function getInitialState(): AuthState {
	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch (e) {
			console.error('Failed to load auth from localStorage', e);
		}
	}
	return defaultGuestState;
}

function saveState(state: AuthState) {
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (e) {
			console.error('Failed to save auth to localStorage', e);
		}
	}
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(getInitialState());

	return {
		subscribe,
		setUser: (user: UserProfile | null) => {
			update((s) => {
				const nextState = { ...s, user, isGuest: !user };
				saveState(nextState);
				return nextState;
			});
		},
		setGuestMode: () => {
			update((s) => {
				const nextState = { ...defaultGuestState };
				saveState(nextState);
				toast.info('Beralih ke Guest Explorer mode.', 'GUEST MODE');
				return nextState;
			});
		},
		openAuthModal: () => {
			update((s) => ({ ...s, isAuthModalOpen: true }));
		},
		closeAuthModal: () => {
			update((s) => ({ ...s, isAuthModalOpen: false }));
		},
		simulateLogin: (provider: 'google' | 'github' | 'guest') => {
			update((s) => {
				if (provider === 'guest') {
					const next = { ...defaultGuestState, isAuthModalOpen: false };
					saveState(next);
					toast.info('Melanjutkan sesi sebagai Guest Explorer.', 'GUEST MODE');
					return next;
				}

				const username = provider === 'github' ? 'akbar_dev' : 'Akbar Pamungkas';
				const earnedXp = s.temporaryXp > 0 ? s.temporaryXp : 250;
				const user: UserProfile = {
					id: `user-${provider}-${Date.now()}`,
					username,
					avatarUrl: provider === 'github' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' : undefined,
					totalXp: earnedXp + 100,
					currentStreak: Math.max(s.user?.currentStreak ?? 1, 4),
					longestStreak: 7,
					lastActivityDate: new Date().toISOString().split('T')[0]
				};

				const nextState: AuthState = {
					...s,
					user,
					isGuest: false,
					guestChallengeUsed: true,
					temporaryXp: 0,
					isAuthModalOpen: false
				};
				saveState(nextState);
				toast.success(`Selamat datang, ${username}! Progress XP berhasil disinkronkan.`, 'LOGIN BERHASIL');
				return nextState;
			});
		},
		logout: () => {
			update(() => {
				const nextState = { ...defaultGuestState, isAuthModalOpen: false };
				saveState(nextState);
				toast.info('Kamu telah logout dan kembali ke mode Guest.', 'LOGOUT');
				return nextState;
			});
		},
		addXp: (amount: number, reason?: string) => {
			update((s) => {
				if (!s.user) return s;
				const newTotal = (s.user.totalXp || 0) + amount;
				const updatedUser: UserProfile = { ...s.user, totalXp: newTotal };
				const nextState: AuthState = {
					...s,
					user: updatedUser,
					temporaryXp: s.isGuest ? s.temporaryXp + amount : s.temporaryXp
				};
				saveState(nextState);
				toast.success(`+${amount} XP ${reason ? `— ${reason}` : ''}! Total XP: ${newTotal}`, 'XP REWARD ⚡');
				return nextState;
			});
		},
		completeChallenge: (challengeId: string, xpEarned: number) => {
			update((s) => {
				const alreadyDone = s.completedChallengeIds.includes(challengeId);
				const completedIds = alreadyDone ? s.completedChallengeIds : [...s.completedChallengeIds, challengeId];
				const currentXp = s.user?.totalXp || 0;
				const nextXp = alreadyDone ? currentXp : currentXp + xpEarned;

				const nextUser: UserProfile = s.user
					? { ...s.user, totalXp: nextXp }
					: {
							id: 'guest',
							username: 'Guest',
							totalXp: nextXp,
							currentStreak: 1,
							longestStreak: 1
					  };

				const nextState: AuthState = {
					...s,
					user: nextUser,
					completedChallengeIds: completedIds,
					guestChallengeUsed: true
				};
				saveState(nextState);
				return nextState;
			});
		},
		reset: () => {
			set(defaultGuestState);
			saveState(defaultGuestState);
		}
	};
}

export const authStore = createAuthStore();
