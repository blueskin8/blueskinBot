# life
> tiny update function for [life-like cellular automata]

```js
import update from "life"

let world = {
  rule: { birth: [ 3 ], survival: [ 2, 3 ] },
  cells: [ 1, 0, 1, 1, 1, 2 ]
}

world.cells = update(world.cells, world.rule)
console.log(world.cells)
// -> [ 0, 1, 1, 1, 2, 1 ]
```

## usage
[![npm badge]][npm package]

### `update(cells, rule) -> result`
Receives a list of living `cells` and updates it using `rule`. Returns an updated cell list of the same form as `cells`.

* `cells`: A list of the form `[ x0, y0, x1, y1, ...xn, yn ]` where each `x, y` pair represents a living cell
* `rule`: A map of the form `{ birth: [ ...neighborCount ], survival: [ ...neighborCount ] }` indicating the outcome when those criteria are met

[npm package]:                 https://www.npmjs.com/package/life
[npm badge]:                   https://nodei.co/npm/life.png?mini
[life-like cellular automata]: https://en.wikipedia.org/wiki/Life-like_cellular_automata
