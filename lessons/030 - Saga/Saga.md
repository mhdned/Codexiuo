# 📚 SAGA

**Saga** is a design pattern in **Microservices architecture** for managing **distributed transactions**.

---

## 🔧 Why Saga?

In Microservices, a single business transaction might involve multiple services. For example:

- Placing an order
- Deducting inventory
- Processing payment
- ...

If something fails in the middle (e.g., payment fails), we need a way to **roll back everything to the previous state**.

---

## 🌟 The Main Idea

Instead of a single, global transaction, Saga says:

> Treat each of these steps as a small transaction.  
> If a step fails, execute a **compensating transaction** to undo the previous step!

---

## 🎯 Two Main Saga Models

### 1️⃣ Choreography-based Saga

- Services communicate directly via events.
- When a service completes its work, it publishes the next event.
- If something goes wrong, it publishes a compensating event (e.g., OrderCancelled).

### 2️⃣ Orchestration-based Saga

- A **Saga Orchestrator** (central service) manages the entire process.
- The Orchestrator tells each service what to do next.
- If a step fails, the Orchestrator tells previous services to roll back using compensating transactions.

---

## ⚖️ Pros and Cons

✅ **Advantages**:

- Transactions are modular and easier to manage.
- Well-suited for event-driven environments.
- Avoids heavy 2PC (Two-Phase Commit) transactions.

❌ **Disadvantages**:

- More complex to design and implement.
- Requires precise coordination between services.
- Managing events and orchestrator logic can be challenging.

---

## 🪄 Conclusion

**Saga** helps us manage distributed transactions in a controlled and event-driven way.  
The key to a successful implementation is:

> Design it carefully, and ensure that **compensating transactions** are always ready to go! 🚀
