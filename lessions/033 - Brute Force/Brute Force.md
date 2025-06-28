# 🔐 Brute Force

> A Codexiuo chapter for Express/TS developers who either guard their keys with pride or tragically leak them with flair!

---

## 🧨 Part 1: Brute Force — The Digital Muscle Attack

### 💣 What Is It?

An attack where the hacker keeps guessing passwords or tokens until something finally works. Think of it as “password smashing” — with a CPU instead of a hammer.

---

### 🧯 Countermeasures:

#### 1. **Rate Limiting**

Limit the number of login attempts per time window:

```ts
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many attempts. Take a break, buddy.",
});
```

#### 2. **Delay on Fail**

Add delay after failed attempts to slow brute force down:

```ts
const failedAttempts: Record<string, number> = {};
await new Promise((r) => setTimeout(r, delayBasedOnFailures(ip)));
```

#### 3. **Captcha**

Use Google reCAPTCHA (or similar) to block bots.

#### 4. **Account Lock**

Lock user account after several failed login attempts.

#### 5. **Logging Suspicious Activity**

Track and log IPs that fail too often for later review or blacklisting.

---

## 🔐 Part 2: JWT Key Leakage — When the Lock’s Gone, So Is the Door

### 😰 What Happens If Your JWT Secret or Private Key Leaks?

| Issue                    | Consequence                    |
| ------------------------ | ------------------------------ |
| Token Forgery            | Attacker can impersonate admin |
| Identity Spoofing        | Full impersonation             |
| Unlimited Token Lifetime | Infinite access                |
| Auth Bypass              | Without a valid password       |

---

### ✅ Prevention Tips:

- Use secure storage (`.env`, Secret Manager, etc.)
- Prefer asymmetric algorithms (`RS256` > `HS256`)
- Never hardcode secrets in your codebase
- Rotate keys periodically
- Never log tokens or private keys

---

## 🧬 Part 3: JWT `kid` — The Helpful Kid That Can Also Open Backdoors

### 🔍 What’s `kid`?

A field in the JWT header that tells the server **which key to use** for verifying the token signature.

### ⚠️ Common Vulnerabilities:

- **Key Confusion**: Using the wrong key
- **File Path Injection**: Loading keys from arbitrary locations
- **Algorithm Confusion**: Letting attackers use `alg: none` for unsigned tokens

---

### ✅ Secure Usage Example:

```ts
const allowedKids = ["key-2024-a", "key-2025-b"];
const kid = decoded?.header?.kid;

if (!allowedKids.includes(kid)) throw new Error("Invalid kid");
const key = keyMap[kid];
jwt.verify(token, key);
```

---

### 💡 Pro Tip:

Use **JWKS (JSON Web Key Set)** for scalable and secure public key management in distributed systems.

---

## 🧪 TL;DR – Codexiuo’s Secure Summary

| Threat          | Codexiuo Defense                                     |
| --------------- | ---------------------------------------------------- |
| Brute Force     | Rate limiting, delay, captcha, account locking       |
| JWT Key Leakage | Secret manager, RS256, key rotation                  |
| `kid` Misuse    | Whitelist + static key map + no dynamic file loading |
| Token Injection | Reject `alg: none`, avoid logging sensitive tokens   |

---

## ✨ Codexiuo's Final Mantra:

> **"Keep your admin key deep in a vault, and let the kid key only knock on the door."** 🔑🏠
