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
            g: prev ? prev._astar_data.g + this.costFn(data) : this.costFn(data)
          , h: this.heurFn(data, this.start)
          , prev};

        return data}

    _step() {
        let current = this.open.pop();
        this.closed.push(current);

        if (this.goalFn(current) ) {return this.traceback(current)}

        this.succFn( current ).forEach (( successor ) => {
            if (this.closed.indexOf( successor ) < 0) {
                if (this.open.contains(successor) ) {
                    let tempCost = current._astar_data.g + this.costFn(successor);

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
const costFn = (( n ) => { return n.weight});

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

test_greedy_trap();
test_reparent();
test_no_path();
test_start_is_goal();

if (failures) {process.exitCode = 1;}
//# sourceMappingURL=test_astar_edges.cjs.map
