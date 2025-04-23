# 🏭 کارخانه‌ی فابریک: Abstract Factory در TypeScript

> از سری: Design Patterns برای آدمیزادها

---

## 🎬 مقدمه‌طور

فرض کن داری یه اپ می‌سازی که هم توی ویندوز اجرا می‌شه، هم روی مک.  
حالا باید برای هر سیستم‌عامل، یه سری دکمه و چک‌باکس مخصوص خودش رو نمایش بدی.

یعنی اگه اپ روی ویندوز باز شد، دکمه‌هاش ویندوزی باشن، روی مک، مک‌گونه! 🍏

اینجاست که **Abstract Factory** میاد وسط و با یه لحن خاص می‌گه:

> رفیق، بیا همه‌چی رو بده به من.  
> من می‌دونم چه دکمه و چک‌باکسی برای کجا لازمه! 😎

---

## 🧱 مرحله 1: Interfaces

اول با هم یه سری **interface** می‌سازیم که بگن هر دکمه و چک‌باکس باید چی بلد باشه.

```ts
interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}
```

---

## 🎨 مرحله 2: نسخه‌ی ویندوزی

```ts
class WindowsButton implements Button {
  paint(): void {
    console.log("🎨 Windows Button Rendered");
  }
}

class WindowsCheckbox implements Checkbox {
  paint(): void {
    console.log("☑️ Windows Checkbox Rendered");
  }
}
```

---

## 🍏 مرحله 3: نسخه‌ی مک‌اوسی

```ts
class MacButton implements Button {
  paint(): void {
    console.log("🎨 Mac Button Rendered");
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("☑️ Mac Checkbox Rendered");
  }
}
```

---

## 🏭 مرحله 4: کارخانه‌ی اصلی

یه interface می‌سازیم برای **کارخانه‌ی UI** که بگه چی قراره بسازه:

```ts
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}
```

---

## 🛠️ مرحله 5: کارخانه‌های تخصصی

```ts
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}
```

---

## 🧪 مرحله 6: خود اپلیکیشن

اپلیکیشن از هیچ نوع خاصی خبر نداره! فقط با یه کارخانه کار می‌کنه.

```ts
class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}
```

---

## 🕹️ مرحله نهایی: انتخاب پلتفرم

```ts
function getFactory(): GUIFactory {
  const os = prompt("Enter OS (mac/windows)");

  if (os === "mac") {
    return new MacFactory();
  } else {
    return new WindowsFactory();
  }
}

const factory = getFactory();
const app = new Application(factory);
app.paint();
```

---

## 🧠 نتیجه اخلاقی

- Abstract Factory یعنی ساختن **چند شیء مرتبط** از یک خانواده.
- این‌طوری سیستم ما می‌تونه بدون تغییر در منطق اصلی، UI مناسب سیستم رو بسازه.
- خداحافظ `if-else` های درهم برهم 👋

---

## 🧁 نکته‌ی کافه‌ای Codexiuo

> هر وقت یه سری چیز رو خواستی با هم تولید کنی (مثل کیت کامل UI)، بدون که Abstract Factory یه راه باکلاسه برای این کاره.

---

اگه حال کردی، برو به [Factory Method](./../004%20-%20Factory%20DP/) هم یه سر بزن. اون داداش کوچک‌تر این پترنه.

---

با احترام  
☕ Codexiuo's Orderly Chaos™
