# **CQRS**

---

### Our Story:

Imagine you have a warehouse that stores products. When a new product arrives or some quantity is removed, you don’t want to immediately update the overall stock count right away. Why? Because multiple people might try to do the same at once, the system could get overloaded, and data might get inconsistent!

What’s the solution?
You separate **write operations** (like adding or removing stock) from **read operations** (like asking “how much stock do we currently have?”).

---

### This approach is called CQRS (Command Query Responsibility Segregation):

- **Command:** Instructions that _change_ data (e.g., add or remove product quantity)
- **Query:** Requests to _read_ data (e.g., get the current stock quantity)

---

### Simple example code:

```js
// Data models (in-memory, for simplicity)
const inventoryWriteModel = {};
const inventoryReadModel = {};

// Command: record changes
function addProduct(productId, quantity) {
  if (!inventoryWriteModel[productId]) inventoryWriteModel[productId] = 0;
  inventoryWriteModel[productId] += quantity;

  // Then async update the read model
  syncReadModel(productId);
}

function removeProduct(productId, quantity) {
  if (
    !inventoryWriteModel[productId] ||
    inventoryWriteModel[productId] < quantity
  ) {
    throw new Error("Not enough stock!");
  }
  inventoryWriteModel[productId] -= quantity;

  syncReadModel(productId);
}

// Query: just read data
function getProductQuantity(productId) {
  return inventoryReadModel[productId] || 0;
}

// Simulate syncing read model with write model asynchronously
function syncReadModel(productId) {
  setTimeout(() => {
    inventoryReadModel[productId] = inventoryWriteModel[productId];
    console.log(
      `Read model updated for product ${productId}: ${inventoryReadModel[productId]}`
    );
  }, 1000);
}

// Testing CQRS
console.log("Adding 10 items of product ID 1");
addProduct(1, 10);

console.log("Current stock (read model):", getProductQuantity(1));

setTimeout(() => {
  console.log("After read model sync, stock is:", getProductQuantity(1));
}, 1500);
```

---

### Key points:

- Write model responds quickly and is responsible for recording changes
- Read model may lag a bit behind (eventual consistency)
- This makes the system more scalable and reliable
- If you want fully synchronous data, this approach might not be suitable!

---

### Summary:

CQRS is a great pattern when you want to separate _reading_ and _writing_ in your system,
especially in large projects with many requests where you don’t want data to lock or block simultaneously!
