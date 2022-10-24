/**
 * fetcher for swr
 * @param {RequestInfo} input
 * @param {RequestInit} init
 * @return {Promise<JSON>}
 */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
