// Lenovo Product API – Node.js example (Node 18+, native fetch, ES module)
// Usage: PILOTERR_API_KEY=your-key node product.mjs

const params = new URLSearchParams({
  "query": "https://www.lenovo.com/fr/fr/p/workstations/thinkstationp/thinkstation-p5-gen-2-intel-tower-workstation/len102s0024",
});

const response = await fetch(`https://api.piloterr.com/v2/lenovo/product?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY },
  signal: AbortSignal.timeout(60_000),
});

if (!response.ok) {
  console.error(`Piloterr error ${response.status}: ${await response.text()}`);
  process.exit(1);
}

console.log(JSON.stringify(await response.json(), null, 2));
