# 🧱 الگوی Decorator به زبان ساده

وقتی یه شیء داری و می‌خوای بهش قابلیت‌هایی اضافه کنی، ولی نمی‌خوای یه کلاس جدید برای هر ترکیب ممکن بسازی، از Decorator استفاده می‌کنی.

---

### 🔧 ساختار ساده با TypeScript:

```ts
// Component interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return "Simple Coffee";
  }
}

// Decorator Base Class
class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 2;
  }

  description(): string {
    return super.description() + ", Milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 1;
  }

  description(): string {
    return super.description() + ", Sugar";
  }
}
```

---

### ☕ اجرای کد:

```ts
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // Simple Coffee, Milk, Sugar
console.log(coffee.cost()); // 5 + 2 + 1 = 8
```

---

### 💡 نکات Codexiuo‌ای:

- این الگو برای وقتی خوبه که _به صورت داینامیک_ می‌خوای ویژگی اضافه کنی.
- از inheritance خبری نیست. به جای ارث‌بری، از ترکیب (composition) استفاده شده.
- می‌تونی ده تا decorator پشت هم بذاری، فقط حواست باشه قهوه‌ت دیگه قابل شرب نباشه 😄
