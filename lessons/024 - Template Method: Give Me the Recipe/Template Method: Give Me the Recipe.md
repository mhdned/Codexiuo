# Template Method: "Give Me the Recipe!"

### 🧠 What’s the Big Idea?

You’re building a system where several things **follow the same routine**, but parts of that routine **should be flexible**.
Think of it like this:

Everyone’s morning routine looks like:

1. Wake up
2. Wash your face
3. Eat something
4. Head to work

But while the structure is the same, the food part? Total chaos:

- A programmer makes coffee and grabs yesterday’s leftover biscuit
- An athlete whips up a protein-loaded omelette
- A designer... just meditates and consumes sunlight

So, what do we do?

We **define the fixed steps in a base class** (like "wake up", "wash face", etc.),
and **leave the flexible parts to subclasses** (like "makeFood").

This, dear reader, is the **Template Method Pattern**.

---

### 🔧 The Setup

You create a base class that:

- Has a **template method** (a function that defines the steps in a specific order)
- Implements **some of the steps** itself
- Leaves **some steps abstract** for subclasses to implement

---

### 🤖 Let’s Cook Some Code

```ts
// File: breakfast.ts

abstract class BreakfastRoutine {
  public prepare(): void {
    this.wakeUp();
    this.washFace();
    this.makeFood(); // <-- Subclass must implement this
    this.eat();
  }

  protected wakeUp(): void {
    console.log("⏰ Wake up, sleepyhead!");
  }

  protected washFace(): void {
    console.log("🚿 Splashing water on your zombie face...");
  }

  protected abstract makeFood(): void;

  protected eat(): void {
    console.log("😋 Eating like there’s no work waiting...");
  }
}

class ProgrammerRoutine extends BreakfastRoutine {
  protected makeFood(): void {
    console.log("☕ Brewing coffee and munching old biscuits");
  }
}

class AthleteRoutine extends BreakfastRoutine {
  protected makeFood(): void {
    console.log("🍳 Making a protein omelette with oats");
  }
}

// Run it!
const programmer = new ProgrammerRoutine();
programmer.prepare();

console.log("\n---\n");

const athlete = new AthleteRoutine();
athlete.prepare();
```

---

### ✅ Why Should I Even Care?

- You **control the overall structure** while letting subclasses customize parts of it.
- You **reduce code duplication** by keeping shared logic in one place.
- It makes your system more **organized and readable**.
- It **enforces consistency**, like a strict but loving parent.

---

### ❌ When NOT to Use It?

- When the overall routine **isn’t actually shared** across different implementations.
- If the base class becomes too controlling and subclasses feel suffocated.
- When you need **more flexible strategy swapping at runtime** (in that case, use Strategy Pattern instead).

---

### 🧁 Wrap-up

Template Method is basically like saying:

> “I’ll tell you **what** to do, not **how** to do it.”

It’s for when you want a **solid skeleton** of logic, but let the children color outside the lines.
