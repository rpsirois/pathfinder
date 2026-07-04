# pathfinder

A minimal, dependency-free A\* search over an arbitrary graph, plus a binary heap it builds on. Written
in [JSY](https://jsy-lang.github.io/).

## Build

```bash
npm install
npm run build
```

JSY sources in `code/` compile to CommonJS bundles in `dist/`.

## Usage

Construct an `AStar` with four functions, then call `find` with a start node:

```javascript
const planner = new AStar(heurFn, goalFn, succFn, costFn)
const path = planner.find(start)   // array of nodes start..goal, or [] if none
```

- `heurFn(node, start)` estimated remaining cost from `node` (return `0` for plain Dijkstra).
- `goalFn(node)` true when `node` is a goal.
- `succFn(node)` array of successor nodes.
- `costFn(prev, node)` cost of the edge from `prev` into `node`; `prev` is `null` for the start node.
  Return `node.weight` (ignoring `prev`) for per-node costs.

## Test

```bash
npm run build
node dist/test_astar.cjs        # spatial graph
node dist/test_astar_edges.cjs  # edge cases: greedy trap, re-parenting, no path, start is goal
```
