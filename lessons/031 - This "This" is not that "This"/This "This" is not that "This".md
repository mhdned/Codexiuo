# This "This" is not that "This"!

When building an awesome package with `Node.js` and `TypeScript`, you might run into an old story:
**"Who the heck is this `this`?!"**

---

### The Problem

Imagine you have a nice class:

```ts
class MyTool {
  constructor(private name: string) {}
  doSomething() {
    console.log(this.name);
  }
}
```

And somewhere in your program, you use this class:

```ts
const tool = new MyTool("Codexiuo");

program.command("run").action(tool.doSomething); // 💥
```

So far, so good… but when you run it, you see `undefined`! Why?

---

### The Secret: Callbacks lose their context

In JavaScript, when you pass a class method **directly** as a callback (like `.action`), it **loses its connection to the class**.
**That means `this` no longer points to the instance and can become `undefined` or something weird!**

---

### The Solution

🚀 There are two well-known solutions:

#### 1️⃣ Use `.bind()`

```ts
program.command("run").action(tool.doSomething.bind(tool));
```

This **binds** `this` to `tool`, and it’s good to go!

#### 2️⃣ Use an Arrow Function

```ts
class MyTool {
  constructor(private name: string) {}
  doSomething = () => {
    console.log(this.name);
  };
}
```

Arrow functions always **lock** `this` to the instance. No need for `.bind()` here.

---

### Question: Does `.bind()` cause problems?

✅ Nope! `.bind()` just creates a new version of your method that **always** uses the correct `this`.
✅ It’s actually the **standard** and **safe** way.
✅ The only note: each time you call `.bind()`, it creates a new reference (but for this use case, that’s fine).

---

### Conclusion

🎯 Whenever you pass a class method as a callback, make sure to either **bind it with `.bind(instance)`** or **use an arrow function**.

💡 So next time you see a class property becoming `undefined`, remember the tale of the **Lost "This"**!
