# 🎯 SSRF — Server-Side Request Forgery

### چی هست؟

- وقتی سرور درخواست HTTP یا URLای رو می‌گیره و **خودش** (نه مرورگر) می‌ره اون URL رو باز می‌کنه.
- هکر URLی می‌فرسته که باعث میشه سرور به جاهای دیگه (لوکال‌ هاست، سرورهای داخلی، endpointهای AWS) درخواست بفرسته.

---

### 💥 چطور انجام میشه؟

1️⃣ برنامه‌ای داری که کاربر URL می‌ده (مثلا API برای فچ کردن دیتا یا گرفتن اسکرین‌شات).
2️⃣ هکر URL مخرب میده:

- آدرس‌های داخلی: `http://127.0.0.1:8080/admin`
- آدرس‌های متادیتا (AWS): `http://169.254.169.254/latest/meta-data/`
  3️⃣ سرور، بدون بررسی URL، درخواست رو می‌فرسته و جواب رو به هکر میده.

---

### 🚧 چطور جلوش رو بگیریم؟

✅ **اعتبارسنجی و محدودسازی URL**

- فقط دامین‌های مجاز (مثلا دامین whitelisted).
- بررسی کن که IP مقصد لوکال یا خصوصی (private) نباشه.

✅ **resolve کردن IP**
قبل از درخواست، IP رو resolve کن و اگه private بود، reject کن.

✅ **کتابخونه‌های امن**
از ابزارهایی مثل [got-scraping](https://github.com/apify/got-scraping) یا axios به همراه validate URL استفاده کن.

✅ **زمان و حجم درخواست**
timeout و size limit بذار (هکر نتونه درخواست‌های حجیم بفرسته).

---

### 🚀 مثال کد — Express

```javascript
const express = require("express");
const dns = require("dns").promises;
const axios = require("axios");
const app = express();

app.get("/fetch", async (req, res) => {
  const { url } = req.query;

  try {
    // بررسی URL
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // resolve کن ببین private یا local نباشه
    const addresses = await dns.lookup(hostname);
    const ip = addresses.address;

    // reject private IPs
    if (
      ip.startsWith("127.") ||
      ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.")
    ) {
      return res.status(400).send("Private IPs are not allowed!");
    }

    // درخواست امن
    const response = await axios.get(url, { timeout: 5000 });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(3000, () => console.log("Running on 3000"));
```

---

### 🚀 مثال کد — Nest.js

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

      // resolve کن IP رو
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

### 📝 جمع بندی — نکات Codexiuo

✅ SSRF یعنی هکر از سرور **به‌عنوان پراکسی** استفاده می‌کنه تا به منابعی که نباید، دسترسی پیدا کنه.

✅ خطرش به خاطر **دسترسی‌های بیشتر** سروره: منابع داخلی، متادیتا، شبکه‌های خصوصی.

✅ جلوگیری:

- validate URL (محدود به دامنه‌های مجاز)
- resolve و reject IPهای داخلی
- timeout و محدودیت سایز درخواست
- ابزارهای امن و معتبر برای HTTP درخواست‌ها
