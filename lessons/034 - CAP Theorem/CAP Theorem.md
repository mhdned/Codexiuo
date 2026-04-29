# 🌩️ CAP Theorem

> A Codexiuo chapter for developers who think distributed systems are magic…  
> until they realize it’s mostly *choosing which thing to sacrifice today*.

---

## ⚡ Part 1: CAP — The “Pick Two, Cry Later” Rule

### 🧠 What Is CAP?

In a distributed system, you cannot have all three of these at the same time:

- **C**onsistency — everyone sees the same data  
- **A**vailability — the system always replies  
- **P**artition Tolerance — system survives network chaos

You can only pick **two**.  
The third one goes to the Shadow Realm.

---

## 🍔 The Burger Analogy

Imagine ordering a burger from a chain restaurant.

### ✔ Consistency  
Every branch gives you **the exact same burger** — no surprises.

### ✔ Availability  
Every branch is **always open** — even at 3AM when life hurts.

### ✔ Partition Tolerance  
Even if the branches can’t talk to each other, the system keeps running.

CAP Theorem says:

> “Sorry bro, pick two.  
> You can’t have 3AM burgers that are identical everywhere during a WiFi apocalypse.”

---

## 🔥 Part 2: The Three Actual Combos

### 1. **CP — Consistency + Partition Tolerance**  
When the network breaks, the system becomes a diva:

- “I won’t respond until I’m sure data is correct.”  
- Very strict. Zero gossip allowed.

Use when:
- banking
- inventory
- “money should not duplicate magically” situations

Products:
- MongoDB (CP mode)
- HBase
- Zookeeper

---

### 2. **AP — Availability + Partition Tolerance**  
When the network breaks, the system goes:

- “I’ll respond anyway, even if data is a little spicy 🔥”

Use when:
- social media feeds
- analytics dashboards
- caching

Products:
- Cassandra
- DynamoDB
- Redis (cluster mode)

---

### 3. **CA — Consistency + Availability**  
Only exists in **non‑distributed** systems.  
If there's no network to ruin your day, you get both.

Example:
- Single‑instance SQL database
- Local file system

---

## 🧪 TL;DR – Codexiuo Summary

| Pick This | Lose This |
| --------- | --------- |
| CP        | Availability |
| AP        | Consistency |
| CA        | Partition Tolerance (aka not distributed) |

---

## 🧙 Codexiuo Meta Tip:

> The moment you shard your database, deploy to the cloud, or add “microservices” because it sounds cool…  
> **CAP becomes your new boss.**