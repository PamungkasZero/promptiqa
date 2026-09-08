/**
 * Token Counter & Cost Estimation Utility for Promptiqa
 * Estimates token count (~4 characters/token) and Gemini 1.5 Flash API costs
 */

// Gemini 1.5 Flash pricing per 1M tokens ($0.075 / 1M prompt tokens for text)
const GEMINI_FLASH_INPUT_COST_PER_TOKEN = 0.000000075;

export interface TokenEstimate {
	characterCount: number;
	wordCount: number;
	estimatedTokens: number;
	estimatedCostUsd: number;
	formattedCost: string;
}

export function estimateTokens(text: string): TokenEstimate {
	if (!text) {
		return {
			characterCount: 0,
			wordCount: 0,
			estimatedTokens: 0,
			estimatedCostUsd: 0,
			formattedCost: '$0.0000'
		};
	}

	const characterCount = text.length;
	const words = text.trim().split(/\s+/).filter(Boolean);
	const wordCount = words.length;

	// Approximate rule of thumb: 1 token ~= 4 characters or ~0.75 words
	const estimatedTokens = Math.max(1, Math.ceil(characterCount / 4));
	const estimatedCostUsd = estimatedTokens * GEMINI_FLASH_INPUT_COST_PER_TOKEN;

	const formattedCost =
		estimatedCostUsd < 0.0001 ? '< $0.0001' : `$${estimatedCostUsd.toFixed(4)}`;

	return {
		characterCount,
		wordCount,
		estimatedTokens,
		estimatedCostUsd,
		formattedCost
	};
}
