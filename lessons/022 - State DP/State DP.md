# 🎭 State Design Pattern — Change Behavior Based on Internal State

The **State** pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes — as if the object changes its class.

---

## 🧩 The Problem It Solves

When an object has multiple states and behaves differently in each, we often use `if/else` or `switch` statements. This can lead to messy, unscalable, and hard-to-maintain code.

---

## 🧠 The Solution

Instead of conditions, **each state is implemented as a separate class**. The main object (Context) delegates behavior to the current state object.

---

## 🧱 Pattern Components:

1. **Context**: The main object that holds a reference to the current state and delegates behavior to it.
2. **State Interface**: A common interface for all states.
3. **Concrete States**: Implementations of different states with their unique behaviors.

---

## 🛠 Simple Example in TypeScript:

```ts
interface State {
  handle(): void;
}

class HappyState implements State {
  handle() {
    console.log("I’m feeling happy today!");
  }
}

class SadState implements State {
  handle() {
    console.log("I’m feeling sad...");
  }
}

class Person {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  setState(state: State) {
    this.state = state;
  }

  talk() {
    this.state.handle();
  }
}

const person = new Person(new HappyState());
person.talk(); // I’m feeling happy today!
person.setState(new SadState());
person.talk(); // I’m feeling sad...
```

---

## ✅ Advantages:

- Eliminates bulky conditionals
- Easier to extend and maintain
- Adding a new state = creating a new class

## ❌ Disadvantages:

- Increases the number of classes
- Might feel over-engineered for small use-cases

---

## 🔚 Conclusion:

The State pattern is a great way to organize code when behavior depends on state. If your object is full of `if/else` blocks based on its state, this pattern is your friend.
