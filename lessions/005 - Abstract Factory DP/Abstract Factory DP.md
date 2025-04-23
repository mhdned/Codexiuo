# 🏭 The Fancy Factory: Abstract Factory in TypeScript

> From the series: Design Patterns for Humanoids

---

## 🎬 Intro

Imagine you're building an app that runs on both Windows and macOS.  
You want the buttons and checkboxes to look native on each platform.

So if the app runs on Windows, show Windows-style buttons. If it's on macOS, give us those juicy Apple vibes. 🍏

This is where **Abstract Factory** jumps in and says:

> “Buddy, let _me_ handle it.  
> I know what kind of buttons and checkboxes belong where!” 😎

---

## 🧱 Step 1: Define the Contracts

We start by creating some **interfaces** that describe what a button and checkbox should do.

```ts
interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}
```

---

## 🎨 Step 2: The Windows Edition

```ts
class WindowsButton implements Button {
  paint(): void {
    console.log("🎨 Windows Button Rendered");
  }
}

class WindowsCheckbox implements Checkbox {
  paint(): void {
    console.log("☑️ Windows Checkbox Rendered");
  }
}
```

---

## 🍏 Step 3: The macOS Edition

```ts
class MacButton implements Button {
  paint(): void {
    console.log("🎨 Mac Button Rendered");
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("☑️ Mac Checkbox Rendered");
  }
}
```

---

## 🏭 Step 4: The Main Factory Interface

We define the **GUIFactory** interface — the abstract factory.

```ts
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}
```

---

## 🛠️ Step 5: Specialized Factories

```ts
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}
```

---

## 🧪 Step 6: The Application Itself

The app doesn't care about specific button/checkbox classes. It just trusts the factory.

```ts
class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}
```

---

## 🕹️ Final Step: Platform Detection

```ts
function getFactory(): GUIFactory {
  const os = prompt("Enter OS (mac/windows)");

  if (os === "mac") {
    return new MacFactory();
  } else {
    return new WindowsFactory();
  }
}

const factory = getFactory();
const app = new Application(factory);
app.paint();
```

---

## 🧠 The Takeaway

- Abstract Factory builds **a set of related objects**.
- It helps keep your app clean and **decoupled from specific implementations**.
- Say goodbye to messy `if-else` blocks for UI components 👋

---

## 🧁 Codexiuo Café Note

> Whenever you want to create **a family of things together** (like a full UI kit), Abstract Factory is your stylish go-to pattern.

---

If you enjoyed this one, don’t miss the [Factory Method lesson](./../004%20-%20Factory%20DP/). That’s Abstract Factory’s younger sibling.

---

With chaos and clarity,
☕ Codexiuo's Orderly Chaos™
