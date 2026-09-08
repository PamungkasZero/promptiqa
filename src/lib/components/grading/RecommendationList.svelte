<script lang="ts">
	import { CheckCircle2, AlertCircle, Lightbulb } from '@lucide/svelte';

	interface Props {
		strengths: string[];
		weaknesses: string[];
		recommendations: string[];
	}

	let { strengths, weaknesses, recommendations }: Props = $props();
</script>

<div class="flex flex-col gap-3">
	<!-- Strengths -->
	{#if strengths && strengths.length > 0}
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center gap-1.5 font-heading text-xs font-black uppercase text-green-700 mb-2">
				<CheckCircle2 class="h-4 w-4 stroke-[2.5]" />
				<span>Strengths ({strengths.length})</span>
			</div>
			<ul class="flex flex-col gap-1 text-xs">
				{#each strengths as s}
					<li class="flex items-start gap-1.5 font-medium text-black">
						<span class="text-green-600 font-bold">✓</span>
						<span>{s}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Weaknesses -->
	{#if weaknesses && weaknesses.length > 0}
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center gap-1.5 font-heading text-xs font-black uppercase text-[#FF5964] mb-2">
				<AlertCircle class="h-4 w-4 stroke-[2.5]" />
				<span>Weaknesses ({weaknesses.length})</span>
			</div>
			<ul class="flex flex-col gap-1 text-xs">
				{#each weaknesses as w}
					<li class="flex items-start gap-1.5 font-medium text-black">
						<span class="text-[#FF5964] font-bold">✗</span>
						<span>{w}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Actionable Recommendations -->
	{#if recommendations && recommendations.length > 0}
		<div class="neo-box p-3 bg-[#FFE600]">
			<div class="flex items-center gap-1.5 font-heading text-xs font-black uppercase text-black mb-2">
				<Lightbulb class="h-4 w-4 stroke-[2.5]" />
				<span>Actionable Recommendations</span>
			</div>
			<ul class="flex flex-col gap-1.5 text-xs">
				{#each recommendations as r}
					<li class="border border-black bg-white p-2 font-bold text-black shadow-neo-sm">
						💡 {r}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
