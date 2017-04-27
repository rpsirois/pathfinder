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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1bmRsZS5qcyJdLCJuYW1lcyI6WyJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImciLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwiUGxhbm5lciIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIkhlYXAiLCJBU3RhciIsImNvbnN0cnVjdG9yIiwiaGV1ckZuIiwiZ29hbEZuIiwic3VjY0ZuIiwiY29zdEZuIiwiX25vZGVpZnkiLCJkYXRhIiwicHJldiIsIl9hc3Rhcl9kYXRhIiwiaCIsInN0YXJ0IiwiX3N0ZXAiLCJjdXJyZW50Iiwib3BlbiIsInBvcCIsImNsb3NlZCIsInB1c2giLCJ0cmFjZWJhY2siLCJmb3JFYWNoIiwic3VjY2Vzc29yIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwidGVtcENvc3QiLCJzaXplIiwiZmluZCIsIm5vZGUiLCJnb2FsIiwicGF0aCIsInRyYWNlIiwicmV2ZXJzZSIsIm1hcCIsInNjb3JlRm4iLCJjb21wYXJlRm4iLCJjb250ZW50cyIsInVuZGVmaW5lZCIsIngiLCJiIiwidG9TdHJpbmciLCJpdGVtIiwicGVlayIsIm5vZGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiYnViYmxlVXAiLCJyZXN1bHQiLCJlbmQiLCJzaW5rRG93biIsInN3YXAiLCJnZXRJbmRleFNjb3JlIiwiaW5kZXgiLCJnZXRQYXJlbnRJbmRleCIsIk1hdGgiLCJmbG9vciIsInBhcmVudEluZGV4IiwicGFyZW50U2NvcmUiLCJsZWZ0SW5kZXgiLCJyaWdodEluZGV4Iiwic3dhcElkeCIsImxlZnRJbmRleFNjb3JlIiwicmlnaHRJbmRleFNjb3JlIiwiR09BUCIsImFnZW50IiwiZm9ybXVsYXRlIiwiZ2V0R29hbCIsImZpbmFsQWN0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJhY3Rpb25zIiwiYWN0aW9uIiwic2F0aXNmaWVzIiwicm9vdCIsInN0YXRlU2F0aXNmaWVzIiwiY2hhaW4iLCJjb3N0IiwicGxhbm5lciIsIkFnZW50IiwiZ29hbHMiLCJzdGF0ZSIsImFkZEFjdGlvbiIsImFuQWN0aW9uIiwiYW5JbnRlcm1lZGlhdGVTdGF0ZSIsInRhcmdldFN0YXRlIiwiY29uZGl0aW9ucyIsInRzS2V5IiwidHNWYWx1ZSIsImdldFBsYW4iLCJJbnRlcm1lZGlhdGVTdGF0ZSIsImtleSIsImNsb25lIiwiQWN0aW9uIiwiZWZmZWN0cyIsImVLZXkiLCJlVmFsIiwic0tleSIsInNWYWwiLCJPYmplY3QiLCJhc3NpZ24iLCJHb2FsIiwicHJpb3JpdHkiXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsVUFBQSxBQUFTLEdBQUUsQUFBQztRQUFHLE9BQUEsQUFBTyxZQUFQLEFBQWlCLFlBQVUsT0FBQSxBQUFPLFdBQXJDLEFBQThDLGFBQVksQUFBQztlQUFBLEFBQU8sVUFBbEUsQUFBMkQsQUFBZSxBQUFJO2VBQVEsT0FBQSxBQUFPLFdBQVAsQUFBZ0IsY0FBWSxPQUEvQixBQUFzQyxLQUFJLEFBQUM7ZUFBQSxBQUFPLElBQWxELEFBQTJDLEFBQVUsQUFBRyxBQUF4RDtXQUE0RCxBQUFDO1lBQUEsQUFBSSxNQUFLLE9BQUEsQUFBTyxXQUFWLEFBQW1CLGFBQVksQUFBQztnQkFBaEMsQUFBZ0MsQUFBRSxBQUFPLEFBQXpDO21CQUFpRCxPQUFBLEFBQU8sV0FBVixBQUFtQixhQUFZLEFBQUM7Z0JBQWhDLEFBQWdDLEFBQUUsQUFBTyxBQUF6QzttQkFBaUQsT0FBQSxBQUFPLFNBQVYsQUFBaUIsYUFBWSxBQUFDO2dCQUE5QixBQUE4QixBQUFFLEFBQUssQUFBckM7ZUFBeUMsQUFBQztnQkFBQSxBQUFFLEFBQUs7V0FBQSxBQUFFLFVBQUYsQUFBWSxBQUFJLEFBQUMsQUFBalU7O0dBQW1VLFlBQVUsQUFBQztRQUFBLEFBQUksUUFBSixBQUFXLFFBQVgsQUFBa0IsUUFBUSxnQkFBUSxBQUFTLEVBQVQsQUFBVyxHQUFYLEFBQWEsR0FBYixBQUFlLEdBQUUsQUFBQztp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Ozt3QkFBUSxBQUNKOzJCQUFPLE9BQUEsQUFBTyxPQUFPLElBQWQsQUFBYyxBQUFJLFFBUEksQUFPN0IsQUFBTyxBQUEwQixBQUNwQyxBQUdMLEFBWHFDLEFBQ2pDOzs7O21CQVVKLEFBQU87c0JBQVUsQUFDYixBQUFNLEFBQ047dUJBRmEsQUFFTixBQUNQO3dCQUhhLEFBR0wsQUFDUjtzQkEzSkksQUF1SlIsQUFBaUIsQUFJUCxBQUVULEFBN0pPO1dBNkpOLEVBQUMsb0JBQUQsQUFBb0IsR0FBRSxtQkE5VXVWLEFBQTJiLEFBaUxseUIsQUE2Sk4sQUFBd0MsUUE5VXFVLEFBOFVoVSxJQUFHLENBOVU2VCxBQThVN1QsQUFBQyxJQTlVbkQsQUFBd1csQUFBTyxBQThVeFQsQUFDdEQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuUGxhbm5lciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbmNvbnN0IEhlYXAgPSByZXF1aXJlKCcuLi9kaXN0L2hlYXAuanMnKTtcblxuY2xhc3MgQVN0YXIge1xuICAgIGNvbnN0cnVjdG9yKGhldXJGbiwgZ29hbEZuLCBzdWNjRm4sIGNvc3RGbikge1xuICAgICAgICB0aGlzLmhldXJGbiA9IGhldXJGbjtcbiAgICAgICAgdGhpcy5nb2FsRm4gPSBnb2FsRm47XG4gICAgICAgIHRoaXMuc3VjY0ZuID0gc3VjY0ZuO1xuICAgICAgICB0aGlzLmNvc3RGbiA9IGNvc3RGbjtcbiAgICB9XG5cbiAgICBfbm9kZWlmeShkYXRhLCBwcmV2ID0gbnVsbCkge1xuICAgICAgICBkYXRhLl9hc3Rhcl9kYXRhID0ge1xuICAgICAgICAgICAgZzogdGhpcy5jb3N0Rm4oZGF0YSksXG4gICAgICAgICAgICBoOiB0aGlzLmhldXJGbihkYXRhLCB0aGlzLnN0YXJ0KSxcbiAgICAgICAgICAgIHByZXY6IHByZXYgfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgX3N0ZXAoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5vcGVuLnBvcCgpO1xuICAgICAgICB0aGlzLmNsb3NlZC5wdXNoKGN1cnJlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmdvYWxGbihjdXJyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2ViYWNrKGN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWNjRm4oY3VycmVudCkuZm9yRWFjaChzdWNjZXNzb3IgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkLmluZGV4T2Yoc3VjY2Vzc29yKSA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcGVuLmNvbnRhaW5zKHN1Y2Nlc3NvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb3N0ID0gY3VycmVudC5fYXN0YXJfZGF0YS5nICsgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wQ29zdCA8IHN1Y2Nlc3Nvci5fYXN0YXJfZGF0YS5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzb3IuX2FzdGFyX2RhdGEuZyA9IHRlbXBDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLnByZXYgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuLnB1c2godGhpcy5fbm9kZWlmeShzdWNjZXNzb3IsIGN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm9wZW4uc2l6ZSgpID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwKCk7XG4gICAgfVxuXG4gICAgZmluZChzdGFydCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHRoaXMub3BlbiA9IG5ldyBIZWFwKG5vZGUgPT4gbm9kZS5fYXN0YXJfZGF0YS5nICsgbm9kZS5fYXN0YXJfZGF0YS5oKTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBbXTtcblxuICAgICAgICB0aGlzLm9wZW4ucHVzaCh0aGlzLl9ub2RlaWZ5KHRoaXMuc3RhcnQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAoKTtcbiAgICB9XG5cbiAgICB0cmFjZWJhY2soZ29hbCkge1xuICAgICAgICBsZXQgcGF0aCA9IFtnb2FsXTtcbiAgICAgICAgbGV0IHRyYWNlID0gbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5fYXN0YXJfZGF0YS5wcmV2KSB7XG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUuX2FzdGFyX2RhdGEucHJldik7XG4gICAgICAgICAgICAgICAgdHJhY2Uobm9kZS5fYXN0YXJfZGF0YS5wcmV2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdHJhY2UoZ29hbCk7XG4gICAgICAgIHBhdGgucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gcGF0aC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgbm9kZS5fYXN0YXJfZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQVN0YXI7XG5cbn0se1wiLi4vZGlzdC9oZWFwLmpzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuY2xhc3MgSGVhcCB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlRm4sIGNvbXBhcmVGbikge1xuICAgIHRoaXMuY29udGVudHMgPSBbXTtcbiAgICB0aGlzLnNjb3JlRm4gPSBzY29yZUZuICE9PSB1bmRlZmluZWQgPyBzY29yZUZuIDogeCA9PiB4O1xuICAgIHRoaXMuY29tcGFyZUZuID0gY29tcGFyZUZuICE9PSB1bmRlZmluZWQgPyBjb21wYXJlRm4gOiAoYSwgYikgPT4gYSA8IGI7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50cztcbiAgfVxuXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudHMubGVuZ3RoO1xuICB9XG5cbiAgY29udGFpbnMoaXRlbSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzLmluZGV4T2YoaXRlbSkgPj0gMDtcbiAgfVxuXG4gIHBlZWsoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudHNbMF07XG4gIH1cblxuICBwdXNoKG5vZGVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgbm9kZXMgPSBbbm9kZXNdO1xuICAgIH1cbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgdGhpcy5jb250ZW50cy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5idWJibGVVcCh0aGlzLnNpemUoKSAtIDEpO1xuICAgIH0pO1xuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jb250ZW50c1swXTtcbiAgICBsZXQgZW5kID0gdGhpcy5jb250ZW50cy5wb3AoKTtcblxuICAgIGlmICh0aGlzLnNpemUoKSA+IDApIHtcbiAgICAgIHRoaXMuY29udGVudHNbMF0gPSBlbmQ7XG4gICAgICB0aGlzLnNpbmtEb3duKDApO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzd2FwKGEsIGIpIHtcbiAgICBjb25zdCB0ID0gdGhpcy5jb250ZW50c1thXTtcbiAgICB0aGlzLmNvbnRlbnRzW2FdID0gdGhpcy5jb250ZW50c1tiXTtcbiAgICB0aGlzLmNvbnRlbnRzW2JdID0gdDtcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGdldEluZGV4U2NvcmUoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29yZUZuKHRoaXMuY29udGVudHNbaW5kZXhdKTtcbiAgfVxuXG4gIGdldFBhcmVudEluZGV4KGluZGV4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGluZGV4IC0gMSkgLyAyKTtcbiAgfVxuXG4gIGJ1YmJsZVVwKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgY29uc3QgcGFyZW50SW5kZXggPSB0aGlzLmdldFBhcmVudEluZGV4KGluZGV4KTtcbiAgICAgIGlmICh0aGlzLmNvbXBhcmVGbih0aGlzLmdldEluZGV4U2NvcmUoaW5kZXgpLCB0aGlzLmdldEluZGV4U2NvcmUocGFyZW50SW5kZXgpKSkge1xuICAgICAgICB0aGlzLmJ1YmJsZVVwKHRoaXMuc3dhcChwYXJlbnRJbmRleCwgaW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzaW5rRG93bihwYXJlbnRJbmRleCkge1xuICAgIGlmIChwYXJlbnRJbmRleCA8IHRoaXMuc2l6ZSgpKSB7XG4gICAgICBjb25zdCBwYXJlbnRTY29yZSA9IHRoaXMuZ2V0SW5kZXhTY29yZShwYXJlbnRJbmRleCk7XG4gICAgICBjb25zdCBsZWZ0SW5kZXggPSBwYXJlbnRJbmRleCAqIDIgKyAxO1xuICAgICAgY29uc3QgcmlnaHRJbmRleCA9IHBhcmVudEluZGV4ICogMiArIDI7XG4gICAgICB2YXIgc3dhcElkeDtcblxuICAgICAgaWYgKGxlZnRJbmRleCA8IHRoaXMuc2l6ZSgpKSB7XG4gICAgICAgIGNvbnN0IGxlZnRJbmRleFNjb3JlID0gdGhpcy5nZXRJbmRleFNjb3JlKGxlZnRJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVGbihsZWZ0SW5kZXhTY29yZSwgcGFyZW50U2NvcmUpKSB7XG4gICAgICAgICAgc3dhcElkeCA9IGxlZnRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmlnaHRJbmRleCA8IHRoaXMuc2l6ZSgpKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0SW5kZXhTY29yZSA9IHRoaXMuZ2V0SW5kZXhTY29yZShyaWdodEluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMuY29tcGFyZUZuKHJpZ2h0SW5kZXhTY29yZSwgc3dhcElkeCAhPT0gdW5kZWZpbmVkID8gbGVmdEluZGV4U2NvcmUgOiBwYXJlbnRTY29yZSkpIHtcbiAgICAgICAgICBzd2FwSWR4ID0gcmlnaHRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3dhcElkeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2lua0Rvd24odGhpcy5zd2FwKHN3YXBJZHgsIHBhcmVudEluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhcDtcblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5jb25zdCBBU3RhciA9IHJlcXVpcmUoJy4uL2Rpc3QvYXN0YXIuanMnKTtcbmNvbnN0IEhlYXAgPSByZXF1aXJlKCcuLi9kaXN0L2hlYXAuanMnKTtcblxuY2xhc3MgR09BUCB7XG4gICAgY29uc3RydWN0b3IoYWdlbnQpIHtcbiAgICAgICAgdGhpcy5hZ2VudCA9IGFnZW50O1xuICAgIH1cblxuICAgIGZvcm11bGF0ZSgpIHtcbiAgICAgICAgbGV0IGdvYWwgPSB0aGlzLmFnZW50LmdldEdvYWwoKTtcbiAgICAgICAgbGV0IGZpbmFsQWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3JtdWxhdGluZyBwbGFuIGZvciAnICsgZ29hbCk7XG5cbiAgICAgICAgLy8gVE9ETyBhbGxvdyBmb3IgY29tcG9zaXRlIG9mIGFjdGlvbnMgdG8gYWNjb21wbGlzaCBnb2FsXG4gICAgICAgIHRoaXMuYWdlbnQuYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLnNhdGlzZmllcyhnb2FsKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsQWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaW5hbEFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGV1ckZuID0gKG5vZGUsIHJvb3QpID0+IDA7XG4gICAgICAgIGxldCBnb2FsRm4gPSBub2RlID0+IHRoaXMuYWdlbnQuc3RhdGVTYXRpc2ZpZXMobm9kZSk7XG4gICAgICAgIGxldCBzdWNjRm4gPSBub2RlID0+IG5vZGUuY2hhaW47XG4gICAgICAgIGxldCBjb3N0Rm4gPSBub2RlID0+IG5vZGUuY29zdDtcblxuICAgICAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgc2VhcmNoIHdpdGggYWN0aW9uICcgKyBmaW5hbEFjdGlvbnNbMF0pO1xuXG4gICAgICAgIGxldCBwbGFubmVyID0gbmV3IEFTdGFyKGhldXJGbiwgZ29hbEZuLCBzdWNjRm4sIGNvc3RGbik7XG4gICAgICAgIGxldCBwYXRoID0gcGxhbm5lci5maW5kKGZpbmFsQWN0aW9ucy5wb3AoKSk7XG4gICAgICAgIHBhdGgucmV2ZXJzZSgpO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHBsYW4gZm91bmQhJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGxhbjonKTtcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChhY3Rpb24gPT4gY29uc29sZS5sb2coJ1xcdCcgKyBhY3Rpb24pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQWdlbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBsYW5uZXIgPSBuZXcgR09BUCh0aGlzKTtcbiAgICAgICAgdGhpcy5nb2FscyA9IG5ldyBIZWFwKCk7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgfVxuXG4gICAgZ2V0R29hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbHMucGVlaygpO1xuICAgIH1cblxuICAgIGFkZEFjdGlvbihhbkFjdGlvbikge1xuICAgICAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGFuQWN0aW9uLnNhdGlzZmllcyhhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmNoYWluLnB1c2goYW5BY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5zYXRpc2ZpZXMoYW5BY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgYW5BY3Rpb24uY2hhaW4ucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChhbkFjdGlvbik7XG4gICAgfVxuXG4gICAgc3RhdGVTYXRpc2ZpZXMoYW5JbnRlcm1lZGlhdGVTdGF0ZSkge1xuICAgICAgICBsZXQgdGFyZ2V0U3RhdGUgPSBhbkludGVybWVkaWF0ZVN0YXRlLmNvbmRpdGlvbnM7XG5cbiAgICAgICAgZm9yIChsZXQgdHNLZXkgaW4gdGFyZ2V0U3RhdGUpIHtcbiAgICAgICAgICAgIGxldCB0c1ZhbHVlID0gdGFyZ2V0U3RhdGVbdHNLZXldO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZVt0c0tleV0gIT0gdHNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldFBsYW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYW5uZXIuZm9ybXVsYXRlKCk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnRlcm1lZGlhdGVTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBjb25kaXRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleTtcbiAgICB9XG5cbiAgICBzYXRpc2ZpZXMoYW5JbnRlcm1lZGlhdGVTdGF0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdBbiBJbnRlcm1lZGlhdGVTdGF0ZSBtdXN0IGltcGxlbWVudCBAc2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkuJyk7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FuIEludGVybWVkaWF0ZVN0YXRlIG11c3QgaW1wbGVtZW50IEBjbG9uZSgpLicpO1xuICAgIH1cbn1cblxuY2xhc3MgQWN0aW9uIGV4dGVuZHMgSW50ZXJtZWRpYXRlU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgY29uZGl0aW9ucyA9IHt9LCBlZmZlY3RzID0ge30sIGNvc3QgPSAwKSB7XG4gICAgICAgIHN1cGVyKGtleSwgY29uZGl0aW9ucyk7XG4gICAgICAgIHRoaXMuZWZmZWN0cyA9IGVmZmVjdHM7XG4gICAgICAgIHRoaXMuY29zdCA9IGNvc3Q7XG4gICAgICAgIHRoaXMuY2hhaW4gPSBbXTtcbiAgICB9XG5cbiAgICBzYXRpc2ZpZXMoYW5JbnRlcm1lZGlhdGVTdGF0ZSkge1xuICAgICAgICBsZXQgc3RhdGUgPSBhbkludGVybWVkaWF0ZVN0YXRlLmNvbmRpdGlvbnM7XG5cbiAgICAgICAgZm9yIChsZXQgZUtleSBpbiB0aGlzLmVmZmVjdHMpIHtcbiAgICAgICAgICAgIGxldCBlVmFsID0gdGhpcy5lZmZlY3RzW2VLZXldO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzS2V5IGluIHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNWYWwgPSBzdGF0ZVtzS2V5XTtcblxuICAgICAgICAgICAgICAgIGlmIChlS2V5ID09IHNLZXkgJiYgZVZhbCA9PSBzVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEFjdGlvbigpLCB0aGlzKTtcbiAgICB9XG59XG5cbmNsYXNzIEdvYWwgZXh0ZW5kcyBJbnRlcm1lZGlhdGVTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBjb25kaXRpb25zID0ge30sIHByaW9yaXR5ID0gMCkge1xuICAgICAgICBzdXBlcihrZXksIGNvbmRpdGlvbnMpO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBHb2FsKCksIHRoaXMpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgR09BUDogR09BUCxcbiAgICBBZ2VudDogQWdlbnQsXG4gICAgQWN0aW9uOiBBY3Rpb24sXG4gICAgR29hbDogR29hbCB9O1xuXG59LHtcIi4uL2Rpc3QvYXN0YXIuanNcIjoxLFwiLi4vZGlzdC9oZWFwLmpzXCI6Mn1dfSx7fSxbM10pKDMpXG59KTsiXX0=