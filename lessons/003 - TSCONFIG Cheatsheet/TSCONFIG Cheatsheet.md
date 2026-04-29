# ⚙️ `tsconfig.json` Cheatsheet

This is the configuration file TypeScript uses to know how to behave. Below is a solid and common setup for most projects:

```json
{
  "compilerOptions": {
    "target": "ES2020",              // Output JS version: ES5, ES6, ES2020, ...
    "module": "CommonJS",            // Module system: CommonJS, ESNext, UMD, ...
    "rootDir": "./src",              // Where your TypeScript source lives
    "outDir": "./dist",              // Where compiled JS files go
    "strict": true,                  // Enable all strict type checks
    "esModuleInterop": true,         // Allow default imports from CommonJS modules
    "forceConsistentCasingInFileNames": true, // Case-sensitive file imports
    "skipLibCheck": true,            // Skip type checks for .d.ts files
    "moduleResolution": "node",      // Use Node's module resolution strategy
    "allowJs": true,                 // Let JS files coexist with TS
    "resolveJsonModule": true        // Allow importing `.json` files
  },
  "include": ["src"],                // Only compile files in this folder
  "exclude": ["node_modules", "dist"] // Ignore these folders
}
```

## 🧠 Quick Explanation of Each Option

| Option | Description |
|--------|-------------|
| `target` | JS version TypeScript will compile to (e.g. ES2020) |
| `module` | How modules are handled in compiled code |
| `rootDir` | Where your `.ts` files live |
| `outDir` | Where the compiled `.js` goes |
| `strict` | Enables all the strictest checks for better type safety |
| `esModuleInterop` | Makes importing non-TS packages smoother |
| `forceConsistentCasingInFileNames` | Avoid issues on case-sensitive systems |
| `skipLibCheck` | Skip type checking on declaration files to speed up build |
| `moduleResolution` | Defines how modules get resolved (Node style recommended) |
| `allowJs` | Include `.js` files in compilation (handy in migration) |
| `resolveJsonModule` | Allows `import data from './data.json'` to work |
