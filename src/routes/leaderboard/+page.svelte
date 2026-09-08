<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { Badge, Card } from '$lib/components/ui';
	import { Trophy, Flame, Sparkles, Medal, User } from '@lucide/svelte';

	let auth = $derived($authStore);

	const baseLeaderboard = [
		{ id: 'u-1', name: 'alex_master', xp: 4850, streak: 28, badge: '👑 Prompt Master' },
		{ id: 'u-2', name: 'cyber_guard', xp: 4200, streak: 21, badge: '🛡️ Security Hunter' },
		{ id: 'u-3', name: 'data_wizard_99', xp: 3950, streak: 19, badge: '📊 Data Wizard' },
		{ id: 'u-4', name: 'sarah_prompt', xp: 3100, streak: 14, badge: '⚡ Prompt Engineer' },
		{ id: 'u-5', name: 'akbar_pamungkas', xp: 2850, streak: 12, badge: '🚀 Prompt Apprentice' },
		{ id: 'u-6', name: 'dimas_ai', xp: 2400, streak: 9, badge: '🚀 Prompt Apprentice' }
	];

	let timeframe = $state<'global' | 'weekly' | 'monthly'>('global');

	// Compute sorted leaderboard including current user
	let fullRankings = $derived.by(() => {
		const currentUserEntry = {
			id: auth.user?.id || 'guest',
			name: auth.user?.username || 'Guest Explorer',
			xp: auth.user?.totalXp || 150,
			streak: auth.user?.currentStreak || 3,
			badge: (auth.user?.totalXp || 0) >= 1000 ? '⚡ Prompt Engineer' : '🌱 First Prompt',
			isCurrent: true
		};

		const combined = [
			...baseLeaderboard.filter((u) => u.name !== currentUserEntry.name).map((u) => ({ ...u, isCurrent: false })),
			currentUserEntry
		];

		// Sort by XP descending
		combined.sort((a, b) => b.xp - a.xp);

		return combined.map((entry, index) => ({
			...entry,
			rank: index + 1
		}));
	});
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col gap-6">
	<!-- Leaderboard Banner -->
	<div class="neo-box-thick bg-[#FFE600] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-neo-lg">
		<div class="flex items-center gap-4">
			<div class="flex h-14 w-14 items-center justify-center border-3 border-black bg-white shadow-neo">
				<Trophy class="h-8 w-8 stroke-[2.5] text-amber-500" />
			</div>
			<div>
				<Badge color="dark" class="mb-1">GLOBAL RANKING</Badge>
				<h1 class="font-heading text-3xl sm:text-4xl font-black text-black">Promptiqa Leaderboard</h1>
				<p class="text-xs font-bold text-black/80 mt-0.5">Peringkat Prompt Engineer teratas berdasarkan akumulasi XP & streak</p>
			</div>
		</div>

		<!-- Timeframe tabs -->
		<div class="flex items-center gap-1 border-2 border-black bg-white p-1 shadow-neo-sm">
			<button
				type="button"
				onclick={() => (timeframe = 'global')}
				class="px-3 py-1 text-xs font-heading font-black cursor-pointer transition-colors {timeframe === 'global' ? 'bg-[#FFE600] border border-black' : 'hover:bg-gray-50'}"
			>
				All Time
			</button>
			<button
				type="button"
				onclick={() => (timeframe = 'weekly')}
				class="px-3 py-1 text-xs font-heading font-black cursor-pointer transition-colors {timeframe === 'weekly' ? 'bg-[#FFE600] border border-black' : 'hover:bg-gray-50'}"
			>
				Weekly
			</button>
		</div>
	</div>

	<!-- Current User Quick Standings Card -->
	{#if auth.user}
		<div class="neo-box bg-[#00E5FF] p-4 flex items-center justify-between shadow-neo">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center border-2 border-black bg-white font-heading font-black text-base shadow-neo-sm">
					{auth.user.username?.charAt(0) || 'U'}
				</div>
				<div>
					<div class="text-[10px] font-black uppercase tracking-wider text-black/70">Posisi Anda Saat Ini</div>
					<div class="font-heading text-base font-black text-black flex items-center gap-2">
						<span>{auth.user.username}</span>
						<span class="border border-black bg-[#FFE600] px-1.5 py-0.2 text-[10px] uppercase font-black">YOU</span>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-4 text-right">
				<div>
					<div class="text-[10px] font-black uppercase text-black/70">Streak</div>
					<div class="font-heading text-sm font-black text-black">🔥 {auth.user.currentStreak} Days</div>
				</div>
				<div class="border-l-2 border-black pl-4">
					<div class="text-[10px] font-black uppercase text-black/70">Total XP</div>
					<div class="font-heading text-xl font-black text-black">{auth.user.totalXp.toLocaleString()} XP</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Leaderboard Table List -->
	<div class="neo-box bg-white overflow-hidden shadow-neo">
		<div class="grid grid-cols-12 border-b-2 border-black bg-[#F7F4EB] px-4 py-3 text-xs font-heading font-black uppercase text-black/70">
			<div class="col-span-2 sm:col-span-1 text-center">Rank</div>
			<div class="col-span-6 sm:col-span-6">Prompt Engineer</div>
			<div class="col-span-2 sm:col-span-2 text-center">Streak</div>
			<div class="col-span-2 sm:col-span-3 text-right">Total XP</div>
		</div>

		<div class="divide-y-2 divide-black">
			{#each fullRankings as user}
				<div
					class="grid grid-cols-12 items-center px-4 py-3.5 text-sm transition-colors {user.isCurrent
						? 'bg-[#E6F9FF] font-bold border-y-2 border-dashed border-blue-400'
						: user.rank <= 3
						? 'bg-[#FFFDEB]'
						: 'hover:bg-[#FAF9F5]'}"
				>
					<!-- Rank Number -->
					<div class="col-span-2 sm:col-span-1 text-center font-heading font-black">
						{#if user.rank === 1}
							<span class="inline-flex h-7 w-7 items-center justify-center border-2 border-black bg-[#FFE600] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-xs">🥇</span>
						{:else if user.rank === 2}
							<span class="inline-flex h-7 w-7 items-center justify-center border-2 border-black bg-[#E2DDD0] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-xs">🥈</span>
						{:else if user.rank === 3}
							<span class="inline-flex h-7 w-7 items-center justify-center border-2 border-black bg-[#FF8FAB] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-xs">🥉</span>
						{:else}
							<span class="text-xs">#{user.rank}</span>
						{/if}
					</div>

					<!-- Username & Badge -->
					<div class="col-span-6 sm:col-span-6 flex flex-col min-w-0 pr-2">
						<div class="flex items-center gap-1.5 truncate">
							<span class="font-heading font-black text-black truncate">{user.name}</span>
							{#if user.isCurrent}
								<span class="shrink-0 border border-black bg-[#FFE600] px-1 py-0.2 text-[9px] font-black uppercase">YOU</span>
							{/if}
						</div>
						<span class="text-[11px] font-bold text-black/60 truncate">{user.badge}</span>
					</div>

					<!-- Streak -->
					<div class="col-span-2 sm:col-span-2 text-center font-heading font-black text-xs">
						<span class="inline-flex items-center gap-1 border border-black bg-[#FF5964] text-white px-2 py-0.5 shadow-neo-sm">
							<Flame class="h-3 w-3 stroke-[3] fill-yellow-300 text-yellow-300" />
							<span>{user.streak}d</span>
						</span>
					</div>

					<!-- Total XP -->
					<div class="col-span-2 sm:col-span-3 text-right font-heading font-black text-base text-black">
						{user.xp.toLocaleString()} <span class="text-xs">XP</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
