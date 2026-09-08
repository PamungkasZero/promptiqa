<script lang="ts">
	interface Props {
		label: string;
		description?: string;
		checked?: boolean;
		onChange?: (checked: boolean) => void;
	}

	let {
		label,
		description,
		checked = $bindable(false),
		onChange
	}: Props = $props();

	function handleToggle() {
		checked = !checked;
		onChange?.(checked);
	}
</script>

<div class="flex items-center justify-between gap-4 py-2">
	<div>
		<div class="font-heading text-sm font-bold text-black">{label}</div>
		{#if description}
			<div class="text-xs text-black/70">{description}</div>
		{/if}
	</div>

	<button
		type="button"
		role="switch"
		aria-label={label}
		aria-checked={checked}
		onclick={handleToggle}
		class="relative inline-flex h-7 w-14 shrink-0 cursor-pointer border-2 border-black transition-colors duration-150 ease-in-out {checked
			? 'bg-[#FFE600]'
			: 'bg-white'}"
	>
		<span
			class="pointer-events-none inline-block h-5 w-5 transform border-2 border-black bg-black transition duration-150 ease-in-out {checked
				? 'translate-x-7 bg-black'
				: 'translate-x-0 bg-black/40'}"
		></span>
	</button>
</div>
