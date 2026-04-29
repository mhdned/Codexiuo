# 🧙‍♂️ Chain of Responsibility – زنجیره مسئولیت

> یه الگوی رفتاریه که به ما اجازه می‌ده درخواست‌ها رو از طریق یک زنجیره از handlerها (یا مسئول‌ها) ارسال کنیم تا یکی‌شون بالاخره جواب بده یا همه ردش کنن.

### 📦 مثال روزمره

فرض کن داری میری مرخصی بگیری:

1. اول درخواستت می‌ره پیش تیم‌لید.
2. اگه قبول نکرد یا صلاحیت نداشت، می‌ره پیش مدیر پروژه.
3. بعد می‌ره پیش منابع انسانی.

همه این‌ها عضو یه زنجیره هستن و هر کدوم ممکنه درخواستت رو بررسی و پاسخ بدن یا بندازن گردن بعدی.

---

### ⚙️ ساختار کد (TypeScript نسخه خفن)

```ts
abstract class Handler {
  protected next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.next) {
      return this.next.handle(request);
    }
    return null;
  }
}

class TeamLead extends Handler {
  handle(request: string): string | null {
    if (request === "small-leave") {
      return "TeamLead approved the leave.";
    }
    return super.handle(request);
  }
}

class Manager extends Handler {
  handle(request: string): string | null {
    if (request === "long-leave") {
      return "Manager approved the leave.";
    }
    return super.handle(request);
  }
}

class HR extends Handler {
  handle(request: string): string | null {
    if (request === "resignation") {
      return "HR approved the resignation.";
    }
    return super.handle(request);
  }
}

// زنجیره رو بسازیم:
const teamLead = new TeamLead();
const manager = new Manager();
const hr = new HR();

teamLead.setNext(manager).setNext(hr);

// امتحان:
console.log(teamLead.handle("long-leave")); // Manager approved the leave.
console.log(teamLead.handle("resignation")); // HR approved the resignation.
console.log(teamLead.handle("vacation")); // null
```

---

### 🔥 چه موقع استفاده کنیم؟

- وقتی چندین کلاس یا آبجکت هستن که می‌تونن یه درخواست رو پردازش کنن.
- می‌خوای مسئولیت‌ها رو از هم جدا نگه داری.
- نمی‌خوای کدات پر از شرط‌های if-else بشه.

---

### 🧠 مزایا

✅ کاهش وابستگی بین درخواست‌دهنده و پردازش‌کننده
✅ افزودن handler جدید بدون تغییر کدهای قبلی
✅ خوانایی بهتر نسبت به if-else تو در تو

### ⚠️ معایب

❌ ممکنه درخواست تا آخر زنجیره بره و کسی رسیدگی نکنه
❌ دیباگ کردن ممکنه سخت باشه وقتی زنجیره بلنده

---

### 😎 نمونه واقعی در دنیای برنامه‌نویسی

- Middlewareها در Express.js دقیقا همین الگو هستن!
- Event Bubbling در DOM جاوااسکریپت هم یه جور Chain of Responsibility هست.
- Validation pipelineها توی NestJS هم همینطور.
