<script lang="ts">
	import type { Challenge } from '$lib/types';
	import { Badge, Card, Button } from '$lib/components/ui';
	import { Target, ShieldCheck, Sparkles, BookOpen, Copy, Check } from '@lucide/svelte';
	import { toast } from '$lib/stores/toast';

	interface Props {
		challenge: Challenge | null;
	}

	let { challenge }: Props = $props();

	let copiedInput = $state(false);

	function copySampleInput() {
		if (!challenge?.sampleInput) return;
		const str =
			typeof challenge.sampleInput === 'object'
				? JSON.stringify(challenge.sampleInput, null, 2)
				: String(challenge.sampleInput);

		navigator.clipboard.writeText(str);
		copiedInput = true;
		toast.success('Sample input disalin ke clipboard!', 'COPIED');
		setTimeout(() => {
			copiedInput = false;
		}, 2000);
	}
</script>

{#if challenge}
	<div class="flex flex-col gap-4 h-full overflow-y-auto p-4 bg-[#F7F4EB]">
		<!-- Header / Track Badges & Title -->
		<div class="flex flex-col gap-2 border-b-2 border-black pb-3">
			<div class="flex flex-wrap items-center gap-1.5">
				<Badge color={challenge.track === 'security' ? 'pink' : challenge.track === 'data' ? 'cyan' : 'yellow'}>
					{challenge.track.toUpperCase()} TRACK
				</Badge>
				<Badge color="white">{challenge.difficulty}</Badge>
				<Badge color="purple">+{challenge.xpReward} XP</Badge>
			</div>
			<h2 class="font-heading text-xl sm:text-2xl font-black tracking-tight leading-tight mt-1">
				{challenge.title}
			</h2>
			{#if challenge.description}
				<p class="text-xs sm:text-sm font-medium text-black/80 leading-relaxed">
					{challenge.description}
				</p>
			{/if}
		</div>

		<!-- Goal -->
		{#if challenge.goal}
			<Card color="yellow" class="p-3.5">
				<div class="flex items-start gap-2.5">
					<Target class="h-5 w-5 shrink-0 stroke-[2.5] text-black" />
					<div>
						<h4 class="font-heading text-xs font-black uppercase tracking-wider text-black">Goal / Objective</h4>
						<p class="text-xs font-bold mt-0.5 text-black leading-snug">{challenge.goal}</p>
					</div>
				</div>
			</Card>
		{/if}

		<!-- Instructions -->
		<div class="flex flex-col gap-1.5">
			<div class="flex items-center gap-1.5 font-heading text-xs font-black uppercase tracking-wider text-black">
				<BookOpen class="h-4 w-4 stroke-[2.5]" />
				<span>Instructions</span>
			</div>
			<div class="neo-box p-3 text-xs font-medium leading-relaxed bg-white whitespace-pre-line">
				{challenge.instructions}
			</div>
		</div>

		<!-- Rules & Constraints Checklist -->
		{#if challenge.rules && challenge.rules.length > 0}
			<div class="flex flex-col gap-1.5">
				<div class="flex items-center gap-1.5 font-heading text-xs font-black uppercase tracking-wider text-black">
					<ShieldCheck class="h-4 w-4 stroke-[2.5]" />
					<span>Rules & Constraints</span>
				</div>
				<ul class="flex flex-col gap-1.5">
					{#each challenge.rules as rule, i}
						<li class="flex items-start gap-2 border-2 border-black bg-white p-2 text-xs font-semibold shadow-neo-sm">
							<span class="flex h-4 w-4 shrink-0 items-center justify-center border border-black bg-[#FFE600] text-[10px] font-black">
								{i + 1}
							</span>
							<span class="leading-tight">{rule}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Sample Input with Copy Button -->
		{#if challenge.sampleInput}
			<div class="flex flex-col gap-1.5">
				<div class="flex items-center justify-between font-heading text-xs font-black uppercase tracking-wider text-black">
					<div class="flex items-center gap-1.5">
						<Sparkles class="h-4 w-4 stroke-[2.5]" />
						<span>Sample Input Data</span>
					</div>
					<button
						type="button"
						onclick={copySampleInput}
						class="flex items-center gap-1 border border-black bg-white px-2 py-0.5 text-[10px] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFE600] cursor-pointer transition-colors"
					>
						{#if copiedInput}
							<Check class="h-3 w-3 stroke-[3] text-green-700" />
							<span>Copied!</span>
						{:else}
							<Copy class="h-3 w-3 stroke-[2.5]" />
							<span>Copy</span>
						{/if}
					</button>
				</div>
				<pre class="neo-box p-3 text-xs font-mono bg-black text-green-400 overflow-x-auto whitespace-pre-wrap max-h-48">
{typeof challenge.sampleInput === 'object' ? JSON.stringify(challenge.sampleInput, null, 2) : challenge.sampleInput}
				</pre>
			</div>
		{/if}
	</div>
{:else}
	<div class="flex flex-col items-center justify-center h-full p-6 text-center">
		<div class="border-2 border-black bg-[#FFE600] p-4 shadow-neo mb-3 font-heading font-black text-lg">
			⚡ SELECT A CHALLENGE
		</div>
		<p class="text-xs font-medium text-black/70 max-w-xs">
			Pilih challenge dari track Developer, Data, atau Security untuk mulai menguji prompt kamu!
		</p>
	</div>
{/if}
