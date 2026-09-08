<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AuthModal from '$lib/components/layout/AuthModal.svelte';
	import { Toast, Modal, Button, Input, Toggle } from '$lib/components/ui';
	import { settingsStore } from '$lib/stores/settings';
	import { toast } from '$lib/stores/toast';

	let { children } = $props();

	let settings = $derived($settingsStore);

	let customApiKeyInput = $state($settingsStore.customApiKey);
	let selectedModel = $state($settingsStore.model);

	function handleSaveSettings() {
		settingsStore.setCustomApiKey(customApiKeyInput);
		settingsStore.setModel(selectedModel);
		settingsStore.closeSettingsModal();
		toast.success('Pengaturan model dan preferensi berhasil disimpan.', 'SETTINGS SAVED');
	}
</script>

<div class="min-h-screen flex flex-col bg-[#F7F4EB] text-black font-sans selection:bg-[#FFE600] selection:text-black">
	<!-- HEADER NAVBAR -->
	<Header />

	<!-- MAIN CONTENT CONTAINER -->
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	<!-- FOOTER -->
	<Footer />

	<!-- TOAST NOTIFICATIONS CONTAINER -->
	<Toast />

	<!-- AUTH / LOGIN SIMULATION MODAL -->
	<AuthModal />

	<!-- SETTINGS MODAL (PRD Section 11 Specification) -->
	<Modal
		isOpen={settings.isSettingsModalOpen}
		title="SETTINGS PANEL"
		onClose={() => settingsStore.closeSettingsModal()}
	>
		<div class="flex flex-col gap-4">
			<!-- AI Configuration Section -->
			<div class="border-b-2 border-black pb-3">
				<h4 class="font-heading text-xs font-black uppercase tracking-wider text-black/70 mb-3">
					AI Engine Configuration
				</h4>
				<div class="flex flex-col gap-3">
					<Input
						label="Custom Gemini API Key (Optional)"
						placeholder="AIzaSy..."
						helper="Gunakan custom key untuk unlimited sandbox mode. Disimpan hanya pada sesi browser."
						bind:value={customApiKeyInput}
					/>

					<div class="flex flex-col gap-1.5">
						<label for="model-preference-select" class="font-heading text-xs font-bold uppercase tracking-wider text-black">
							Default Model
						</label>
						<select
							id="model-preference-select"
							bind:value={selectedModel}
							class="w-full border-2 border-black bg-white p-2.5 text-xs font-bold shadow-neo-sm focus:outline-none"
						>
							<option value="gemini-1.5-flash">Gemini 1.5 Flash (Super Fast & Default)</option>
							<option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Reasoning)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Appearance & Sound FX -->
			<div>
				<h4 class="font-heading text-xs font-black uppercase tracking-wider text-black/70 mb-2">
					Preferences
				</h4>
				<Toggle
					label="Sound Effects"
					description="Audio feedback saat grading berhasil atau level up"
					checked={settings.soundFx}
					onChange={() => settingsStore.toggleSoundFx()}
				/>
			</div>
		</div>

		{#snippet footer()}
			<Button variant="white" size="sm" onclick={() => settingsStore.closeSettingsModal()}>
				Cancel
			</Button>
			<Button variant="yellow" size="sm" onclick={handleSaveSettings}>
				Save Settings
			</Button>
		{/snippet}
	</Modal>
</div>
