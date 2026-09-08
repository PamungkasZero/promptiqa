import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
	id: string;
	title?: string;
	message: string;
	type: ToastType;
	duration?: number;
}

function createToastStore() {
	const { subscribe, update } = writable<ToastItem[]>([]);

	function remove(id: string) {
		update((items) => items.filter((item) => item.id !== id));
	}

	function show(message: string, options: { title?: string; type?: ToastType; duration?: number } = {}) {
		const id = 'toast-' + Math.random().toString(36).substring(2, 9);
		const { title, type = 'info', duration = 4000 } = options;

		const newItem: ToastItem = {
			id,
			title,
			message,
			type,
			duration
		};

		update((items) => [...items, newItem]);

		if (duration > 0) {
			setTimeout(() => {
				remove(id);
			}, duration);
		}

		return id;
	}

	return {
		subscribe,
		show,
		remove,
		success: (message: string, title?: string, duration?: number) =>
			show(message, { title: title || 'BERHASIL', type: 'success', duration }),
		error: (message: string, title?: string, duration?: number) =>
			show(message, { title: title || 'PERINGATAN', type: 'error', duration }),
		info: (message: string, title?: string, duration?: number) =>
			show(message, { title: title || 'INFO', type: 'info', duration }),
		warning: (message: string, title?: string, duration?: number) =>
			show(message, { title: title || 'ATTENTION', type: 'warning', duration })
	};
}

export const toast = createToastStore();
