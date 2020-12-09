![alt text](./logo.svg "ts-prime")
### The utility library designed <span style="color: #1890ff">for TypeScript<span>.

[![Build Status](https://travis-ci.org/remeda/remeda.svg?branch=master)](https://travis-ci.org/remeda/remeda)
[![npm module](https://badge.fury.io/js/ts-prime.svg)](https://www.npmjs.org/package/ts-prime)
[![dependencies](https://david-dm.org/digimuza/ts-prime/status.svg)](https://david-dm.org/digimuza/ts-prime)

## Installation

```bash
npm i ts-prime
```

```bash
yarn add ts-prime
```

Then in .js or .ts

```typescript
import * as P from "ts-prime"; // tree-shaking supported!
```

## Why ts-prime?

There are no universal utility libraries that fits my development need. Most of development libraries did had function that I needed in day to day development.

## ts-prime Design Goals

1. The usage must be programmer friendly, and that's more important than following XYZ paradigm strictly.
2. Manual annotation should never be required, and proper typings should infer everything. The only exception is the first function in `createPipe`.
3. E6 polyfill is required. Core methods are reused, and data structure (like Map/Set) are not re-implemented.
4. The implementation of each function should be as minimal as possible. Tree-shaking is supported by default. (Do you know that `lodash.keyBy` has 14KB after minification?)
5. All functions are immutable, and there are no side-effects.
6. Fixed number of arguments.
7. Designed with typescript limitations in mind

MIT