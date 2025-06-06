# Proxy: به جای من برو جلو

## تعریف دوخطی

وقتی حوصله‌ نداری بری دم در، به یکی دیگه می‌گی **"برو ببین کیه"**؛ اون میشه Proxy! یعنی یه نماینده که قبل از رسیدن به اصل جنس، اول از اون رد می‌شی.

## مشکل

- یه شیء داری که دسترسی بهش سخته (مثلاً گرونه، سنگینه، خطرناکه، یا اصلاً تنبله!).
- می‌خوای یه چیزی جلودارش باشه که رفتارها رو کنترل کنه.
- لازم داری روی دسترسی به اون شیء نظارت، کش، لاگ یا محدودیت بذاری.

## راه‌حل

یه کلاس درست کن که **همون اینترفیس اصلی رو پیاده‌سازی کنه**، ولی به‌جای خودِ اصل جنس، **نماینده‌گی کنه**. بعد تصمیم بگیره که اصلاً اصل جنس لازم هست یا نه.

## انواع Proxy

- 🔐 **Protection Proxy**: فقط بعضی‌ها حق دارن اصل جنس رو ببینن.
- 🕶️ **Virtual Proxy**: اصل جنس هنوز ساخته نشده، ولی نماینده‌ش هست.
- 🧠 **Smart Proxy**: یه پروکسی باحال که لاگ می‌گیره، کش می‌کنه، یا کار اضافه انجام می‌ده.

## مثال زندگی واقعی

فرض کن دربان یه هتل جلوی در وایساده. اون تصمیم می‌گیره کی بره داخل. دربان همون Proxyـه! اصل هتل پشت دره.

## مثال کد TypeScript وار

```ts
interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  request() {
    console.log("🎯 RealSubject: کار اصلی انجام شد.");
  }
}

class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor() {
    this.realSubject = new RealSubject();
  }

  request() {
    console.log("🛂 Proxy: بررسی دسترسی...");
    // مثلاً شرط بذاریم یا لاگ بگیریم
    this.realSubject.request();
  }
}

// استفاده
const subject: Subject = new ProxySubject();
subject.request();
```

## کی استفاده کنیم؟

- وقتی می‌خوای شیء اصلی رو فقط وقتی لازم شد بسازی (lazy load)
- وقتی می‌خوای به شیء اصلی دسترسی محدود بشه (auth)
- وقتی می‌خوای کارهای جانبی (لاگ، کش) رو قبل یا بعد از اون انجام بدی

## جمله‌ی طلایی

> «Proxy یعنی یه نسخه‌ی تقلبی ولی مفید؛ یه بدل که بعضی‌وقتا از اصلش بهتره!»
