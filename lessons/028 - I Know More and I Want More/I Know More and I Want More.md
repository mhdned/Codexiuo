# I Know More and I Want More

There’s a bunch of stuff I want to keep handy for myself, especially when working with libraries and dependencies that don’t have built-in or well-supported types.

## What’s the story?

For instance, in Express, when you want to add a new property to `Request`, you need to use declaration merging. This means you’d define it in a `d.ts` file (like `express.d.ts` or `global.d.ts`):

```ts
declare namespace Express {
  export interface Request {
    userId?: string;
  }
}
```

But here’s the catch:

🔴 **VS Code** is awesome and quickly picks up these changes.
🟡 **ts-node** can be stubborn and won’t recognize changes in declarations, especially if it’s already built its cache.

## What’s the problem?

`ts-node` usually caches the output of your `.ts` files. When you run a file:

- It transpiles the file and stores the output in a temporary location.
- If the content doesn’t change on the next run, `ts-node` reuses the cache.

❌ But this caching only checks `.ts` file contents. By default, it doesn’t pick up changes in declaration files (`.d.ts`) or even `tsconfig.json`.

## The solution?

✅ Use this command:

```bash
ts-node --files src/index.ts
```

The `--files` flag tells it to load everything in `tsconfig`, including declarations, and rebuild the cache.

✅ Or manually clear the cache or find the cache folder.

✅ Or use plugins like:

```bash
NODE_OPTIONS="--require ts-node/register --require tsconfig-paths/register" ts-node src/index.ts
```

## In summary

- In TypeScript projects (especially when extending Express), always keep an eye on the `ts-node` cache.
- VS Code sees the changes perfectly, but the actual runtime (ts-node or even `tsc`) sometimes doesn’t because of caching.
- Don’t forget the `--files` flag!

🟢 Now you can easily add your desired properties to Express.Request and run your project without a hitch! ✨🚀
