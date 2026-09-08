<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonVariant = 'yellow' | 'cyan' | 'pink' | 'purple' | 'white' | 'dark' | 'ghost';
	type ButtonSize = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'yellow',
		size = 'md',
		children,
		class: className = '',
		type = 'button',
		disabled = false,
		...rest
	}: Props = $props();

	const variantStyles: Record<ButtonVariant, string> = {
		yellow: 'bg-[#FFE600] text-black hover:bg-[#FFD93D]',
		cyan: 'bg-[#00E5FF] text-black hover:bg-[#72DDF7]',
		pink: 'bg-[#FF5964] text-white hover:bg-[#FF8FAB]',
		purple: 'bg-[#A855F7] text-white hover:bg-[#CDB4DB]',
		white: 'bg-white text-black hover:bg-[#F7F4EB]',
		dark: 'bg-black text-white hover:bg-[#111111]',
		ghost: 'bg-transparent text-black border-transparent shadow-none hover:bg-black/5 hover:shadow-none'
	};

	const sizeStyles: Record<ButtonSize, string> = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2.5 text-sm',
		lg: 'px-6 py-3.5 text-base'
	};
</script>

<button
	{type}
	{disabled}
	class="neo-btn {variant !== 'ghost' ? 'neo-border' : ''} {variantStyles[variant]} {sizeStyles[size]} {className}"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>
