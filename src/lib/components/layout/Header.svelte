<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { settingsStore } from '$lib/stores/settings';
	import { Badge } from '$lib/components/ui';
	import {
		Terminal,
		Flame,
		Sparkles,
		Trophy,
		Users,
		Settings as SettingsIcon,
		User,
		LogIn,
		Menu,
		X
	} from '@lucide/svelte';

	let isMobileMenuOpen = $state(false);

	let auth = $derived($authStore);
</script>

<!-- HEADER NAVBAR (Neo-Brutalist Architecture) -->
<header class="sticky top-0 z-40 border-b-3 border-black bg-white shadow-neo">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<!-- Left: Logo & PRD-Required Subtitle -->
		<div class="flex items-center gap-6">
			<a href="/" class="flex items-center gap-2.5 group">
				<div
					class="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#FFE600] font-heading font-black text-xl shadow-neo-sm group-hover:-translate-y-0.5 group-hover:bg-[#FFD93D] transition-all"
				>
					P!
				</div>
				<div class="flex flex-col">
					<div class="font-heading text-xl font-black tracking-tight leading-none text-black flex items-center gap-1.5">
						Promptiqa
						<span class="border border-black bg-[#00E5FF] px-1 py-0.2 text-[9px] font-black uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
							BETA
						</span>
					</div>
					<div class="text-[10px] font-bold text-black/70 leading-tight mt-0.5 tracking-tight">
						Created by Muhammad Akbar Pamungkas
					</div>
				</div>
			</a>

			<!-- Desktop Navigation Links -->
			<nav class="hidden md:flex items-center gap-1 font-heading text-xs font-black uppercase tracking-wider">
				<a
					href="/sandbox"
					class="flex items-center gap-1.5 px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-neo-sm transition-all"
				>
					<Terminal class="h-4 w-4 stroke-[2.5]" />
					<span>Sandbox</span>
				</a>
				<a
					href="/community"
					class="flex items-center gap-1.5 px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#00E5FF] hover:shadow-neo-sm transition-all"
				>
					<Users class="h-4 w-4 stroke-[2.5]" />
					<span>Community Hub</span>
				</a>
				<a
					href="/leaderboard"
					class="flex items-center gap-1.5 px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#FF8FAB] hover:shadow-neo-sm transition-all"
				>
					<Trophy class="h-4 w-4 stroke-[2.5]" />
					<span>Leaderboard</span>
				</a>
			</nav>
		</div>

		<!-- Right: Status Indicators & Actions -->
		<div class="hidden md:flex items-center gap-2.5">
			<!-- Live XP Counter -->
			<div
				class="flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3 py-1 text-xs font-heading font-black shadow-neo-sm"
				title="Total Accumulated XP"
			>
				<Sparkles class="h-3.5 w-3.5 stroke-[3] fill-black" />
				<span>XP: {auth.user?.totalXp?.toLocaleString() ?? '150'}</span>
			</div>

			<!-- Daily Streak Badge -->
			<div
				class="flex items-center gap-1.5 border-2 border-black bg-[#FF5964] text-white px-3 py-1 text-xs font-heading font-black shadow-neo-sm"
				title="Daily Streak Counter"
			>
				<Flame class="h-3.5 w-3.5 stroke-[3] fill-yellow-300 text-yellow-300" />
				<span>🔥 {auth.user?.currentStreak ?? 1} Days</span>
			</div>

			<!-- Settings Button -->
			<button
				type="button"
				onclick={() => settingsStore.openSettingsModal()}
				class="flex h-9 w-9 items-center justify-center border-2 border-black bg-white hover:bg-[#FAF9F5] shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
				title="Open Settings"
				aria-label="Open Settings"
			>
				<SettingsIcon class="h-4 w-4 stroke-[2.5]" />
			</button>

			<!-- User Profile or Guest Auth Trigger -->
			{#if auth.isGuest}
				<button
					type="button"
					onclick={() => authStore.openAuthModal()}
					class="flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1 text-xs font-heading font-black shadow-neo-sm hover:bg-[#00E5FF] transition-colors cursor-pointer"
					title="Login to Save Progress Permanently"
				>
					<LogIn class="h-3.5 w-3.5 stroke-[2.5]" />
					<span>Login</span>
				</button>
			{:else}
				<a
					href="/profile"
					class="flex items-center gap-1.5 border-2 border-black bg-[#00E5FF] px-3 py-1 text-xs font-heading font-black shadow-neo-sm hover:bg-[#FFE600] transition-colors"
					title="View Profile & Badges"
				>
					<User class="h-3.5 w-3.5 stroke-[2.5]" />
					<span>{auth.user?.username ?? 'Profile'}</span>
				</a>
			{/if}
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			type="button"
			onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			class="md:hidden flex h-10 w-10 items-center justify-center border-2 border-black bg-[#FFE600] shadow-neo-sm cursor-pointer"
			aria-label="Toggle Navigation Menu"
		>
			{#if isMobileMenuOpen}
				<X class="h-5 w-5 stroke-[3]" />
			{:else}
				<Menu class="h-5 w-5 stroke-[3]" />
			{/if}
		</button>
	</div>

	<!-- Mobile Dropdown Navigation -->
	{#if isMobileMenuOpen}
		<div class="md:hidden border-t-2 border-black bg-[#F7F4EB] p-4 flex flex-col gap-3">
			<div class="flex items-center justify-between pb-3 border-b border-black">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1 border border-black bg-[#FFE600] px-2.5 py-0.5 text-xs font-heading font-black shadow-neo-sm">
						⚡ {auth.user?.totalXp?.toLocaleString() ?? '150'} XP
					</div>
					<div class="flex items-center gap-1 border border-black bg-[#FF5964] text-white px-2.5 py-0.5 text-xs font-heading font-black shadow-neo-sm">
						🔥 {auth.user?.currentStreak ?? 1} Days
					</div>
				</div>
				{#if auth.isGuest}
					<button
						type="button"
						onclick={() => {
							isMobileMenuOpen = false;
							authStore.openAuthModal();
						}}
						class="text-xs font-heading font-black underline"
					>
						Login Akun
					</button>
				{/if}
			</div>

			<a
				href="/sandbox"
				onclick={() => (isMobileMenuOpen = false)}
				class="font-heading font-black text-sm border-2 border-black bg-white p-2.5 shadow-neo-sm flex items-center justify-between"
			>
				<span>⚡ Sandbox & Prompt IDE</span>
				<span>→</span>
			</a>
			<a
				href="/community"
				onclick={() => (isMobileMenuOpen = false)}
				class="font-heading font-black text-sm border-2 border-black bg-white p-2.5 shadow-neo-sm flex items-center justify-between"
			>
				<span>👥 Community Prompt Hub</span>
				<span>→</span>
			</a>
			<a
				href="/leaderboard"
				onclick={() => (isMobileMenuOpen = false)}
				class="font-heading font-black text-sm border-2 border-black bg-white p-2.5 shadow-neo-sm flex items-center justify-between"
			>
				<span>🏆 Leaderboard XP</span>
				<span>→</span>
			</a>
			<a
				href="/profile"
				onclick={() => (isMobileMenuOpen = false)}
				class="font-heading font-black text-sm border-2 border-black bg-white p-2.5 shadow-neo-sm flex items-center justify-between"
			>
				<span>👤 Profile & Badges</span>
				<span>→</span>
			</a>
			<button
				type="button"
				onclick={() => {
					isMobileMenuOpen = false;
					settingsStore.openSettingsModal();
				}}
				class="font-heading font-black text-sm border-2 border-black bg-[#00E5FF] p-2.5 shadow-neo-sm text-left flex items-center justify-between"
			>
				<span>⚙️ Settings & Model Preferences</span>
				<span>→</span>
			</button>
		</div>
	{/if}
</header>
