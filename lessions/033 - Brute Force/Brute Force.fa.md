# 🔐 Brute Force

> نسخه‌ای از Codexiuo برای برنامه‌نویسان Express/TS که یا محافظ میان یا لو رفتن کلیداشون رو با آب و تاب می‌بینن!

---

## 🧨 بخش اول: حمله Brute Force — زور بازوی دیجیتال!

### 💣 چی هست؟

حمله‌ای که در اون مهاجم سعی می‌کنه با امتحان کردن تعداد زیادی رمز عبور یا توکن، وارد سیستم بشه.

### 🧯 روش‌های مقابله:

#### 1. Rate Limiting

محدود کردن تعداد تلاش‌های لاگین در بازه زمانی:

```ts
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "زیادی تلاش کردی! یه استراحتی بکن...",
});
```

#### 2. Delay on Fail

اضافه کردن تأخیر بعد از تلاش‌های ناموفق:

```ts
const failedAttempts: Record<string, number> = {};
await new Promise((r) => setTimeout(r, delayBasedOnFailures(ip)));
```

#### 3. Captcha

افزودن Google reCAPTCHA یا مشابه برای جلوگیری از ربات.

#### 4. Account Lock

قفل کردن حساب کاربری بعد از چند تلاش اشتباه.

#### 5. Logging Suspicious Activity

مانیتور کردن IPهایی که زیادی تلاش می‌کنن.

---

## 🔐 بخش دوم: JWT Key Leakage — وقتی کلید لو بره، در قفل نمی‌مونه!

### 😰 خطرات لو رفتن JWT Secret / Private Key:

| مورد                  | پیامد              |
| --------------------- | ------------------ |
| جعل توکن              | با دسترسی admin    |
| جعل هویت              | impersonation کامل |
| ایجاد توکن بدون انقضا | بی‌نهایت دسترسی    |
| دور زدن auth          | بدون حتی رمز درست  |

### ✅ روش‌های جلوگیری:

- ذخیره‌سازی امن (env, secret manager)
- استفاده از الگوریتم RSA (`RS256`) به جای `HS256`
- نذاشتن کلیدها داخل سورس‌کد
- Key Rotation دوره‌ای
- جلوگیری از log شدن Token/Key

---

## 🧬 بخش سوم: `kid` در JWT — هم کلید، هم قاتل اگه جدی نگیریش

### 🔍 `kid` چیست؟

فیلدی در هدر JWT که مشخص می‌کنه کدوم کلید باید برای verify کردن استفاده بشه.

### ⚠️ آسیب‌پذیری‌ها:

- **Key Confusion**: انتخاب کلید اشتباه
- **File Path Injection**: بارگذاری فایل‌های ناخواسته
- **Algorithm Confusion**: استفاده از `alg: none`

### ✅ روش ایمن استفاده:

```ts
const allowedKids = ["key-2024-a", "key-2025-b"];
const kid = decoded?.header?.kid;

if (!allowedKids.includes(kid)) throw new Error("Invalid kid");
const key = keyMap[kid];
jwt.verify(token, key);
```

### 💡 توصیه پیشرفته:

استفاده از JWKS برای مدیریت امن کلیدهای عمومی در سیستم‌های بزرگ.

---

## 🧪 TL;DR - جمع‌بندی امنیت Codexiuo

| خطر             | دفاع Codexiuo                                     |
| --------------- | ------------------------------------------------- |
| Brute Force     | Rate limiting, Delay, Captcha, Lock               |
| JWT Leakage     | Secret manager, RS256, Key Rotation               |
| kid Abuse       | Whitelist + Static Key Map + No dynamic file load |
| Token Injection | Reject `alg: none`, no logging tokens             |

---

## ✨ رمز نهایی Codexiuo:

> **"رمز ادمینت رو با چاه رمز نگه دار، و بچه‌کلید رو فقط به در خونت نشون بده!"** 🔑🏠
