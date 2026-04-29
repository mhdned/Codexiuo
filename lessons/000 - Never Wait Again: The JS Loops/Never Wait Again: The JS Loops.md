# What's the Problem Anyway?

If you've spent a good amount of time with JavaScript, its libraries, and frameworks, you've probably run into the annoying fact that async/await with **array methods** is kind of a cruel joke.

These methods don't care about your async keywords. At best, they glance at them like, "Who let this guy in here?"

So here's the deal: I had a job interview today, and the interviewer asked me whether using `await` inside loops like `for`, `forEach`, `map`, etc., would cause any issues in the output.

The truth is, I answered correctly—but the interviewer didn’t quite buy it. Maybe it's because the way I chose to solve the problem wasn’t super elegant. It kinda felt like cheating. But hey, my answer was technically right.

When we use `await` inside array methods, it doesn't really do anything. Yep, `await` loses all its magical async powers.

Let’s see why.

---

## The async/await Problem in Array Methods (forEach, map, filter, etc.)

```js
items.forEach(async (item) => {
  await doSomethingAsync(item);
});
```

This issue comes from how these methods traverse iterables. By default, these functions are not asynchronous and don’t wait for async tasks to finish.

Try running this example and take a look at the output. It’s kinda interesting:

```js
const items = [1, 2, 3, 4];

items.forEach(async (item) => {
  console.log(item);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Done:", item);
});

console.log("End of loop");
```

In this example, the loop doesn’t wait for the logs after the setTimeout to run. It first logs the numbers 1 through 4, prints "End of loop," and *then* logs the "Done:" messages. 

That’s because in JavaScript, when you use `async` inside a callback, every time `await` is called, it returns a `Promise` that needs to be resolved. But `forEach` doesn’t care—it just moves right along to the next element without waiting.

---

## The Fix: It’s Not Hard (or Maybe a Little Fun)

The first approach is to use some good old common sense. If `forEach` doesn’t work, maybe `for` will. And that’s when things start to behave. 

If you just say, “Well, `for` works, so I’m never using `forEach` with async stuff again,” congrats! You've just been promoted to Code Mason—a developer who's more into patching cracks than engineering real solutions.

```js
for (let item of items) {
  await doSomethingAsync(item);
}
```

But hey, if you’ve caught the bug and just *have* to use array methods, here’s option two. Not saying it’s better or faster—your use case decides that. Just know you can wrap those async calls with `Promise.all`:

```js
await Promise.all(items.map(item => doSomethingAsync(item)))
```

