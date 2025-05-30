# این «This» همون «This» نیست!

وقتی با `Node.js` و `TypeScript` یه پکیج توپ می‌سازیم، یه جاهایی با یه داستان قدیمی روبرو میشیم:
**"This کیه؟!"**

### مشکل

فرض کن یه کلاس خوشگل داریم:

```ts
class MyTool {
  constructor(private name: string) {}
  doSomething() {
    console.log(this.name);
  }
}
```

و یه جایی توی برنامه از این کلاس استفاده می‌کنیم:

```ts
const tool = new MyTool("Codexiuo");

program.command("run").action(tool.doSomething); // 💥
```

تا اینجای داستان همه چی خوبه… ولی اجرا که می‌کنی، می‌بینی `undefined` می‌زنه! چرا؟

---

### راز ماجرا: Callback بدون context

در جاوااسکریپت وقتی یه متد از کلاس رو مستقیم به عنوان callback (مثلاً `.action`) پاس می‌دی، ارتباطش با کلاس رو از دست می‌ده!
**یعنی `this` به جای instance، میشه `undefined` یا یه چیز عجیب!**

---

### راه‌حل

🚀 دوتا راه‌حل معروف داریم:

#### 1️⃣ استفاده از `.bind()`

```ts
program.command("run").action(tool.doSomething.bind(tool));
```

اینجا `this` رو می‌چسبونیم به `tool`! و کار تمومه.

#### 2️⃣ استفاده از Arrow Function

```ts
class MyTool {
  constructor(private name: string) {}
  doSomething = () => {
    console.log(this.name);
  };
}
```

با arrow function، `this` همیشه به instance وصله. پس دیگه نیازی به `.bind()` نیست.

---

### سوال: آیا bind مشکلی ایجاد می‌کنه؟

✅ نه! `.bind()` فقط یه ورژن جدید از متدت می‌سازه که همیشه `this` رو درست نگه می‌داره.
✅ حتی این راه‌حل استاندارد و امنه.
✅ تنها نکته: هر بار `.bind()` کنی یه reference جدید می‌سازه (ولی برای این کارها مهم نیست).

---

### نتیجه‌گیری

🎯 وقتی می‌خوای یه متد کلاس رو به عنوان callback بدی، حتماً با `.bind(instance)` ببندش یا از arrow function استفاده کن.

💡 پس دفعه بعد که دیدی یه property کلاس `undefined` شد، یاد ماجرای "This گمشده" باش!
