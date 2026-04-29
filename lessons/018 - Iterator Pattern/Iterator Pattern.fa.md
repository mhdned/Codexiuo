# الگوی تکرارگر (Iterator)

الگوی Iterator یک الگوی رفتاری است که به شما اجازه می‌دهد عناصر یک مجموعه را یکی‌یکی و بدون افشای ساختار داخلی آن پیمایش (iterate) کنید.

## مفاهیم کلیدی

- **Iterator (تکرارگر)**: رابطی برای پیمایش عناصر.
- **ConcreteIterator (تکرارگر مشخص)**: پیاده‌سازی مشخص از تکرارگر.
- **Aggregate (مجموعه)**: رابطی برای ساخت تکرارگر.
- **ConcreteAggregate (مجموعه مشخص)**: پیاده‌سازی مجموعه که تکرارگر مخصوص خودش را تولید می‌کند.

## موارد استفاده

- زمانی که می‌خواهید بدون آشکار کردن ساختار داخلی یک مجموعه، به عناصر آن دسترسی داشته باشید.
- زمانی که می‌خواهید چند نوع پیمایش مختلف روی یک مجموعه داشته باشید (مثلاً پیمایش معکوس).

## مثال (TypeScript)

```ts
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

class NameIterator implements Iterator<string> {
  private index = 0;

  constructor(private names: string[]) {}

  next(): string | null {
    if (this.hasNext()) {
      return this.names[this.index++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.index < this.names.length;
  }
}

class NameRepository {
  private names = ["Ali", "Sara", "Reza"];

  getIterator(): Iterator<string> {
    return new NameIterator(this.names);
  }
}

// استفاده
const repository = new NameRepository();
const iterator = repository.getIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
// خروجی:
// Ali
// Sara
// Reza
```

## مزایا و معایب

**✅ مزایا:**

- جداسازی منطق پیمایش از ساختار داده.
- امکان پیمایش هم‌زمان چند مجموعه.
- امکان تعریف چند نوع پیمایش برای یک ساختار.

**❌ معایب:**

- اضافه شدن کلاس‌های اضافی.
- ممکن است ساده‌ترین حالت‌ها را پیچیده‌تر کند.
