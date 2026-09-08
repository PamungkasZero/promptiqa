import { writable } from 'svelte/store';
import type { Challenge, GradingResult, PromptVersion } from '$lib/types';
import { estimateTokens, type TokenEstimate } from '$lib/utils/tokens';

export interface WorkspaceState {
	currentChallenge: Challenge | null;
	prompt: string;
	tokenEstimate: TokenEstimate;
	versions: PromptVersion[];
	selectedVersionNumber: number | null;
	gradingResult: GradingResult | null;
	isLoading: boolean;
	loadingStatusText: string;
	activeTab: 'editor' | 'diff' | 'simulate' | 'optimize';
}

const STORAGE_KEY = 'promptiqa_workspace_draft_v1';

const defaultPrompt = `[ROLE]
You are an expert fullstack software architect.

[TASK]
Analyze the provided system requirements and generate a clean, modular architecture plan.

[CONSTRAINTS]
- Include sequence flow diagrams
- Provide strict JSON schemas for core entities
- Explicitly list edge cases and failure recovery modes

[FORMAT]
Markdown with clear headers, Mermaid sequence diagram, and TypeScript schema blocks.`;

const initialState: WorkspaceState = {
	currentChallenge: null,
	prompt: defaultPrompt,
	tokenEstimate: estimateTokens(defaultPrompt),
	versions: [],
	selectedVersionNumber: null,
	gradingResult: null,
	isLoading: false,
	loadingStatusText: '',
	activeTab: 'editor'
};

function getInitialWorkspace(): WorkspaceState {
	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				return {
					...initialState,
					prompt: parsed.prompt ?? defaultPrompt,
					tokenEstimate: estimateTokens(parsed.prompt ?? defaultPrompt),
					versions: parsed.versions ?? []
				};
			}
		} catch (e) {
			console.error('Failed to load workspace draft from localStorage', e);
		}
	}
	return initialState;
}

function saveWorkspaceDraft(prompt: string, versions: PromptVersion[]) {
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ prompt, versions }));
		} catch (e) {
			console.error('Failed to save workspace draft to localStorage', e);
		}
	}
}

function createWorkspaceStore() {
	const { subscribe, set, update } = writable<WorkspaceState>(getInitialWorkspace());

	return {
		subscribe,
		setChallenge: (challenge: Challenge | null) =>
			update((s) => ({ ...s, currentChallenge: challenge })),
		setPrompt: (prompt: string) =>
			update((s) => {
				const nextState = {
					...s,
					prompt,
					tokenEstimate: estimateTokens(prompt)
				};
				saveWorkspaceDraft(nextState.prompt, nextState.versions);
				return nextState;
			}),
		insertVariable: (variableKey: string) =>
			update((s) => {
				const tag = `{${variableKey}}`;
				const newPrompt = s.prompt ? `${s.prompt}\n${tag}` : tag;
				const nextState = {
					...s,
					prompt: newPrompt,
					tokenEstimate: estimateTokens(newPrompt)
				};
				saveWorkspaceDraft(nextState.prompt, nextState.versions);
				return nextState;
			}),
		setGradingResult: (result: GradingResult | null) =>
			update((s) => ({ ...s, gradingResult: result, isLoading: false })),
		setLoading: (isLoading: boolean, loadingStatusText = '🧠 ANALYZING PROMPT...') =>
			update((s) => ({ ...s, isLoading, loadingStatusText })),
		saveVersion: () =>
			update((s) => {
				const nextVer = s.versions.length + 1;
				const newVersion: PromptVersion = {
					versionNumber: nextVer,
					promptContent: s.prompt,
					createdAt: new Date().toISOString(),
					score: s.gradingResult?.overallScore,
					grade: s.gradingResult?.grade
				};
				const nextVersions = [newVersion, ...s.versions];
				const nextState = {
					...s,
					versions: nextVersions,
					selectedVersionNumber: nextVer
				};
				saveWorkspaceDraft(nextState.prompt, nextVersions);
				return nextState;
			}),
		restoreVersion: (versionNumber: number) =>
			update((s) => {
				const target = s.versions.find((v) => v.versionNumber === versionNumber);
				if (target) {
					const nextState = {
						...s,
						prompt: target.promptContent,
						tokenEstimate: estimateTokens(target.promptContent),
						selectedVersionNumber: versionNumber
					};
					saveWorkspaceDraft(nextState.prompt, nextState.versions);
					return nextState;
				}
				return s;
			}),
		setActiveTab: (tab: 'editor' | 'diff' | 'simulate' | 'optimize') =>
			update((s) => ({ ...s, activeTab: tab })),
		reset: () => {
			set(initialState);
			saveWorkspaceDraft(defaultPrompt, []);
		}
	};
}

export const workspaceStore = createWorkspaceStore();
