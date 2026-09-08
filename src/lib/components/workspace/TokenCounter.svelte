<script lang="ts">
	import type { TokenEstimate } from '$lib/utils/tokens';
	import { Coins, Cpu } from '@lucide/svelte';

	interface Props {
		estimate: TokenEstimate;
	}

	let { estimate }: Props = $props();
</script>

<div class="flex items-center gap-3 border-2 border-black bg-white px-3 py-1.5 text-xs font-mono shadow-neo-sm">
	<div class="flex items-center gap-1.5 text-black">
		<Cpu class="h-3.5 w-3.5 stroke-[2.5]" />
		<span class="font-bold">Tokens:</span>
		<span class="bg-[#FFE600] px-1.5 py-0.5 border border-black font-black">{estimate.estimatedTokens}</span>
	</div>
	<div class="h-3 w-[2px] bg-black"></div>
	<div class="flex items-center gap-1.5 text-black/80">
		<Coins class="h-3.5 w-3.5 stroke-[2.5]" />
		<span>Cost:</span>
		<span class="font-bold">{estimate.formattedCost}</span>
	</div>
</div>
