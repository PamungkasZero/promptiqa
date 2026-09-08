<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type BadgeColor = 'yellow' | 'cyan' | 'pink' | 'purple' | 'green' | 'orange' | 'white' | 'dark';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		color?: BadgeColor;
		children?: Snippet;
		class?: string;
	}

	let {
		color = 'yellow',
		children,
		class: className = '',
		...rest
	}: Props = $props();

	const colorStyles: Record<BadgeColor, string> = {
		yellow: 'bg-[#FFE600] text-black',
		cyan: 'bg-[#00E5FF] text-black',
		pink: 'bg-[#FF5964] text-white',
		purple: 'bg-[#A855F7] text-white',
		green: 'bg-[#10B981] text-black',
		orange: 'bg-[#FF9F1C] text-black',
		white: 'bg-white text-black',
		dark: 'bg-black text-white'
	};
</script>

<span class="neo-badge {colorStyles[color]} {className}" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</span>
