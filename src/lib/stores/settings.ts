import { writable } from 'svelte/store';

export interface SettingsState {
	customApiKey: string;
	model: 'gemini-1.5-flash' | 'gemini-1.5-pro';
	darkMode: boolean;
	soundFx: boolean;
	isSettingsModalOpen: boolean;
}

const initialSettings: SettingsState = {
	customApiKey: '',
	model: 'gemini-1.5-flash',
	darkMode: false,
	soundFx: true,
	isSettingsModalOpen: false
};

function createSettingsStore() {
	const { subscribe, set, update } = writable<SettingsState>(initialSettings);

	return {
		subscribe,
		setCustomApiKey: (customApiKey: string) =>
			update((s) => ({ ...s, customApiKey })),
		setModel: (model: 'gemini-1.5-flash' | 'gemini-1.5-pro') =>
			update((s) => ({ ...s, model })),
		toggleDarkMode: () =>
			update((s) => ({ ...s, darkMode: !s.darkMode })),
		toggleSoundFx: () =>
			update((s) => ({ ...s, soundFx: !s.soundFx })),
		openSettingsModal: () =>
			update((s) => ({ ...s, isSettingsModalOpen: true })),
		closeSettingsModal: () =>
			update((s) => ({ ...s, isSettingsModalOpen: false })),
		reset: () => set(initialSettings)
	};
}

export const settingsStore = createSettingsStore();
