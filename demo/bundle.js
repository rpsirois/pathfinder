(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.Planner = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
    }({ 1: [function (require, module, exports) {
            const Heap = require('../dist/heap.js');

            class AStar {
                constructor(heurFn, goalFn, succFn, costFn) {
                    this.heurFn = heurFn;
                    this.goalFn = goalFn;
                    this.succFn = succFn;
                    this.costFn = costFn;
                }

                _nodeify(data, prev = null) {
                    data._astar_data = {
                        g: this.costFn(data),
                        h: this.heurFn(data, this.start),
                        prev: prev };
                    return data;
                }

                _step() {
                    let current = this.open.pop();
                    this.closed.push(current);

                    if (this.goalFn(current)) {
                        return this.traceback(current);
                    }

                    this.succFn(current).forEach(successor => {
                        if (this.closed.indexOf(successor) < 0) {
                            if (this.open.contains(successor)) {
                                let tempCost = current._astar_data.g + successor._astar_data.g;
                                if (tempCost < successor._astar_data.g) {
                                    successor._astar_data.g = tempCost;
                                    successor._astar_data.prev = current;
                                }
                            } else {
                                this.open.push(this._nodeify(successor, current));
                            }
                        }
                    });

                    if (this.open.size() == 0) {
                        return [];
                    }

                    return this._step();
                }

                find(start) {
                    this.start = start;
                    this.open = new Heap(node => node._astar_data.g + node._astar_data.h);
                    this.closed = [];

                    this.open.push(this._nodeify(this.start));
                    return this._step();
                }

                traceback(goal) {
                    let path = [goal];
                    let trace = node => {
                        if (node._astar_data.prev) {
                            path.push(node._astar_data.prev);
                            trace(node._astar_data.prev);
                        }
                    };
                    trace(goal);
                    path.reverse();
                    return path.map(node => {
                        delete node._astar_data;
                        return node;
                    });
                }
            }

            module.exports = AStar;
        }, { "../dist/heap.js": 2 }], 2: [function (require, module, exports) {
            class Heap {
                constructor(scoreFn, compareFn) {
                    this.contents = [];
                    this.scoreFn = scoreFn !== undefined ? scoreFn : x => x;
                    this.compareFn = compareFn !== undefined ? compareFn : (a, b) => a < b;
                }

                toString() {
                    return this.contents;
                }

                size() {
                    return this.contents.length;
                }

                contains(item) {
                    return this.contents.indexOf(item) >= 0;
                }

                peek() {
                    return this.contents[0];
                }

                push(nodes) {
                    if (!Array.isArray(nodes)) {
                        nodes = [nodes];
                    }
                    nodes.forEach(node => {
                        this.contents.push(node);
                        this.bubbleUp(this.size() - 1);
                    });
                    return nodes;
                }

                pop() {
                    let result = this.contents[0];
                    let end = this.contents.pop();

                    if (this.size() > 0) {
                        this.contents[0] = end;
                        this.sinkDown(0);
                    }

                    return result;
                }

                swap(a, b) {
                    const t = this.contents[a];
                    this.contents[a] = this.contents[b];
                    this.contents[b] = t;
                    return a;
                }

                getIndexScore(index) {
                    return this.scoreFn(this.contents[index]);
                }

                getParentIndex(index) {
                    return Math.floor((index - 1) / 2);
                }

                bubbleUp(index) {
                    if (index > 0) {
                        const parentIndex = this.getParentIndex(index);
                        if (this.compareFn(this.getIndexScore(index), this.getIndexScore(parentIndex))) {
                            this.bubbleUp(this.swap(parentIndex, index));
                        }
                    }
                }

                sinkDown(parentIndex) {
                    if (parentIndex < this.size()) {
                        const parentScore = this.getIndexScore(parentIndex);
                        const leftIndex = parentIndex * 2 + 1;
                        const rightIndex = parentIndex * 2 + 2;
                        var swapIdx;

                        if (leftIndex < this.size()) {
                            const leftIndexScore = this.getIndexScore(leftIndex);
                            if (this.compareFn(leftIndexScore, parentScore)) {
                                swapIdx = leftIndex;
                            }
                        }

                        if (rightIndex < this.size()) {
                            const rightIndexScore = this.getIndexScore(rightIndex);
                            if (this.compareFn(rightIndexScore, swapIdx !== undefined ? leftIndexScore : parentScore)) {
                                swapIdx = rightIndex;
                            }
                        }

                        if (swapIdx !== undefined) {
                            this.sinkDown(this.swap(swapIdx, parentIndex));
                        }
                    }
                }
            }

            module.exports = Heap;
        }, {}], 3: [function (require, module, exports) {
            const AStar = require('../dist/astar.js');
            const Heap = require('../dist/heap.js');

            class GOAP {
                constructor(agent) {
                    this.agent = agent;
                }

                formulate() {
                    let goal = this.agent.getGoal();
                    let finalActions = [];

                    console.log('Formulating plan for ' + goal);

                    // TODO allow for composite of actions to accomplish goal
                    this.agent.actions.forEach(action => {
                        if (action.satisfies(goal)) {
                            finalActions.push(action);
                        }
                    });

                    if (finalActions.length === 0) {
                        return [];
                    }

                    let heurFn = (node, root) => 0;
                    let goalFn = node => this.agent.stateSatisfies(node);
                    let succFn = node => node.chain;
                    let costFn = node => node.cost;

                    console.log('Starting search with action ' + finalActions[0]);

                    let planner = new AStar(heurFn, goalFn, succFn, costFn);
                    let path = planner.find(finalActions.pop());
                    path.reverse();

                    if (path.length === 0) {
                        console.log('No plan found!');
                    } else {
                        console.log('Plan:');
                        path.forEach(action => console.log('\t' + action));
                    }
                }
            }

            class Agent {
                constructor() {
                    this.planner = new GOAP(this);
                    this.goals = new Heap();
                    this.actions = [];
                    this.state = {};
                }

                getGoal() {
                    return this.goals.peek();
                }

                addAction(anAction) {
                    this.actions.forEach(action => {
                        if (anAction.satisfies(action)) {
                            action.chain.push(anAction);
                        }
                        if (action.satisfies(anAction)) {
                            anAction.chain.push(action);
                        }
                    });

                    this.actions.push(anAction);
                }

                stateSatisfies(anIntermediateState) {
                    let targetState = anIntermediateState.conditions;

                    for (let tsKey in targetState) {
                        let tsValue = targetState[tsKey];

                        if (this.state[tsKey] != tsValue) {
                            return false;
                        }
                    }

                    return true;
                }

                getPlan() {
                    return this.planner.formulate();
                }
            }

            class IntermediateState {
                constructor(key, conditions = {}) {
                    this.key = key;
                    this.conditions = conditions;
                }

                toString() {
                    return this.key;
                }

                satisfies(anIntermediateState) {
                    return new Error('An IntermediateState must implement @satisfies( anIntermediateState ).');
                }

                clone() {
                    return new Error('An IntermediateState must implement @clone().');
                }
            }

            class Action extends IntermediateState {
                constructor(key, conditions = {}, effects = {}, cost = 0) {
                    super(key, conditions);
                    this.effects = effects;
                    this.cost = cost;
                    this.chain = [];
                }

                satisfies(anIntermediateState) {
                    let state = anIntermediateState.conditions;

                    for (let eKey in this.effects) {
                        let eVal = this.effects[eKey];

                        for (let sKey in state) {
                            let sVal = state[sKey];

                            if (eKey == sKey && eVal == sVal) {
                                return true;
                            }
                        }
                    }

                    return false;
                }

                clone() {
                    return Object.assign(new Action(), this);
                }
            }

            class Goal extends IntermediateState {
                constructor(key, conditions = {}, priority = 0) {
                    super(key, conditions);
                    this.priority = priority;
                }

                clone() {
                    return Object.assign(new Goal(), this);
                }
            }

            module.exports = {
                GOAP: GOAP,
                Agent: Agent,
                Action: Action,
                Goal: Goal };
        }, { "../dist/astar.js": 1, "../dist/heap.js": 2 }] }, {}, [3])(3);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1bmRsZS5qcyJdLCJuYW1lcyI6WyJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImciLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwiUGxhbm5lciIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIkhlYXAiLCJBU3RhciIsImNvbnN0cnVjdG9yIiwiaGV1ckZuIiwiZ29hbEZuIiwic3VjY0ZuIiwiY29zdEZuIiwiX25vZGVpZnkiLCJkYXRhIiwicHJldiIsIl9hc3Rhcl9kYXRhIiwiaCIsInN0YXJ0IiwiX3N0ZXAiLCJjdXJyZW50Iiwib3BlbiIsInBvcCIsImNsb3NlZCIsInB1c2giLCJ0cmFjZWJhY2siLCJmb3JFYWNoIiwic3VjY2Vzc29yIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwidGVtcENvc3QiLCJzaXplIiwiZmluZCIsIm5vZGUiLCJnb2FsIiwicGF0aCIsInRyYWNlIiwicmV2ZXJzZSIsIm1hcCIsInNjb3JlRm4iLCJjb21wYXJlRm4iLCJjb250ZW50cyIsInVuZGVmaW5lZCIsIngiLCJiIiwidG9TdHJpbmciLCJpdGVtIiwicGVlayIsIm5vZGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiYnViYmxlVXAiLCJyZXN1bHQiLCJlbmQiLCJzaW5rRG93biIsInN3YXAiLCJnZXRJbmRleFNjb3JlIiwiaW5kZXgiLCJnZXRQYXJlbnRJbmRleCIsIk1hdGgiLCJmbG9vciIsInBhcmVudEluZGV4IiwicGFyZW50U2NvcmUiLCJsZWZ0SW5kZXgiLCJyaWdodEluZGV4Iiwic3dhcElkeCIsImxlZnRJbmRleFNjb3JlIiwicmlnaHRJbmRleFNjb3JlIiwiR09BUCIsImFnZW50IiwiZm9ybXVsYXRlIiwiZ2V0R29hbCIsImZpbmFsQWN0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJhY3Rpb25zIiwiYWN0aW9uIiwic2F0aXNmaWVzIiwicm9vdCIsInN0YXRlU2F0aXNmaWVzIiwiY2hhaW4iLCJjb3N0IiwicGxhbm5lciIsIkFnZW50IiwiZ29hbHMiLCJzdGF0ZSIsImFkZEFjdGlvbiIsImFuQWN0aW9uIiwiYW5JbnRlcm1lZGlhdGVTdGF0ZSIsInRhcmdldFN0YXRlIiwiY29uZGl0aW9ucyIsInRzS2V5IiwidHNWYWx1ZSIsImdldFBsYW4iLCJJbnRlcm1lZGlhdGVTdGF0ZSIsImtleSIsImNsb25lIiwiQWN0aW9uIiwiZWZmZWN0cyIsImVLZXkiLCJlVmFsIiwic0tleSIsInNWYWwiLCJPYmplY3QiLCJhc3NpZ24iLCJHb2FsIiwicHJpb3JpdHkiXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsVUFBQSxBQUFTLEdBQUUsQUFBQztRQUFHLE9BQUEsQUFBTyxZQUFQLEFBQWlCLFlBQVUsT0FBQSxBQUFPLFdBQXJDLEFBQThDLGFBQVksQUFBQztlQUFBLEFBQU8sVUFBUCxBQUFlLEFBQUk7QUFBOUUsZUFBc0YsT0FBQSxBQUFPLFdBQVAsQUFBZ0IsY0FBWSxPQUEvQixBQUFzQyxLQUFJLEFBQUM7ZUFBQSxBQUFPLElBQVAsQUFBVSxBQUFHO0FBQXhELEtBQUEsTUFBNEQsQUFBQztZQUFBLEFBQUksTUFBSyxPQUFBLEFBQU8sV0FBVixBQUFtQixhQUFZLEFBQUM7Z0JBQUEsQUFBRSxBQUFPO0FBQXpDLFNBQUEsVUFBaUQsT0FBQSxBQUFPLFdBQVYsQUFBbUIsYUFBWSxBQUFDO2dCQUFBLEFBQUUsQUFBTztBQUF6QyxTQUFBLFVBQWlELE9BQUEsQUFBTyxTQUFWLEFBQWlCLGFBQVksQUFBQztnQkFBQSxBQUFFLEFBQUs7QUFBckMsU0FBQSxNQUF5QyxBQUFDO2dCQUFBLEFBQUUsQUFBSztXQUFBLEFBQUUsVUFBRixBQUFZLEFBQUk7QUFBQztBQUFqVSxHQUFtVSxZQUFVLEFBQUM7UUFBQSxBQUFJLFFBQUosQUFBVyxRQUFYLEFBQWtCLFFBQVEsZ0JBQVEsQUFBUyxFQUFULEFBQVcsR0FBWCxBQUFhLEdBQWIsQUFBZSxHQUFFLEFBQUM7aUJBQUEsQUFBUyxF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LEFBV3JDO0FBWHFDLEFBQ2pDOzttQkFVSixBQUFPO3NCQUFVLEFBQ1AsQUFDTixJQUZhLEFBQ2I7dUJBRGEsQUFFTixBQUNQO3dCQUhhLEFBR0wsQUFDUjtzQkFKSixBQUFpQixBQUlQLEFBRVQ7QUE3Sk8sU0FBQSxFQTZKTixFQUFDLG9CQUFELEFBQW9CLEdBQUUsbUJBOVV1VixBQUEyYixBQWlMbHlCLEFBNkpOLEFBQXdDLFFBOVVxVSxBQThVaFUsSUFBRyxDQTlVNlQsQUE4VTdULEFBQUMsSUE5VXFULEFBQU8sQUE4VXhULEFBQ3REO0FBL1VEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLlBsYW5uZXIgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5jb25zdCBIZWFwID0gcmVxdWlyZSgnLi4vZGlzdC9oZWFwLmpzJyk7XG5cbmNsYXNzIEFTdGFyIHtcbiAgICBjb25zdHJ1Y3RvcihoZXVyRm4sIGdvYWxGbiwgc3VjY0ZuLCBjb3N0Rm4pIHtcbiAgICAgICAgdGhpcy5oZXVyRm4gPSBoZXVyRm47XG4gICAgICAgIHRoaXMuZ29hbEZuID0gZ29hbEZuO1xuICAgICAgICB0aGlzLnN1Y2NGbiA9IHN1Y2NGbjtcbiAgICAgICAgdGhpcy5jb3N0Rm4gPSBjb3N0Rm47XG4gICAgfVxuXG4gICAgX25vZGVpZnkoZGF0YSwgcHJldiA9IG51bGwpIHtcbiAgICAgICAgZGF0YS5fYXN0YXJfZGF0YSA9IHtcbiAgICAgICAgICAgIGc6IHRoaXMuY29zdEZuKGRhdGEpLFxuICAgICAgICAgICAgaDogdGhpcy5oZXVyRm4oZGF0YSwgdGhpcy5zdGFydCksXG4gICAgICAgICAgICBwcmV2OiBwcmV2IH07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIF9zdGVwKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMub3Blbi5wb3AoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQucHVzaChjdXJyZW50KTtcblxuICAgICAgICBpZiAodGhpcy5nb2FsRm4oY3VycmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlYmFjayhjdXJyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3VjY0ZuKGN1cnJlbnQpLmZvckVhY2goc3VjY2Vzc29yID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZC5pbmRleE9mKHN1Y2Nlc3NvcikgPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3Blbi5jb250YWlucyhzdWNjZXNzb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wQ29zdCA9IGN1cnJlbnQuX2FzdGFyX2RhdGEuZyArIHN1Y2Nlc3Nvci5fYXN0YXJfZGF0YS5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcENvc3QgPCBzdWNjZXNzb3IuX2FzdGFyX2RhdGEuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLmcgPSB0ZW1wQ29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Nvci5fYXN0YXJfZGF0YS5wcmV2ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbi5wdXNoKHRoaXMuX25vZGVpZnkoc3VjY2Vzc29yLCBjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5vcGVuLnNpemUoKSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcCgpO1xuICAgIH1cblxuICAgIGZpbmQoc3RhcnQpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLm9wZW4gPSBuZXcgSGVhcChub2RlID0+IG5vZGUuX2FzdGFyX2RhdGEuZyArIG5vZGUuX2FzdGFyX2RhdGEuaCk7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gW107XG5cbiAgICAgICAgdGhpcy5vcGVuLnB1c2godGhpcy5fbm9kZWlmeSh0aGlzLnN0YXJ0KSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwKCk7XG4gICAgfVxuXG4gICAgdHJhY2ViYWNrKGdvYWwpIHtcbiAgICAgICAgbGV0IHBhdGggPSBbZ29hbF07XG4gICAgICAgIGxldCB0cmFjZSA9IG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuX2FzdGFyX2RhdGEucHJldikge1xuICAgICAgICAgICAgICAgIHBhdGgucHVzaChub2RlLl9hc3Rhcl9kYXRhLnByZXYpO1xuICAgICAgICAgICAgICAgIHRyYWNlKG5vZGUuX2FzdGFyX2RhdGEucHJldik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRyYWNlKGdvYWwpO1xuICAgICAgICBwYXRoLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIHBhdGgubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIG5vZGUuX2FzdGFyX2RhdGE7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFTdGFyO1xuXG59LHtcIi4uL2Rpc3QvaGVhcC5qc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbmNsYXNzIEhlYXAge1xuICBjb25zdHJ1Y3RvcihzY29yZUZuLCBjb21wYXJlRm4pIHtcbiAgICB0aGlzLmNvbnRlbnRzID0gW107XG4gICAgdGhpcy5zY29yZUZuID0gc2NvcmVGbiAhPT0gdW5kZWZpbmVkID8gc2NvcmVGbiA6IHggPT4geDtcbiAgICB0aGlzLmNvbXBhcmVGbiA9IGNvbXBhcmVGbiAhPT0gdW5kZWZpbmVkID8gY29tcGFyZUZuIDogKGEsIGIpID0+IGEgPCBiO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudHM7XG4gIH1cblxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzLmxlbmd0aDtcbiAgfVxuXG4gIGNvbnRhaW5zKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50cy5pbmRleE9mKGl0ZW0pID49IDA7XG4gIH1cblxuICBwZWVrKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzWzBdO1xuICB9XG5cbiAgcHVzaChub2Rlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgIG5vZGVzID0gW25vZGVzXTtcbiAgICB9XG4gICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIHRoaXMuY29udGVudHMucHVzaChub2RlKTtcbiAgICAgIHRoaXMuYnViYmxlVXAodGhpcy5zaXplKCkgLSAxKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY29udGVudHNbMF07XG4gICAgbGV0IGVuZCA9IHRoaXMuY29udGVudHMucG9wKCk7XG5cbiAgICBpZiAodGhpcy5zaXplKCkgPiAwKSB7XG4gICAgICB0aGlzLmNvbnRlbnRzWzBdID0gZW5kO1xuICAgICAgdGhpcy5zaW5rRG93bigwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3dhcChhLCBiKSB7XG4gICAgY29uc3QgdCA9IHRoaXMuY29udGVudHNbYV07XG4gICAgdGhpcy5jb250ZW50c1thXSA9IHRoaXMuY29udGVudHNbYl07XG4gICAgdGhpcy5jb250ZW50c1tiXSA9IHQ7XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBnZXRJbmRleFNjb3JlKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcmVGbih0aGlzLmNvbnRlbnRzW2luZGV4XSk7XG4gIH1cblxuICBnZXRQYXJlbnRJbmRleChpbmRleCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChpbmRleCAtIDEpIC8gMik7XG4gIH1cblxuICBidWJibGVVcChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGNvbnN0IHBhcmVudEluZGV4ID0gdGhpcy5nZXRQYXJlbnRJbmRleChpbmRleCk7XG4gICAgICBpZiAodGhpcy5jb21wYXJlRm4odGhpcy5nZXRJbmRleFNjb3JlKGluZGV4KSwgdGhpcy5nZXRJbmRleFNjb3JlKHBhcmVudEluZGV4KSkpIHtcbiAgICAgICAgdGhpcy5idWJibGVVcCh0aGlzLnN3YXAocGFyZW50SW5kZXgsIGluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2lua0Rvd24ocGFyZW50SW5kZXgpIHtcbiAgICBpZiAocGFyZW50SW5kZXggPCB0aGlzLnNpemUoKSkge1xuICAgICAgY29uc3QgcGFyZW50U2NvcmUgPSB0aGlzLmdldEluZGV4U2NvcmUocGFyZW50SW5kZXgpO1xuICAgICAgY29uc3QgbGVmdEluZGV4ID0gcGFyZW50SW5kZXggKiAyICsgMTtcbiAgICAgIGNvbnN0IHJpZ2h0SW5kZXggPSBwYXJlbnRJbmRleCAqIDIgKyAyO1xuICAgICAgdmFyIHN3YXBJZHg7XG5cbiAgICAgIGlmIChsZWZ0SW5kZXggPCB0aGlzLnNpemUoKSkge1xuICAgICAgICBjb25zdCBsZWZ0SW5kZXhTY29yZSA9IHRoaXMuZ2V0SW5kZXhTY29yZShsZWZ0SW5kZXgpO1xuICAgICAgICBpZiAodGhpcy5jb21wYXJlRm4obGVmdEluZGV4U2NvcmUsIHBhcmVudFNjb3JlKSkge1xuICAgICAgICAgIHN3YXBJZHggPSBsZWZ0SW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJpZ2h0SW5kZXggPCB0aGlzLnNpemUoKSkge1xuICAgICAgICBjb25zdCByaWdodEluZGV4U2NvcmUgPSB0aGlzLmdldEluZGV4U2NvcmUocmlnaHRJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVGbihyaWdodEluZGV4U2NvcmUsIHN3YXBJZHggIT09IHVuZGVmaW5lZCA/IGxlZnRJbmRleFNjb3JlIDogcGFyZW50U2NvcmUpKSB7XG4gICAgICAgICAgc3dhcElkeCA9IHJpZ2h0SW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN3YXBJZHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNpbmtEb3duKHRoaXMuc3dhcChzd2FwSWR4LCBwYXJlbnRJbmRleCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYXA7XG5cbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuY29uc3QgQVN0YXIgPSByZXF1aXJlKCcuLi9kaXN0L2FzdGFyLmpzJyk7XG5jb25zdCBIZWFwID0gcmVxdWlyZSgnLi4vZGlzdC9oZWFwLmpzJyk7XG5cbmNsYXNzIEdPQVAge1xuICAgIGNvbnN0cnVjdG9yKGFnZW50KSB7XG4gICAgICAgIHRoaXMuYWdlbnQgPSBhZ2VudDtcbiAgICB9XG5cbiAgICBmb3JtdWxhdGUoKSB7XG4gICAgICAgIGxldCBnb2FsID0gdGhpcy5hZ2VudC5nZXRHb2FsKCk7XG4gICAgICAgIGxldCBmaW5hbEFjdGlvbnMgPSBbXTtcblxuICAgICAgICBjb25zb2xlLmxvZygnRm9ybXVsYXRpbmcgcGxhbiBmb3IgJyArIGdvYWwpO1xuXG4gICAgICAgIC8vIFRPRE8gYWxsb3cgZm9yIGNvbXBvc2l0ZSBvZiBhY3Rpb25zIHRvIGFjY29tcGxpc2ggZ29hbFxuICAgICAgICB0aGlzLmFnZW50LmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5zYXRpc2ZpZXMoZ29hbCkpIHtcbiAgICAgICAgICAgICAgICBmaW5hbEFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZmluYWxBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhldXJGbiA9IChub2RlLCByb290KSA9PiAwO1xuICAgICAgICBsZXQgZ29hbEZuID0gbm9kZSA9PiB0aGlzLmFnZW50LnN0YXRlU2F0aXNmaWVzKG5vZGUpO1xuICAgICAgICBsZXQgc3VjY0ZuID0gbm9kZSA9PiBub2RlLmNoYWluO1xuICAgICAgICBsZXQgY29zdEZuID0gbm9kZSA9PiBub2RlLmNvc3Q7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHNlYXJjaCB3aXRoIGFjdGlvbiAnICsgZmluYWxBY3Rpb25zWzBdKTtcblxuICAgICAgICBsZXQgcGxhbm5lciA9IG5ldyBBU3RhcihoZXVyRm4sIGdvYWxGbiwgc3VjY0ZuLCBjb3N0Rm4pO1xuICAgICAgICBsZXQgcGF0aCA9IHBsYW5uZXIuZmluZChmaW5hbEFjdGlvbnMucG9wKCkpO1xuICAgICAgICBwYXRoLnJldmVyc2UoKTtcblxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBwbGFuIGZvdW5kIScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BsYW46Jyk7XG4gICAgICAgICAgICBwYXRoLmZvckVhY2goYWN0aW9uID0+IGNvbnNvbGUubG9nKCdcXHQnICsgYWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEFnZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGFubmVyID0gbmV3IEdPQVAodGhpcyk7XG4gICAgICAgIHRoaXMuZ29hbHMgPSBuZXcgSGVhcCgpO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cblxuICAgIGdldEdvYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdvYWxzLnBlZWsoKTtcbiAgICB9XG5cbiAgICBhZGRBY3Rpb24oYW5BY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChhbkFjdGlvbi5zYXRpc2ZpZXMoYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5jaGFpbi5wdXNoKGFuQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24uc2F0aXNmaWVzKGFuQWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGFuQWN0aW9uLmNoYWluLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2goYW5BY3Rpb24pO1xuICAgIH1cblxuICAgIHN0YXRlU2F0aXNmaWVzKGFuSW50ZXJtZWRpYXRlU3RhdGUpIHtcbiAgICAgICAgbGV0IHRhcmdldFN0YXRlID0gYW5JbnRlcm1lZGlhdGVTdGF0ZS5jb25kaXRpb25zO1xuXG4gICAgICAgIGZvciAobGV0IHRzS2V5IGluIHRhcmdldFN0YXRlKSB7XG4gICAgICAgICAgICBsZXQgdHNWYWx1ZSA9IHRhcmdldFN0YXRlW3RzS2V5XTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbdHNLZXldICE9IHRzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRQbGFuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFubmVyLmZvcm11bGF0ZSgpO1xuICAgIH1cbn1cblxuY2xhc3MgSW50ZXJtZWRpYXRlU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgY29uZGl0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXk7XG4gICAgfVxuXG4gICAgc2F0aXNmaWVzKGFuSW50ZXJtZWRpYXRlU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignQW4gSW50ZXJtZWRpYXRlU3RhdGUgbXVzdCBpbXBsZW1lbnQgQHNhdGlzZmllcyggYW5JbnRlcm1lZGlhdGVTdGF0ZSApLicpO1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdBbiBJbnRlcm1lZGlhdGVTdGF0ZSBtdXN0IGltcGxlbWVudCBAY2xvbmUoKS4nKTtcbiAgICB9XG59XG5cbmNsYXNzIEFjdGlvbiBleHRlbmRzIEludGVybWVkaWF0ZVN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIGNvbmRpdGlvbnMgPSB7fSwgZWZmZWN0cyA9IHt9LCBjb3N0ID0gMCkge1xuICAgICAgICBzdXBlcihrZXksIGNvbmRpdGlvbnMpO1xuICAgICAgICB0aGlzLmVmZmVjdHMgPSBlZmZlY3RzO1xuICAgICAgICB0aGlzLmNvc3QgPSBjb3N0O1xuICAgICAgICB0aGlzLmNoYWluID0gW107XG4gICAgfVxuXG4gICAgc2F0aXNmaWVzKGFuSW50ZXJtZWRpYXRlU3RhdGUpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gYW5JbnRlcm1lZGlhdGVTdGF0ZS5jb25kaXRpb25zO1xuXG4gICAgICAgIGZvciAobGV0IGVLZXkgaW4gdGhpcy5lZmZlY3RzKSB7XG4gICAgICAgICAgICBsZXQgZVZhbCA9IHRoaXMuZWZmZWN0c1tlS2V5XTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc0tleSBpbiBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBzVmFsID0gc3RhdGVbc0tleV07XG5cbiAgICAgICAgICAgICAgICBpZiAoZUtleSA9PSBzS2V5ICYmIGVWYWwgPT0gc1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBBY3Rpb24oKSwgdGhpcyk7XG4gICAgfVxufVxuXG5jbGFzcyBHb2FsIGV4dGVuZHMgSW50ZXJtZWRpYXRlU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgY29uZGl0aW9ucyA9IHt9LCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgc3VwZXIoa2V5LCBjb25kaXRpb25zKTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgR29hbCgpLCB0aGlzKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEdPQVA6IEdPQVAsXG4gICAgQWdlbnQ6IEFnZW50LFxuICAgIEFjdGlvbjogQWN0aW9uLFxuICAgIEdvYWw6IEdvYWwgfTtcblxufSx7XCIuLi9kaXN0L2FzdGFyLmpzXCI6MSxcIi4uL2Rpc3QvaGVhcC5qc1wiOjJ9XX0se30sWzNdKSgzKVxufSk7Il19