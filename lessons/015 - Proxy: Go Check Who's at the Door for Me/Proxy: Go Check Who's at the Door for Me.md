# Proxy: Go Check Who's at the Door for Me

## Two-line Definition

When you're too lazy to answer the door and tell someone else, “Go see who it is” — that _someone else_ is a **Proxy**. It's a stand-in that handles things **before** the real deal gets involved.

## The Problem

- You’ve got an object that's hard to access (expensive, heavy, risky… or just plain lazy).
- You need a **gatekeeper** to control how and when that object gets used.
- You want to add monitoring, caching, logging, or restrictions on access.

## The Solution

Create a class that **implements the same interface** as the real object, but acts as a **substitute**. It decides **whether to call the real thing or not**.

## Types of Proxy

- 🔐 **Protection Proxy** – Only certain people get access.
- 🕶️ **Virtual Proxy** – The real thing doesn’t exist yet, but we act like it does.
- 🧠 **Smart Proxy** – The cool proxy that logs, caches, or does extra work.

## Real-World Analogy

Imagine a hotel doorman standing at the entrance. He decides who goes in. The hotel is the real subject. The doorman? That’s your proxy!

## TypeScript-ish Code Example

```ts
interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  request() {
    console.log("🎯 RealSubject: Doing the real work.");
  }
}

class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor() {
    this.realSubject = new RealSubject();
  }

  request() {
    console.log("🛂 Proxy: Checking access...");
    // Example: auth checks or logging
    this.realSubject.request();
  }
}

// Usage
const subject: Subject = new ProxySubject();
subject.request();
```

## When to Use It?

- When you want to **delay creation** of the real object (lazy loading)
- When you want to **restrict or control access** (authorization)
- When you need to **log, cache, or decorate behavior**

## Golden Quote

> "A Proxy is like a fake copy — but a helpful one. Sometimes, it’s better than the real thing!"
