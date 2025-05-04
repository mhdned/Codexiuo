## 🧱 Bridge Design Pattern — Bridging Abstraction and Implementation

### 💡 Core Idea:

Instead of tightly coupling an abstraction (like UI controls) to its implementation (like platform-specific renderers), we **decouple** them so both sides can evolve **independently** and be combined flexibly.

---

## 📁 Example Use Case

Imagine an app that sends notifications through various channels — SMS, Email, or Slack — and you want different types of notifications (normal, urgent, etc). With Bridge, you avoid creating a separate class for every combination (like `UrgentSlackNotification`, `NormalEmailNotification`, etc).

---

## 📦 TypeScript Example of the Bridge Pattern

### 1. `MessageSender` (Bridge Interface)

```ts
export interface MessageSender {
  sendMessage(message: string): void;
}
```

### 2. Concrete Implementations

```ts
export class EmailSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`Email sent: ${message}`);
  }
}

export class SMSSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`SMS sent: ${message}`);
  }
}

export class SlackSender implements MessageSender {
  sendMessage(message: string): void {
    console.log(`Slack message: ${message}`);
  }
}
```

### 3. `Notification` (Abstraction Layer)

```ts
export class Notification {
  constructor(protected sender: MessageSender) {}

  notify(message: string): void {
    this.sender.sendMessage(message);
  }
}
```

### 4. Extended Abstraction: `UrgentNotification`

```ts
export class UrgentNotification extends Notification {
  notify(message: string): void {
    console.log("!!! URGENT !!!");
    this.sender.sendMessage(`[URGENT] ${message}`);
  }
}
```

---

## ✅ Usage Example

```ts
const emailSender = new EmailSender();
const smsSender = new SMSSender();

const normalNotification = new Notification(emailSender);
normalNotification.notify("Hello via email.");

const urgentNotification = new UrgentNotification(smsSender);
urgentNotification.notify("This is a critical alert!");
```

---

## 🧠 Key Takeaways

- Avoids class explosion — no need for all possible abstraction-implementation combinations.
- Abstraction and implementation can evolve **independently**.
- Promotes **flexibility**, especially when dealing with cross-platform systems or different output strategies.
