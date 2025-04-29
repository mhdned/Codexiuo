## 📄 006 - ساندویچ درست کن (با دیزاین پترن builder)

**تگ‌ها:** `#DesignPattern` `#Builder` `#TypeScript` `#GoMakeASandwich`

---

### 📌 خلاصه

> هر وقت ساختن یه چیز انقدر پیچیده شد که گفتی: «وای اصلاً نمی‌دونم از کجا شروع کنم»، بدون وقتشه که الگوی Builder وارد بشه.  
> بیلدر یعنی «بسازش قدم‌به‌قدم، ولی طوری که بتونی مدل‌های مختلف از یه چیز بسازی، بدون اینکه مغزت بترکه».

---

### 🍔 سناریو: ساختن یه ساندویچ

تصور کن رفتی یه مغازه‌ی ساندویچ‌سازی. سفارش گیرنده می‌گه:

> «چی میل دارین؟ ساندویچ ساده، مخصوص، یا سفارشی باشه؟»

تو می‌گی:

> «یه ساندویچ سفارشی می‌خوام با نون جو، فلافل، هات‌داگ، سس تند و بدون خیارشور.»

سفارش گیرنده لبخند می‌زنه و سفارش رو می‌ده به ساندویچ‌ساز حرفه‌ای که با الگوی **Builder** کار می‌کنه.

---

## 🔧 کد TypeScript - مثل همیشه، اما با سس 😋

### 🧱 مرحله اول: مدل ساندویچ

```ts
class Sandwich {
  private parts: string[] = [];

  addPart(part: string) {
    this.parts.push(part);
  }

  listParts() {
    console.log("🥪 Sandwich parts: " + this.parts.join(", "));
  }
}
```

---

### 👷‍♀️ مرحله دوم: تعریف ساندویچ‌ساز (Builder Interface)

```ts
interface SandwichBuilder {
  reset(): void;
  addBread(): void;
  addProtein(): void;
  addSauce(): void;
  addExtras(): void;
}
```

---

### 🧑‍🍳 مرحله سوم: ساندویچ‌ساز واقعی

```ts
class ClubSandwichBuilder implements SandwichBuilder {
  private sandwich: Sandwich;

  constructor() {
    this.reset();
  }

  reset() {
    this.sandwich = new Sandwich();
  }

  addBread() {
    this.sandwich.addPart("Whole Wheat Bread");
  }

  addProtein() {
    this.sandwich.addPart("Grilled Chicken");
  }

  addSauce() {
    this.sandwich.addPart("Honey Mustard");
  }

  addExtras() {
    this.sandwich.addPart("Lettuce");
    this.sandwich.addPart("Tomato");
    this.sandwich.addPart("No Pickles");
  }

  getSandwich(): Sandwich {
    const result = this.sandwich;
    this.reset();
    return result;
  }
}
```

---

### 🎬 مرحله چهارم: کارگردان ساندویچ‌سازی

```ts
class SandwichDirector {
  private builder: SandwichBuilder;

  setBuilder(builder: SandwichBuilder) {
    this.builder = builder;
  }

  makeSimpleSandwich() {
    this.builder.addBread();
    this.builder.addProtein();
  }

  makeFullSandwich() {
    this.builder.addBread();
    this.builder.addProtein();
    this.builder.addSauce();
    this.builder.addExtras();
  }
}
```

---

### 🧪 مرحله پنجم: تست - مشتری ساندویچ‌خور

```ts
const director = new SandwichDirector();
const builder = new ClubSandwichBuilder();

director.setBuilder(builder);

console.log("👉 Simple sandwich:");
director.makeSimpleSandwich();
builder.getSandwich().listParts();

console.log("\n👉 Full club sandwich:");
director.makeFullSandwich();
builder.getSandwich().listParts();

console.log("\n👉 Custom sandwich (no director):");
builder.addBread();
builder.addProtein();
builder.addExtras();
builder.getSandwich().listParts();
```

---

## 🧠 نکته‌های مهم برای لقمه‌گیرها

- **Director** رو می‌تونی داشته باشی، ولی اجباری نیست. اگه خاص‌خور هستی، سفارشی بساز.
- Builder یه الگوی عالیه برای زمانی که می‌خوای **چند مدل متفاوت از یک چیز پیچیده بسازی.**
- ساختار قابل تغییر بدون اینکه کل سیستم بریزه بهم.

---

## 📚 تو کجاها می‌تونی ازش استفاده کنی؟

- ساخت فایل PDF با امکانات مختلف (صفحه‌آرایی، تصویر، امضا)
- ساخت کوئری‌های پیچیده توی ORM
- ساخت UI گرافیکی با اجزای قابل تغییر
- و البته... ساندویچ!

---

## 🔚 نتیجه‌گیری (و یه گاز)

الگوی Builder همون آشپز حرفه‌ایه که می‌دونه چجوری از ساده‌ترین مواد، خوشمزه‌ترین چیزا رو بسازه. باهاش می‌تونی پروژه‌هاتو تمیزتر، قابل تست‌تر و قابل گسترش‌تر بسازی.
