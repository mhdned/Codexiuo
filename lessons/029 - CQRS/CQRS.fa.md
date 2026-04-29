# **CQRS**

---

### داستان ما:

فرض کن تو یه انبار داری داری که محصولات رو نگه می‌داره. وقتی یه محصول جدید میاد یا از انبار کم می‌شه، نمی‌خوای مستقیم بری سراغ موجودی کلی انبار و همون لحظه آپدیت کنی. چرا؟ چون ممکنه چند نفر همزمان بخوان همین کار رو انجام بدن، سیستم سنگین بشه، و اطلاعات اشتباه بشه!

راه حل چیه؟
میای کارهای **نوشتن** (مثل اضافه یا کم کردن محصول) رو جدا می‌کنی از کارهای **خواندن** (مثل پرسیدن موجودی الان چقدره).

---

### به این روش می‌گن CQRS (Command Query Responsibility Segregation)

- **Command:** دستورات برای تغییر داده (مثل اضافه کردن یا کم کردن محصول)
- **Query:** پرس‌وجو برای خواندن داده‌ها (مثل نمایش موجودی)

---

### نمونه کد ساده:

```js
// مدل داده (تو حافظه - برای سادگی)
const inventoryWriteModel = {};
const inventoryReadModel = {};

// وظیفه ثبت تغییرات (Command)
function addProduct(productId, quantity) {
  if (!inventoryWriteModel[productId]) inventoryWriteModel[productId] = 0;
  inventoryWriteModel[productId] += quantity;

  // بعدش مدل خواندن رو async آپدیت می‌کنیم
  syncReadModel(productId);
}

function removeProduct(productId, quantity) {
  if (
    !inventoryWriteModel[productId] ||
    inventoryWriteModel[productId] < quantity
  ) {
    throw new Error("موجودی کافی نیست!");
  }
  inventoryWriteModel[productId] -= quantity;

  syncReadModel(productId);
}

// فقط برای خوندن داده (Query)
function getProductQuantity(productId) {
  return inventoryReadModel[productId] || 0;
}

// شبیه‌سازی همگام‌سازی مدل خواندن با مدل نوشتن
function syncReadModel(productId) {
  setTimeout(() => {
    inventoryReadModel[productId] = inventoryWriteModel[productId];
    console.log(
      `مدل خواندن برای محصول ${productId} به‌روز شد: ${inventoryReadModel[productId]}`
    );
  }, 1000);
}

// تست کردن CQRS
console.log("اضافه کردن 10 عدد محصول با شناسه 1");
addProduct(1, 10);

console.log("موجودی فعلی (مدل خواندن):", getProductQuantity(1));

setTimeout(() => {
  console.log("بعد از آپدیت مدل خواندن، موجودی:", getProductQuantity(1));
}, 1500);
```

---

### نکات مهم:

- مدل نوشتن سریع جواب میده و مسئول ثبت داده‌هاست
- مدل خواندن ممکنه یه ذره عقب‌تر باشه (eventual consistency)
- این باعث میشه سیستم مقیاس‌پذیرتر و قابل اطمینان‌تر باشه
- اگر می‌خوای داده‌ها کاملاً همزمان باشن، این مدل مناسب نیست!

---

### جمع‌بندی:

CQRS یه تکنیک عالیه برای وقتی که می‌خوای خواندن و نوشتن تو سیستم‌ت رو از هم جدا کنی،
به‌خصوص تو پروژه‌های بزرگ که تعداد درخواست‌ها زیاده و نمی‌خوای داده‌ها همزمان قفل بشن!
