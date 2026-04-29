## 009 - Adapter: When Code Doesn’t Speak the Same Language

> Sometimes your code speaks English, but the library you’re using is shouting in Klingon. Instead of rewriting the whole thing, you bring in an **Adapter** — your own universal translator. 🖖

### 🍱 Fancy Definition

The **Adapter Pattern** is a structural design pattern that allows objects with incompatible interfaces to work together. Think of it as a translator that lets your legacy code and shiny new interface finally get along.

---

### 🎬 The Scenario

Let’s say we’re working with a temperature sensor that gives us readings in Fahrenheit. But your app? It only speaks Celsius. You can’t touch the sensor code — it’s from a third-party library or some legacy stuff. You need an adapter.

---

### 🔧 Code Example: Adapter to the Rescue

#### 1. The Incompatible Class (Adaptee)

```ts
class FahrenheitSensor {
  getTemperature(): number {
    return 98.6; // Fahrenheit
  }
}
```

#### 2. The Interface We Actually Want (Target)

```ts
interface CelsiusSensor {
  getTemperature(): number; // Celsius
}
```

#### 3. The Adapter Class

```ts
class FahrenheitToCelsiusAdapter implements CelsiusSensor {
  constructor(private fahrenheitSensor: FahrenheitSensor) {}

  getTemperature(): number {
    const f = this.fahrenheitSensor.getTemperature();
    return ((f - 32) * 5) / 9; // Convert to Celsius
  }
}
```

#### 4. Using the Adapter

```ts
const fahrenheitSensor = new FahrenheitSensor();
const adapter = new FahrenheitToCelsiusAdapter(fahrenheitSensor);

console.log("Celsius Temperature:", adapter.getTemperature());
```

---

### 🧠 Key Takeaways

- When you’re working with incompatible code or old libraries, the Adapter pattern helps you plug them in without rewriting them.
- It creates a clean interface for your app while keeping legacy stuff untouched.
- It’s great for working with third-party APIs or old classes with weird method names.

---

### 👁‍🗨 Adapter vs Decorator

| Feature   | Adapter                     | Decorator                  |
| --------- | --------------------------- | -------------------------- |
| Purpose   | Makes interfaces compatible | Adds behavior to an object |
| Structure | Usually wraps to translate  | Usually wraps to enhance   |
| Interface | Changes                     | Stays the same             |

---

### 🧃 Final Thoughts

The Adapter pattern is your friendly neighborhood protocol converter. When your code and someone else’s code don’t speak the same language, don’t panic — just adapt.
