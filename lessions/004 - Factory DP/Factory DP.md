# Factory Design Pattern

Design patterns are an essential part of knowledge that every programmer working with OOP should know. Therefore, in **Codexiuo**, I decided to start by reviewing these **design patterns** and write a small article to teach them.

## What is the Factory's Role?

You see, when we want to use several different types of a tool we have and create models from them over and over again, we no longer need to define a set of properties and methods all the time. Here's an example.

We have two car models:

- Regular 4-door **Sedan**
- **SUV**

Imagine both of these cars are produced in a factory.

We will have something like this:

```typescript
interface Car {
  drive(): void;
}

class Sedan implements Car {
  drive(): void {
    console.log("Driving a sedan...");
  }
}

class SUV implements Car {
  drive(): void {
    console.log("Driving an SUV...");
  }
}
```

Here, we are producing many different models of these types of cars. Imagine we also have **SUV model 110**, **model 115**, and **model 120**. This is where **Factory** helps us.

Here, we delegate the object creation to another class, so we don’t repeatedly write the same code to create different cars. **Factory** helps us manage the creation of different cars and keeps our code cleaner and more scalable.

## Implementing the Factory

Now, we want to avoid manually creating cars in every part of the program. Instead, we delegate this task to specific classes that have the **Factory Method**.

To do this, we define a **CarFactory** class that implements the `createCar` method to create cars. Each car type has its own class that uses this method.

```typescript
abstract class CarFactory {
  abstract createCar(): Car;

  startDrive(): void {
    const car = this.createCar();
    car.drive();
  }
}

class SedanFactory extends CarFactory {
  createCar(): Car {
    return new Sedan();
  }
}

class SUVFactory extends CarFactory {
  createCar(): Car {
    return new SUV();
  }
}
```

Now, here, we can easily create cars without knowing their details.

```typescript
const sedanFactory = new SedanFactory();
sedanFactory.startDrive(); // Output: Driving a sedan...

const suvFactory = new SUVFactory();
suvFactory.startDrive(); // Output: Driving an SUV...
```

## Why Should We Use a Factory?

1. **Reducing Complexity:** Instead of writing repetitive code to create different objects, we delegate this task to specific classes.
2. **Increasing Scalability:** If we need to add new cars, we can simply add a new Factory class without changing existing code.
3. **Creating Abstraction:** We remain unaware of the object creation details and only interact with the factory that has the `createCar` method.

## Conclusion

The **Factory Method** pattern is a great solution for creating objects in complex programs where there’s a need to produce different types of objects. This pattern makes the code cleaner, more scalable, and more flexible. I hope this article has helped you better understand this pattern and how to use it in your projects.
