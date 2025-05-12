# Memento Pattern

The Memento Pattern is a behavioral design pattern that allows you to save and restore the previous state of an object without revealing the details of its implementation. It's commonly used to implement undo/redo functionality.

## Key Concepts

- **Memento**: An object that stores the internal state of another object.
- **Originator**: The object whose state needs to be saved or restored.
- **Caretaker**: Responsible for storing mementos without modifying their contents.

## When to Use

- When you need to save and restore the state of objects.
- When implementing undo/redo functionality.
- When you want to avoid exposing internal details of an object.

## Example (TypeScript)

```ts
class Memento {
  constructor(public readonly state: string) {}
}

class Originator {
  private state: string = "";

  setState(state: string) {
    console.log(`Set state: ${state}`);
    this.state = state;
  }

  save(): Memento {
    console.log("Saving state");
    return new Memento(this.state);
  }

  restore(memento: Memento) {
    this.state = memento.state;
    console.log(`State restored to: ${this.state}`);
  }
}

class Caretaker {
  private history: Memento[] = [];

  constructor(private originator: Originator) {}

  backup() {
    this.history.push(this.originator.save());
  }

  undo() {
    const memento = this.history.pop();
    if (memento) {
      this.originator.restore(memento);
    }
  }
}

// Usage
const originator = new Originator();
const caretaker = new Caretaker(originator);

originator.setState("State 1");
caretaker.backup();

originator.setState("State 2");
caretaker.backup();

originator.setState("State 3");

caretaker.undo(); // Restores to State 2
caretaker.undo(); // Restores to State 1
```

## Pros and Cons

**✅ Pros:**

- Separates the internal state from external access.
- Enables undo/redo functionality cleanly.

**❌ Cons:**

- Can consume a lot of memory if mementos are large or numerous.
- Managing the history may become complex.
