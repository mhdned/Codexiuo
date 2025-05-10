# Flyweight: الگوی طراحی برای بهینه‌سازی حافظه

الگوی **Flyweight** یک الگوی طراحی ساختاری است که برای کاهش تعداد اشیاء مشابه استفاده می‌شود. این الگو زمانی مفید است که نیاز به ایجاد تعداد زیادی از اشیاء مشابه با داده‌های مشترک داشته باشید. به کمک Flyweight می‌توانیم منابع حافظه را با به اشتراک‌گذاری داده‌های مشترک صرفه‌جویی کنیم.

## ویژگی‌های Flyweight:

**اشتراک داده‌ها:** داده‌های ثابت و مشترک بین اشیاء به اشتراک گذاشته می‌شوند.

**افزایش کارایی:** برای پروژه‌های بزرگ با تعداد زیادی اشیاء مشابه، Flyweight به کاهش حافظه و افزایش کارایی کمک می‌کند.

**کاهش پیچیدگی:** به جای ایجاد اشیاء متعدد با داده‌های مشابه، فقط یک شیء برای داده‌های مشترک ساخته می‌شود.

## اجزای Flyweight:

1. **Flyweight (ابزار مشترک):** داده‌هایی که برای اشیاء مشابه به اشتراک گذاشته می‌شود.
2. **ConcreteFlyweight (ابزار خاص):** داده‌هایی که به اشیاء خاص تعلق دارند.
3. **FlyweightFactory (کارخانه Flyweight):** مسئول ساخت و مدیریت اشیاء Flyweight.

## مثال TypeScript:

در اینجا یک پیاده‌سازی ساده از الگوی Flyweight با TypeScript داریم:

```typescript
// Flyweight (Tool)
class Character {
    private sharedData: string;

    constructor(sharedData: string) {
        this.sharedData = sharedData;
    }

    public getSharedData() {
        return this.sharedData;
    }
}

// ConcreteFlyweight (Specific Tool)
class SpecificCharacter {
    private uniqueData: string;

    constructor(uniqueData: string) {
        this.uniqueData = uniqueData;
    }

    public getUniqueData() {
        return this.uniqueData;
    }
}

// FlyweightFactory (Factory)
class CharacterFactory {
    private characters: { [key: string]: Character } = {};

    public getCharacter(sharedData: string): Character {
        if (!this.characters[sharedData]) {
            this.characters[sharedData] = new Character(sharedData);
        }
        return this.characters[sharedData];
    }
}

// Client Code
const factory = new CharacterFactory();
const sharedData1 = factory.getCharacter("Red Character");
const sharedData2 = factory.getCharacter("Blue Character");

console.log(sharedData1.getSharedData()); // Red Character
console.log(sharedData2.getSharedData()); // Blue Character
‍‍‍‍
```

### توضیحات:

- در این پیاده‌سازی، `Character` داده‌های مشترک را نگهداری می‌کند که برای تمامی اشیاء مشابه به اشتراک گذاشته می‌شود.
- `SpecificCharacter` داده‌های خاص هر شیء را ذخیره می‌کند.
- `CharacterFactory` از یک شیء مشترک برای ذخیره‌سازی و مدیریت این اشیاء استفاده می‌کند، به طوری که داده‌های مشابه فقط یکبار ساخته شوند.

## مزایای Flyweight:

- **صرفه‌جویی در حافظه:** به دلیل اشتراک داده‌ها، از مصرف حافظه جلوگیری می‌شود.
- **افزایش کارایی:** اجرای سریع‌تر و کاهش زمان پردازش برای پروژه‌های بزرگ.

## معایب:

- **پیچیدگی در پیاده‌سازی:** برای استفاده از این الگو نیاز به مدیریت دقیق داده‌ها و اشیاء داریم.
- **کاهش انعطاف‌پذیری:** اگر نیاز به تغییر داده‌های مشترک داشته باشیم، ممکن است پیچیدگی بیشتری ایجاد شود.

---

به این ترتیب، Flyweight می‌تواند به شما کمک کند تا در پروژه‌های بزرگ با داده‌های مشابه، منابع سیستم را بهینه کنید و از حافظه به‌طور کارآمدتری استفاده کنید.
