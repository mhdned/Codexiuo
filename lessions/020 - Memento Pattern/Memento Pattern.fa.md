# الگوی یادمان (Memento)

الگوی Memento یک الگوی رفتاری است که امکان ذخیره و بازیابی وضعیت قبلی یک شی را بدون فاش کردن جزئیات پیاده‌سازی آن فراهم می‌کند. این الگو معمولاً برای پیاده‌سازی "undo/redo" در برنامه‌ها استفاده می‌شود.

## مفاهیم کلیدی

- **Memento (یادمان)**: شی‌ای که وضعیت داخلی یک شی دیگر را ذخیره می‌کند.
- **Originator (مبدأ)**: شی‌ای که وضعیتش باید ذخیره یا بازیابی شود.
- **Caretaker (نگهدارنده)**: مسئول نگهداری از یادمان‌ها بدون دستکاری محتویات آن‌ها.

## موارد استفاده

- زمانی که نیاز به ذخیره‌سازی و بازیابی حالت اشیاء وجود دارد.
- در پیاده‌سازی سیستم‌هایی با قابلیت undo و redo.
- برای جلوگیری از دسترسی مستقیم به وضعیت داخلی اشیاء توسط دیگر کلاس‌ها.

## مثال (TypeScript)

```ts
class Memento {
  constructor(public readonly state: string) {}
}

class Originator {
  private state: string = "";

  setState(state: string) {
    console.log(`تنظیم وضعیت: ${state}`);
    this.state = state;
  }

  save(): Memento {
    console.log("ذخیره وضعیت");
    return new Memento(this.state);
  }

  restore(memento: Memento) {
    this.state = memento.state;
    console.log(`بازگردانی وضعیت به: ${this.state}`);
  }
}

class Caretaker {
  private history: Memento[] = [];

  constructor(private originator: Originator) {}

  backup() {
    this.history.push(this.originator.save());
  }

  undo() {
    const memento = this.history.pop();
    if (memento) {
      this.originator.restore(memento);
    }
  }
}

// استفاده
const originator = new Originator();
const caretaker = new Caretaker(originator);

originator.setState("وضعیت 1");
caretaker.backup();

originator.setState("وضعیت 2");
caretaker.backup();

originator.setState("وضعیت 3");

caretaker.undo(); // بازگشت به وضعیت 2
caretaker.undo(); // بازگشت به وضعیت 1
```

## مزایا و معایب

**✅ مزایا:**

- جداسازی وضعیت داخلی از سایر کلاس‌ها.
- قابلیت undo/redo بدون افشای پیاده‌سازی داخلی.

**❌ معایب:**

- استفاده زیاد از حافظه اگر ممنتوها بزرگ یا زیاد باشند.
- نگهداری و مدیریت تاریخچه ممکن است پیچیده شود.
