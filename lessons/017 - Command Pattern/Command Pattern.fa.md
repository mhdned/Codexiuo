# الگوی فرمان (Command)

الگوی Command یک الگوی رفتاری است که درخواست را به یک شیء مستقل تبدیل می‌کند که شامل تمام اطلاعات لازم برای انجام آن درخواست است. این ویژگی باعث می‌شود بتوان درخواست‌ها را صف‌بندی، به تعویق انداخت یا عملیات بازگشت‌پذیر (Undo) را پیاده‌سازی کرد.

## مفاهیم کلیدی

- **Command (فرمان)**: یک رابط برای اجرای یک دستور.
- **ConcreteCommand (فرمان مشخص)**: پیاده‌سازی فرمان و اتصال گیرنده (Receiver) به یک عمل خاص.
- **Receiver (گیرنده)**: کسی که می‌داند چطور عملیات را انجام دهد.
- **Invoker (فراخواننده)**: کسی که فرمان را اجرا می‌کند.
- **Client (مشتری)**: کسی که فرمان‌ها را می‌سازد و به فراخواننده می‌دهد.

## موارد استفاده

- اگر نیاز به صف‌بندی یا به تعویق انداختن درخواست‌ها دارید.
- اگر می‌خواهید کلاس‌هایی که درخواست را ارسال می‌کنند از آن‌هایی که اجرا می‌کنند جدا کنید.

## مثال (TypeScript)

```ts
interface Command {
  execute(): void;
}

class Light {
  turnOn() {
    console.log("چراغ روشن شد");
  }

  turnOff() {
    console.log("چراغ خاموش شد");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}

class RemoteControl {
  private command!: Command;

  setCommand(command: Command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}

// استفاده
const light = new Light();
const lightOn = new LightOnCommand(light);
const remote = new RemoteControl();

remote.setCommand(lightOn);
remote.pressButton(); // خروجی: چراغ روشن شد
```

## مزایا و معایب

**✅ مزایا:**

- جدا کردن فرستنده از گیرنده.
- مناسب برای Undo/Redo.
- امکان ساخت ماکرو فرمان‌ها.

**❌ معایب:**

- ممکن است تعداد زیادی کلاس فرمان ایجاد شود.
