# 🎯 SSRF — Server-Side Request Forgery

### What is it?

- When the server itself (not the browser!) takes a user-supplied HTTP request or URL and **fetches** that URL.
- An attacker can trick the server into sending requests to other places (like localhost, internal services, or AWS endpoints).

---

### 💥 How does it happen?

1️⃣ You have an app that takes a user-supplied URL (like an API for data fetching or screenshots).
2️⃣ The attacker sends a malicious URL:

- Internal addresses: `http://127.0.0.1:8080/admin`
- Metadata endpoints (AWS): `http://169.254.169.254/latest/meta-data/`

3️⃣ The server, without validating the URL, sends the request and returns the response to the attacker.

---

### 🚧 How to prevent it?

✅ **Validate and restrict URLs**

- Only allow whitelisted domains.
- Check that the destination IP is not local or private.

✅ **Resolve the IP**
Before sending the request, resolve the IP and reject it if it’s private.

✅ **Use secure libraries**
Use trusted tools like [got-scraping](https://github.com/apify/got-scraping) or axios with extra URL validation.

✅ **Set request timeouts and size limits**
Limit the size and duration of requests (so attackers can’t overload you with big requests).

---

### 🚀 Code Example — Express

```javascript
const express = require("express");
const dns = require("dns").promises;
const axios = require("axios");
const app = express();

app.get("/fetch", async (req, res) => {
  const { url } = req.query;

  try {
    // Validate URL
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Resolve IP and check for private ranges
    const addresses = await dns.lookup(hostname);
    const ip = addresses.address;

    if (
      ip.startsWith("127.") ||
      ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.")
    ) {
      return res.status(400).send("Private IPs are not allowed!");
    }

    // Secure request
    const response = await axios.get(url, { timeout: 5000 });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(3000, () => console.log("Running on 3000"));
```

---

### 🚀 Code Example — Nest.js

```typescript
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { lookup } from "dns/promises";

@Controller("fetch")
export class FetchController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async fetch(@Query("url") url: string) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      // Resolve IP and check for private ranges
      const { address } = await lookup(hostname);
      if (
        address.startsWith("127.") ||
        address.startsWith("10.") ||
        address.startsWith("192.168.") ||
        address.startsWith("172.")
      ) {
        throw new BadRequestException("Private IPs are not allowed!");
      }

      const { data } = await firstValueFrom(
        this.httpService.get(url, { timeout: 5000 })
      );
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
```

---

### 📝 Summary — Codexiuo Key Takeaways

✅ SSRF means an attacker uses your server as a **proxy** to access things they shouldn’t.
✅ The danger is because the server has more access: internal resources, metadata, private networks.
✅ Prevention:

- Validate URLs (limit to allowed domains)
- Resolve and reject private IPs
- Set timeouts and size limits
- Use trusted libraries for HTTP requests
