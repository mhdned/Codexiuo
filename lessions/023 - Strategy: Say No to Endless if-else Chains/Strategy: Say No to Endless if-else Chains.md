# Strategy: Say No to Endless if-else Chains

> "If your code is packed with `if-else` drama, maybe it's time to grab a coffee with Strategy."

---

## 🧠 What’s this pattern about?

The **Strategy** pattern is one of those behavioral patterns that basically says:

> Hey buddy, if you’ve got a class with different behaviors (like algorithms or actions) and you’re using conditions to pick one — stop! Pull them out, give each behavior its own class, and pass it in when needed.

In more technical terms:

> Strategy means encapsulating algorithms in separate classes and injecting them into the main class to change its behavior at runtime.

---

## 💡 Classic Scenario

Imagine you’re building a file compression tool that supports ZIP, RAR, and 7z formats.

### The ugly if-else monster:

```ts
if (format === "zip") {
  compressWithZip();
} else if (format === "rar") {
  compressWithRar();
} else if (format === "7z") {
  compressWith7z();
}
```

Aren’t you tired of writing these conditional marathons?

---

## ✅ Strategy to the rescue!

### Step 1: Create an interface for all strategies

```ts
interface CompressionStrategy {
  compress(file: File): void;
}
```

### Step 2: Implement each algorithm separately

```ts
class ZipCompression implements CompressionStrategy {
  compress(file: File): void {
    console.log("Compressing with ZIP");
  }
}

class RarCompression implements CompressionStrategy {
  compress(file: File): void {
    console.log("Compressing with RAR");
  }
}
```

### Step 3: Create a main class that uses a strategy

```ts
class Compressor {
  constructor(private strategy: CompressionStrategy) {}

  compress(file: File): void {
    this.strategy.compress(file);
  }
}
```

### Finally, usage:

```ts
const compressor = new Compressor(new ZipCompression());
compressor.compress(myFile);
```

Now you can inject any strategy at runtime without rewriting your logic.

---

## ⚖️ Pros and Cons

### ✅ Pros:

- Kills off the toxic if-else jungle
- Follows the Open/Closed Principle (no touching old code!)
- Adding new algorithms = easier than making instant noodles

### ❌ Cons:

- You’ll end up with more classes (but hey, clean code > chaos)
- Might feel like overkill for super simple behaviors

---

## 🧠 Remember

When a class starts taking on too many responsibilities and conditional logic is piling up like dirty laundry, it’s time to hand it over to Strategy and let it clean things up.

---

## 🔗 Source

The legendary Refactoring Guru:
[https://refactoring.guru/design-patterns/strategy](https://refactoring.guru/design-patterns/strategy)
