<script lang="ts">
	import type { CommunityPrompt } from '$lib/types';
	import { Badge, Button } from '$lib/components/ui';
	import { Star, GitFork, Copy, Check } from '@lucide/svelte';

	interface Props {
		prompt: CommunityPrompt;
		onStar?: (id: string) => void;
		onFork?: (prompt: CommunityPrompt) => void;
	}

	let { prompt, onStar, onFork }: Props = $props();

	let copied = $state(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(prompt.promptContent);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="neo-card flex flex-col justify-between p-4 bg-white">
	<!-- Top info -->
	<div>
		<div class="flex items-start justify-between gap-2 mb-2">
			<div>
				<h3 class="font-heading text-base font-black tracking-tight text-black">{prompt.title}</h3>
				<span class="text-xs font-bold text-black/60">by @{prompt.username || 'anonymous'}</span>
			</div>
			{#if prompt.track}
				<Badge color={prompt.track === 'security' ? 'pink' : prompt.track === 'data' ? 'cyan' : 'yellow'}>
					{prompt.track}
				</Badge>
			{/if}
		</div>

		{#if prompt.description}
			<p class="text-xs font-medium text-black/80 line-clamp-2 mb-3">{prompt.description}</p>
		{/if}

		<!-- Prompt Preview Box -->
		<div class="relative mb-3">
			<pre class="border-2 border-black bg-[#FAF9F5] p-3 text-xs font-mono text-black/90 max-h-24 overflow-hidden text-ellipsis whitespace-pre-wrap">
{prompt.promptContent}
			</pre>
			<button
				type="button"
				onclick={handleCopy}
				class="absolute top-1.5 right-1.5 border border-black bg-white p-1 text-xs hover:bg-[#FFE600] transition-colors cursor-pointer"
				title="Copy prompt"
			>
				{#if copied}
					<Check class="h-3.5 w-3.5 text-green-700 stroke-[3]" />
				{:else}
					<Copy class="h-3.5 w-3.5 stroke-[2.5]" />
				{/if}
			</button>
		</div>

		<!-- Tags -->
		{#if prompt.tags && prompt.tags.length > 0}
			<div class="flex flex-wrap gap-1 mb-3">
				{#each prompt.tags as tag}
					<span class="bg-[#F7F4EB] border border-black px-1.5 py-0.5 text-[10px] font-bold">
						#{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Bottom stats & actions -->
	<div class="flex items-center justify-between border-t-2 border-black pt-3 mt-2">
		<div class="flex items-center gap-3 text-xs font-bold">
			<button
				type="button"
				onclick={() => onStar?.(prompt.id)}
				class="flex items-center gap-1 hover:text-amber-600 cursor-pointer"
			>
				<Star class="h-4 w-4 {prompt.hasStarred ? 'fill-[#FFE600] text-black' : 'stroke-[2.5]'}" />
				<span>{prompt.starsCount}</span>
			</button>
			<div class="flex items-center gap-1 text-black/70">
				<GitFork class="h-4 w-4 stroke-[2.5]" />
				<span>{prompt.forksCount}</span>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Button variant="yellow" size="sm" onclick={() => onFork?.(prompt)}>
				<GitFork class="h-3 w-3 mr-1 stroke-[3]" />
				<span>Fork</span>
			</Button>
		</div>
	</div>
</div>
