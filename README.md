<p align="center">
  <a href="https://www.piloterr.com"><img src="images/banner.png" alt="Lenovo Scraper API by Piloterr – scrape Lenovo data as JSON" width="100%"></a>
</p>

# Lenovo Scraper API

[![Discord](https://img.shields.io/badge/Discord-Join%20the%20community-5865F2?logo=discord&logoColor=white)](https://discord.gg/CFj3ph8aHU) [![Get API key](https://img.shields.io/badge/Piloterr-Get%20a%20free%20API%20key-111827)](https://app.piloterr.com) [![API docs](https://img.shields.io/badge/Docs-OpenAPI-0EA5E9)](https://app.piloterr.com/openapi) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

The **Piloterr Lenovo Scraper API** lets you extract public data from Lenovo as **clean, structured JSON** — no proxies, headless browsers or HTML parsing to maintain. Endpoints available in production:

- **Lenovo Product API** — Extract a Lenovo product page by URL: id, name, price, currency, availability, images, and description (browser rendering, 2 credits).
- **Lenovo Search API** — Search Lenovo products by keyword or listing URL.

Use it for price monitoring, assortment tracking, competitor analysis, product research or catalog enrichment.

| Endpoint | Path | Credits | What you get |
|---|---|---|---|
| [Lenovo Product API](#lenovo-product-api) | `/v2/lenovo/product` | 2 | Extract a Lenovo product page by URL |
| [Lenovo Search API](#lenovo-search-api) | `/v2/lenovo/search` | 2 | Search Lenovo products by keyword or listing URL. Returns product id, price, currency, series, and availability via browser rendering (2 credits). |

## Table of contents

- [How it works](#how-it-works)
- [Lenovo Product API](#lenovo-product-api)
- [Lenovo Search API](#lenovo-search-api)
- [Code examples in other languages](#code-examples-in-other-languages)
- [Practical use cases](#practical-use-cases)
- [Why Piloterr?](#why-piloterr)
- [FAQ](#faq)
- [Related scrapers](#related-scrapers)
- [Support](#support)

## How it works

1. **Create a free Piloterr account** and copy your API key from the [dashboard](https://app.piloterr.com).
2. **Send a `GET` (or `POST`) request** to `https://api.piloterr.com/v2/...` with the header `x-api-key: YOUR_API_KEY`.
3. **Receive structured JSON** — Piloterr handles rendering, proxies, retries and parsing.

```bash
export PILOTERR_API_KEY="your-api-key"
pip install requests        # Python
# TypeScript: Node.js 18+ (native fetch), run with `npx tsx file.ts`
```

> Every endpoint accepts both `GET` (query string) and `POST` (JSON body with the same fields).

## Lenovo Product API

Extract a Lenovo product page by URL: id, name, price, currency, availability, images, and description (browser rendering, 2 credits).

`GET | POST https://api.piloterr.com/v2/lenovo/product` · **2 credits per request** · [Full reference](https://app.piloterr.com/openapi)

### Request parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | ✅ | Full Lenovo product URL (must contain `/p/`). Bare part numbers are rejected. |

### Python example

```python
import json
import os
import requests

response = requests.get(
    "https://api.piloterr.com/v2/lenovo/product",
    headers={"x-api-key": os.environ["PILOTERR_API_KEY"]},
    params={
        "query": "https://www.lenovo.com/fr/fr/p/workstations/thinkstationp/thinkstation-p5-gen-2-intel-tower-workstation/len102s0024",
    },
    timeout=60,
)
response.raise_for_status()
data = response.json()

print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
```

### TypeScript example

```typescript
type LenovoProduct = {
  mpn?: string;
  sku?: string;
  url?: string;
  name?: string;
  brand?: string;
  price?: number;
  title?: string;
  images?: string[];
  series?: string;
  category?: string;
  currency?: string;
  product_id?: string;
  config_type?: string;
  description?: string;
  availability?: string;
  thumbnail_url?: string;
};

const params = new URLSearchParams({
  "query": "https://www.lenovo.com/fr/fr/p/workstations/thinkstationp/thinkstation-p5-gen-2-intel-tower-workstation/len102s0024",
});

const response = await fetch(`https://api.piloterr.com/v2/lenovo/product?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY! },
});
if (!response.ok) throw new Error(`Piloterr error ${response.status}: ${await response.text()}`);

const data = (await response.json()) as LenovoProduct;

console.log(JSON.stringify(data, null, 2).slice(0, 2000));
```

<details>
<summary><b>POST variant</b></summary>

```http
POST https://api.piloterr.com/v2/lenovo/product
x-api-key: YOUR_API_KEY
Content-Type: application/json

{"query": "https://www.lenovo.com/fr/fr/p/workstations/thinkstationp/thinkstation-p5-gen-2-intel-tower-workstation/len102s0024"}
```
</details>

### Output example

Example response from the API reference, abridged — real values depend on the page you scrape.

```json
{
  "mpn": "LEN102S0024",
  "sku": "LEN102S0024",
  "url": "https://www.lenovo.com/fr/fr/p/workstations/thinkstationp/thinkstation-p5-gen-2-intel-tower-workstation/len102s0024",
  "name": "ThinkStation P5 Gen 2 (Intel) Tower",
  "brand": "Série P",
  "price": 4439.02,
  "title": "ThinkStation P5 Gen 2 (Intel) Tower",
  "images": [
    "https://p4-ofp.static.pub/ShareResource/optimized/thinkstation/thinkstation-p5-gen2-intel-tower/lenovo-thinkstation-p5-gen-2-pdp-hero.png"
  ],
  "series": "ThinkStation",
  "category": "Workstations",
  "currency": "EUR",
  "product_id": "LEN102S0024",
  "config_type": "CTO",
  "description": "La station de travail tour Lenovo ThinkStation P5 Gen 2 (Intel) offre des performances prêtes pour l’IA, un processeur avancé et une cart…",
  "availability": "in_stock",
  "thumbnail_url": "https://p4-ofp.static.pub/ShareResource/optimized/thinkstation/thinkstation-p5-gen2-intel-tower/lenovo-thinkstation-p5-gen-2-pdp-hero.png"
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `mpn` | string |  |
| `sku` | string |  |
| `url` | string |  |
| `name` | string |  |
| `brand` | string |  |
| `price` | number |  |
| `title` | string |  |
| `images` | string[] |  |
| `series` | string |  |
| `category` | string |  |
| `currency` | string |  |
| `product_id` | string |  |
| `config_type` | string |  |
| `description` | string |  |
| `availability` | string |  |
| `thumbnail_url` | string |  |

## Lenovo Search API

Search Lenovo products by keyword or listing URL. Returns product id, price, currency, series, and availability via browser rendering (2 credits).

`GET | POST https://api.piloterr.com/v2/lenovo/search` · **2 credits per request** · [Full reference](https://app.piloterr.com/openapi)

### Request parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | ✅ | Keyword or full Lenovo search / category URL. |
| `locale` | string | — | Store locale when `query` is a keyword (ignored for full URLs). |

### Python example

```python
import json
import os
import requests

response = requests.get(
    "https://api.piloterr.com/v2/lenovo/search",
    headers={"x-api-key": os.environ["PILOTERR_API_KEY"]},
    params={
        "query": "thinkpad",
    },
    timeout=60,
)
response.raise_for_status()
data = response.json()

print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
```

### TypeScript example

```typescript
type LenovoSearch = {
  meta?: {
    query?: string;
    current_page?: number;
    has_next_page?: boolean;
    total_results?: number;
  };
  results?: {
    url?: string;
    name?: string;
    price?: number;
    series?: string;
    currency?: string;
    product_id?: string;
    availability?: string;
    thumbnail_url?: string;
  }[];
};

const params = new URLSearchParams({
  "query": "thinkpad",
});

const response = await fetch(`https://api.piloterr.com/v2/lenovo/search?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY! },
});
if (!response.ok) throw new Error(`Piloterr error ${response.status}: ${await response.text()}`);

const data = (await response.json()) as LenovoSearch;

console.log(JSON.stringify(data, null, 2).slice(0, 2000));
```

<details>
<summary><b>POST variant</b></summary>

```http
POST https://api.piloterr.com/v2/lenovo/search
x-api-key: YOUR_API_KEY
Content-Type: application/json

{"query": "thinkpad"}
```
</details>

### Output example

Example response from the API reference, abridged — real values depend on the page you scrape.

```json
{
  "meta": {
    "query": "https://www.lenovo.com/fr/fr/search?fq=&text=thinkpad",
    "current_page": 1,
    "has_next_page": false,
    "total_results": 20
  },
  "results": [
    {
      "url": "https://www.lenovo.com/fr/fr/p/laptops/thinkpad/thinkpadp/thinkpad-p14s-gen-6-14-inch-amd-mobile-workstation/21qlcto1wwfr1",
      "name": "ThinkPad P14s Gen 6 (AMD)",
      "price": 2519,
      "series": "ThinkPad",
      "currency": "EUR",
      "product_id": "21QLCTO1WWFR1",
      "availability": "in_stock",
      "thumbnail_url": "https://p3-ofp.static.pub/ShareResource/optimized/pdp/thinkpad/thinkpad-p-series/len101t0118/thinkpad-p14s-gen-6-14-amd-series.png?width=…"
    },
    {
      "url": "https://www.lenovo.com/fr/fr/p/laptops/thinkpad/thinkpadl/lenovo-thinkpad-l14-gen-6-14-inch-amd/21secto1wwfr4",
      "name": "ThinkPad L14 Gen 6 (AMD)",
      "price": 1759.01,
      "series": "ThinkPad",
      "currency": "EUR",
      "product_id": "21SECTO1WWFR4",
      "availability": "in_stock",
      "thumbnail_url": "https://p1-ofp.static.pub/ShareResource/we/images/JK-2CD/len101t0144.png?width=584&height=584"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `meta` | object |  |
| `meta.query` | string |  |
| `meta.current_page` | integer |  |
| `meta.has_next_page` | boolean |  |
| `meta.total_results` | integer |  |
| `results[]` | object[] |  |
| `results[].url` | string |  |
| `results[].name` | string |  |
| `results[].price` | integer |  |
| `results[].series` | string |  |
| `results[].currency` | string |  |
| `results[].product_id` | string |  |
| `results[].availability` | string |  |
| `results[].thumbnail_url` | string |  |

## Code examples in other languages

Ready-to-run examples live in the [`examples/`](examples) folder. Each one reads your key from the `PILOTERR_API_KEY` environment variable.

| Language | Product | Search |
|---|---|---|
| cURL (Bash) | [`product`](examples/curl/product.sh) | [`search`](examples/curl/search.sh) |
| PHP | [`product`](examples/php/product.php) | [`search`](examples/php/search.php) |
| C# | [`product`](examples/csharp/Product.cs) | [`search`](examples/csharp/Search.cs) |
| Go | [`product`](examples/go/product.go) | [`search`](examples/go/search.go) |
| Java | [`product`](examples/java/ProductExample.java) | [`search`](examples/java/SearchExample.java) |
| Ruby | [`product`](examples/ruby/product.rb) | [`search`](examples/ruby/search.rb) |
| Node.js | [`product`](examples/nodejs/product.mjs) | [`search`](examples/nodejs/search.mjs) |

## Practical use cases

- **Price monitoring** — Track prices, promotions and availability over time to react to competitors.
- **Assortment & catalog tracking** — Follow new products, delisted items and category changes.
- **Competitor analysis** — Benchmark ranges, brands and positioning across retailers.
- **Product research** — Spot best-sellers and trends from search results.
- **Catalog enrichment** — Pull titles, images and attributes into your PIM or marketplace listings.

## Why Piloterr?

- **No infrastructure** — no proxies, headless browsers or CAPTCHA solving to run yourself.
- **Structured JSON** — stable, documented fields instead of brittle HTML selectors.
- **Pay per request** — transparent credit cost per endpoint, failed requests are retried for you.
- **One API key, hundreds of sources** — Lenovo plus many other e-commerce, search and company data endpoints in the [Piloterr library](https://www.piloterr.com/library).
- **Any language** — plain HTTPS + JSON, with examples for Python, TypeScript, cURL, PHP, C#, Go, Java, Ruby and Node.js.

## FAQ

### Is it legal to scrape Lenovo?

Collecting publicly available data is generally allowed in many jurisdictions, but rules depend on your country, the data you collect and how you use it. Avoid personal data unless you have a lawful basis, respect the website's terms where they apply, and get legal advice for your specific use case. This is not legal advice.

### Do I need proxies or a headless browser?

No. Piloterr handles rendering, proxy rotation and retries on its side. You only send an HTTPS request with your `x-api-key` header and receive JSON.

### How much does a request cost?

Credits per call: `/v2/lenovo/product` **2**, `/v2/lenovo/search` **2**. See the [Piloterr website](https://www.piloterr.com) for plans.

### What data does the Lenovo API return?

Each endpoint returns structured JSON: **Lenovo Product** — `mpn`, `sku`, `url`, `name`, `brand`, `price`; **Lenovo Search** — `meta`, `meta.query`, `meta.current_page`, `meta.has_next_page`, `meta.total_results`, `results[]`.

### Can I target a specific country or language?

Yes, use `locale` — see the parameter tables above for accepted values.

### Which languages are supported?

Any language that can make an HTTP request. This README shows Python and TypeScript; the [`examples/`](examples) folder contains cURL, PHP, C#, Go, Java, Ruby and Node.js.

## Related scrapers

- [About You Scraper API](https://github.com/piloterr/aboutyou-scraper)
- [Action Scraper API](https://github.com/piloterr/action-scraper)
- [Aldi Scraper API](https://github.com/piloterr/aldi-scraper)
- [Alibaba Scraper API](https://github.com/piloterr/alibaba-scraper)
- [AliExpress Scraper API](https://github.com/piloterr/aliexpress-scraper)
- [Allegro Scraper API](https://github.com/piloterr/allegro-scraper)
- [All Piloterr scrapers on GitHub](https://github.com/piloterr)

## Support

- 💬 Join the [Piloterr Discord](https://discord.gg/CFj3ph8aHU) to ask questions and share what you build.
- 📚 Browse the [API reference (OpenAPI)](https://app.piloterr.com/openapi) and the [Piloterr library](https://www.piloterr.com/library).
- 🔑 [Get your API key](https://app.piloterr.com).

---

<p align="center">
  <a href="https://www.piloterr.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="images/logo-dark.svg">
      <img src="images/logo.svg" alt="Piloterr" height="32">
    </picture>
  </a>
  <br>
  <sub>Built by <a href="https://www.piloterr.com">Piloterr</a> — web scraping APIs for e-commerce, search, real estate and more, one API key.</sub>
</p>

<sub>Lenovo is a trademark of its respective owner. This repository is not affiliated with or endorsed by Lenovo. Examples are released under the MIT license.</sub>
