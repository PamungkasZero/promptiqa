<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';
	import { computeLineDiff } from '$lib/utils/diff';
	import { Button } from '$lib/components/ui';
	import { History, RotateCcw } from '@lucide/svelte';

	let versions = $derived($workspaceStore.versions);
	let currentPrompt = $derived($workspaceStore.prompt);
	let selectedVerNum = $derived($workspaceStore.selectedVersionNumber || (versions[0]?.versionNumber ?? 1));

	let compareVersion = $derived(versions.find((v) => v.versionNumber === selectedVerNum));
	let diffLines = $derived(
		compareVersion ? computeLineDiff(compareVersion.promptContent, currentPrompt) : []
	);

	function handleRestore(num: number) {
		workspaceStore.restoreVersion(num);
	}
</script>

<div class="flex flex-col h-full bg-[#F7F4EB] p-4 overflow-y-auto">
	<div class="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
		<div class="flex items-center gap-2">
			<History class="h-5 w-5 stroke-[2.5]" />
			<h3 class="font-heading text-lg font-black">Prompt Version History</h3>
		</div>
		<span class="text-xs font-bold bg-white px-2 py-1 border-2 border-black shadow-neo-sm">
			Total Versions: {versions.length}
		</span>
	</div>

	{#if versions.length === 0}
		<div class="neo-box p-6 text-center bg-white my-auto">
			<p class="font-heading font-black text-sm">BELUM ADA VERSI TERSIMPAN</p>
			<p class="text-xs text-black/70 mt-1">Klik tombol "Save Ver" di Prompt Editor untuk menyimpan snapshot versi prompt kamu.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Version List -->
			<div class="flex flex-col gap-2">
				{#each versions as v}
					<button
						type="button"
						class="neo-box p-3 text-left w-full cursor-pointer transition-all {v.versionNumber === selectedVerNum ? 'bg-[#FFE600] translate-x-1' : 'bg-white'}"
						onclick={() => workspaceStore.restoreVersion(v.versionNumber)}
					>
						<div class="flex items-center justify-between">
							<span class="font-heading font-black text-sm">Version #{v.versionNumber}</span>
							{#if v.grade}
								<span class="border border-black bg-white px-1.5 py-0.5 text-xs font-black">{v.grade}</span>
							{/if}
						</div>
						<div class="text-[10px] text-black/70 mt-1 font-mono">{new Date(v.createdAt).toLocaleTimeString()}</div>
					</button>
				{/each}
			</div>

			<!-- Diff Viewer -->
			<div class="md:col-span-2 neo-box bg-white p-3 flex flex-col">
				<div class="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
					<span class="font-heading text-xs font-black uppercase">
						Comparing Version #{selectedVerNum} with Current Editor
					</span>
					<Button variant="white" size="sm" onclick={() => handleRestore(selectedVerNum)}>
						<RotateCcw class="h-3 w-3 mr-1 stroke-[2.5]" />
						<span>Restore this</span>
					</Button>
				</div>

				<div class="font-mono text-xs overflow-x-auto p-2 bg-[#FAF9F5] border border-black max-h-[400px]">
					{#each diffLines as line}
						<div
							class="px-2 py-0.5 {line.type === 'added'
								? 'bg-green-100 text-green-800 font-bold'
								: line.type === 'removed'
								? 'bg-red-100 text-red-800 line-through'
								: 'text-black'}"
						>
							<span class="inline-block w-4 opacity-50">
								{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
							</span>
							{line.content}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
