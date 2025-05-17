# Observer Design Pattern

The **Observer** design pattern allows an object (called the **Subject**) to notify other objects (called **Observers**) about changes to its state — **without being tightly coupled** to them.

## 🔧 Problem It Solves

Imagine you're building a news app. Every time a news article is published, you might need to:

- Send emails to subscribers
- Push mobile notifications
- Update the "Breaking News" section in real-time

If you implement all of these directly inside your `NewsPublisher` class, you'll create **tight coupling** between components.

### The Problem:

- High dependency between components
- Hard to add or change behaviors later

## 💡 Solution

**Decouple** the observers from the main class.

- The **Subject** maintains a list of **Observers**
- Whenever an update occurs, all observers are notified via the `update()` method

## 👨‍💻 Simple Implementation in TypeScript

```ts
// Observer interface
interface Observer {
  update(data: string): void;
}

// Subject class that manages observers
class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: string): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// Concrete observer implementation
class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  update(data: string): void {
    console.log(`${this.name} received: ${data}`);
  }
}

// Example usage
const subject = new Subject();

const ali = new ConcreteObserver("Ali");
const sara = new ConcreteObserver("Sara");

subject.subscribe(ali);
subject.subscribe(sara);

subject.notify("Breaking News!");
```

## ✅ Benefits

- Loose coupling between components
- Easy to add new behaviors without touching existing code
- Flexible and extensible system design

## ❌ Drawbacks

- Too many observers may cause performance issues
- Debugging can be tricky since updates happen indirectly

## 🧩 Common Use Cases

- Notification systems
- Pub/Sub pattern in distributed systems
- GUI frameworks for updating widgets or UI components

## 📚 References

- [Refactoring.Guru - Observer Pattern](https://refactoring.guru/design-patterns/observer)
