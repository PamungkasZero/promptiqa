<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { Modal, Button } from '$lib/components/ui';
	import { Sparkles, CheckCircle2, ShieldCheck } from '@lucide/svelte';

	let auth = $derived($authStore);

	function handleLogin(provider: 'google' | 'github' | 'guest') {
		authStore.simulateLogin(provider);
	}
</script>

<Modal
	isOpen={auth.isAuthModalOpen}
	title="LOGIN / SIMULASI AUTH"
	onClose={() => authStore.closeAuthModal()}
>
	<div class="flex flex-col gap-4">
		<div class="border-2 border-black bg-[#FFE600] p-3 shadow-neo-sm">
			<div class="flex items-center gap-2 font-heading text-xs font-black uppercase text-black">
				<Sparkles class="h-4 w-4 stroke-[3]" />
				<span>Simpan Progress Belajar Kamu!</span>
			</div>
			<p class="text-xs font-medium text-black/90 mt-1">
				Hubungkan akun untuk menyimpan XP permanen, mempertahankan daily streak, dan unlock badges.
			</p>
		</div>

		<div class="flex flex-col gap-2.5">
			<!-- Google Mock Login -->
			<button
				type="button"
				onclick={() => handleLogin('google')}
				class="w-full flex items-center justify-between border-2 border-black bg-white p-3 font-heading font-black text-xs shadow-neo-sm hover:bg-[#FAF9F5] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
			>
				<div class="flex items-center gap-2">
					<span class="text-base">🌐</span>
					<span>Lanjut dengan Akun Google</span>
				</div>
				<span class="border border-black bg-[#00E5FF] px-2 py-0.5 text-[10px]">OAuth</span>
			</button>

			<!-- GitHub Mock Login -->
			<button
				type="button"
				onclick={() => handleLogin('github')}
				class="w-full flex items-center justify-between border-2 border-black bg-[#111111] text-white p-3 font-heading font-black text-xs shadow-neo-sm hover:bg-black hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
			>
				<div class="flex items-center gap-2">
					<span class="text-base">🐙</span>
					<span>Lanjut dengan GitHub Developer</span>
				</div>
				<span class="border border-white/40 bg-white/20 px-2 py-0.5 text-[10px]">OAuth</span>
			</button>

			<!-- Guest Mode Quick Switch -->
			<button
				type="button"
				onclick={() => handleLogin('guest')}
				class="w-full flex items-center justify-between border-2 border-black bg-[#F7F4EB] p-3 font-heading font-black text-xs shadow-neo-sm hover:bg-[#EAE5D8] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
			>
				<div class="flex items-center gap-2">
					<span class="text-base">⚡</span>
					<span>Lanjut sebagai Guest Explorer</span>
				</div>
				<span class="border border-black bg-[#FFE600] px-2 py-0.5 text-[10px] text-black">Preview</span>
			</button>
		</div>

		<div class="border-t-2 border-black pt-3 flex items-center gap-2 text-[11px] font-bold text-black/70">
			<ShieldCheck class="h-4 w-4 text-green-700 stroke-[2.5]" />
			<span>Local Storage Mock Mode aktif. Tidak memerlukan API key untuk simulasi.</span>
		</div>
	</div>

	{#snippet footer()}
		<Button variant="white" size="sm" onclick={() => authStore.closeAuthModal()}>
			Tutup
		</Button>
	{/snippet}
</Modal>
