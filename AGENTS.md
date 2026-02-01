# Agent Development Guide

## Build Commands

### Development

* `pnpm dev` - Run all packages in parallel (development mode)
* `pnpm dev:p` - Run im-chibivue playground only
* `pnpm dev:a` - Run original playground only

### Building

* `pnpm build` - Build the im-chibivue main package
* `pnpm build.shared` - Build playground-shared package

### Type Checking & Linting

* `pnpm type-check` - Type check all packages in parallel
* `oxlint` - Run linter (uses oxlint with tsgolint rules)
* `oxfmt` - Format code (uses oxfmt formatter)

### Other Useful Commands

* `pnpm knip` - Find unused dependencies and exports
* `pnpm nolyfill` - Remove Node.js polyfills from dependencies

## Code Style Guidelines

### Formatting

* **Indentation**: 2 spaces (never tabs)
* **Line endings**: LF only
* **Encoding**: UTF-8
* **No trailing whitespace**
* **File must end with newline**
* **Formatter**: oxfmt with experimental import sorting enabled

### Naming Conventions

**Variables & Functions**: camelCase

```ts
const activeEffect: ReactiveEffect | undefined;
function createComponentInstance(vnode: VNode): ComponentInternalInstance {
```

**Classes & Interfaces**: PascalCase

```ts
export class ReactiveEffect<T = any> {}
export interface App<HostElement = any> {}
```

**Types & Type Aliases**: PascalCase

```ts
export type VNodeTypes = string | TextNodeSymbol | object;
export type Dep = Set<ReactiveEffect>;
```

**Constants**: UPPER\_SNAKE\_CASE for module-level constants

```ts
export const TextNode: unique symbol = Symbol();
```

**Package Names**: kebab-case with scope

```ts
@im-chibivue/im-chibivue-playground
```

**Function Names**: Descriptive, action-oriented

```ts
mountElement, mountComponent, patchChildren, track, trigger
```

### Import/Export Style

**Type imports**: Prefer `import type` for type-only imports

```ts
import type { ReactiveEffect } from "../reactivity";
import type { ComponentOptions } from "./componentOptions";
```

**Value imports**: Regular import for values

```ts
import { createVNode } from "./vnode";
import { mutableHandlersMaker } from "./baseHandler";
```

**Type exports**: Explicitly export types

```ts
export type { App, CreateAppFunction } from "./apiCreateApp";
export type { RendererOptions } from "./renderer";
```

**Index files**: Each package has an index.ts for public API

```ts
export { createAppAPI } from "./apiCreateApp";
export type { App, CreateAppFunction } from "./apiCreateApp";
```

### TypeScript Conventions

**Generics**: Use descriptive single-letter or multi-letter generics

```ts
export function reactive<T extends object>(target: T): T {}
export type RootRenderFunction<HostElement = RendererElement> = ...
```

**Type annotations**: Explicit return types for exported functions

```ts
export function track(target: object, key: PropertyKey): void {}
export function reactive<T extends object>(target: T): T {}
```

**Non-null assertions**: Use sparingly, only when safe

```ts
hostParentNode(prevTree.el!)!
```

**Type guards**: Use conditional checks and type assertions when needed

```ts
/** @assert n1 is VNodeText | null, n2 is VNodeText */
processText(n1 as VNodeText | null, n2 as VNodeText, container);
```

### Error Handling

**Early returns**: Use early returns for guard clauses

```ts
if (!depsMap) return;
if (!container) return;
```

**Optional chaining**: For safe property access

```ts
const { render } = instance;
```

**Silent failures**: Prefer early returns over throwing errors

```ts
if (!container) return;  // Silent fail
```

### Comments & Documentation

**JSDoc**: Use for complex functions and types

```ts
/**
 * @desc target(WeakMap) -> key(Map) -> dep(Set)
 */
/**
 * @desc write bail!
 */
```

**Section markers**: Use MARK: or // #region for logical sections

```ts
// MARK: ReactiveEffect
```

**Ignore tags**: For symbols/methods that shouldn't be documented

```ts
/**
 * @ignore
 */
get [Symbol.toStringTag]() {
  return "ReactiveEffect";
}
```

### File Organization

**Package structure**: Each package is self-contained with index.ts

```
packages/
  runtime-core/    # Core rendering logic
  runtime-dom/     # DOM-specific operations
  reactivity/      # Reactive system
  shared/          # Shared utilities
```

**Module exports**: Index files aggregate exports

```ts
export { createAppAPI } from "./apiCreateApp";
export type { App, CreateAppFunction } from "./apiCreateApp";
```

**File naming**: camelCase for TypeScript files

```
component.ts, renderer.ts, vnode.ts, apiCreateApp.ts
```

## Project-Specific Patterns

**Module-level state**: Use module-scope variables for singletons

```ts
export let activeEffect: undefined | ReactiveEffect;
const targetMap = new WeakMap<any, KeyToDepMap>();
```

**Factory functions**: Create renderer instances with options

```ts
export function createRenderer(options: RendererOptions): {
  render: RootRenderFunction<RendererElement>;
}
```

**Proxy-based reactivity**: Use Proxy for reactive objects

```ts
export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy<T>(target, mutableHandlersMaker<T>(reactive));
  return proxy;
}
```

**Effect system**: Track-trigger pattern for reactivity

```ts
export function track(target: object, key: PropertyKey): void {}
export function trigger(target: object, key?: PropertyKey): void {}
```

## Important Notes

* **No tests**: This codebase does not currently have test files
* **Monorepo**: Uses pnpm workspaces with Turbo for task orchestration
* **Bundler**: Uses Rolldown (experimental bundler) for building
* **TypeScript**: Strict typing required, use `import type` for type-only imports
* **Formatter**: Always run `oxfmt` before committing (automatic import sorting)
* **Linter**: Run `oxlint` to catch issues
* **Type checking**: Run `pnpm type-check` before major changes
