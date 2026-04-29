# Command Pattern

The Command Pattern is a behavioral design pattern that turns a request into a stand-alone object containing all information about the request. This lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.

## Key Concepts

- **Command**: An interface that declares an execution method.
- **ConcreteCommand**: Implements the command interface and defines the binding between a Receiver and an action.
- **Receiver**: Knows how to perform the operation associated with the command.
- **Invoker**: Asks the command to carry out the request.
- **Client**: Creates command objects and configures the invoker with the commands.

## When to Use

- You need to queue requests, delay execution, or support undo.
- You want to decouple classes that invoke operations from those that perform them.

## Example (TypeScript)

```ts
interface Command {
  execute(): void;
}

class Light {
  turnOn() {
    console.log("Light is ON");
  }

  turnOff() {
    console.log("Light is OFF");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}

class RemoteControl {
  private command!: Command;

  setCommand(command: Command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}

// Usage
const light = new Light();
const lightOn = new LightOnCommand(light);
const remote = new RemoteControl();

remote.setCommand(lightOn);
remote.pressButton(); // Output: Light is ON
```

## Pros and Cons

**✅ Pros:**

- Decouples invoker and receiver.
- Easy to implement undo/redo.
- Supports macro commands and logging.

**❌ Cons:**

- Can result in lots of command classes.
