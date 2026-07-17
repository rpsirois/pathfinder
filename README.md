# astar-minimal

A minimal, dependency-free A\* search over an arbitrary graph, plus a binary heap it builds on. Written
in [JSY](https://jsy-lang.github.io/), a syntax preprocessor for JavaScript from the
[jsy-lang](https://github.com/jsy-lang) project.

## Install

```bash
npm install astar-minimal
```

## Usage

Construct an `AStar` with four functions, then call `find` with a start node:

```javascript
import { AStar } from 'astar-minimal'

const planner = new AStar(heurFn, goalFn, succFn, costFn)
const path = planner.find(start)   // array of nodes start..goal, or [] if none
```

- `heurFn(node, start)` estimated remaining cost from `node` (return `0` for plain Dijkstra).
- `goalFn(node)` true when `node` is a goal.
- `succFn(node)` array of successor nodes.
- `costFn(prev, node)` cost of the edge from `prev` into `node`; `prev` is `null` for the start node.
  Return `node.weight` (ignoring `prev`) for per-node costs.

The binary heap `AStar` is built on is also exported, for direct use as a priority queue:

```javascript
import { Heap } from 'astar-minimal'

const heap = new Heap(scoreFn, compareFn)  // both optional; default to a min-heap over plain values
```

## Build

```bash
npm install
npm run build
```

JSY sources in `code/` compile to ES modules in `esm/`.

## Test

```bash
npm test
```

Runs `test_astar` (a spatial graph) and `test_astar_edges` (greedy trap, re-parenting, reopening a
closed node on a cheaper rediscovery, no path, start is goal, plus two cross-checks ported from
`ngraph.path`'s test suite).
