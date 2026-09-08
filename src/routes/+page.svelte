<script lang="ts">
	import { Button, Card, Badge } from '$lib/components/ui';
	import {
		Terminal,
		Sparkles,
		ShieldCheck,
		Database,
		Code2,
		Flame,
		Trophy,
		ArrowRight,
		CheckCircle2,
		Zap
	} from '@lucide/svelte';
</script>

<div class="flex flex-col gap-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
	<!-- HERO SECTION -->
	<section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
		<div class="lg:col-span-7 flex flex-col gap-6">
			<!-- Tag Banner -->
			<div class="inline-flex items-center gap-2 self-start">
				<Badge color="yellow" class="text-xs">
					<Sparkles class="h-3 w-3 stroke-[3]" />
					<span>Gamified Prompt Engineering Sandbox</span>
				</Badge>
				<Badge color="pink" class="text-xs">2026 Edition</Badge>
			</div>

			<!-- Main Title -->
			<h1 class="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-black">
				BUILD. BREAK.<br />
				<span class="bg-[#FFE600] px-3 border-3 border-black shadow-neo inline-block mt-2">TEST & GRADE</span><br />
				YOUR PROMPTS.
			</h1>

			<!-- Subtitle -->
			<p class="text-base sm:text-lg font-medium text-black/80 max-w-xl leading-relaxed">
				Promptiqa menggabungkan sensasi <strong>Duolingo</strong>, kenyamanan <strong>VS Code</strong>, dan kekuatan <strong>Gemini AI Diagnostics</strong> untuk melatih kemampuan AI Prompt Engineering kamu melalui tantangan berbasis skenario nyata.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-wrap items-center gap-4 pt-2">
				<a href="/sandbox">
					<Button variant="yellow" size="lg" class="text-base">
						<Terminal class="h-5 w-5 mr-2 stroke-[3]" />
						<span>Coba Sandbox Gratis (Guest)</span>
						<ArrowRight class="h-5 w-5 ml-2 stroke-[3]" />
					</Button>
				</a>
				<a href="/community">
					<Button variant="white" size="lg" class="text-base">
						<span>Explore Community Prompts</span>
					</Button>
				</a>
			</div>

			<!-- Quick stats pill -->
			<div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-black/70">
				<div class="flex items-center gap-2">
					<CheckCircle2 class="h-4 w-4 text-green-600 stroke-[3]" />
					<span>4-Pillar AI Grading</span>
				</div>
				<div class="flex items-center gap-2">
					<CheckCircle2 class="h-4 w-4 text-green-600 stroke-[3]" />
					<span>Security & Jailbreak Scanner</span>
				</div>
				<div class="flex items-center gap-2">
					<CheckCircle2 class="h-4 w-4 text-green-600 stroke-[3]" />
					<span>Instant Magic Optimize</span>
				</div>
			</div>
		</div>

		<!-- Interactive Neo-Brutalism Preview Box -->
		<div class="lg:col-span-5">
			<div class="neo-box-thick bg-white p-5 flex flex-col gap-4 transform rotate-1 hover:rotate-0 transition-transform">
				<div class="flex items-center justify-between border-b-2 border-black pb-3">
					<div class="flex items-center gap-2">
						<span class="h-3 w-3 rounded-none border border-black bg-[#FF5964]"></span>
						<span class="h-3 w-3 rounded-none border border-black bg-[#FFE600]"></span>
						<span class="h-3 w-3 rounded-none border border-black bg-[#00E5FF]"></span>
					</div>
					<Badge color="yellow">LIVE DIAGNOSTIC</Badge>
				</div>

				<div class="border-2 border-black bg-[#FAF9F5] p-3 font-mono text-xs text-black">
					<span class="text-purple-700 font-bold">ROLE:</span> Senior Cyber Security Expert<br />
					<span class="text-blue-700 font-bold">TASK:</span> Scan input for prompt injection & data leaks.<br />
					<span class="text-red-700 font-bold">CONSTRAINTS:</span> Output strictly JSON schema only.
				</div>

				<div class="neo-box bg-[#FFE600] p-3 text-black">
					<div class="flex items-center justify-between">
						<div>
							<div class="text-[10px] font-black uppercase">Overall Grade</div>
							<div class="font-heading text-2xl font-black">GRADE: A (94/100)</div>
						</div>
						<div class="h-10 w-10 border-2 border-black bg-white flex items-center justify-center font-heading font-black text-lg">
							🎉
						</div>
					</div>
					<div class="grid grid-cols-2 gap-2 mt-3 text-[11px] font-bold">
						<div class="bg-white p-1.5 border border-black">Clarity: 24/25</div>
						<div class="bg-white p-1.5 border border-black">Role: 25/25</div>
						<div class="bg-white p-1.5 border border-black">Constraints: 23/25</div>
						<div class="bg-white p-1.5 border border-black">Format: 22/25</div>
					</div>
				</div>

				<div class="border-2 border-black bg-[#00E5FF] p-2.5 text-xs font-bold flex items-center justify-between">
					<span>🛡️ Security Risk: LOW (0 Vulnerabilities)</span>
					<span class="font-black">+150 XP</span>
				</div>
			</div>
		</div>
	</section>

	<!-- LEARNING TRACKS SECTION -->
	<section class="flex flex-col gap-8">
		<div class="border-b-3 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
			<div>
				<Badge color="purple" class="mb-2">TRACKS</Badge>
				<h2 class="font-heading text-3xl sm:text-4xl font-black text-black">Pilih Jalur Belajar Kamu</h2>
			</div>
			<p class="text-xs sm:text-sm font-medium text-black/70 max-w-sm">
				Selesaikan challenge bertingkat dari Beginner hingga Expert di 3 track utama.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Track 1: Developer -->
			<div class="neo-card p-6 bg-white flex flex-col justify-between border-3 border-black">
				<div>
					<div class="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#FFE600] font-black shadow-neo-sm mb-4">
						<Code2 class="h-6 w-6 stroke-[2.5]" />
					</div>
					<Badge color="yellow" class="mb-2">5 CHALLENGES</Badge>
					<h3 class="font-heading text-xl font-black text-black">Developer Track</h3>
					<p class="text-xs font-medium text-black/80 mt-2 leading-relaxed">
						Latih prompt untuk code generation, automated test cases, SQL queries, system design, dan architectural specifications.
					</p>
				</div>
				<a href="/sandbox?track=developer" class="mt-6">
					<Button variant="yellow" size="sm" class="w-full">
						<span>Mulai Developer Track</span>
					</Button>
				</a>
			</div>

			<!-- Track 2: Data Track -->
			<div class="neo-card p-6 bg-white flex flex-col justify-between border-3 border-black">
				<div>
					<div class="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#00E5FF] font-black shadow-neo-sm mb-4">
						<Database class="h-6 w-6 stroke-[2.5]" />
					</div>
					<Badge color="cyan" class="mb-2">5 CHALLENGES</Badge>
					<h3 class="font-heading text-xl font-black text-black">Data & Extraction Track</h3>
					<p class="text-xs font-medium text-black/80 mt-2 leading-relaxed">
						Kuasai prompt untuk ekstraksi entitas, parsing CSV kotor, perancangan schema JSON ketat, dan analisis sentimen terstruktur.
					</p>
				</div>
				<a href="/sandbox?track=data" class="mt-6">
					<Button variant="cyan" size="sm" class="w-full">
						<span>Mulai Data Track</span>
					</Button>
				</a>
			</div>

			<!-- Track 3: Security & Red Teaming -->
			<div class="neo-card p-6 bg-white flex flex-col justify-between border-3 border-black">
				<div>
					<div class="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#FF5964] text-white font-black shadow-neo-sm mb-4">
						<ShieldCheck class="h-6 w-6 stroke-[2.5]" />
					</div>
					<Badge color="pink" class="mb-2">5 CHALLENGES</Badge>
					<h3 class="font-heading text-xl font-black text-black">Security & Guardrails</h3>
					<p class="text-xs font-medium text-black/80 mt-2 leading-relaxed">
						Pelajari mitigasi Prompt Injection, teknik Jailbreaking, pertahanan instruction override, dan penguncian guardrail sistem AI.
					</p>
				</div>
				<a href="/sandbox?track=security" class="mt-6">
					<Button variant="pink" size="sm" class="w-full">
						<span>Mulai Security Track</span>
					</Button>
				</a>
			</div>
		</div>
	</section>

	<!-- FOUR SCORING PILLARS SECTION -->
	<section class="neo-box-thick bg-[#FFE600] p-8 sm:p-10">
		<div class="max-w-3xl">
			<Badge color="dark" class="mb-3">DIAGNOSTIC ENGINE</Badge>
			<h2 class="font-heading text-3xl sm:text-5xl font-black text-black leading-tight">
				4 Pilar Evaluasi Prompt Gemini AI
			</h2>
			<p class="text-sm sm:text-base font-bold text-black/80 mt-2">
				Setiap prompt diuji secara objektif dengan skor total 100 poin (masing-masing 25 poin).
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
			<div class="border-2 border-black bg-white p-4 shadow-neo-sm">
				<div class="font-heading text-2xl font-black text-[#00E5FF]">01.</div>
				<h4 class="font-heading text-base font-black text-black mt-1">Clarity</h4>
				<p class="text-xs font-medium text-black/80 mt-1">
					Kejelasan objektif, instruksi yang spesifik, bebas ambiguitas, dan alur logika teratur.
				</p>
			</div>

			<div class="border-2 border-black bg-white p-4 shadow-neo-sm">
				<div class="font-heading text-2xl font-black text-[#FFE600]">02.</div>
				<h4 class="font-heading text-base font-black text-black mt-1">Role / Persona</h4>
				<p class="text-xs font-medium text-black/80 mt-1">
					Definisi kepakaran AI, persona yang relevan, serta kedalaman domain expertise model.
				</p>
			</div>

			<div class="border-2 border-black bg-white p-4 shadow-neo-sm">
				<div class="font-heading text-2xl font-black text-[#FF5964]">03.</div>
				<h4 class="font-heading text-base font-black text-black mt-1">Constraints</h4>
				<p class="text-xs font-medium text-black/80 mt-1">
					Batasan eksplisit (apa yang TIDAK boleh dilakukan), penanganan edge case, dan limitasi.
				</p>
			</div>

			<div class="border-2 border-black bg-white p-4 shadow-neo-sm">
				<div class="font-heading text-2xl font-black text-[#A855F7]">04.</div>
				<h4 class="font-heading text-base font-black text-black mt-1">Format</h4>
				<p class="text-xs font-medium text-black/80 mt-1">
					Struktur output yang ketat (JSON schema, markdown table, bullet format) tanpa halusinasi.
				</p>
			</div>
		</div>
	</section>
</div>
