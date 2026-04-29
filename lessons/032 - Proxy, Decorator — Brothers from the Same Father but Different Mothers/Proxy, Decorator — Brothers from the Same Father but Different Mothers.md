# Proxy, Decorator — Brothers from the Same Father but Different Mothers

In the modern world of JavaScript and TypeScript, some features work like backstage characters in a play. They may not be in the spotlight, but without them, the whole show falls apart. Today, let’s explore three of these: **Proxy**, **Reflect**, and **Decorator** — and how they come together in NestJS to deliver a powerful framework.

---

## 🪞 What Are Proxy and Reflect, Anyway?

### Proxy

Introduced in ECMAScript 2015 (ES6), `Proxy` allows you to intercept and customize operations performed on objects, like property access, assignment, deletion, etc.

```ts
const target = { name: "Ali" };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`Getting ${prop}`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
});
```

### Reflect

Introduced alongside Proxy, `Reflect` provides a standard API for performing low-level object operations — basically a companion to Proxy.

```ts
Reflect.get(obj, "name");
Reflect.set(obj, "name", "Reza");
```

> 🧠 Reflect allows Proxies to work in a cleaner, more standardized way.

---

## 🤵‍♂️ What’s a Decorator and How Is It Different from Proxy?

**Decorators** in TypeScript are a special syntax used to attach metadata to classes, methods, or properties. Unlike Proxy, which operates at runtime, decorators are triggered at **definition time**.

```ts
function Logger(target: any) {
  console.log("Logging target:", target.name);
}

@Logger
class User {}
```

### Key Differences Between Proxy and Decorator

| Feature        | Proxy                   | Decorator                      |
| -------------- | ----------------------- | ------------------------------ |
| Execution Time | Runtime                 | Class Definition Time          |
| Scope          | Every object access     | Metadata or dependency marking |
| Language Spec  | Native (ES6)            | TS-only / Experimental         |
| Typical Use    | Access control, logging | DI, routing, metadata          |

---

## 🔍 Deep Dive in NestJS: Reflect, Proxy, and Decorators at Work

NestJS makes heavy use of all three — often behind the scenes. Let’s explore some real use cases:

### 1. Dependency Injection (DI)

Nest uses decorators like `@Injectable`, `@Controller` to mark classes, and stores metadata using `Reflect.defineMetadata()`. Later, it reads that metadata to inject dependencies.

```ts
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}
}
```

### 2. Interceptors

Interceptors are classes that sit between the request and response. Much like Proxies, they wrap logic and can add behavior before or after handlers.

```ts
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  console.log('Before handler...');
  return next.handle().pipe(tap(() => console.log('After handler...')));
}
```

Behind the scenes, Nest uses Proxy-like logic to wrap the handler and allow interceptors to do their thing.

### 3. Guards, Pipes, and Filters

All these use decorators to mark routes or classes. Nest reads the metadata using Reflect and applies the relevant logic at runtime.

```ts
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}
```

### 4. Routing and Handler Mapping

Decorators like `@Get()`, `@Post()` attach metadata to methods. Nest uses Reflect to map those methods to routes.

```ts
@Get('users')
findAll() {}
```

---

## 📚 Summary: Who’s Good at What?

| Tool      | Best For                       | When to Use                            |
| --------- | ------------------------------ | -------------------------------------- |
| Proxy     | Dynamic behavior at runtime    | Logging, validation, security, mocking |
| Reflect   | Metadata operations on objects | Reading/writing decorator metadata     |
| Decorator | Marking classes or methods     | DI, validation, routing, interceptors  |

---

## 🧪 The Final Verdict: Same Father, Different Mothers

While Proxy, Reflect, and Decorators each have their own story, in NestJS they work together to create a powerful, modular framework.

So the next time a route magically works or a dependency is injected automagically, remember — behind the scenes, a crew of clever tools (Proxy, Reflect, and Decorator) are pulling the strings. 😄

---

🧵 Want to see a deeper practical example with Proxy or a custom NestJS Interceptor? Just say the word and I’ll whip one up for you ✌️
