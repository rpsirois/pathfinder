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
            g: this.costFn(data)
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
                    let tempCost = current._astar_data.g + successor._astar_data.g;

                    if (tempCost < successor._astar_data.g) {
                        successor._astar_data.g = tempCost;
                        successor._astar_data.prev = current;} }
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

let start ={
    name: 'start'
  , weight: 0
  , isGoal: false
  , edges: []};

let pathA1 ={
    name: 'A1'
  , weight: 2
  , isGoal: false
  , edges: []};

let pathA2 ={
    name: 'A2'
  , weight: 10
  , isGoal: false
  , edges: []};

let pathA3 ={
    name: 'A3'
  , weight: 1
  , isGoal: false
  , edges: []};

let pathB1 ={
    name: 'B1'
  , weight: 1
  , isGoal: false
  , edges: []};

let pathB2 ={
    name: 'B2'
  , weight: 1
  , isGoal: false
  , edges: []};

let pathB3 ={
    name: 'B3'
  , weight: 12
  , isGoal: false
  , edges: []};

let goal ={
    name: 'goal'
  , weight: 0
  , isGoal: false//true
  , edges: []};

start.edges =([pathA1, pathB1]);
pathA1.edges =([start, pathA2]);
pathA2.edges =([pathA1, pathA3, pathB2]);
pathA3.edges =([pathA2, goal]);
pathB1.edges =([start, pathB2]);
pathB2.edges =([pathB1, pathB3, pathA2]);
pathB3.edges =([pathB2, goal]);
goal.edges =([pathA3, pathB3]);

const heurFn = (( node, start ) => { return 1});
const goalFn = (( node ) => { return node.isGoal});
const succFn = (( node ) => { return node.edges});
const costFn = (( node ) => { return node.weight});

let pathfinder = new AStar(heurFn, goalFn, succFn, costFn);

console.log(pathfinder.find(start));
//# sourceMappingURL=test_astar.cjs.map
