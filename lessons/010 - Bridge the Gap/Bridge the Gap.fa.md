## 🧱 Bridge Design Pattern — پل میان Abstraction و Implementation

### 💡 ایده اصلی:

به‌جای اینکه abstraction (مثلاً کنترل‌های UI) و implementation (مثلاً سیستم‌های مختلف رندر یا پلتفرم‌ها) رو به‌صورت سخت به هم متصل کنیم، این دو رو از هم جدا می‌کنیم تا مستقل توسعه پیدا کنن و ترکیب‌پذیر باشن.

---

## 📁 ساختار پروژه

فرض کن ما یه اپلیکیشن داریم که می‌تونه انواع مختلف **پیام‌رسان‌ها** (SMS، Email، Slack) رو با انواع مختلف **پلتفرم‌ها** (ویندوز، لینوکس، موبایل) ترکیب کنه. Bridge اینجا کمک می‌کنه که بدون اضافه کردن کلاس‌های زیاد برای هر ترکیب ممکن، سیستم رو توسعه بدیم.

---

## 📦 مثال TypeScript از Bridge Pattern

### 1. `MessageSender` (Implementation interface)

```ts
export interface MessageSender {
  sendMessage(message: string): void;
}
```

### 2. `EmailSender`، `SMSSender` و `SlackSender` (Concrete Implementations)

```ts
export class EmailSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`Email sent: ${message}`);
  }
}

export class SMSSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`SMS sent: ${message}`);
  }
}

export class SlackSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`Slack message: ${message}`);
  }
}
```

### 3. `Notification` (Abstraction)

```ts
export class Notification {
  constructor(protected sender: MessageSender) {}

  notify(message: string): void {
    this.sender.sendMessage(message);
  }
}
```

### 4. `UrgentNotification` (Extended Abstraction)

```ts
export class UrgentNotification extends Notification {
  notify(message: string): void {
    console.log("!!! URGENT !!!");
    this.sender.sendMessage(`[URGENT] ${message}`);
  }
}
```

---

## ✅ استفاده:

```ts
const emailSender = new EmailSender();
const smsSender = new SMSSender();

const normalNotification = new Notification(emailSender);
normalNotification.notify("Hello via email.");

const urgentNotification = new UrgentNotification(smsSender);
urgentNotification.notify("This is a critical alert!");
```

---

## 🧠 نکات مهم:

- اگر ۳ نوع پیام‌رسان و ۳ نوع نوع پیام (normal، urgent، scheduled) داشته باشی، به‌جای ۹ کلاس مختلف فقط ۳+۳ کلاس داری.
- توسعه‌دهنده می‌تونه مستقل پیاده‌سازی‌های جدید اضافه کنه بدون دست زدن به abstraction یا بالعکس.
