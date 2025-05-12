# Mediator Pattern

The Mediator Pattern is a behavioral design pattern that encapsulates how a set of objects interact. It promotes loose coupling by keeping objects from referring to each other explicitly, and lets you alter their interaction independently.

## Key Concepts

- **Mediator**: An interface for communication between components.
- **ConcreteMediator**: The actual implementation that coordinates interactions.
- **Component**: A class that participates in communication but delegates it to the mediator.
- **ConcreteComponent**: A real component that only communicates through the mediator.

## When to Use

- When many components communicate in complex ways.
- When you want to reduce the direct dependencies between classes.
- When the interaction logic is too complex to be maintained across multiple objects.

## Example (TypeScript)

```ts
interface Mediator {
  notify(sender: Component, event: string): void;
}

class Component {
  constructor(protected mediator: Mediator) {}
}

class Button extends Component {
  click() {
    console.log("Button clicked");
    this.mediator.notify(this, "click");
  }
}

class TextBox extends Component {
  setText(text: string) {
    console.log(`Text set: ${text}`);
  }

  clear() {
    console.log("Text cleared");
  }
}

class AppDialog implements Mediator {
  private button: Button;
  private textBox: TextBox;

  constructor() {
    this.textBox = new TextBox(this);
    this.button = new Button(this);
  }

  notify(sender: Component, event: string): void {
    if (sender instanceof Button && event === "click") {
      this.textBox.clear();
    }
  }

  getUI() {
    return {
      button: this.button,
      textBox: this.textBox,
    };
  }
}

// Usage
const dialog = new AppDialog();
const { button } = dialog.getUI();
button.click();
// Output:
// Button clicked
// Text cleared
```

## Pros and Cons

**✅ Pros:**

- Reduces coupling between components.
- Centralizes complex communication logic.
- Makes code easier to maintain and extend.

**❌ Cons:**

- Can introduce a complex mediator class.
- Risk of turning the mediator into a "god object."
