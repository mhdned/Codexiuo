# 🧱 Decorator Pattern in Simple Terms

When you have an object and want to add features to it — without creating a new class for every possible combination — you use the **Decorator** pattern.

---

### 🔧 Simple Structure with TypeScript:

```ts
// Component interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return "Simple Coffee";
  }
}

// Decorator Base Class
class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 2;
  }

  description(): string {
    return super.description() + ", Milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 1;
  }

  description(): string {
    return super.description() + ", Sugar";
  }
}
```

---

### ☕ Running the Code:

```ts
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // Simple Coffee, Milk, Sugar
console.log(coffee.cost()); // 5 + 2 + 1 = 8
```

---

### 💡 Codexiuo Tips:

- This pattern is great when you want to **dynamically add features** to objects.
- No inheritance madness — instead, it uses **composition**.
- You can stack as many decorators as you like… just don’t blame me if your coffee becomes unrecognizable 😄
