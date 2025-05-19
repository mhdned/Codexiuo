# Strategy: استراتژی یعنی نه به if های بی‌پایان

> «اگه برنامه‌ات پر از `if-else` ـه، شاید وقتشه بری با Strategy یه قهوه بزنی.»

---

## 🧠 الگو چیه اصلاً؟

الگوی **Strategy** از اون دسته الگوهای رفتاریه که میاد میگه:

> آقا جان، اگه یه کلاس داری که چند مدل رفتار (مثلاً الگوریتم یا عملکرد) داره و برای هرکدومش شرط گذاشتی، بیخیال! اینا رو بکن بیرون، بریز تو کلاس‌های جداگونه، بعد هر وقت یکی‌شو خواستی، بده دست کلاس اصلی.

ترجمه فنی‌ترش:

> Strategy یعنی جدا کردن الگوریتم‌ها در کلاس‌های مستقل و تزریق اونا به کلاس اصلی، برای تغییر رفتار در زمان اجرا.

---

## 💡 سناریوی کلاسیک

فرض کن یه برنامه فشرده‌سازی فایل داری که از ZIP، RAR، و 7z پشتیبانی می‌کنه.

### حالت زشت و شرط‌زده:

```ts
if (format === "zip") {
  compressWithZip();
} else if (format === "rar") {
  compressWithRar();
} else if (format === "7z") {
  compressWith7z();
}
```

خودت خسته نشدی از این شرط‌چینی؟

---

## ✅ Strategy to the rescue!

### اول: یه اینترفیس برای استراتژی‌ها می‌سازیم

```ts
interface CompressionStrategy {
  compress(file: File): void;
}
```

### بعد: الگوریتم‌ها رو جدا جدا پیاده می‌کنیم

```ts
class ZipCompression implements CompressionStrategy {
  compress(file: File): void {
    console.log("Compressing with ZIP");
  }
}

class RarCompression implements CompressionStrategy {
  compress(file: File): void {
    console.log("Compressing with RAR");
  }
}
```

### بعد: یه کلاس اصلی که استراتژی رو می‌گیره

```ts
class Compressor {
  constructor(private strategy: CompressionStrategy) {}

  compress(file: File): void {
    this.strategy.compress(file);
  }
}
```

### و استفاده:

```ts
const compressor = new Compressor(new ZipCompression());
compressor.compress(myFile);
```

حالا راحت می‌تونی تو زمان اجرا، هر استراتژی‌ای که خواستی رو بندازی توش!

---

## ⚖️ مزایا و معایب

### ✅ مزایا:

- حذف شرط‌های if-else مسموم‌کننده
- رعایت اصل Open/Closed (کد قدیمی رو دست نمی‌زنیم)
- اضافه کردن الگوریتم‌های جدید = راحت‌تر از ساختن نودل با آب جوش

### ❌ معایب:

- تعداد کلاس‌ها زیاد می‌شه (ولی به‌جاش تمیزه)
- واسه رفتارهای خیلی ساده، ممکنه زیادی رسمی بازی دربیاریم

---

## 🧠 یادمون باشه

وقتی دیدی یه کلاس داره زیادی مسئولیت می‌گیره و پر از شرط‌هاییه که سعی می‌کنن رفتارها رو از هم جدا کنن، یه Strategy بهش بده که حال کنه.

---

## 🔗 منبع

رفرکتورینگ گورو (رفیق همیشگی):
[https://refactoring.guru/design-patterns/strategy](https://refactoring.guru/design-patterns/strategy)
