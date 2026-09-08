<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';
	import { Plus } from '@lucide/svelte';

	const availableVariables = [
		{ key: 'role', label: '+ ROLE', color: 'bg-[#FFE600]' },
		{ key: 'context', label: '+ CONTEXT', color: 'bg-[#00E5FF]' },
		{ key: 'constraints', label: '+ CONSTRAINTS', color: 'bg-[#FF5964] text-white' },
		{ key: 'format', label: '+ FORMAT', color: 'bg-[#A855F7] text-white' },
		{ key: 'task', label: '+ TASK', color: 'bg-white' },
		{ key: 'input', label: '+ INPUT', color: 'bg-[#10B981] text-black' }
	];

	function inject(key: string) {
		workspaceStore.insertVariable(key);
	}
</script>

<div class="flex flex-wrap items-center gap-1.5 py-1">
	<span class="font-heading text-xs font-black uppercase tracking-wider text-black mr-1">
		Inject:
	</span>
	{#each availableVariables as v}
		<button
			type="button"
			onclick={() => inject(v.key)}
			class="inline-flex items-center gap-1 border-2 border-black {v.color} px-2 py-0.5 text-xs font-heading font-bold shadow-neo-sm hover:-translate-y-0.5 transition-transform cursor-pointer"
		>
			<Plus class="h-3 w-3 stroke-[3]" />
			<span>{v.label}</span>
		</button>
	{/each}
</div>
