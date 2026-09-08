<script lang="ts">
	import { toast, type ToastItem, type ToastType } from '$lib/stores/toast';
	import { CheckCircle2, AlertOctagon, Info, AlertTriangle, X } from '@lucide/svelte';

	let items = $derived($toast);

	const typeConfig: Record<
		ToastType,
		{ bg: string; text: string; icon: any; iconColor: string }
	> = {
		success: {
			bg: 'bg-[#FFE600]',
			text: 'text-black',
			icon: CheckCircle2,
			iconColor: 'text-black'
		},
		error: {
			bg: 'bg-[#FF5964]',
			text: 'text-white',
			icon: AlertOctagon,
			iconColor: 'text-white'
		},
		warning: {
			bg: 'bg-[#FF9F1C]',
			text: 'text-black',
			icon: AlertTriangle,
			iconColor: 'text-black'
		},
		info: {
			bg: 'bg-[#00E5FF]',
			text: 'text-black',
			icon: Info,
			iconColor: 'text-black'
		}
	};
</script>

<!-- Toast Container (Fixed bottom-right on desktop, top-center on mobile) -->
<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
	{#each items as item (item.id)}
		{@const config = typeConfig[item.type] || typeConfig.info}
		{@const IconComponent = config.icon}
		<div
			class="pointer-events-auto border-3 border-black {config.bg} {config.text} p-3.5 shadow-neo flex items-start justify-between gap-3 transition-all duration-150 animate-in slide-in-from-bottom-5"
			role="alert"
		>
			<div class="flex items-start gap-2.5 min-w-0">
				<div class="mt-0.5 shrink-0">
					<IconComponent class="h-5 w-5 {config.iconColor} stroke-[2.5]" />
				</div>
				<div class="flex flex-col min-w-0">
					{#if item.title}
						<div class="font-heading text-xs font-black uppercase tracking-wider leading-tight truncate">
							{item.title}
						</div>
					{/if}
					<div class="text-xs font-bold leading-snug mt-0.5 break-words">
						{item.message}
					</div>
				</div>
			</div>

			<button
				type="button"
				onclick={() => toast.remove(item.id)}
				class="shrink-0 flex h-6 w-6 items-center justify-center border-2 border-black bg-white text-black font-black hover:bg-black hover:text-white transition-colors cursor-pointer"
				aria-label="Dismiss notification"
			>
				<X class="h-3.5 w-3.5 stroke-[3]" />
			</button>
		</div>
	{/each}
</div>
