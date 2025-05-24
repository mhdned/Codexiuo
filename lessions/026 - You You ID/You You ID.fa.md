# ‌ID شما

## 🌀 UUID چیه اصلاً؟

🔹 **UUID** مخفف **Universally Unique Identifier**  
🔸 یه شناسه‌ی جهانی و یکتاست (به‌طور استاندارد 128 بیت / 16 بایت).  
🔸 معمولاً شبیه اینه:

```

550e8400-e29b-41d4-a716-446655440000

```

---

## ⚡ Auto Increment چیه؟

🔹 همون ID ترتیبی معروف!  
🔸 دیتابیس خودش مقدارشو افزایش میده (۱، ۲، ۳، ...).  
🔸 ساده و سریع واسه دیتابیسای کوچیک!

---

## 🎯 مقایسه سریع:

| ویژگی               | Auto Increment       | UUID                             |
| ------------------- | -------------------- | -------------------------------- |
| **سایز**            | 4 یا 8 بایت          | 16 بایت (باینری) / 36 بایت (متن) |
| **Performance**     | ⚡ عالی و سریع       | 🐌 کمی کندتر                     |
| **ترتیب index**     | ✅ مرتب و تمیز       | ❌ تصادفی (v4) / ✅ مرتب (v7)    |
| **امنیت URL**       | ❌ حدس‌زدنی          | ✅ غیرقابل حدس                   |
| **Globally Unique** | ❌ فقط تو یه دیتابیس | ✅ بله                           |
| **Merge کردن دیتا** | ❌ مشکل داره         | ✅ راحت                          |

---

## 🔥 امنیت: یه نگاه سریع

✅ **Auto Increment**:

- راحت حدس‌زدنی! (IDOR Attack)
- فقط با **Authorization** میشه امنش کرد.

✅ **UUID**:

- توی URL غیرقابل حدس.
- اما باز هم نیاز به کنترل دسترسی داره!

---

## 🚀 UUID v7 - یه انقلاب جدید!

🔹 ترکیب **Timestamp + Randomness**  
🔸 یعنی هم ترتیب insert عالیه (مثل Auto Increment)، هم globally unique.

✅ مخصوصاً خوبه وقتی:

- دیتا زیاده.
- performance دیتابیس مهمه.

---

## 💡 کجا از کدوم استفاده کنیم؟

- ✅ **Auto Increment**:  
  برای دیتابیس‌های تک‌سیستمی، ساده و سریع.

- ✅ **UUID v4**:  
  وقتی امنیت URL مهمه، یا شناسه globally unique می‌خوای.

- ✅ **UUID v7**:  
  وقتی دیتابیس بزرگه و index performance مهمه.

---

## 🔧 نمونه کد TypeScript - تولید UUID v4 و v7

```ts
import { randomUUID } from "crypto";

// 👉 تولید UUID v4 (تصادفی)
const uuidV4 = randomUUID();
console.log("UUID v4:", uuidV4);

// 👉 تولید UUID v7 (در Node 20+)
import { generateUuid } from "node:uuid";
const uuidV7 = generateUuid({ version: 7 });
console.log("UUID v7:", uuidV7);
```

---

## 💥 نتیجه‌گیری Codexiuo-طور:

🔴 اگه می‌خوای index عالی باشه و scale‌پذیری مهمه: UUID v7
🟢 اگه simplicity و کار سریع: Auto Increment
🟡 اگه فقط دنبال امنیت در URL هستی: UUID v4
⚠️ ولی حواست باشه! **Authorization مهم‌ترین چیزه!**
