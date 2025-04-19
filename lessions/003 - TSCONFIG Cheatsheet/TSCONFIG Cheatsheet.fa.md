# ⚙️ `tsconfig.json` Cheatsheet

فایلی که TypeScript باهاش تنظیم میشه. اینجا یه کانفیگ استاندارد و قابل فهم رو برات آوردیم:

```json
{
  "compilerOptions": {
    "target": "ES2020",              // خروجی جاوااسکریپت: ES5, ES6, ES2020, ...
    "module": "CommonJS",            // نوع ماژول: CommonJS, ESNext, UMD, ...
    "rootDir": "./src",              // پوشه ورودی سورس‌کد
    "outDir": "./dist",              // پوشه خروجی برای فایل‌های کامپایل‌شده
    "strict": true,                  // فعال‌کردن همه چک‌های strict
    "esModuleInterop": true,         // برای ایمپورت ماژول‌های CommonJS مثل 'express'
    "forceConsistentCasingInFileNames": true, // حساسیت به حروف بزرگ‌کوچک در importها
    "skipLibCheck": true,            // رد شدن از چک کردن فایل‌های .d.ts
    "moduleResolution": "node",      // شبیه رفتار نود فایل‌ها رو resolve کن
    "allowJs": true,                 // اجازه بده فایل‌های JS هم کامپایل بشن
    "resolveJsonModule": true        // اجازه بده فایل‌های JSON رو import کنیم
  },
  "include": ["src"],                // فقط این پوشه رو بررسی کن
  "exclude": ["node_modules", "dist"] // اینا رو بی‌خیال شو
}
```

## 🧠 توضیح کوتاه برای هر گزینه

| گزینه | توضیح |
|-------|-------|
| `target` | نسخه خروجی JS (مثل ES5 یا ES2020) |
| `module` | سیستم ماژول خروجی (مثل CommonJS یا ESNext) |
| `rootDir` | مسیر فایل‌های TypeScript پروژه |
| `outDir` | جایی که فایل‌های `.js` خروجی ذخیره میشن |
| `strict` | فعال کردن همه قوانین سختگیرانه تایپ |
| `esModuleInterop` | اجازه ایمپورت پیشرفته از پکیج‌های معمول JS |
| `forceConsistentCasingInFileNames` | جلوگیری از اشتباه در بزرگی/کوچکی حروف |
| `skipLibCheck` | سریع‌تر شدن کامپایل با نادیده گرفتن تایپ‌های خارجی |
| `moduleResolution` | الگوریتم پیدا کردن فایل‌ها، حالت `node` توصیه میشه |
| `allowJs` | اگر پروژه ترکیبی از JS و TS هست، لازمه |
| `resolveJsonModule` | ایمپورت مستقیم فایل JSON |
