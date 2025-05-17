# طرح مشاهده‌گر (Observer Design Pattern)

طرح مشاهده‌گر (Observer) به ما اجازه می‌دهد تا یک شیء (Subject) بتواند تغییرات خود را به چندین شیء دیگر (Observers) اطلاع دهد — بدون اینکه این اشیاء به هم وابستگی شدید داشته باشند.

## 🔧 مسئله‌ای که حل می‌کند

فرض کنید یک اپلیکیشن خبری دارید. هر زمان که یک خبر جدید منتشر می‌شود، باید:

- به کاربران ایمیل زده شود
- نوتیفیکیشن موبایل ارسال شود
- و شاید در قسمت اخبار فوری بروزرسانی انجام شود

اگر همه‌ی این‌ها را مستقیماً در کلاس خبر (NewsPublisher) پیاده‌سازی کنید، کدتان به شدت به اجزای دیگر وابسته می‌شود.

### مشکل:

- وابستگی زیاد بین اجزاء
- سخت بودن تغییر یا اضافه کردن رفتارهای جدید

## 💡 راه‌حل

مشاهده‌گرها را از کلاس اصلی جدا کنید.

- کلاس **Subject** لیستی از **Observers** نگه می‌دارد.
- هر زمان که تغییری رخ دهد، همه‌ی مشاهده‌گرها با متد `update()` خبر می‌شوند.

## 👨‍💻 پیاده‌سازی ساده در تایپ‌اسکریپت

```typescript
// اینترفیس مشاهده‌گر
interface Observer {
  update(data: string): void;
}

// کلاس Subject که مشاهده‌گرها را مدیریت می‌کند
class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: string): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// یک مشاهده‌گر مشخص
class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  update(data: string): void {
    console.log(`${this.name} دریافت کرد: ${data}`);
  }
}

// استفاده
const subject = new Subject();

const ali = new ConcreteObserver("علی");
const sara = new ConcreteObserver("سارا");

subject.subscribe(ali);
subject.subscribe(sara);

subject.notify("خبر جدید رسید!");
```

## ✅ مزایا

- کاهش وابستگی بین اجزاء
- امکان افزودن رفتارهای جدید بدون تغییر کد موجود
- افزایش انعطاف‌پذیری سیستم

## ❌ معایب

- ممکن است تعداد زیاد مشاهده‌گرها باعث کندی شود
- ممکن است دیباگ کردن سخت شود چون بروزرسانی‌ها به‌صورت پنهان اتفاق می‌افتد

## 🧩 کاربردها

- سیستم‌های اعلان (notification)
- پترن Pub/Sub در سیستم‌های توزیع‌شده
- GUI frameworks برای بروزرسانی ویجت‌ها

## 📚 منابع

- [Refactoring.Guru - Observer Pattern](https://refactoring.guru/design-patterns/observer)
