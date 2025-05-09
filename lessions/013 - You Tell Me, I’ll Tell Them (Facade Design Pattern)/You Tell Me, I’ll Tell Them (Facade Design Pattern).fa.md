# به من بگو،‌ من میگم بهشون (Facade Design Pattern)

یه روز یه برنامه‌نویس خسته از شلوغی دنیا تصمیم گرفت یه سری از سرویس‌ها رو صدا بزنه. دید که باید به هر کدوم جدا جدا سلام بده، ازشون خواهش کنه، بعد جوابشونو بگیره، بعد با اون یکی هماهنگ کنه، بعد بره چایی بریزه، بیاد دوباره ادامه بده.

گفت: "نه داداش! این چه زندگیه؟ یه آدم باید باشه که همه‌ی این کارا رو جمع کنه تو یه دکمه! یه رابط خوش‌برخورد که من فقط با اون کار کنم."

و این شد نقطه‌ی تولد **Facade Pattern**. یه رابط جمع‌وجور که پشت صحنه با چند تا کلاس و سیستم پیچیده سروکله می‌زنه، اما رو صحنه فقط یه دکمه خوشگل بهت نشون می‌ده: "شروع کن!"

---

## 🎭 چی هست این Facade؟

Facade یا همون "نما" یه جور **wrapper** خوش‌اخلاقه که سیستم‌های بزرگ و درهم‌برهم رو پشت یه در شیک قایم می‌کنه. مشتری میاد فقط درو می‌زنه، می‌گه سلام، و بقیه‌اش رو نمی‌فهمه — چون نباید بفهمه.

---

## 🎬 یه نمایشنامه با TypeScript

```ts
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    let result = "Facade: داریم زیرسیستم‌ها رو آماده می‌کنیم:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade: حالا اجراشون می‌کنیم:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: من آماده‌ام!\n";
  }
  public operationN(): string {
    return "Subsystem1: بزن بریم!\n";
  }
}

class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: منم آماده‌ام!\n";
  }
  public operationZ(): string {
    return "Subsystem2: شلیک کن!\n";
  }
}

function clientCode(facade: Facade) {
  console.log(facade.operation());
}

// بیا اجرا کنیم
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```

---

## 🪄 خروجی‌ای که می‌بینی:

```
Facade: داریم زیرسیستم‌ها رو آماده می‌کنیم:
Subsystem1: من آماده‌ام!
Subsystem2: منم آماده‌ام!
Facade: حالا اجراشون می‌کنیم:
Subsystem1: بزن بریم!
Subsystem2: شلیک کن!
```

---

## 🧠 چرا باید ازش استفاده کنی؟

- چون دیگه نمی‌خوای با همه کلاس‌ها مستقیم حرف بزنی. (سرت شلوغه!)
- چون می‌خوای کدت خواناتر و منظم‌تر باشه.
- چون اینجوری راحت‌تر می‌تونی تغییر بدی بدون اینکه همه‌چی بریزه بهم.

---

## 📎 یادداشت آخر از codexiuo

> **Facade** مثل مسئول پذیرش تو یه شرکت بزرگه. تو فقط می‌ری می‌گی "می‌خوام با بخش مالی حرف بزنم"، اون خودش می‌دونه باید با کی تماس بگیره، کی بیاد، کی چایی بیاره.
>
> تو فقط لبخند بزن و بهش بگو: "شروع کن!"
