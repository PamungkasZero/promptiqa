<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from '@lucide/svelte';

	interface Props {
		isOpen: boolean;
		title: string;
		onClose: () => void;
		children?: Snippet;
		footer?: Snippet;
	}

	let {
		isOpen = $bindable(false),
		title,
		onClose,
		children,
		footer
	}: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-none"
		role="dialog"
		aria-modal="true"
	>
		<!-- Modal Content Box -->
		<div
			class="relative w-full max-w-lg neo-box-thick bg-[#F7F4EB] text-black overflow-hidden animate-in fade-in zoom-in-95 duration-100"
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between border-b-3 border-black bg-[#FFE600] px-5 py-3">
				<h3 class="font-heading text-lg font-black tracking-tight">{title}</h3>
				<button
					type="button"
					onclick={onClose}
					class="flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black font-black hover:bg-[#FF5964] hover:text-white transition-colors cursor-pointer"
					aria-label="Close modal"
				>
					<X class="h-4 w-4 stroke-[3]" />
				</button>
			</div>

			<!-- Modal Body -->
			<div class="p-6">
				{#if children}
					{@render children()}
				{/if}
			</div>

			<!-- Modal Footer -->
			{#if footer}
				<div class="flex items-center justify-end gap-3 border-t-3 border-black bg-white px-5 py-3">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
