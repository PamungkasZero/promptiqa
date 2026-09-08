import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { SimulateResult } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userPrompt, idealPrompt, sampleInput, customApiKey, model = 'gemini-1.5-flash' } =
			await request.json();

		if (!userPrompt || typeof userPrompt !== 'string') {
			return json({ error: 'User prompt is required.' }, { status: 400 });
		}

		// Priority 1: User's custom API key from browser Settings Modal
		// Priority 2: Server GEMINI_API_KEY from .env
		const apiKey = customApiKey?.trim() || env.GEMINI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim();

		const sampleInputText =
			typeof sampleInput === 'object' ? JSON.stringify(sampleInput, null, 2) : String(sampleInput || '');

		if (!apiKey) {
			return json({
				userOutput: `[SIMULATED AI OUTPUT DARI PROMPT ANDA]\n\nBerikut adalah hasil eksekusi model terhadap prompt yang Anda tulis dengan input:\n${sampleInputText || '(No sample input)'}\n\n💡 Hubungkan Gemini API Key di Settings untuk menghasilkan output real-time dari model Gemini 1.5 Flash.`,
				idealOutput: `[SIMULATED AI OUTPUT DARI IDEAL BENCHMARK PROMPT]\n\n\`\`\`json\n{\n  "status": "success",\n  "data": {\n    "entities": ["Parsed with precision"],\n    "executionTime": "12ms",\n    "confidence": 0.99\n  }\n}\n\`\`\`\n\n✅ Output benchmark selalu mematuhi batasan skema dan role secara konsisten.`
			});
		}

		const targetModel = model === 'gemini-1.5-pro' ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
		const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

		// Execute user prompt and ideal prompt in parallel
		const [userResponse, idealResponse] = await Promise.all([
			fetch(geminiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [
						{
							role: 'user',
							parts: [
								{
									text: `${userPrompt}\n\n[INPUT DATA]:\n${sampleInputText}`
								}
							]
						}
					],
					generationConfig: {
						temperature: 0.2
					}
				})
			}),
			fetch(geminiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [
						{
							role: 'user',
							parts: [
								{
									text: `${idealPrompt || userPrompt}\n\n[INPUT DATA]:\n${sampleInputText}`
								}
							]
						}
					],
					generationConfig: {
						temperature: 0.1
					}
				})
			})
		]);

		const userData = await userResponse.json();
		const idealData = await idealResponse.json();

		const userOutput =
			userData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated from user prompt.';
		const idealOutput =
			idealData.candidates?.[0]?.content?.parts?.[0]?.text ||
			'No response generated from ideal prompt benchmark.';

		const result: SimulateResult = {
			userOutput,
			idealOutput
		};

		return json(result);
	} catch (error: any) {
		console.error('Error in simulate endpoint:', error);
		return json({
			userOutput: 'Simulasi output gagal dieksekusi. Periksa kembali format input.',
			idealOutput: 'Simulasi benchmark tidak tersedia.'
		});
	}
};
