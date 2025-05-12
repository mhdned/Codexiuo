# 🧙‍♂️ Chain of Responsibility

> A behavioral design pattern that lets you pass requests along a chain of handlers. Each handler either handles the request or passes it along to the next in the chain.

### 📦 Real-World Analogy

Imagine you want to take a leave from work:

1. First, you ask your team lead.
2. If they can’t approve it, they forward it to the project manager.
3. If the manager also can’t handle it, it goes to HR.

Each one is part of a **chain**, and any of them might approve your request—or pass it down the line.

---

### ⚙️ Fancy Code Structure (TypeScript Edition)

```ts
abstract class Handler {
  protected next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.next) {
      return this.next.handle(request);
    }
    return null;
  }
}

class TeamLead extends Handler {
  handle(request: string): string | null {
    if (request === "small-leave") {
      return "TeamLead approved the leave.";
    }
    return super.handle(request);
  }
}

class Manager extends Handler {
  handle(request: string): string | null {
    if (request === "long-leave") {
      return "Manager approved the leave.";
    }
    return super.handle(request);
  }
}

class HR extends Handler {
  handle(request: string): string | null {
    if (request === "resignation") {
      return "HR approved the resignation.";
    }
    return super.handle(request);
  }
}

// Build the chain:
const teamLead = new TeamLead();
const manager = new Manager();
const hr = new HR();

teamLead.setNext(manager).setNext(hr);

// Test the chain:
console.log(teamLead.handle("long-leave")); // Manager approved the leave.
console.log(teamLead.handle("resignation")); // HR approved the resignation.
console.log(teamLead.handle("vacation")); // null
```

---

### 🔥 When to Use It

- When multiple objects might handle a request.
- When you want to decouple the sender of a request from its receiver.
- When you’re tired of spaghetti `if-else` chains.

---

### 🧠 Benefits

✅ Reduces tight coupling between sender and receiver
✅ Easy to add new handlers without changing existing code
✅ Cleaner code than deeply nested `if-else` blocks

---

### ⚠️ Downsides

❌ A request might go unhandled if no one in the chain accepts it
❌ Debugging can get tricky if the chain gets too long

---

### 😎 Real Examples in Code

- `middleware` in **Express.js** is a classic use of this pattern.
- **Event bubbling** in the JavaScript DOM is another example.
- **Pipes** and **validation layers** in **NestJS** also follow this pattern.
