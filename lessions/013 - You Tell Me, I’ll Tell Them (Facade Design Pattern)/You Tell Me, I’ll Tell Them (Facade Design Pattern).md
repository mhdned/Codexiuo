# You Tell Me, I’ll Tell Them (Facade Design Pattern)

Once upon a debugging session, a tired developer wanted to call a few services. But oh no...  
He had to greet each one individually, beg for data, wait for responses, coordinate between them, make tea, come back, and then continue. Exhausting, right?

He said:  
**"Nah man! This ain't it. I need someone who handles all this chaos with just one click. A smooth-talking interface I can trust."**

And thus, **the Facade Pattern** was born — a neat, charming front that hides a jungle of complexity behind the scenes and shows you just one lovely button: **"Go!"**

---

## 🎭 So What’s This “Facade” Anyway?

A Facade is like a **friendly wrapper** around messy, complex systems.  
The client knocks politely, says hello, and the Facade handles the chaos behind the door.  
No need for the client to know how it all works — and frankly, they shouldn’t.

---

## 🎬 A TypeScript Play

```ts
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    let result = "Facade: Setting up subsystems:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade: Now executing operations:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Ready to go!\n";
  }
  public operationN(): string {
    return "Subsystem1: Let’s roll!\n";
  }
}

class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: I’m ready too!\n";
  }
  public operationZ(): string {
    return "Subsystem2: Fire away!\n";
  }
}

function clientCode(facade: Facade) {
  console.log(facade.operation());
}

// Let’s run it
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```

---

## 🪄 Output You’ll See:

```
Facade: Setting up subsystems:
Subsystem1: Ready to go!
Subsystem2: I’m ready too!
Facade: Now executing operations:
Subsystem1: Let’s roll!
Subsystem2: Fire away!
```

---

## 🧠 Why Should You Use It?

- Because talking to every class directly is a pain (and you're too busy for that).
- Because clean code is good code.
- Because change becomes easier when there’s only one door to knock.

---

## 📎 Final Words from Codexiuo

> **Facade** is like the receptionist in a big company.
> You say, "Hey, I want to talk to finance," and they know who to call, when to call them, and who brings the tea.
>
> You? Just smile and say, **"Go!"**
