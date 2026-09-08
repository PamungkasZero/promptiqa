<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';
	import { toast } from '$lib/stores/toast';
	import TokenCounter from './TokenCounter.svelte';
	import VariableInjector from './VariableInjector.svelte';
	import { Button } from '$lib/components/ui';
	import { Sparkles, BookmarkPlus, Play, RotateCcw, Trash2 } from '@lucide/svelte';

	interface Props {
		onGrade: () => void;
		onOptimize?: () => void;
	}

	let { onGrade, onOptimize }: Props = $props();

	let promptValue = $derived($workspaceStore.prompt);
	let tokenEstimate = $derived($workspaceStore.tokenEstimate);
	let isLoading = $derived($workspaceStore.isLoading);
	let loadingStatusText = $derived($workspaceStore.loadingStatusText);

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		workspaceStore.setPrompt(target.value);
	}

	function handleSaveVersion() {
		workspaceStore.saveVersion();
		toast.success('Versi prompt berhasil disimpan ke riwayat versi!', 'VERSION SAVED 📜');
	}

	function handleClearPrompt() {
		if (confirm('Kosongkan prompt editor?')) {
			workspaceStore.setPrompt('');
			toast.info('Editor dibersihkan.', 'EDITOR CLEARED');
		}
	}
</script>

<div class="flex flex-col h-full bg-white">
	<!-- Editor Toolbar -->
	<div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black bg-[#F7F4EB] px-4 py-2">
		<div class="flex items-center gap-2">
			<VariableInjector />
		</div>
		<div class="flex items-center gap-2">
			<TokenCounter estimate={tokenEstimate} />
			<Button variant="white" size="sm" onclick={handleSaveVersion} title="Simpan snapshot versi saat ini">
				<BookmarkPlus class="h-3.5 w-3.5 mr-1 stroke-[2.5]" />
				<span>Save Ver</span>
			</Button>
			<button
				type="button"
				onclick={handleClearPrompt}
				class="h-8 w-8 flex items-center justify-center border-2 border-black bg-white hover:bg-[#FF5964] hover:text-white shadow-neo-sm transition-colors cursor-pointer"
				title="Clear prompt"
				aria-label="Clear prompt"
			>
				<Trash2 class="h-3.5 w-3.5 stroke-[2.5]" />
			</button>
		</div>
	</div>

	<!-- Monospace Code Editor Area -->
	<div class="relative flex-1 p-2">
		<textarea
			value={promptValue}
			oninput={handleInput}
			placeholder="Tulis prompt sistem AI kamu di sini...
Contoh format:
[ROLE]
You are a senior fullstack database architect.

[TASK]
Convert natural language user queries into secure PostgreSQL statements.

[CONSTRAINTS]
- Reject destructive operations (DROP, ALTER, DELETE without WHERE).
- Return strict SQL markdown code blocks only."
			class="h-full w-full resize-none border-2 border-black bg-[#FAF9F5] p-4 font-mono text-xs sm:text-sm leading-relaxed text-black shadow-inner focus:outline-none focus:bg-white focus:shadow-neo-sm transition-all"
			spellcheck="false"
		></textarea>

		{#if isLoading}
			<div class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-none p-4">
				<div class="border-3 border-black bg-[#FFE600] px-6 py-4 shadow-neo-lg text-center animate-bounce">
					<div class="font-heading text-base font-black tracking-tight">{loadingStatusText || '🧠 PROCESSING...'}</div>
					<div class="text-xs font-bold text-black/80 mt-1">Gemini AI is analyzing and scoring your prompt</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Action Footer Bar -->
	<div class="flex items-center justify-between border-t-2 border-black bg-[#F7F4EB] px-4 py-3">
		<div class="flex items-center gap-2">
			{#if onOptimize}
				<Button
					variant="cyan"
					size="sm"
					onclick={onOptimize}
					disabled={isLoading || !promptValue.trim()}
					title="Optimalkan prompt secara otomatis dengan Gemini AI"
				>
					<Sparkles class="h-4 w-4 mr-1.5 stroke-[2.5]" />
					<span>✨ AUTO-OPTIMIZE</span>
				</Button>
			{/if}
		</div>

		<div class="flex items-center gap-3">
			<Button
				variant="yellow"
				size="md"
				onclick={onGrade}
				disabled={isLoading || !promptValue.trim()}
				title="Jalankan evaluasi 4 pilar scoring (Clarity, Role, Constraints, Format)"
			>
				<Play class="h-4 w-4 mr-1.5 stroke-[3] fill-black" />
				<span>RUN AI GRADING</span>
			</Button>
		</div>
	</div>
</div>
