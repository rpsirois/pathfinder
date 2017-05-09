'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AStar = require('../dist/astar.js');
var Heap = require('../dist/heap.js');
var GOAP = function () {
    function GOAP(agent) {
        _classCallCheck(this, GOAP);

        this.agent = agent;
    }

    _createClass(GOAP, [{
        key: 'formulate',
        value: function formulate() {
            var _this = this;

            var goal = this.agent.getGoal();
            var finalActions = [];

            console.log('Formulating plan for ' + goal);

            // TODO allow for composite of actions to accomplish goal
            this.agent.actions.forEach(function (action) {
                if (action.satisfies(goal)) {
                    finalActions.push(action);
                }
            });

            if (finalActions.length === 0) {
                return [];
            }

            var heurFn = function heurFn(node, root) {
                return 0;
            };
            var goalFn = function goalFn(node) {
                return _this.agent.stateSatisfies(node);
            };
            var succFn = function succFn(node) {
                return node.chain;
            };
            var costFn = function costFn(node) {
                return node.cost;
            };

            console.log('Starting search with action ' + finalActions[0]);

            var planner = new AStar(heurFn, goalFn, succFn, costFn);
            var path = planner.find(finalActions.pop());
            path.reverse();

            if (path.length === 0) {
                console.log('No plan found!');
            } else {
                console.log('Plan:');
                path.forEach(function (action) {
                    return console.log('\t' + action);
                });
            }
        }
    }]);

    return GOAP;
}();

var Agent = function () {
    function Agent() {
        _classCallCheck(this, Agent);

        this.planner = new GOAP(this);
        this.goals = new Heap();
        this.actions = [];
        this.state = {};
    }

    _createClass(Agent, [{
        key: 'getGoal',
        value: function getGoal() {
            return this.goals.peek();
        }
    }, {
        key: 'addAction',
        value: function addAction(anAction) {
            this.actions.forEach(function (action) {
                if (anAction.satisfies(action)) {
                    action.chain.push(anAction);
                }
                if (action.satisfies(anAction)) {
                    anAction.chain.push(action);
                }
            });

            this.actions.push(anAction);
        }
    }, {
        key: 'stateSatisfies',
        value: function stateSatisfies(anIntermediateState) {
            var targetState = anIntermediateState.conditions;

            for (var tsKey in targetState) {
                var tsValue = targetState[tsKey];

                if (this.state[tsKey] != tsValue) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'getPlan',
        value: function getPlan() {
            return this.planner.formulate();
        }
    }]);

    return Agent;
}();

var IntermediateState = function () {
    function IntermediateState(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, IntermediateState);

        this.key = key;
        this.conditions = conditions;
    }

    _createClass(IntermediateState, [{
        key: 'toString',
        value: function toString() {
            return this.key;
        }
    }, {
        key: 'satisfies',
        value: function satisfies(anIntermediateState) {
            return new Error('An IntermediateState must implement @satisfies( anIntermediateState ).');
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Error('An IntermediateState must implement @clone().');
        }
    }]);

    return IntermediateState;
}();

var Action = function (_IntermediateState) {
    _inherits(Action, _IntermediateState);

    function Action(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var cost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Action);

        var _this2 = _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).call(this, key, conditions));

        _this2.effects = effects;
        _this2.cost = cost;
        _this2.chain = [];return _this2;
    }

    _createClass(Action, [{
        key: 'satisfies',
        value: function satisfies(anIntermediateState) {
            var state = anIntermediateState.conditions;

            for (var eKey in this.effects) {
                var eVal = this.effects[eKey];

                for (var sKey in state) {
                    var sVal = state[sKey];

                    if (eKey == sKey && eVal == sVal) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return Object.assign(new Action(), this);
        }
    }]);

    return Action;
}(IntermediateState);

var Goal = function (_IntermediateState2) {
    _inherits(Goal, _IntermediateState2);

    function Goal(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Goal);

        var _this3 = _possibleConstructorReturn(this, (Goal.__proto__ || Object.getPrototypeOf(Goal)).call(this, key, conditions));

        _this3.priority = priority;return _this3;
    }

    _createClass(Goal, [{
        key: 'clone',
        value: function clone() {
            return Object.assign(new Goal(), this);
        }
    }]);

    return Goal;
}(IntermediateState);

module.exports = {
    GOAP: GOAP,
    Agent: Agent,
    Action: Action,
    Goal: Goal };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvcGxhbm5lci5qc3kiXSwibmFtZXMiOlsiQVN0YXIiLCJyZXF1aXJlIiwiSGVhcCIsIkdPQVAiLCJhZ2VudCIsImdvYWwiLCJnZXRHb2FsIiwiZmluYWxBY3Rpb25zIiwiY29uc29sZSIsImxvZyIsImFjdGlvbnMiLCJmb3JFYWNoIiwiYWN0aW9uIiwic2F0aXNmaWVzIiwicHVzaCIsImxlbmd0aCIsImhldXJGbiIsIm5vZGUiLCJyb290IiwiZ29hbEZuIiwic3RhdGVTYXRpc2ZpZXMiLCJzdWNjRm4iLCJjaGFpbiIsImNvc3RGbiIsImNvc3QiLCJwbGFubmVyIiwicGF0aCIsImZpbmQiLCJwb3AiLCJyZXZlcnNlIiwiQWdlbnQiLCJnb2FscyIsInN0YXRlIiwicGVlayIsImFuQWN0aW9uIiwiYW5JbnRlcm1lZGlhdGVTdGF0ZSIsInRhcmdldFN0YXRlIiwiY29uZGl0aW9ucyIsInRzS2V5IiwidHNWYWx1ZSIsImZvcm11bGF0ZSIsIkludGVybWVkaWF0ZVN0YXRlIiwia2V5IiwiRXJyb3IiLCJBY3Rpb24iLCJlZmZlY3RzIiwiZUtleSIsImVWYWwiLCJzS2V5Iiwic1ZhbCIsIk9iamVjdCIsImFzc2lnbiIsIkdvYWwiLCJwcmlvcml0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRQyxRQUFVLGtCQUFWLENBQWQ7QUFDQSxJQUFNQyxPQUFPRCxRQUFVLGlCQUFWLENBQWI7SUFHTUUsSTtBQUNGLGtCQUFhQyxLQUFiLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUFrQjs7OztvQ0FFVjtBQUFBOztBQUNSLGdCQUFJQyxPQUFPLEtBQUtELEtBQUwsQ0FBV0UsT0FBWCxFQUFYO0FBQ0EsZ0JBQUlDLGVBQWUsRUFBbkI7O0FBRUFDLG9CQUFRQyxHQUFSLENBQWMsMEJBQTBCSixJQUF4Qzs7QUFFQTtBQUNBLGlCQUFLRCxLQUFMLENBQVdNLE9BQVgsQ0FBbUJDLE9BQW5CLENBQTZCLFVBQUVDLE1BQUYsRUFBYztBQUN2QyxvQkFBR0EsT0FBT0MsU0FBUCxDQUFtQlIsSUFBbkIsQ0FBSCxFQUE2QjtBQUFDRSxpQ0FBYU8sSUFBYixDQUFvQkYsTUFBcEI7QUFBMEI7QUFBQSxhQUQ1RDs7QUFHQSxnQkFBR0wsYUFBYVEsTUFBYixLQUF3QixDQUEzQixFQUErQjtBQUFDLHVCQUFPLEVBQVA7QUFBUzs7QUFFekMsZ0JBQUlDLFNBQVMsU0FBVEEsTUFBUyxDQUFFQyxJQUFGLEVBQVFDLElBQVI7QUFBQSx1QkFBa0IsQ0FBbEI7QUFBQSxhQUFiO0FBQ0EsZ0JBQUlDLFNBQVMsU0FBVEEsTUFBUztBQUFBLHVCQUFRLE1BQUtmLEtBQUwsQ0FBV2dCLGNBQVgsQ0FBNEJILElBQTVCLENBQVI7QUFBQSxhQUFiO0FBQ0EsZ0JBQUlJLFNBQVMsU0FBVEEsTUFBUztBQUFBLHVCQUFRSixLQUFLSyxLQUFiO0FBQUEsYUFBYjtBQUNBLGdCQUFJQyxTQUFTLFNBQVRBLE1BQVM7QUFBQSx1QkFBUU4sS0FBS08sSUFBYjtBQUFBLGFBQWI7O0FBRUFoQixvQkFBUUMsR0FBUixDQUFjLGlDQUFpQ0YsYUFBYSxDQUFiLENBQS9DOztBQUVBLGdCQUFJa0IsVUFBVSxJQUFJekIsS0FBSixDQUFZZ0IsTUFBWixFQUFvQkcsTUFBcEIsRUFBNEJFLE1BQTVCLEVBQW9DRSxNQUFwQyxDQUFkO0FBQ0EsZ0JBQUlHLE9BQU9ELFFBQVFFLElBQVIsQ0FBZXBCLGFBQWFxQixHQUFiLEVBQWYsQ0FBWDtBQUNBRixpQkFBS0csT0FBTDs7QUFHQSxnQkFBR0gsS0FBS1gsTUFBTCxLQUFnQixDQUFuQixFQUF1QjtBQUNuQlAsd0JBQVFDLEdBQVIsQ0FBYyxnQkFBZDtBQUE4QixhQURsQyxNQUVLO0FBQ0RELHdCQUFRQyxHQUFSLENBQWMsT0FBZDtBQUNBaUIscUJBQUtmLE9BQUwsQ0FBZTtBQUFBLDJCQUFVSCxRQUFRQyxHQUFSLENBQWMsT0FBT0csTUFBckIsQ0FBVjtBQUFBLGlCQUFmO0FBQW9EO0FBQUE7Ozs7OztJQUcxRGtCLEs7QUFDRixxQkFBYztBQUFBOztBQUNWLGFBQUtMLE9BQUwsR0FBZSxJQUFJdEIsSUFBSixDQUFXLElBQVgsQ0FBZjtBQUNBLGFBQUs0QixLQUFMLEdBQWEsSUFBSTdCLElBQUosRUFBYjtBQUNBLGFBQUtRLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS3NCLEtBQUwsR0FBYSxFQUFiO0FBQWU7Ozs7a0NBRVQ7QUFBRyxtQkFBTyxLQUFLRCxLQUFMLENBQVdFLElBQVgsRUFBUDtBQUF3Qjs7O2tDQUUxQkMsUSxFQUFXO0FBQ2xCLGlCQUFLeEIsT0FBTCxDQUFhQyxPQUFiLENBQXVCLGtCQUFVO0FBQzdCLG9CQUFHdUIsU0FBU3JCLFNBQVQsQ0FBcUJELE1BQXJCLENBQUgsRUFBaUM7QUFBQ0EsMkJBQU9VLEtBQVAsQ0FBYVIsSUFBYixDQUFvQm9CLFFBQXBCO0FBQTRCO0FBQzlELG9CQUFHdEIsT0FBT0MsU0FBUCxDQUFtQnFCLFFBQW5CLENBQUgsRUFBaUM7QUFBQ0EsNkJBQVNaLEtBQVQsQ0FBZVIsSUFBZixDQUFzQkYsTUFBdEI7QUFBNEI7QUFBQSxhQUZsRTs7QUFJQSxpQkFBS0YsT0FBTCxDQUFhSSxJQUFiLENBQW9Cb0IsUUFBcEI7QUFBNEI7Ozt1Q0FFaEJDLG1CLEVBQXNCO0FBQ2xDLGdCQUFJQyxjQUFjRCxvQkFBb0JFLFVBQXRDOztBQUVBLGlCQUFJLElBQUlDLEtBQVIsSUFBaUJGLFdBQWpCLEVBQStCO0FBQzNCLG9CQUFJRyxVQUFVSCxZQUFZRSxLQUFaLENBQWQ7O0FBRUEsb0JBQUcsS0FBS04sS0FBTCxDQUFXTSxLQUFYLEtBQXFCQyxPQUF4QixFQUFrQztBQUFDLDJCQUFPLEtBQVA7QUFBWTtBQUFBOztBQUVuRCxtQkFBTyxJQUFQO0FBQVc7OztrQ0FFTDtBQUFHLG1CQUFPLEtBQUtkLE9BQUwsQ0FBYWUsU0FBYixFQUFQO0FBQStCOzs7Ozs7SUFJMUNDLGlCO0FBQ0YsK0JBQWFDLEdBQWIsRUFBa0M7QUFBQSxZQUFoQkwsVUFBZ0IsdUVBQUwsRUFBSzs7QUFBQTs7QUFDOUIsYUFBS0ssR0FBTCxHQUFXQSxHQUFYO0FBQ0EsYUFBS0wsVUFBTCxHQUFrQkEsVUFBbEI7QUFBNEI7Ozs7bUNBRXJCO0FBQUcsbUJBQU8sS0FBS0ssR0FBWjtBQUFlOzs7a0NBRWxCUCxtQixFQUFzQjtBQUFHLG1CQUFPLElBQUlRLEtBQUosQ0FBWSx3RUFBWixDQUFQO0FBQTJGOzs7Z0NBRXZIO0FBQUcsbUJBQU8sSUFBSUEsS0FBSixDQUFZLCtDQUFaLENBQVA7QUFBa0U7Ozs7OztJQUczRUMsTTs7O0FBQ0Ysb0JBQWFGLEdBQWIsRUFBc0Q7QUFBQSxZQUFwQ0wsVUFBb0MsdUVBQXpCLEVBQXlCO0FBQUEsWUFBckJRLE9BQXFCLHVFQUFiLEVBQWE7QUFBQSxZQUFUckIsSUFBUyx1RUFBSixDQUFJOztBQUFBOztBQUFBLHFIQUMxQ2tCLEdBRDBDLEVBQ3JDTCxVQURxQzs7QUFFbEQsZUFBS1EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsZUFBS3JCLElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUtGLEtBQUwsR0FBYSxFQUFiLENBSmtEO0FBSW5DOzs7O2tDQUVSYSxtQixFQUFzQjtBQUM3QixnQkFBSUgsUUFBUUcsb0JBQW9CRSxVQUFoQzs7QUFFQSxpQkFBSSxJQUFJUyxJQUFSLElBQWdCLEtBQUtELE9BQXJCLEVBQStCO0FBQzNCLG9CQUFJRSxPQUFPLEtBQUtGLE9BQUwsQ0FBYUMsSUFBYixDQUFYOztBQUVBLHFCQUFJLElBQUlFLElBQVIsSUFBZ0JoQixLQUFoQixFQUF3QjtBQUNwQix3QkFBSWlCLE9BQU9qQixNQUFNZ0IsSUFBTixDQUFYOztBQUVBLHdCQUFHRixRQUFRRSxJQUFSLElBQWdCRCxRQUFRRSxJQUEzQixFQUFrQztBQUFDLCtCQUFPLElBQVA7QUFBVztBQUFBO0FBQUE7O0FBRXRELG1CQUFPLEtBQVA7QUFBWTs7O2dDQUVSO0FBQUcsbUJBQU9DLE9BQU9DLE1BQVAsQ0FBZ0IsSUFBSVAsTUFBSixFQUFoQixFQUE4QixJQUE5QixDQUFQO0FBQXlDOzs7O0VBcEJuQ0gsaUI7O0lBdUJmVyxJOzs7QUFDRixrQkFBYVYsR0FBYixFQUE4QztBQUFBLFlBQTVCTCxVQUE0Qix1RUFBakIsRUFBaUI7QUFBQSxZQUFiZ0IsUUFBYSx1RUFBSixDQUFJOztBQUFBOztBQUFBLGlIQUNsQ1gsR0FEa0MsRUFDN0JMLFVBRDZCOztBQUUxQyxlQUFLZ0IsUUFBTCxHQUFnQkEsUUFBaEIsQ0FGMEM7QUFFbEI7Ozs7Z0NBRXBCO0FBQUcsbUJBQU9ILE9BQU9DLE1BQVAsQ0FBZ0IsSUFBSUMsSUFBSixFQUFoQixFQUE0QixJQUE1QixDQUFQO0FBQXVDOzs7O0VBTG5DWCxpQjs7QUFRbkJhLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnBELFVBQU1BLElBRE87QUFFWDJCLFdBQU9BLEtBRkk7QUFHWGMsWUFBUUEsTUFIRztBQUlYUSxVQUFNQSxJQUpLLEVBQWpCIiwiZmlsZSI6InBsYW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBU3RhciA9IHJlcXVpcmUgQCAnLi4vZGlzdC9hc3Rhci5qcydcbmNvbnN0IEhlYXAgPSByZXF1aXJlIEAgJy4uL2Rpc3QvaGVhcC5qcydcblxuXG5jbGFzcyBHT0FQIDo6XG4gICAgY29uc3RydWN0b3IoIGFnZW50ICkgOjpcbiAgICAgICAgdGhpcy5hZ2VudCA9IGFnZW50XG5cbiAgICBmb3JtdWxhdGUoKSA6OlxuICAgICAgICBsZXQgZ29hbCA9IHRoaXMuYWdlbnQuZ2V0R29hbCgpXG4gICAgICAgIGxldCBmaW5hbEFjdGlvbnMgPSBbXVxuXG4gICAgICAgIGNvbnNvbGUubG9nIEAgJ0Zvcm11bGF0aW5nIHBsYW4gZm9yICcgKyBnb2FsXG5cbiAgICAgICAgLy8gVE9ETyBhbGxvdyBmb3IgY29tcG9zaXRlIG9mIGFjdGlvbnMgdG8gYWNjb21wbGlzaCBnb2FsXG4gICAgICAgIHRoaXMuYWdlbnQuYWN0aW9ucy5mb3JFYWNoIEAgKCBhY3Rpb24gKSA9PiA6OlxuICAgICAgICAgICAgaWYgYWN0aW9uLnNhdGlzZmllcyBAIGdvYWwgOjogZmluYWxBY3Rpb25zLnB1c2ggQCBhY3Rpb25cblxuICAgICAgICBpZiBmaW5hbEFjdGlvbnMubGVuZ3RoID09PSAwIDo6IHJldHVybiBbXVxuXG4gICAgICAgIGxldCBoZXVyRm4gPSAoIG5vZGUsIHJvb3QgKSA9PiAwXG4gICAgICAgIGxldCBnb2FsRm4gPSBub2RlID0+IHRoaXMuYWdlbnQuc3RhdGVTYXRpc2ZpZXMgQCBub2RlXG4gICAgICAgIGxldCBzdWNjRm4gPSBub2RlID0+IG5vZGUuY2hhaW5cbiAgICAgICAgbGV0IGNvc3RGbiA9IG5vZGUgPT4gbm9kZS5jb3N0XG5cbiAgICAgICAgY29uc29sZS5sb2cgQCAnU3RhcnRpbmcgc2VhcmNoIHdpdGggYWN0aW9uICcgKyBmaW5hbEFjdGlvbnNbMF1cblxuICAgICAgICBsZXQgcGxhbm5lciA9IG5ldyBBU3RhciBAIGhldXJGbiwgZ29hbEZuLCBzdWNjRm4sIGNvc3RGblxuICAgICAgICBsZXQgcGF0aCA9IHBsYW5uZXIuZmluZCBAIGZpbmFsQWN0aW9ucy5wb3AoKVxuICAgICAgICBwYXRoLnJldmVyc2UoKVxuXG5cbiAgICAgICAgaWYgcGF0aC5sZW5ndGggPT09IDAgOjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEAgJ05vIHBsYW4gZm91bmQhJ1xuICAgICAgICBlbHNlIDo6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyBAICdQbGFuOidcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaCBAIGFjdGlvbiA9PiBjb25zb2xlLmxvZyBAICdcXHQnICsgYWN0aW9uXG5cblxuY2xhc3MgQWdlbnQgOjpcbiAgICBjb25zdHJ1Y3RvcigpIDo6XG4gICAgICAgIHRoaXMucGxhbm5lciA9IG5ldyBHT0FQIEAgdGhpc1xuICAgICAgICB0aGlzLmdvYWxzID0gbmV3IEhlYXAoKVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXVxuICAgICAgICB0aGlzLnN0YXRlID0ge31cblxuICAgIGdldEdvYWwoKSA6OiByZXR1cm4gdGhpcy5nb2Fscy5wZWVrKClcblxuICAgIGFkZEFjdGlvbiggYW5BY3Rpb24gKSA6OlxuICAgICAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaCBAIGFjdGlvbiA9PiA6OlxuICAgICAgICAgICAgaWYgYW5BY3Rpb24uc2F0aXNmaWVzIEAgYWN0aW9uIDo6IGFjdGlvbi5jaGFpbi5wdXNoIEAgYW5BY3Rpb25cbiAgICAgICAgICAgIGlmIGFjdGlvbi5zYXRpc2ZpZXMgQCBhbkFjdGlvbiA6OiBhbkFjdGlvbi5jaGFpbi5wdXNoIEAgYWN0aW9uXG5cbiAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2ggQCBhbkFjdGlvblxuXG4gICAgc3RhdGVTYXRpc2ZpZXMoIGFuSW50ZXJtZWRpYXRlU3RhdGUgKSA6OlxuICAgICAgICBsZXQgdGFyZ2V0U3RhdGUgPSBhbkludGVybWVkaWF0ZVN0YXRlLmNvbmRpdGlvbnNcblxuICAgICAgICBmb3IgbGV0IHRzS2V5IGluIHRhcmdldFN0YXRlIDo6XG4gICAgICAgICAgICBsZXQgdHNWYWx1ZSA9IHRhcmdldFN0YXRlW3RzS2V5XVxuXG4gICAgICAgICAgICBpZiB0aGlzLnN0YXRlW3RzS2V5XSAhPSB0c1ZhbHVlIDo6IHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICBnZXRQbGFuKCkgOjogcmV0dXJuIHRoaXMucGxhbm5lci5mb3JtdWxhdGUoKVxuICAgICAgICBcblxuXG5jbGFzcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30gKSA6OlxuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zXG5cbiAgICB0b1N0cmluZygpIDo6IHJldHVybiB0aGlzLmtleVxuXG4gICAgc2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkgOjogcmV0dXJuIG5ldyBFcnJvciBAICdBbiBJbnRlcm1lZGlhdGVTdGF0ZSBtdXN0IGltcGxlbWVudCBAc2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkuJ1xuXG4gICAgY2xvbmUoKSA6OiByZXR1cm4gbmV3IEVycm9yIEAgJ0FuIEludGVybWVkaWF0ZVN0YXRlIG11c3QgaW1wbGVtZW50IEBjbG9uZSgpLidcblxuXG5jbGFzcyBBY3Rpb24gZXh0ZW5kcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30sIGVmZmVjdHM9e30sIGNvc3Q9MCApIDo6XG4gICAgICAgIHN1cGVyIEAga2V5LCBjb25kaXRpb25zXG4gICAgICAgIHRoaXMuZWZmZWN0cyA9IGVmZmVjdHNcbiAgICAgICAgdGhpcy5jb3N0ID0gY29zdFxuICAgICAgICB0aGlzLmNoYWluID0gW11cblxuICAgIHNhdGlzZmllcyggYW5JbnRlcm1lZGlhdGVTdGF0ZSApIDo6XG4gICAgICAgIGxldCBzdGF0ZSA9IGFuSW50ZXJtZWRpYXRlU3RhdGUuY29uZGl0aW9uc1xuICAgICAgICBcbiAgICAgICAgZm9yIGxldCBlS2V5IGluIHRoaXMuZWZmZWN0cyA6OlxuICAgICAgICAgICAgbGV0IGVWYWwgPSB0aGlzLmVmZmVjdHNbZUtleV1cblxuICAgICAgICAgICAgZm9yIGxldCBzS2V5IGluIHN0YXRlIDo6XG4gICAgICAgICAgICAgICAgbGV0IHNWYWwgPSBzdGF0ZVtzS2V5XVxuXG4gICAgICAgICAgICAgICAgaWYgZUtleSA9PSBzS2V5ICYmIGVWYWwgPT0gc1ZhbCA6OiByZXR1cm4gdHJ1ZVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgY2xvbmUoKSA6OiByZXR1cm4gT2JqZWN0LmFzc2lnbiBAIG5ldyBBY3Rpb24oKSwgdGhpc1xuXG5cbmNsYXNzIEdvYWwgZXh0ZW5kcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30sIHByaW9yaXR5PTAgKSA6OlxuICAgICAgICBzdXBlciBAIGtleSwgY29uZGl0aW9uc1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcblxuICAgIGNsb25lKCkgOjogcmV0dXJuIE9iamVjdC5hc3NpZ24gQCBuZXcgR29hbCgpLCB0aGlzXG5cblxubW9kdWxlLmV4cG9ydHMgPSA6OlxuICAgIEdPQVA6IEdPQVBcbiAgICAsIEFnZW50OiBBZ2VudFxuICAgICwgQWN0aW9uOiBBY3Rpb25cbiAgICAsIEdvYWw6IEdvYWxcbiJdfQ==