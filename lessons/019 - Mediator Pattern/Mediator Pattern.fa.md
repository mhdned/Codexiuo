# الگوی میانجی (Mediator)

الگوی میانجی یک الگوی رفتاری است که ارتباط بین اشیاء را به یک شیء مرکزی منتقل می‌کند. این الگو باعث کاهش وابستگی مستقیم بین کلاس‌ها می‌شود و ارتباطات پیچیده را ساده‌تر مدیریت می‌کند.

## مفاهیم کلیدی

- **Mediator (میانجی)**: رابطی برای برقراری ارتباط بین اجزاء مختلف.
- **ConcreteMediator (میانجی مشخص)**: پیاده‌سازی واقعی میانجی که ارتباطات را مدیریت می‌کند.
- **Component (جزء)**: کلاس‌هایی که با هم ارتباط دارند اما از طریق میانجی این کار را انجام می‌دهند.
- **ConcreteComponent (جزء مشخص)**: کلاس‌هایی که به جای ارتباط مستقیم با یکدیگر، فقط با میانجی صحبت می‌کنند.

## موارد استفاده

- وقتی کلاس‌های زیادی باید با یکدیگر تعامل داشته باشند.
- برای جلوگیری از ارتباط مستقیم بین کلاس‌ها و کاهش وابستگی‌ها.
- برای ساده‌سازی کدهایی که رفتارهای ترکیبی زیادی دارند.

## مثال (TypeScript)

```ts
interface Mediator {
  notify(sender: Component, event: string): void;
}

class Component {
  constructor(protected mediator: Mediator) {}
}

class Button extends Component {
  click() {
    console.log("دکمه کلیک شد");
    this.mediator.notify(this, "click");
  }
}

class TextBox extends Component {
  setText(text: string) {
    console.log(`متن تنظیم شد: ${text}`);
  }

  clear() {
    console.log("متن پاک شد");
  }
}

class AppDialog implements Mediator {
  private button: Button;
  private textBox: TextBox;

  constructor() {
    this.textBox = new TextBox(this);
    this.button = new Button(this);
  }

  notify(sender: Component, event: string): void {
    if (sender instanceof Button && event === "click") {
      this.textBox.clear();
    }
  }

  getUI() {
    return {
      button: this.button,
      textBox: this.textBox,
    };
  }
}

// استفاده
const dialog = new AppDialog();
const { button } = dialog.getUI();
button.click();
// خروجی:
// دکمه کلیک شد
// متن پاک شد
```

## مزایا و معایب

**✅ مزایا:**

- کاهش وابستگی بین اجزاء.
- تسهیل نگهداری و توسعه سیستم‌های پیچیده.
- امکان کنترل متمرکز روی تعاملات.

**❌ معایب:**

- پیچیدگی در پیاده‌سازی میانجی مرکزی.
- ممکن است میانجی به یک "خدای همه‌چیزدان" تبدیل شود.
