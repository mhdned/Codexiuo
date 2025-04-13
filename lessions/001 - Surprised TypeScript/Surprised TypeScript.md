# Surprised TypeScript 😳

Sometimes in programming, there are little things you *should* know, but to be honest, when you're already proficient in one language, you don’t feel like going back and reading all the keywords and features of the next stack.

This is where this part of **Codexiuo** comes to the rescue.

Today, we’re going to talk about Surprised TypeScript.  
Yes! 😐 That exclamation mark that you always thought was only used for `!true === false` and logical operators.
Maybe you knew its other uses, but hey!

---

## 1. Non-null Assertion Operator

When you're sure that a variable is definitely **not** `null` or `undefined`, but TypeScript still seems suspicious 🤨, you use `!`:

```ts
let name: string | undefined;
console.log(name!.length); 
```
You’re telling TypeScript: "Don’t worry, I know what I’m doing."

**🧠 Use case**: For example, when you're working with `document.querySelector` and you're sure that the element exists, but TS is unsure.

---

## 2. Definite Assignment Assertion

You use this when you define a variable but promise TypeScript that you'll definitely assign it a value **before you use it**.

```ts
let value!: number;

function init() {
  value = 42;
}
```

Without `!`:  
TS says: "Hmm... maybe `value` hasn't been assigned yet!"

With `!`:  
TS says: "Okay, buddy, you know what you're doing... if it blows up, it’s on you."

---

📌 By the way, most of these research steps are done with the help of AI.  
As a developer, it’s really great to be able to chat with AI and get help.  
Not only does it answer your questions faster, but it can also make your learning path much more personalized and effective.