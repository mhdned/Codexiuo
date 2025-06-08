# پراکسی، دکوریتور، برادرای از پدر یکی از مادر جدا

در دنیای مدرن جاوااسکریپت و تایپ‌اسکریپت، بعضی ابزارها مثل شخصیت‌های پشت‌پرده یک نمایشنامه هستن؛ خودشون شاید تو چشم نباشن، ولی کل داستان بدون اونا نمی‌چرخه. امروز می‌خوایم سه‌تا از اینا رو بررسی کنیم: **Proxy**، **Reflect**، و **Decorator** — و ببینیم چطور توی NestJS کنار هم یه نمایش درجه‌یک اجرا می‌کنن.

---

## 🪞 Proxy و Reflect چیه اصلش؟

### Proxy

Proxy از ECMAScript 2015 (ES6) اومده و اجازه می‌ده تا رفتارهای پایه‌ای objectها مثل دسترسی به پراپرتی‌ها، set کردن، حذف و ... رو کنترل کنیم.

```ts
const target = { name: "Ali" };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`Getting ${prop}`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
});
```

### Reflect

Reflect همزمان با Proxy معرفی شد. یه API تمیز و استاندارد برای اعمال عملیات روی objectهاست که در اصل مکمل Proxy محسوب می‌شه.

```ts
Reflect.get(obj, "name");
Reflect.set(obj, "name", "Reza");
```

> 🧠 Reflect توی پشت‌صحنه کمک می‌کنه Proxyها تمیزتر کار کنن و استانداردتر بنویسیم.

---

## 🤵‍♂️ Decorator چیه و چه فرقی با Proxy داره؟

**Decorator** در تایپ‌اسکریپت یه سینتکس خاصه که برای افزودن متا-اطلاعات به کلاس‌ها، متدها و پراپرتی‌ها استفاده می‌شه. برخلاف Proxy که موقع اجرا رفتار رو تغییر می‌ده، Decorator توی زمان **تعریف** کلاس عمل می‌کنه.

```ts
function Logger(target: any) {
  console.log("Logging target:", target.name);
}

@Logger
class User {}
```

### تفاوت Proxy و Decorator

| ویژگی         | Proxy              | Decorator                |
| ------------- | ------------------ | ------------------------ |
| زمان اجرا     | Runtime            | Definition time          |
| سطح کنترل     | رفتار هر property  | متادیتا یا تزریق         |
| API استاندارد | بله (ES6)          | نه (فقط TS/experimental) |
| استفاده معمول | کنترل رفتار object | تزریق وابستگی، لاگ‌گیری  |

---

## 🔍 Deep Dive در NestJS: همه چیز زیر سر Reflect و Proxy

NestJS از Reflect و Proxy به شدت استفاده می‌کنه؛ ولی خیلی «مودب» و پنهانی. بریم ببینیم کجاها:

### 1. Dependency Injection (DI)

NestJS با استفاده از Decoratorها (`@Injectable`, `@Controller`) متادیتا ذخیره می‌کنه و بعداً با Reflect می‌خونه که چه چیزهایی باید تزریق بشن.

```ts
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}
}
```

- با `Reflect.defineMetadata()` و `Reflect.getMetadata()` اطلاعات تزریق وابستگی ذخیره و بازیابی می‌شن.

### 2. Interceptors

Interceptorها کلاس‌هایی هستن که بین Request و Response میان، و دقیقا مثل Proxy اجازه می‌دن رفتار رو قبل یا بعد از اجرای متد کنترل کنیم.

```ts
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  console.log('Before handler...');
  return next.handle().pipe(tap(() => console.log('After handler...')));
}
```

در واقع Nest پشت صحنه از Proxy استفاده می‌کنه تا handler اصلی رو wrap کنه و اجازه بده Interceptor اجرا شه.

### 3. Guards، Pipes و Filters

همه اینا از Decorator استفاده می‌کنن تا کلاس یا متد رو «علامت‌گذاری» کنن و Nest با Reflect بررسی کنه که چه چیزی باید فعال بشه.

```ts
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}
```

### 4. Routing و Handler Mapping

Nest با Decorator مثل `@Get()`، `@Post()` متادیتا می‌ذاره روی متدها، و توی زمان اجرا با Reflect اونا رو پیدا می‌کنه و route مناسب می‌سازه.

```ts
@Get('users')
findAll() {}
```

---

## 📚 جمع‌بندی: کی به درد چی می‌خوره؟

| ابزار     | به درد چی می‌خوره؟                      | کِی استفاده می‌شه؟                               |
| --------- | --------------------------------------- | ------------------------------------------------ |
| Proxy     | تغییر رفتار object در زمان اجرا         | لاگ‌گیری، validation، security, dynamic proxying |
| Reflect   | عملیات meta بر روی object/class         | خوندن و نوشتن متادیتا، ترکیب با decorator        |
| Decorator | علامت‌گذاری کلاس یا متد برای Nest یا DI | تزریق، validation، routing، interceptors         |

---

## 🧪 پایان ماجرا: پدر یکی، مادر جدا

درسته که Proxy، Reflect و Decorator هرکدوم داستان خودشون رو دارن، ولی توی NestJS همشون کنار هم کار می‌کنن تا یه سیستم پیشرفته، ماژولار و قدرتمند بسازن.

پس دفعه بعد که دیدی یه route به راحتی کار کرد، یا یه متد با تزریق اتوماتیک اجرا شد، یادت باشه پشت پرده یه سری آدم‌زرنگ (Proxy و Reflect و Decorator) داشتن زحمت می‌کشیدن 😄

---

🧵 اگه دوست داشتی این مفاهیمو عمیق‌تر یاد بگیری یا یه نمونه کد واقعی‌تر با Proxy/Interceptor ببینی، کافیه بگی تا یه فایل کد خوشگل برات بسازم. ✌️
