> "تو هر دهکده فقط یه کدخدا هست. Singleton هم کدخدای کدهاست."

---

## 🧙 مقدمه: یکی برای همه

تا حالا شده یه کلاس بسازی که فقط باید یه نمونه ازش وجود داشته باشه؟ مثلا تنظیمات برنامه، اتصال به دیتابیس، یا یه لاگر؟ این‌جاست که Singleton وارد میشه.

الگوی Singleton می‌گه: «فقط یکی! نه بیشتر.»

---

## 🧩 Singleton چیه؟

Singleton یه **الگوی طراحی Creational** هست که مطمئن میشه فقط یه نمونه از یه کلاس ساخته میشه و همه جا از همون استفاده میشه.

---

## 🔧 پیاده‌سازی Singleton توی TypeScript

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Creating new instance...");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public log(message: string) {
    console.log(`[Singleton]: ${message}`);
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();

a.log("Hello from A");
b.log("Hello from B");

console.log(a === b); // true
```

حتی اگه دو بار `getInstance()` صدا بزنی، فقط یکی ساخته میشه. همه به همون یکی وصل می‌شن.

---

## ⚙️ چرا Singleton؟

- مدیریت منابع مشترک (مثل اتصال دیتابیس)
- حفظ وضعیت سراسری (global state)
- اطمینان از یکتایی یک کلاس در سراسر برنامه

---

## ❗ چالش‌ها

- سختی تست‌نویسی (چون global state داریم)
- وابستگی زیاد به Singleton = coupling بالا
- بعضی جاها ممکنه حس بشه anti-pattern هست

---

## 🏛️ ساختار کلی

```
📦 Singleton
 ┣━ private constructor()
 ┣━ static getInstance()
 ┣━ عملیات مختلف
```

---

## 💡 نکته Codexiuo-style

اگه هر کی تو برنامه خودش یه نسخه از تنظیمات داشته باشه، بلبشو میشه. Singleton می‌گه: «یکی بساز، همه استفاده کن.»

اما حواست باشه، نذار همه چیزتو Singleton کنی. چون اون موقع به جای نظم، می‌شی ارباب حلقه‌ها.

---

### 🔗 منبع

[Refactoring Guru - Singleton Pattern](https://refactoring.guru/design-patterns/singleton/typescript/example)

---

🧠 Codexiuo فقط یه نسخه داره... ولی همیشه آماده یاد دادنه!
