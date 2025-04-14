# TypeScript Cheatsheet

## 1. Basic Types
- **Primitive types**:
  - `string`, `number`, `boolean`, `symbol`, `null`, `undefined`, `bigint`
- **Array**:
  ```typescript
  let arr: number[] = [1, 2, 3]
  ```
- **Tuple**:
  ```typescript
  let tuple: [string, number] = ['hello', 42]
  ```
- **Any**:
  ```typescript
  let x: any = 5
  ```
- **Unknown**:
  ```typescript
  let y: unknown = 10
  ```
- **Void**:
  ```typescript
  function foo(): void {}
  ```

## 2. Interfaces and Types
- **Interface**:
  ```typescript
  interface Person {
    name: string;
    age: number;
  }
  ```
- **Type Aliases**:
  ```typescript
  type Point = { x: number, y: number };
  ```
- **Readonly**:
  ```typescript
  type ReadonlyPoint = Readonly<{ x: number, y: number }>;
  ```

## 3. Classes
- **Class Definition**:
  ```typescript
  class Car {
    constructor(public make: string, public model: string) {}
  }
  ```
- **Access Modifiers**: `public`, `private`, `protected`
- **Getter and Setter**:
  ```typescript
  class Rectangle {
    private _width: number = 0;
    get width() { return this._width; }
    set width(value: number) { this._width = value; }
  }
  ```

## 4. Generics
- **Generic Functions**:
  ```typescript
  function identity<T>(arg: T): T {
    return arg;
  }
  ```
- **Generic Interfaces**:
  ```typescript
  interface Box<T> {
    value: T;
  }
  ```
- **Constraining Generics**:
  ```typescript
  function logLength<T extends { length: number }>(item: T): void {
    console.log(item.length);
  }
  ```

## 5. Type Assertion and Casting
- **Simple Casting**:
  ```typescript
  let value: any = "Hello";
  let str: string = value as string;
  ```
- **Casting to Specific Type**:
  ```typescript
  let input = document.querySelector('input') as HTMLInputElement;
  ```

## 6. Functions and Arrow Functions
- **Regular Function**:
  ```typescript
  function greet(name: string): string {
    return `Hello, ${name}`;
  }
  ```
- **Arrow Function**:
  ```typescript
  const add = (a: number, b: number): number => a + b;
  ```

## 7. Advanced Types
- **Union Types**:
  ```typescript
  let value: string | number = "hello";
  ```
- **Intersection Types**:
  ```typescript
  type Person = { name: string } & { age: number };
  ```
- **Mapped Types**:
  ```typescript
  type ReadOnly<T> = { readonly [K in keyof T]: T[K] };
  ```

## 8. Utility Types

- **Omit**: حذف ویژگی‌های مشخص از یک نوع
  ```typescript
  interface Person {
    name: string;
    age: number;
    address: string;
  }

  type PersonWithoutAddress = Omit<Person, 'address'>;

  const person: PersonWithoutAddress = {
    name: 'John',
    age: 30
  }
  ```

- **Pick**: انتخاب ویژگی‌های مشخص از یک نوع
  ```typescript
  type PersonName = Pick<Person, 'name'>;
  const person: PersonName = { name: 'John' };
  ```

- **Partial**: تبدیل تمام ویژگی‌ها به اختیاری
  ```typescript
  type PartialPerson = Partial<Person>;
  const person: PartialPerson = { name: 'John' };
  ```

- **Required**: تبدیل تمام ویژگی‌ها به الزامی
  ```typescript
  type RequiredPerson = Required<Person>;
  const person: RequiredPerson = { name: 'John', age: 30, address: 'Somewhere' };
  ```

- **Readonly**: تبدیل تمام ویژگی‌ها به خواندنی (غیرقابل تغییر)
  ```typescript
  type ReadonlyPerson = Readonly<Person>;
  const person: ReadonlyPerson = { name: 'John', age: 30, address: 'Somewhere' };
  // person.name = 'Alice'; // خطا: ویژگی قابل تغییر نیست
  ```

- **Record**: ایجاد تایپ‌های کلید-مقدار
  ```typescript
  type PersonRoles = Record<'admin' | 'user', Person>;
  const roles: PersonRoles = {
    admin: { name: 'Admin', age: 40, address: 'Admin Office' },
    user: { name: 'User', age: 25, address: 'User Home' }
  };
  ```

## 9. Modules and Namespaces
- **Export and Import**:
  ```typescript
  // module.ts
  export const greet = (name: string) => `Hello, ${name}`;
  
  // main.ts
  import { greet } from './module';
  console.log(greet('World'));
  ```

## 10. Async/Await and Promises
- **Async Function**:
  ```typescript
  async function fetchData(): Promise<string> {
    return "data";
  }
  ```
- **Handling Promises**:
  ```typescript
  fetchData().then(data => console.log(data));
  ```

## 11. TypeScript with Node.js
- **tsconfig.json setup**
- **Running TypeScript with ts-node**