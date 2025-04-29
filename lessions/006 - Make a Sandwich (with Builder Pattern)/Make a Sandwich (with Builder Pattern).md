## 📄 006 - Make a Sandwich (with the Builder Pattern)

**Tags:** `#DesignPattern` `#Builder` `#TypeScript` `#GoMakeASandwich`

---

### 📌 Summary

> Whenever building something gets so complex that you say, _“I have no idea where to start,”_ that’s your cue: **call in the Builder Pattern.**  
> Builder means: “Build it step by step, and make it flexible enough so you can create different versions of the same thing—without your brain melting.”

---

### 🍔 Scenario: Building a Sandwich

You walk into a sandwich shop. The order taker asks:

> “Would you like a simple sandwich, our signature club, or something custom?”

You respond:

> “Give me a custom one—with rye bread, falafel, hotdog, hot sauce, and absolutely no pickles.”

They smile and send your order to the sandwich wizard in the back—who just happens to work using the **Builder Pattern**.

---

## 🔧 TypeScript Code – As always, now with extra sauce 😋

### 🧱 Step 1: The Sandwich model

```ts
class Sandwich {
  private parts: string[] = [];

  addPart(part: string) {
    this.parts.push(part);
  }

  listParts() {
    console.log("🥪 Sandwich parts: " + this.parts.join(", "));
  }
}
```

---

### 👷‍♀️ Step 2: The Builder interface

```ts
interface SandwichBuilder {
  reset(): void;
  addBread(): void;
  addProtein(): void;
  addSauce(): void;
  addExtras(): void;
}
```

---

### 🧑‍🍳 Step 3: A real sandwich builder

```ts
class ClubSandwichBuilder implements SandwichBuilder {
  private sandwich: Sandwich;

  constructor() {
    this.reset();
  }

  reset() {
    this.sandwich = new Sandwich();
  }

  addBread() {
    this.sandwich.addPart("Whole Wheat Bread");
  }

  addProtein() {
    this.sandwich.addPart("Grilled Chicken");
  }

  addSauce() {
    this.sandwich.addPart("Honey Mustard");
  }

  addExtras() {
    this.sandwich.addPart("Lettuce");
    this.sandwich.addPart("Tomato");
    this.sandwich.addPart("No Pickles");
  }

  getSandwich(): Sandwich {
    const result = this.sandwich;
    this.reset();
    return result;
  }
}
```

---

### 🎬 Step 4: The Sandwich Director

```ts
class SandwichDirector {
  private builder: SandwichBuilder;

  setBuilder(builder: SandwichBuilder) {
    this.builder = builder;
  }

  makeSimpleSandwich() {
    this.builder.addBread();
    this.builder.addProtein();
  }

  makeFullSandwich() {
    this.builder.addBread();
    this.builder.addProtein();
    this.builder.addSauce();
    this.builder.addExtras();
  }
}
```

---

### 🧪 Step 5: The Sandwich-Eating Client

```ts
const director = new SandwichDirector();
const builder = new ClubSandwichBuilder();

director.setBuilder(builder);

console.log("👉 Simple sandwich:");
director.makeSimpleSandwich();
builder.getSandwich().listParts();

console.log("\n👉 Full club sandwich:");
director.makeFullSandwich();
builder.getSandwich().listParts();

console.log("\n👉 Custom sandwich (no director):");
builder.addBread();
builder.addProtein();
builder.addExtras();
builder.getSandwich().listParts();
```

---

## 🧠 Tips for Hungry Developers

- You _can_ use a `Director`, but you don’t have to. If you're picky, just go custom.
- Builder is perfect when you want to **build different versions of a complex object**.
- The internal structure can vary without changing the overall process.

---

## 📚 Where Can You Use This Pattern?

- Generating PDFs with different layouts, images, and signatures
- Building complex ORM queries step-by-step
- Creating dynamic UIs with lots of optional elements
- And obviously... **Sandwiches.**

---

## 🔚 Conclusion (and a Bite)

The Builder Pattern is like a master chef who knows how to turn basic ingredients into customized masterpieces.  
Use it to keep your code clean, flexible, and tasty.
