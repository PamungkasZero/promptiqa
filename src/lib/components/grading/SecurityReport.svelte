<script lang="ts">
	import type { SecurityReport as SecurityReportType } from '$lib/types';
	import { getSecurityBadgeColor } from '$lib/utils/grading';
	import { ShieldAlert, ShieldCheck } from '@lucide/svelte';

	interface Props {
		security: SecurityReportType;
	}

	let { security }: Props = $props();

	let badge = $derived(getSecurityBadgeColor(security.riskLevel));
</script>

<div class="neo-box p-4 bg-white">
	<div class="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
		<div class="flex items-center gap-2">
			{#if security.riskLevel === 'LOW'}
				<ShieldCheck class="h-5 w-5 text-green-600 stroke-[2.5]" />
			{:else}
				<ShieldAlert class="h-5 w-5 text-red-600 stroke-[2.5]" />
			{/if}
			<h4 class="font-heading text-sm font-black uppercase tracking-wider">Guardrail & Security Scan</h4>
		</div>
		<span class="border-2 border-black {badge.bg} {badge.text} px-2 py-0.5 text-xs font-black shadow-neo-sm">
			RISK: {security.riskLevel}
		</span>
	</div>

	{#if security.issues && security.issues.length > 0}
		<div class="flex flex-col gap-2">
			{#each security.issues as issue}
				<div class="border-2 border-black bg-[#FFF0F0] p-2 text-xs">
					<div class="font-heading font-black text-[#FF5964] uppercase">{issue.type}</div>
					<div class="text-black font-medium mt-0.5">{issue.description}</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-xs font-medium text-black/70">
			✅ Tidak ada risiko Prompt Injection atau jailbreak vulnerability yang terdeteksi pada prompt ini.
		</p>
	{/if}
</div>
