<script lang="ts">
	import type { GradingResult } from '$lib/types';
	import { getGradeBadgeColor } from '$lib/utils/grading';
	import { Award, CheckCircle, AlertTriangle } from '@lucide/svelte';

	interface Props {
		result: GradingResult;
	}

	let { result }: Props = $props();

	let badgeColor = $derived(getGradeBadgeColor(result.grade));
</script>

<div class="flex flex-col gap-4">
	<!-- Overall Score Header Banner -->
	<div class="neo-box-thick bg-[#FFE600] p-4 text-black flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="flex h-14 w-14 items-center justify-center border-3 border-black bg-white text-2xl font-black font-heading shadow-neo-sm">
				{result.grade}
			</div>
			<div>
				<div class="font-heading text-xs font-black uppercase tracking-wider text-black/80">Overall AI Score</div>
				<div class="font-heading text-3xl font-black tracking-tight">{result.overallScore} / 100</div>
			</div>
		</div>
		<div class="text-right">
			<span class="border-2 border-black bg-white px-2.5 py-1 text-xs font-heading font-black shadow-neo-sm">
				{result.overallScore >= 80 ? '🎉 PASSED' : '⚠️ NEEDS WORK'}
			</span>
		</div>
	</div>

	<!-- 4 Scoring Pillars Grid (Clarity, Role/Persona, Constraint, Format) -->
	<div class="grid grid-cols-2 gap-3">
		<!-- Clarity -->
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center justify-between">
				<span class="font-heading text-xs font-black uppercase text-black/70">Clarity</span>
				<span class="font-heading text-sm font-black bg-[#00E5FF] px-1.5 py-0.5 border border-black">{result.scores.clarity}/25</span>
			</div>
			<div class="mt-2 h-2 w-full border border-black bg-gray-100">
				<div class="h-full bg-[#00E5FF]" style="width: {(result.scores.clarity / 25) * 100}%"></div>
			</div>
		</div>

		<!-- Role / Persona -->
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center justify-between">
				<span class="font-heading text-xs font-black uppercase text-black/70">Role / Persona</span>
				<span class="font-heading text-sm font-black bg-[#FFE600] px-1.5 py-0.5 border border-black">{result.scores.rolePersona}/25</span>
			</div>
			<div class="mt-2 h-2 w-full border border-black bg-gray-100">
				<div class="h-full bg-[#FFE600]" style="width: {(result.scores.rolePersona / 25) * 100}%"></div>
			</div>
		</div>

		<!-- Constraint Precision -->
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center justify-between">
				<span class="font-heading text-xs font-black uppercase text-black/70">Constraints</span>
				<span class="font-heading text-sm font-black bg-[#FF5964] text-white px-1.5 py-0.5 border border-black">{result.scores.constraintPrecision}/25</span>
			</div>
			<div class="mt-2 h-2 w-full border border-black bg-gray-100">
				<div class="h-full bg-[#FF5964]" style="width: {(result.scores.constraintPrecision / 25) * 100}%"></div>
			</div>
		</div>

		<!-- Format Enforcement -->
		<div class="neo-box p-3 bg-white">
			<div class="flex items-center justify-between">
				<span class="font-heading text-xs font-black uppercase text-black/70">Format</span>
				<span class="font-heading text-sm font-black bg-[#A855F7] text-white px-1.5 py-0.5 border border-black">{result.scores.formatEnforcement}/25</span>
			</div>
			<div class="mt-2 h-2 w-full border border-black bg-gray-100">
				<div class="h-full bg-[#A855F7]" style="width: {(result.scores.formatEnforcement / 25) * 100}%"></div>
			</div>
		</div>
	</div>
</div>
