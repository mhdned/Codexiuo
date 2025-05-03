> "وقتی ساختن یه چیزی دردسر داره، کپی بگیر و خودتو خلاص کن."

---

## 🥷 مقدمه: کپی بزن یا بساز؟

فرض کن یه ربات داری که سه روز طول می‌کشه تا بسازیش. حالا اگه بخوای یه نسخه‌ی دیگه ازش داشته باشی، چی‌کار می‌کنی؟ دوباره سه روز وقت می‌ذاری؟ یا از همون یکی کپی می‌گیری؟

Prototype Pattern می‌گه: «داداش، همون رو کلون کن، زندگیتو راحت کن.»

---

## 🧬 الگوی Prototype چیه دقیقاً؟

الگوی Prototype توی دسته‌ی "Creational Patterns" هست. کارش اینه که به‌جای ساختن اشیاء جدید با `new`، از یه نمونه‌ی آماده کپی می‌گیره. این کپی می‌تونه عین همونی باشه که داری یا یه ذره سفارشی‌شده.

---

## 🧪 یه مثال باحال با TypeScript

```ts
interface Shape {
  clone(): Shape;
}

class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  clone(): Shape {
    return new Circle(this.radius);
  }
}

const original = new Circle(42);
const ninjaClone = original.clone();

console.log(ninjaClone.radius); // 42
```

مثل نینجا از سایه دراومد و شبیه اصلش بود. ولی چون جداست، می‌تونی روش تغییرات بزنی.

---

## ⚔️ چرا کلون کنیم؟

- ساختن شیء جدید گرونه (از نظر زمان یا منابع)
- می‌خوای چند نسخه‌ی تقریباً مشابه بسازی
- دوست نداری هی `new` بزنی و کانفیگ کنی

---

## 🧱 ساختار کلی Prototype Pattern

```
📦 Prototype (interface)
 ┣━ clone(): Prototype

📦 ConcretePrototype
 ┣━ clone(): ConcretePrototype

📦 Client
 ┣━ از clone برای کپی گرفتن استفاده می‌کنه
```

---

## 🌟 مزایا

- سریع‌تر از ساخت دوباره‌ست
- پیچیدگی رو کم می‌کنه
- وابستگی به کلاس‌های زیاد رو حذف می‌کنه

## 🐛 چالش‌ها

- اگه شیءت خیلی تو در تو باشه، باید حواست به deep copy vs shallow copy باشه
- clone کردن بعضی اشیاء خودش داستان داره

---

## 📦 نتیجه‌گیری Codexiuo-style

دفعه‌ی بعد که خواستی یه چیزی بسازی، یه لحظه وایسا و فکر کن:

> "آیا می‌تونم ازش کلون بگیرم؟ یا دوباره قراره سه روز عمرم بره؟"

الگوی Prototype، نینجای مخفی دنیای شیء‌گراییه. سریع، بی‌صدا، و آماده برای خدمت.

---

### 🔗 منبع

[Refactoring Guru - Prototype Pattern](https://refactoring.guru/design-patterns/prototype/typescript/example)

---

🧠 Codexiuo همیشه در حال کلون کردن دانشه. تو هم یاد بگیر، کلون کن، حرفه‌ای شو!
