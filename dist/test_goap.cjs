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
        const next = ( idx ) => {
            if (this.size() == 0) {return null}

            if (this.contents[idx] == node) {
                let endNode = this.contents.pop();
                if (node === endNode) {
                    return node}
                else {
                    this.contents[idx] = endNode;
                    this.bubbleUp(idx);
                    this.sinkDown(idx);
                    return node} }
            else
                if (this.size() - 1 == idx) {
                    return null}
                else {
                    return next(idx + 1) } };

        return next(0) }

    push( nodes ) {
        console.log('push');
        if (!Array.isArray(nodes) ) {
            nodes =([nodes]); }

        nodes.forEach (( node ) => {
            this.contents.push(node);
            this.bubbleUp(this.size() - 1); } );

        return nodes}

    pop() {
        console.log('pop');
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
        return Math.floor((index - 1) / 2) }

    bubbleUp( index ) {
        if (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.compareFn(this.getIndexScore( index ), this.getIndexScore( parentIndex )) ) {
                this.bubbleUp(this.swap(parentIndex, index)); } } }

    sinkDown( parentIndex ) {
        if (parentIndex < this.size()) {
            const parentScore = this.getIndexScore(parentIndex);
            const rightIndex = parentIndex * 2 + 2;
            const leftIndex = parentIndex * 2 + 1;
            let swapIdx;

            const leftIndexScore = this.getIndexScore(leftIndex);

            if (leftIndex < this.size()) {
                if (this.compareFn(leftIndexScore, parentScore) ) {
                    swapIdx = leftIndex;} }

            if (rightIndex < this.size()) {
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

class GOAP {
    constructor( agent ) {
        this.agent = agent;}

    formulate() {
        let goal = this.agent.getGoal();

        if (typeof goal === 'undefined') {return []}

        let finalActions = [];

        console.log(`Formulating plan for ${ goal }.`);

        // TODO allow for composite of actions to accomplish goal
        this.agent.actions.forEach (( action ) => {
            if (action.satisfies(goal) ) {
                finalActions.push(action); } });

        if (finalActions.length === 0) {return []}

        let heurFn = (( node, root ) => { return 0});
        let goalFn = (( node ) => { return this.agent.stateSatisfies(node)});
        let succFn = (( node ) => { return node.chain});
        let costFn = (( node ) => { return node.cost});

        console.log(`Starting search with action ${ finalActions[0] }.`);

        let planner = new AStar(heurFn, goalFn, succFn, costFn);
        let path = planner.find(finalActions.pop());
        path.reverse();

        if (path.length === 0) {
            console.log('No plan found!'); }
        else {
            console.log('Plan:');
            path.forEach(action => console.log(`\t${ action }`)); }

        return {goal, path } } }


class Agent {
    constructor() {
        this.planner = new GOAP(this);
        this.goals = new Heap();
        this.actions = [];
        this.state = {};}

    getGoal() {
        return this.goals.peek()}

    addAction( anAction ) {
        this.actions.forEach (( action ) => {
            if (anAction.satisfies(action) ) {action.chain.push(anAction);}

            if (action.satisfies(anAction) ) {anAction.chain.push(action);} });

        this.actions.push(anAction);

        return anAction}

    removeAction( anAction ) {
        this.actions = this.actions.filter (( ea ) => { return anAction !== ea});
        this.actions.forEach (( action ) => { action.chain = action.chain.filter (( ea ) => { return anAction !== ea});});

        return anAction}

    stateSatisfies( anIntermediateState ) {
        let targetState = anIntermediateState.conditions;

        for (let tsKey in targetState) {
            let tsValue = targetState[tsKey];

            if (this.state[tsKey] != tsValue) {return false} }

        return true}

    getPlan() {return this.planner.formulate()} }



class IntermediateState {
    constructor( key, conditions={} ) {
        this.key = key;
        this.conditions = conditions;}

    toString() {return this.key}

    satisfies( anIntermediateState ) {return new Error('An IntermediateState must implement @satisfies( anIntermediateState ).')}

    clone() {return new Error('An IntermediateState must implement @clone().')} }


class Action extends IntermediateState {
    constructor( key, conditions={}, effects={}, cost=0 ) {
        super(key, conditions);
        this.effects = effects;
        this.cost = cost;
        this.chain = [];}

    satisfies( anIntermediateState ) {
        let state = anIntermediateState.conditions;

        for (let eKey in this.effects) {
            let eVal = this.effects[eKey];

            for (let sKey in state) {
                let sVal = state[sKey];

                if (eKey == sKey && eVal == sVal) {return true} } }

        return false}

    clone() {return Object.assign(new Action(), this)} }


class Goal extends IntermediateState {
    constructor( key, conditions={}, priority=0 ) {
        super(key, conditions);
        this.priority = priority;}

    clone() {return Object.assign(new Goal(), this)} }

let goal = new Goal('KillEnemy',{
    kTargetIsDead: true} );

let actions =([
    new Action(
        'Attack'
      , {kWeaponIsLoaded: true}
      , {kTargetIsDead: true} )

  , new Action(
        'LoadWeapon'
      , {kWeaponIsArmed: true}
      , {kWeaponIsLoaded: true} )

  , new Action(
        'DrawWeapon'
      , {}
      , {kWeaponIsArmed: true} ) ]);

let agent = new Agent();

agent.goals.push(goal.clone());

actions.forEach (( action ) => { return agent.addAction(action.clone())});

agent.getPlan();
//# sourceMappingURL=test_goap.cjs.map
