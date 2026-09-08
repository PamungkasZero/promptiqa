export interface DiffLine {
	type: 'added' | 'removed' | 'unchanged';
	content: string;
	lineNumber?: number;
}

/**
 * Basic line-by-line diff computation for Neo-Brutalist prompt diff views
 */
export function computeLineDiff(originalText: string, newText: string): DiffLine[] {
	const originalLines = originalText.split('\n');
	const newLines = newText.split('\n');
	const diff: DiffLine[] = [];

	const maxLen = Math.max(originalLines.length, newLines.length);

	for (let i = 0; i < maxLen; i++) {
		const orig = originalLines[i];
		const next = newLines[i];

		if (orig === undefined) {
			diff.push({ type: 'added', content: next, lineNumber: i + 1 });
		} else if (next === undefined) {
			diff.push({ type: 'removed', content: orig, lineNumber: i + 1 });
		} else if (orig === next) {
			diff.push({ type: 'unchanged', content: orig, lineNumber: i + 1 });
		} else {
			diff.push({ type: 'removed', content: orig, lineNumber: i + 1 });
			diff.push({ type: 'added', content: next, lineNumber: i + 1 });
		}
	}

	return diff;
}
