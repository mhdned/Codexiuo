# 🧩 **الگوی Composite**

فرض کن که داری یه سیستم کتابخونه طراحی می‌کنی. حالا، هر کتاب ممکنه تک‌تک باشه یا داخل یه مجموعه‌ای از کتاب‌ها باشه. اینجا از الگوی **Composite** استفاده می‌کنیم تا همه کتاب‌ها (چه تک‌تک و چه مجموعه‌ای) رو به یه شکل مدیریت کنیم. یعنی هم می‌تونیم یک کتاب رو به‌تنهایی نگاه کنیم، هم مجموعه‌ای از کتاب‌ها رو به عنوان یک واحد بزرگتر!

---

### 📚 **چی می‌خواهیم بسازیم؟**

1. **کتاب‌های تک‌تک** (مثل کتاب "A") می‌تونند مستقل باشن و عنوان خودشون رو داشته باشن.
2. **مجموعه کتاب‌ها** (مثل "کتاب‌های علمی") که می‌تونند شامل چندین کتاب باشند.
3. این الگو به ما این امکان رو می‌ده که هم کتاب‌های تک‌تک و هم مجموعه‌ها رو به عنوان یک واحد مشابه مدیریت کنیم.

---

### 💻 **کد TypeScript:**

```typescript
abstract class BookComponent {
  protected parent: BookComponent | null = null;

  public setParent(parent: BookComponent | null): void {
    this.parent = parent;
  }

  public getParent(): BookComponent | null {
    return this.parent;
  }

  public add(component: BookComponent): void {}

  public remove(component: BookComponent): void {}

  public abstract getTitle(): string;
}

class Book extends BookComponent {
  private title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }
}

class BookCollection extends BookComponent {
  private children: BookComponent[] = [];

  public add(component: BookComponent): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: BookComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
      component.setParent(null);
    }
  }

  public getTitle(): string {
    const titles = this.children.map((child) => child.getTitle());
    return `Book Collection: [${titles.join(", ")}]`;
  }
}
```

---

### 🔍 **چی شد اینجا؟**

- کتاب‌ها به صورت **Leaf** هستند. یعنی می‌تونند فقط یه عنوان ساده داشته باشن، مثل "کتاب A".
- مجموعه کتاب‌ها به صورت **Composite** هستند. این‌ها می‌تونند چندین کتاب رو در خودشون داشته باشند، مثل "کتاب‌های علمی" که شامل چندین کتاب مختلف هستند.
- در نهایت، هر دو به‌طور یکسان می‌تونند مدیریت بشند. یعنی می‌تونیم روی هر دو یک عملیات انجام بدیم بدون اینکه لازم باشه تفاوتی بین اون‌ها قائل بشیم.

---

### 💡 **چرا این الگو اینقدر باحاله؟**

الگوی **Composite** این امکان رو به ما می‌ده که همه چیز رو به یه شکل ساده و یکپارچه مدیریت کنیم. در واقع، فرقی نمی‌کنه که کتاب‌ها تک‌تک باشن یا مجموعه‌ای از کتاب‌ها، شما به راحتی می‌تونید همه‌شون رو به یه شکل واحد بررسی کنید.
