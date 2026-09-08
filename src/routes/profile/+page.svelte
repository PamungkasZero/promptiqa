<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { Badge, Button, Card } from '$lib/components/ui';
	import { Flame, Sparkles, Trophy, Award, Shield, Terminal, CheckCircle2 } from '@lucide/svelte';

	let auth = $derived($authStore);

	const badges = [
		{ key: 'first_prompt', name: 'First Prompt', icon: '🌱', desc: 'Selesaikan prompt challenge pertama kamu' },
		{ key: 'streak_7', name: '7-Day Streak', icon: '🔥', desc: 'Pertahankan streak selama 7 hari berturut-turut' },
		{ key: 'sec_master', name: 'Security Hunter', icon: '🛡️', desc: 'Lulus semua challenge security tanpa vulnerability' },
		{ key: 'data_wizard', name: 'Data Wizard', icon: '📊', desc: 'Ekstraksi JSON dan CSV dengan akurasi 100%' },
		{ key: 'grade_a', name: 'Grade A+ Specialist', icon: '👑', desc: 'Dapatkan nilai 95+ pada 5 challenge berbeda' }
	];
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col gap-8">
	<!-- User Profile Header Card -->
	<div class="neo-box-thick bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
		<div class="flex items-center gap-5">
			<div class="flex h-20 w-20 items-center justify-center border-3 border-black bg-[#FFE600] font-heading font-black text-3xl shadow-neo">
				{auth.user?.username?.charAt(0) || 'G'}
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h1 class="font-heading text-2xl sm:text-3xl font-black text-black">
						{auth.user?.username || 'Guest Explorer'}
					</h1>
					{#if auth.isGuest}
						<Badge color="yellow">GUEST MODE</Badge>
					{/if}
				</div>
				<p class="text-xs font-bold text-black/60 mt-1">Prompt Engineer in Training</p>
			</div>
		</div>

		<!-- Action -->
		<div class="flex items-center gap-3">
			<Button variant="yellow" size="md">
				<span>Edit Profile</span>
			</Button>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		<div class="neo-box p-4 bg-[#FFE600] flex items-center justify-between">
			<div>
				<div class="font-heading text-xs font-black uppercase text-black/70">Total XP Earned</div>
				<div class="font-heading text-3xl font-black text-black mt-0.5">{auth.user?.totalXp ?? 100} XP</div>
			</div>
			<Sparkles class="h-8 w-8 stroke-[2.5]" />
		</div>

		<div class="neo-box p-4 bg-[#FF5964] text-white flex items-center justify-between">
			<div>
				<div class="font-heading text-xs font-black uppercase text-white/80">Active Streak</div>
				<div class="font-heading text-3xl font-black text-white mt-0.5">{auth.user?.currentStreak ?? 1} Days</div>
			</div>
			<Flame class="h-8 w-8 stroke-[2.5] fill-yellow-300" />
		</div>

		<div class="neo-box p-4 bg-[#00E5FF] flex items-center justify-between">
			<div>
				<div class="font-heading text-xs font-black uppercase text-black/70">Longest Streak</div>
				<div class="font-heading text-3xl font-black text-black mt-0.5">{auth.user?.longestStreak ?? 1} Days</div>
			</div>
			<Trophy class="h-8 w-8 stroke-[2.5]" />
		</div>
	</div>

	<!-- Badges Section -->
	<div class="neo-box bg-white p-6">
		<div class="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
			<div class="flex items-center gap-2">
				<Award class="h-5 w-5 stroke-[2.5]" />
				<h3 class="font-heading text-lg font-black text-black">Badges & Achievements</h3>
			</div>
			<span class="text-xs font-bold border border-black bg-[#FFE600] px-2 py-0.5 shadow-neo-sm">
				1 / {badges.length} Unlocked
			</span>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each badges as b, index}
				<div class="border-2 border-black p-3.5 {index === 0 ? 'bg-[#FFFDEB] shadow-neo-sm' : 'bg-gray-50 opacity-60'} flex items-start gap-3">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white text-xl">
						{b.icon}
					</div>
					<div>
						<h4 class="font-heading text-xs font-black text-black">{b.name}</h4>
						<p class="text-[11px] font-medium text-black/70 mt-0.5">{b.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
