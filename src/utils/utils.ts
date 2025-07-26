export function mostFrequent(arr: string[]): string {
  const freq: Record<string, number> = {};
  for (const el of arr) {
    freq[el] = (freq[el] || 0) + 1;
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}
