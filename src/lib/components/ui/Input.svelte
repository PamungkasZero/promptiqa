<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		error?: string;
		helper?: string;
		class?: string;
		id?: string;
		value?: string | number;
	}

	let {
		label,
		error,
		helper,
		class: className = '',
		id = `input-${Math.random().toString(36).substring(2, 9)}`,
		value = $bindable(''),
		...rest
	}: Props = $props();
</script>

<div class="flex flex-col gap-1.5 w-full">
	{#if label}
		<label for={id} class="font-heading text-xs font-bold uppercase tracking-wider text-black">
			{label}
		</label>
	{/if}

	<input
		{id}
		bind:value
		class="neo-input {error ? 'border-[#FF5964] bg-[#FFF0F0]' : ''} {className}"
		{...rest}
	/>

	{#if error}
		<span class="text-xs font-bold text-[#FF5964]">{error}</span>
	{:else if helper}
		<span class="text-xs text-black/70 font-medium">{helper}</span>
	{/if}
</div>
