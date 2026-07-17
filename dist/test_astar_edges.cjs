'use strict';

function defaultScoreFn( x ) {return x}
function defaultCompareFn( a, b ) {return a < b}

class Heap {
    constructor( scoreFn=defaultScoreFn, compareFn=defaultCompareFn ) {
        this.contents = [];
        this.scoreFn = scoreFn;
        this.compareFn = compareFn;}

    toString() {
        return this.contents}

    size() {
        return this.contents.length}

    contains( item ) {
        return this.contents.indexOf( item ) >= 0}

    peek() {
        return this.contents[0]}

    remove( node ) {
        const next = (( idx ) => {
            if (this.size() == 0) {return null}

            if (this.contents[idx] == node) {
                let endNode = this.contents.pop();

                if (node === endNode) {
                    return node}

                this.contents[idx] = endNode;
                this.bubbleUp(idx);
                this.sinkDown(idx);
                return node}
            else
                if (this.size() - 1 == idx) {
                    return null}

                return next(idx + 1) });

        return next(0) }

    update( node ) {
        const idx = this.contents.indexOf(node);

        if (idx < 0) {return null}

        this.bubbleUp(idx);
        this.sinkDown(idx);
        return node}

    push( nodes ) {
        if (!Array.isArray(nodes) ) {
            nodes =([nodes]); }

        nodes.forEach (( node ) => {
            this.contents.push(node);
            this.bubbleUp(this.size() - 1); } );

        return nodes}

    pop() {
        let result = this.contents[0];
        let end = this.contents.pop();

        if (this.size() > 0) {
            this.contents[0] = end;
            this.sinkDown(0); }

        return result}

    swap( a, b ) {
        const t = this.contents[a];

        this.contents[a] = this.contents[b];
        this.contents[b] = t;

        return a}

    getIndexScore( index ) {
        return this.scoreFn(this.contents[index]) }

    getParentIndex( index ) {
        return Math.floor( (index + 1) / 2 ) - 1}

    bubbleUp( index ) {
        if (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.compareFn(this.getIndexScore( index ), this.getIndexScore( parentIndex )) ) {
                this.bubbleUp(this.swap(parentIndex, index)); } } }

    sinkDown( parentIndex ) {
        if (parentIndex < this.size()) {
            const parentScore = this.getIndexScore(parentIndex);
            const rightIndex = ( parentIndex + 1 ) * 2;
            const leftIndex = rightIndex - 1;
            let swapIdx;

            if (leftIndex < this.size()) {
                let leftIndexScore = this.getIndexScore(leftIndex);

                if (this.compareFn(leftIndexScore, parentScore) ) {
                    swapIdx = leftIndex;} }

            if (rightIndex < this.size()) {
                let leftIndexScore = this.getIndexScore(leftIndex);
                const rightIndexScore = this.getIndexScore(rightIndex);

                if (this.compareFn(rightIndexScore, ( swapIdx !== undefined ? leftIndexScore : parentScore )) ) {
                    swapIdx = rightIndex;} }

            if (swapIdx !== undefined) {
                this.sinkDown(this.swap(swapIdx, parentIndex)); } } } }

class AStar {
    constructor( heurFn, goalFn, succFn, costFn ) {
        this.heurFn = heurFn;
        this.goalFn = goalFn;
        this.succFn = succFn;
        this.costFn = costFn;}

    _nodeify( data, prev=null ) {
        data._astar_data ={
            g: prev ? prev._astar_data.g + this.costFn(prev, data) : this.costFn(null, data)
          , h: this.heurFn(data, this.start)
          , prev};

        return data}

    _step() {
        let current = this.open.pop();
        this.closed.push(current);

        if (this.goalFn(current) ) {return this.traceback(current)}

        this.succFn( current ).forEach (( successor ) => {
            let closedIdx = this.closed.indexOf( successor );

            if (closedIdx >= 0) {
                let tempCost = current._astar_data.g + this.costFn(current, successor);

                if (tempCost < successor._astar_data.g) {
                    this.closed.splice(closedIdx, 1);
                    successor._astar_data.g = tempCost;
                    successor._astar_data.prev = current;
                    this.open.push(successor); } }
            else {
                if (this.open.contains(successor) ) {
                    let tempCost = current._astar_data.g + this.costFn(current, successor);

                    if (tempCost < successor._astar_data.g) {
                        successor._astar_data.g = tempCost;
                        successor._astar_data.prev = current;
                        this.open.update(successor); } }
                else {
                    this.open.push(this._nodeify(successor, current)); } } });

        if (this.open.size() == 0) {return []}

        return this._step()}

    find( start ) {
        this.start = start;
        this.open = new Heap (( node ) => { return node._astar_data.g + node._astar_data.h});
        this.closed = [];

        this.open.push(this._nodeify(this.start));

        return this._step()}

    traceback( goal ) {
        let path =([goal]);
        let trace = (( node ) => {
            if (node._astar_data.prev) {
                path.push(node._astar_data.prev);
                trace(node._astar_data.prev); } });

        trace(goal);
        path.reverse();

        return path.map (( node ) => {
            delete node._astar_data;
            return node}) } }

let failures = 0;

function check( label, actual, expected ) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);

    if (a === e) {
        console.log(`PASS ${ label }`); }
    else {
        failures += 1;
        console.log(`FAIL ${ label } - expected ${ e }, got ${ a }`); } }

function node( name, weight, h=0 ) {
    return {name, weight, h, isGoal: false, edges: []} }

const heurFn = (( n ) => { return n.h});
const goalFn = (( n ) => { return n.isGoal});
const succFn = (( n ) => { return n.edges});
const costFn = (( prev, n ) => { return n.weight});

function findNames( start ) {
    const planner = new AStar(heurFn, goalFn, succFn, costFn);
    return planner.find( start ).map(n => n.name) }

// A chain of individually cheap nodes totals 5; the pricier pair totals 4.
// Greedy best-first on node weight takes the t-chain; real A* takes the b-route.
function test_greedy_trap() {
    const start = node('start', 0);
    const t1 = node('t1', 1);
    const t2 = node('t2', 1);
    const t3 = node('t3', 1);
    const t4 = node('t4', 1);
    const t5 = node('t5', 1);
    const b1 = node('b1', 2);
    const b2 = node('b2', 2);
    const goal = node('goal', 0);
    goal.isGoal = true;

    start.edges =([t1, b1]);
    t1.edges =([t2]);
    t2.edges =([t3]);
    t3.edges =([t4]);
    t4.edges =([t5]);
    t5.edges =([goal]);
    b1.edges =([b2]);
    b2.edges =([goal]);

    check('greedy trap: picks cheapest total path', findNames(start), [ 'start', 'b1', 'b2', 'goal' ]); }

// The inflated h on p1 pops p2 first, so mid enters the open set with
// prev=p2 (g=3). Popping p1 later must re-parent mid to g=2 while it is
// still open. Costs here are per-node, so with h=0 pops occur in
// nondecreasing g order and this branch could never fire.
function test_reparent() {
    const start = node('start', 0);
    const p1 = node('p1', 1, 3);
    const p2 = node('p2', 2);
    const mid = node('mid', 1, 5);
    const goal = node('goal', 0);
    goal.isGoal = true;

    start.edges =([p1, p2]);
    p1.edges =([mid]);
    p2.edges =([mid]);
    mid.edges =([goal]);

    check('reparent: cheaper late route re-parents open node', findNames(start), [ 'start', 'p1', 'mid', 'goal' ]); }

function test_no_path() {
    const start = node('start', 0);
    const dead = node('dead', 1);

    start.edges =([dead]);
    dead.edges =([start]);

    check('no path: returns empty array', findNames(start), []); }

function test_start_is_goal() {
    const start = node('start', 0);
    start.isGoal = true;

    check('start is goal: returns just the start node', findNames(start), [ 'start' ]); }

// a's deflated h (-10) pops it right after start, closing c via the expensive
// route (g=11) before the b/mid branch is ever explored - c's own deflated h
// (-11) pops it too, right behind a. b then pops (f=1), reaches mid (f=3),
// and mid's edge back into the already-closed c costs g=4 - cheaper than c's
// closed g of 11. Without reopening closed nodes, that discovery is
// discarded and the plan keeps the expensive a route; with reopening, c (and
// then goal) get relaxed again and the cheaper b/mid/c route wins.
function test_reopen_closed() {
    const start = node('start', 0);
    const a = node('a', 10, -10);
    const b = node('b', 1);
    const mid = node('mid', 2);
    const c = node('c', 1, -11);
    const goal = node('goal', 0);
    goal.isGoal = true;

    start.edges =([a, b]);
    a.edges =([c]);
    b.edges =([mid]);
    mid.edges =([c]);
    c.edges =([goal]);

    check('reopen: cheaper route through a closed node wins', findNames(start), [ 'start', 'b', 'mid', 'c', 'goal' ]); }

// Ported from ngraph.path's aStar suite ("works with default config": a->b,
// b->c, b->d, c->d, unweighted). Cross-checks plain connectivity against a
// different maintainer's implementation, independent of our own fixtures.
function test_ngraph_diamond() {
    const a = node('a', 0);
    const b = node('b', 1);
    const c = node('c', 1);
    const d = node('d', 1);
    c.isGoal = true;

    a.edges =([b]);
    b.edges =([c, d]);
    c.edges =([d]);

    check('ngraph cross-check: diamond graph connectivity', findNames(a), [ 'a', 'b', 'c' ]); }

// Ported from ngraph.path's aStar suite ("finds weighted paths": a-b w10,
// a-c w10, c-d w5, b-d w10, expects a-c-d). Unlike our other tests, cost
// lives on the edge rather than the destination node, so this needs its own
// cost function reading the edge that was actually traversed.
function test_ngraph_weighted_path() {
    function edgeNode( name ) {return {name, links: []}}
    function link( from, to, weight ) {from.links.push({to, weight} );}

    const a = edgeNode('a');
    const b = edgeNode('b');
    const c = edgeNode('c');
    const d = edgeNode('d');

    link(a, b, 10);
    link(a, c, 10);
    link(c, d, 5);
    link(b, d, 10);

    const edgeHeurFn = (n) => 0;
    const edgeGoalFn = (n) => n === d;
    const edgeSuccFn = (n) => n.links.map( l => l.to );
    const edgeCostFn = (prev, n) => prev ? prev.links.find( l => l.to === n ).weight : 0;

    const planner = new AStar(edgeHeurFn, edgeGoalFn, edgeSuccFn, edgeCostFn);
    const names = planner.find(a).map(n => n.name);

    check('ngraph cross-check: weighted path prefers cheaper edge route', names, [ 'a', 'c', 'd' ]); }

test_greedy_trap();
test_reparent();
test_no_path();
test_start_is_goal();
test_reopen_closed();
test_ngraph_diamond();
test_ngraph_weighted_path();

if (failures) {process.exitCode = 1;}
//# sourceMappingURL=test_astar_edges.cjs.map
