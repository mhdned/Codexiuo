> "In every village, there's only one chief. Singleton is the chief of code."

---

## 🧙 Intro: One for All

Ever needed a class that should only ever have one instance? Like app settings, a database connection, or a logger? That’s where Singleton steps in.

The Singleton Pattern says: “Just one, no more.”

---

## 🧩 What is a Singleton?

Singleton is a **Creational Design Pattern** that ensures a class has only one instance and provides a global access point to it.

---

## 🔧 Implementing Singleton in TypeScript

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Creating new instance...");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public log(message: string) {
    console.log(`[Singleton]: ${message}`);
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();

a.log("Hello from A");
b.log("Hello from B");

console.log(a === b); // true
```

Even if you call `getInstance()` twice, only one instance is created. Everyone connects to the same one.

---

## ⚙️ Why Singleton?

- Manage shared resources (like a DB connection)
- Keep a global state
- Ensure one and only one instance across the app

---

## ❗ Challenges

- Harder to test (because of global state)
- High coupling due to dependency on Singleton
- Sometimes considered an anti-pattern if misused

---

## 🏛️ Singleton Pattern Structure

```
📦 Singleton
 ┣━ private constructor()
 ┣━ static getInstance()
 ┣━ other operations
```

---

## 💡 Codexiuo-style Tip

If everyone in your app had their own settings copy, chaos would reign. Singleton says: “One for all.”

But beware — not everything should be a Singleton. Otherwise, you’re not organizing code — you’re ruling Middle Earth.

---

### 🔗 Source

[Refactoring Guru - Singleton Pattern](https://refactoring.guru/design-patterns/singleton/typescript/example)

---

🧠 Codexiuo only has one version… but it’s always ready to teach!
