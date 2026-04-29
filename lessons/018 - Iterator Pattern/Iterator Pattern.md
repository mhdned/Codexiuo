# Iterator Pattern

The Iterator Pattern is a behavioral design pattern that allows sequential access to elements of a collection without exposing its underlying structure.

## Key Concepts

- **Iterator**: An interface that defines methods for accessing elements.
- **ConcreteIterator**: A class that implements the Iterator interface.
- **Aggregate**: An interface for creating an Iterator.
- **ConcreteAggregate**: A collection class that returns an iterator for its elements.

## When to Use

- When you want to access elements of a collection without revealing its internal structure.
- When you need multiple or custom ways of traversing a collection (e.g., forward/backward).

## Example (TypeScript)

```ts
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

class NameIterator implements Iterator<string> {
  private index = 0;

  constructor(private names: string[]) {}

  next(): string | null {
    if (this.hasNext()) {
      return this.names[this.index++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.index < this.names.length;
  }
}

class NameRepository {
  private names = ["Ali", "Sara", "Reza"];

  getIterator(): Iterator<string> {
    return new NameIterator(this.names);
  }
}

// Usage
const repository = new NameRepository();
const iterator = repository.getIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Output:
// Ali
// Sara
// Reza
```

## Pros and Cons

**✅ Pros:**

- Separates traversal logic from collection implementation.
- Multiple iterators can be used simultaneously.
- Enables flexible and reusable iteration.

**❌ Cons:**

- Adds extra classes and complexity.
- May be overkill for simple collections.
