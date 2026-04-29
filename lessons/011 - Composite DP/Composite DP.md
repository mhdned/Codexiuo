# 🧩 **Composite Pattern**

Imagine you're designing a library system. Now, each book could either be standalone or part of a collection of books. Here, we use the **Composite** pattern to manage all books (both standalone and in collections) in the same way. That means we can treat both individual books and collections of books as a single unit!

---

### 📚 **What Are We Trying to Build?**

1. **Standalone Books** (like "Book A") can be independent and have their own title.
2. **Book Collections** (like "Science Books") can contain multiple books.
3. This pattern allows us to manage both standalone books and collections as a single unit.

---

### 💻 **TypeScript Code:**

```typescript
abstract class BookComponent {
  protected parent: BookComponent | null = null;

  public setParent(parent: BookComponent | null): void {
    this.parent = parent;
  }

  public getParent(): BookComponent | null {
    return this.parent;
  }

  public add(component: BookComponent): void {}

  public remove(component: BookComponent): void {}

  public abstract getTitle(): string;
}

class Book extends BookComponent {
  private title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }
}

class BookCollection extends BookComponent {
  private children: BookComponent[] = [];

  public add(component: BookComponent): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: BookComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
      component.setParent(null);
    }
  }

  public getTitle(): string {
    const titles = this.children.map((child) => child.getTitle());
    return `Book Collection: [${titles.join(", ")}]`;
  }
}
```

---

### 🔍 **What Happened Here?**

- **Books** are the **Leaf**. They can just have a simple title, like "Book A".
- **Book Collections** are the **Composite**. They can contain multiple books, like "Science Books", which contains several individual books.
- In the end, both can be treated the same way. That means you can perform operations on both without having to treat them differently.

---

### 💡 **Why Is This Pattern So Cool?**

The **Composite** pattern lets us manage everything in a simple and unified way. It doesn’t matter whether the books are standalone or part of a collection, you can easily treat them as a single entity. This makes your code cleaner, more maintainable, and easier to extend!
