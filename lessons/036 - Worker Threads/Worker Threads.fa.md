# 🧵 Worker Threads  
> «Node.js گفت من single-threadedم… بعد یهو worker آورد وسط.»

---

## 🎯 اصلاً Worker توی Node.js چیه؟

Node.js به‌صورت پیش‌فرض بیشتر کارهای JavaScript رو روی **یک ترد اصلی** اجرا می‌کنه.  
یعنی:

- event loop یکیه
- main thread یکیه
- اگه یه کار سنگین CPU-bound بندازی وسط، کل برنامه می‌گه:
  > «خب تا این تموم نشه، هیچ‌کس هیچ‌جا نمی‌ره.»

اینجاست که **Worker Threads** وارد می‌شن.

> Worker یعنی یه ترد جدا که می‌تونه JavaScript رو مستقل از main thread اجرا کنه.

یعنی به‌جای اینکه main thread رو خفه کنی، کار سنگین رو می‌فرستی یه کارگر انجام بده.

---

## 🧠 چرا اصلاً به Worker نیاز داریم؟

چون Node.js برای این‌ها عالیه:

- I/O bound tasks
- network requests
- فایل‌خوانی
- database calls

ولی برای این‌ها نه خیلی:

- image processing سنگین
- encryption سنگین
- parsing خیلی بزرگ
- محاسبات عددی شدید
- compression
- video/audio processing

چرا؟  
چون این‌ها **CPU-bound** هستن.  
و CPU-bound task روی main thread یعنی:

- requestها کند می‌شن
- latency می‌ره بالا
- API انگار توی گل گیر کرده
- کاربر هم فکر می‌کنه backend خوابیده

---

## 🧨 مشکل main thread

مثلاً این کد رو ببین:

```js
app.get("/block", (req, res) => {
  let total = 0;
  for (let i = 0; i < 10_000_000_000; i++) {
    total += i;
  }
  res.send(`Done: ${total}`);
});
```

این endpoint فقط خودش کند نیست.  
مشکل اصلی اینه که **کل process** رو بلاک می‌کنه.

یعنی همزمان:
- `/users` هم کند می‌شه
- `/health` هم جواب نمی‌ده
- همه requestها می‌مونن تو صف
- سرور از درون فریاد می‌زنه

---

## 🦾 Worker Threads چطور کمک می‌کنن؟

به‌جای اجرای کار سنگین در main thread:

1. main thread یه worker می‌سازه
2. task رو برای worker می‌فرسته
3. worker اون کار رو جداگانه انجام می‌ده
4. نتیجه رو برمی‌گردونه
5. main thread meanwhile به بقیه requestها رسیدگی می‌کنه

یعنی:
> «تو برو حساب کن، من اینجا API رو زنده نگه می‌دارم.»

---

## 🛠 مثال ساده Worker در Node.js

### `main.js`

```js
const { Worker } = require("worker_threads");

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: data,
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

runWorker(100)
  .then((result) => console.log("Result:", result))
  .catch((err) => console.error(err));
```

### `worker.js`

```js
const { parentPort, workerData } = require("worker_threads");

function heavyCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n * 1_000_000; i++) {
    sum += i;
  }
  return sum;
}

const result = heavyCalculation(workerData);

parentPort.postMessage(result);
```

---

## 🧾 اینجا چه اتفاقی افتاد؟

- `main.js` یه worker ساخت
- داده رو با `workerData` فرستاد
- worker محاسبه رو انجام داد
- با `postMessage` نتیجه رو پس فرستاد

یعنی محاسبه رفته یه گوشه، main thread هم زندگی عادی‌ش رو ادامه داده.

---

## 🧠 Worker Threads با Child Process فرق دارن؟

آره، و مهمه.

### Worker Threads
- داخل همون process هستن
- memory space رو تا حدی shared-friendly دارن
- lightweightتر از process کامل
- برای CPU tasks مناسبن

### Child Process
- process جداست
- isolate بیشتری داره
- مناسب اجرای commandها یا scriptهای جدا
- سنگین‌تره

پس:

- **CPU-bound JS task؟ → Worker Thread**
- **اجرای برنامه/اسکریپت مستقل؟ → Child Process**

---

## ⚠️ یه سوءتفاهم معروف

بعضیا فکر می‌کنن چون Node.js thread pool داره، پس worker لازم نیست.

نه رفیق.

اون thread pool مربوط به بعضی کارهای داخلی libuvـه مثل:
- file system operations
- DNS lookup
- بعضی crypto ops

ولی **JavaScript خودت** روی main thread اجرا می‌شه.  
اگر خودت یه حلقه‌ی سنگین بنویسی، libuv نمیاد نجاتت بده.

---

## 🧪 کی باید از Worker استفاده کنیم؟

### مناسب:
- hashing سنگین
- PDF generation سنگین
- image resize / manipulation
- AI inference سبک/متوسط
- data transformation بزرگ
- compression / decompression

### نامناسب:
- query زدن به DB
- fetch API
- فایل خوندن ساده
- کارهای معمول CRUD
- هر چیزی که I/O-bound هست

برای I/O-bound task، worker زدن معمولاً فقط complexity مجانیه.  
همون main thread خودش خوب هندلش می‌کنه.

---

## 🚫 اشتباهات رایج

### ❌ برای هر request یه worker ساختن
یعنی:
> «برای هر سلام، یه کارمند جدید استخدام کردیم.»

خیلی گرونه.  
اگر بار زیاد باشه، ساختن worker برای هر درخواست می‌تونه خودش مشکل‌ساز بشه.

راه بهتر:
- worker pool
- یا job queue

---

### ❌ فرستادن objectهای خیلی بزرگ بین threadها
message passing مجانی نیست.  
اگه هی payloadهای عظیم بفرستی، performance می‌ره زیر سوال.

---

### ❌ استفاده از worker برای کارهای async معمولی
اگه فقط داری از DB می‌خونی، worker لازم نداری.  
داری با پتک گردو می‌شکنی.

---

### ❌ نادیده گرفتن error handling
worker هم ممکنه fail بشه.  
اگر `error` و `exit` رو هندل نکنی، بعداً production یه سورپرایز زشت بهت می‌ده.

---

## 🧱 Worker Pool یعنی چی؟

به‌جای اینکه هر بار یه worker جدید بسازی،  
چند تا worker از قبل آماده نگه می‌داری.

مثل استخر کارمندها:

- job می‌رسه
- یکی از workerهای آزاد کار رو برمی‌داره
- نتیجه رو برمی‌گردونه
- دوباره آزاد می‌شه

این مدل خیلی بهتره برای:
- throughput
- latency
- کنترل منابع

کتابخونه‌هایی مثل:
- `Piscina`
- یا پیاده‌سازی custom pool

برای این کار استفاده می‌شن.

---

## 📦 مثال ذهنی ساده

فرض کن یه API داری برای resize کردن عکس.

بدون worker:
- کاربر عکس آپلود می‌کنه
- main thread می‌ره resize می‌کنه
- کل API کند می‌شه

با worker:
- main thread درخواست رو می‌گیره
- resize رو می‌سپره به worker
- meanwhile بقیه requestها هم رسیدگی می‌شن

همه خوشحال.  
به‌جز CPU که همچنان زحمت می‌کشه، ولی حداقل مودبانه.

---

## 🧠 Worker Threads و Shared Memory

Node.js حتی اجازه می‌ده با چیزهایی مثل:

- `SharedArrayBuffer`
- `Atomics`

بین threadها shared memory داشته باشی.

ولی اینجا دیگه وارد منطقه‌ی:
> «من خیلی اعتمادبه‌نفس دارم و احتمالاً بعداً regret می‌کنم»

می‌شی.

برای اکثر use caseها:
- message passing کافی‌تره
- امن‌تره
- فهمیدنش کمتر اعصاب می‌خواد

---

## 🧙 Rule of Thumb

اگر task تو:

- CPU-heavy هست
- JS execution سنگین داره
- event loop رو block می‌کنه

→ **Worker Thread**

اگر task تو:

- I/O-heavy هست
- network/database/filesystem معمولیه
- async/await براش کافیه

→ **Worker لازم نیست**

---

## 🧭 جمع‌بندی

Worker Threads تو Node.js برای این ساخته شدن که  
**کارهای CPU-bound رو از main thread جدا کنن**  
تا event loop خفه نشه و اپ responsive بمونه.

یعنی:

- main thread برای orchestration
- worker برای heavy lifting

---

## 🧙 Codexiuo mantra

> **Node.js single-threaded نیست؛  
> فقط main drama روی یک thread اجرا می‌شه.**