<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardColor = 'white' | 'yellow' | 'cyan' | 'pink' | 'purple' | 'cream';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		color?: CardColor;
		thick?: boolean;
		hoverEffect?: boolean;
		children?: Snippet;
		class?: string;
	}

	let {
		color = 'white',
		thick = false,
		hoverEffect = false,
		children,
		class: className = '',
		...rest
	}: Props = $props();

	const colorStyles: Record<CardColor, string> = {
		white: 'bg-white text-black',
		yellow: 'bg-[#FFE600] text-black',
		cyan: 'bg-[#00E5FF] text-black',
		pink: 'bg-[#FF5964] text-white',
		purple: 'bg-[#A855F7] text-white',
		cream: 'bg-[#F7F4EB] text-black'
	};
</script>

<div
	class="{thick ? 'neo-box-thick' : 'neo-box'} {hoverEffect ? 'neo-card' : ''} {colorStyles[color]} {className}"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</div>
