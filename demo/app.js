'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var goal = new Planner.Goal('KillEnemy', { kTargetIsDead: true });

var actions = [new Planner.Action('Attack', { kWeaponIsLoaded: true }, { kTargetIsDead: true }), new Planner.Action('LoadWeapon', { kWeaponIsArmed: true }, { kWeaponIsLoaded: true }), new Planner.Action('DrawWeapon', {}, { kWeaponIsArmed: true })];var createVNode = Inferno.createVNode;

var GoalView = function (_Inferno$Component) {
    _inherits(GoalView, _Inferno$Component);

    function GoalView(props) {
        _classCallCheck(this, GoalView);

        var _this = _possibleConstructorReturn(this, (GoalView.__proto__ || Object.getPrototypeOf(GoalView)).call(this, props));

        _this.state = {
            editing: false
        };return _this;
    }

    _createClass(GoalView, [{
        key: 'renderBool',
        value: function renderBool(bool) {
            return bool ? 'true' : 'false';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var conditions = Object.keys(this.props.goal.conditions).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', typeof _this2.props.goal.conditions[key] === 'boolean' ? _this2.renderBool(_this2.props.goal.conditions[key]) : _this2.props.goal.conditions[key]]);
            });
            var exitModal = function exitModal() {
                _this2.setState({ editing: false });
            };
            var update = function update() {
                _this2.setState();
            };

            return createVNode(2, 'div', 'card', [createVNode(2, 'button', null, 'X', {
                'onClick': function onClick(e) {
                    return _this2.props.removeGoal();
                }
            }), createVNode(2, 'button', null, 'E', {
                'onClick': function onClick(e) {
                    return _this2.setState({ editing: true });
                }
            }), createVNode(2, 'div', 'clearing'), createVNode(2, 'p', null, ['Key: ', createVNode(2, 'strong', null, this.props.goal.key)]), createVNode(2, 'p', null, ['Priority: ', createVNode(2, 'strong', null, this.props.goal.priority)]), createVNode(2, 'p', null, ['Conditions:', createVNode(2, 'ul', null, conditions)]), this.state.editing ? createVNode(16, GoalEditor, null, null, {
                'goal': this.props.goal,
                'exitModal': exitModal,
                'update': update
            }) : '']);
        }
    }]);

    return GoalView;
}(Inferno.Component);

var GoalEditor = function (_Inferno$Component2) {
    _inherits(GoalEditor, _Inferno$Component2);

    function GoalEditor(props) {
        _classCallCheck(this, GoalEditor);

        var _this3 = _possibleConstructorReturn(this, (GoalEditor.__proto__ || Object.getPrototypeOf(GoalEditor)).call(this, props));

        _this3.save = function (fields) {
            var newConditions = {};

            var _loop = function _loop(i) {
                var key = void 0,
                    val = void 0;

                fields.forEach(function (field) {
                    if (field[0] == 'condition' + i + 'key') {
                        key = field[1];
                    }
                    if (field[0] == 'condition' + i + 'val') {
                        val = field[1];
                    }
                });

                if (typeof key !== 'undefined') {
                    newConditions[key] = val;
                }
            };

            for (var i = 0; i <= _this3.state.c; i++) {
                _loop(i);
            }

            _this3.props.goal.conditions = newConditions;
            _this3.props.exitModal();
        };

        _this3.removeCondition = function (key) {
            delete _this3.props.goal.conditions[key];
            _this3.props.update();
        };

        _this3.addBlankCondition = function (e) {
            _this3.props.goal.conditions['newCondition' + new Date().getTime()] = null;
            _this3.props.update();
        };

        _this3.state = {
            c: 0
        };return _this3;
    }

    _createClass(GoalEditor, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var conditions = Object.keys(this.props.goal.conditions).map(function (key) {
                var cn = _this4.state.c++;
                return createVNode(2, 'p', null, [createVNode(2, 'button', null, 'X', {
                    'type': 'button',
                    'onClick': function onClick(e) {
                        return _this4.removeCondition(key);
                    }
                }), createVNode(512, 'input', null, null, {
                    'type': 'text',
                    'name': 'condition' + cn + 'key',
                    'placeholder': 'Condition Key',
                    'value': key
                }), createVNode(512, 'input', null, null, {
                    'type': 'text',
                    'name': 'condition' + cn + 'val',
                    'placeholder': 'Condition Value',
                    'value': _this4.props.goal.conditions[key]
                })]);
            });

            return createVNode(2, 'div', 'overlay', createVNode(2, 'div', 'modal', [createVNode(2, 'div', 'modal-header', [createVNode(2, 'div', 'clearing'), createVNode(2, 'button', 'modal-close-btn', 'X', {
                'onClick': function onClick() {
                    return _this4.props.exitModal();
                }
            }), createVNode(2, 'hr', null, null, {
                'style': 'clear: both;'
            })]), createVNode(2, 'div', 'modal-content', [createVNode(2, 'label', null, ['Key:', createVNode(512, 'input', null, null, {
                'type': 'text',
                'name': 'key',
                'placeholder': 'Key',
                'value': this.props.goal.key
            })]), createVNode(2, 'br'), createVNode(2, 'label', null, ['Priority:', createVNode(512, 'input', null, null, {
                'type': 'number',
                'min': '0',
                'step': '1',
                'name': 'priority',
                'placeholder': 'Priority',
                'value': this.props.goal.priority
            })]), createVNode(2, 'p', null, 'Conditions:'), createVNode(2, 'form', 'goalEditorForm', conditions, {
                'onSubmit': function onSubmit(e) {
                    e.preventDefault(), _this4.save(Array.from(new FormData(e.target)));
                }
            }), createVNode(2, 'button', null, 'Add New Condition', {
                'onClick': this.addBlankCondition
            })]), createVNode(2, 'div', 'modal-footer', [createVNode(2, 'hr'), createVNode(2, 'button', null, 'Cancel', {
                'onClick': this.close
            }), createVNode(2, 'button', null, 'Save', {
                'onClick': function onClick(e) {
                    return document.getElementsByClassName('goalEditorForm')[0].dispatchEvent(new CustomEvent('submit', { bubbles: true, cancelable: true }));
                }
            })])]));
        }
    }]);

    return GoalEditor;
}(Inferno.Component);

var ActionView = function (_Inferno$Component3) {
    _inherits(ActionView, _Inferno$Component3);

    function ActionView(props) {
        _classCallCheck(this, ActionView);

        return _possibleConstructorReturn(this, (ActionView.__proto__ || Object.getPrototypeOf(ActionView)).call(this, props));
    }

    _createClass(ActionView, [{
        key: 'renderBool',
        value: function renderBool(bool) {
            return bool ? 'true' : 'false';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var conditions = Object.keys(this.props.action.conditions).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this6.renderBool(_this6.props.action.conditions[key])]);
            });
            var effects = Object.keys(this.props.action.effects).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this6.renderBool(_this6.props.action.effects[key])]);
            });

            return createVNode(2, 'div', 'card', [createVNode(2, 'button', null, 'X', {
                'onClick': function onClick(e) {
                    return _this6.props.removeAction();
                }
            }), createVNode(2, 'div', 'clearing'), createVNode(2, 'p', null, ['Key: ', createVNode(2, 'strong', null, this.props.action.key)]), createVNode(2, 'p', null, ['Conditions:', createVNode(2, 'ul', null, conditions), 'Effects:', createVNode(2, 'ul', null, effects)])]);
        }
    }]);

    return ActionView;
}(Inferno.Component);

var PlanCrumbView = function (_Inferno$Component4) {
    _inherits(PlanCrumbView, _Inferno$Component4);

    function PlanCrumbView(props) {
        _classCallCheck(this, PlanCrumbView);

        return _possibleConstructorReturn(this, (PlanCrumbView.__proto__ || Object.getPrototypeOf(PlanCrumbView)).call(this, props));
    }

    _createClass(PlanCrumbView, [{
        key: 'render',
        value: function render() {
            return createVNode(2, 'li', 'plancrumb', this.props.crumb);
        }
    }]);

    return PlanCrumbView;
}(Inferno.Component);

var PlanView = function (_Inferno$Component5) {
    _inherits(PlanView, _Inferno$Component5);

    function PlanView(props) {
        _classCallCheck(this, PlanView);

        return _possibleConstructorReturn(this, (PlanView.__proto__ || Object.getPrototypeOf(PlanView)).call(this, props));
    }

    _createClass(PlanView, [{
        key: 'render',
        value: function render() {
            if (this.plan && this.props.plan.crumbs.length) {
                var crumbs = this.props.plan.crumbs.map(function (crumb) {
                    return createVNode(16, PlanCrumbView, null, null, {
                        'crumb': crumb.key
                    });
                });

                return createVNode(2, 'div', null, [createVNode(2, 'p', null, ['Zee plan to ', createVNode(2, 'strong', null, this.props.plan.goal.key), ':']), createVNode(2, 'ol', null, crumbs)]);
            } else {
                return createVNode(2, 'p', null, 'No result.');
            }
        }
    }]);

    return PlanView;
}(Inferno.Component);

var App = function (_Inferno$Component6) {
    _inherits(App, _Inferno$Component6);

    function App(props) {
        _classCallCheck(this, App);

        var _this9 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var agent = new Planner.Agent();

        agent.goals.push(goal.clone());
        actions.forEach(function (action) {
            return agent.addAction(action.clone());
        });

        _this9.state = {
            agent: agent,
            plan: agent.getPlan() };return _this9;
    }

    _createClass(App, [{
        key: 'removeGoal',
        value: function removeGoal(aGoal) {
            this.state.agent.goals.remove(aGoal);
            this.setState({ plan: this.state.agent.getPlan() });
        }
    }, {
        key: 'removeAction',
        value: function removeAction(anAction) {
            this.state.agent.removeAction(anAction);
            this.setState({ plan: this.state.agent.getPlan() });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            var actions = this.state.agent.actions.map(function (action) {
                return createVNode(16, ActionView, null, null, {
                    'action': action,
                    'removeAction': function removeAction() {
                        return _this10.removeAction(action);
                    }
                }, action.key);
            });

            var goals = this.state.agent.goals.contents.map(function (goal) {
                return createVNode(16, GoalView, null, null, {
                    'goal': goal,
                    'removeGoal': function removeGoal() {
                        return _this10.removeGoal(goal);
                    }
                }, goal.key);
            });

            return createVNode(2, 'div', null, [createVNode(2, 'p', null, 'Zee goalz:'), goals, createVNode(2, 'p', null, 'Zee akshunz:'), actions, createVNode(16, PlanView, null, null, {
                'plan': this.state.plan
            })]);
        }
    }]);

    return App;
}(Inferno.Component);

var container = document.getElementById('container');

Inferno.render(createVNode(16, App), container);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiZ29hbCIsIlBsYW5uZXIiLCJHb2FsIiwia1RhcmdldElzRGVhZCIsImFjdGlvbnMiLCJBY3Rpb24iLCJrV2VhcG9uSXNMb2FkZWQiLCJrV2VhcG9uSXNBcm1lZCIsIkdvYWxWaWV3IiwicHJvcHMiLCJzdGF0ZSIsImVkaXRpbmciLCJib29sIiwiY29uZGl0aW9ucyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJyZW5kZXJCb29sIiwiZXhpdE1vZGFsIiwic2V0U3RhdGUiLCJ1cGRhdGUiLCJyZW1vdmVHb2FsIiwicHJpb3JpdHkiLCJJbmZlcm5vIiwiQ29tcG9uZW50IiwiR29hbEVkaXRvciIsInNhdmUiLCJmaWVsZHMiLCJuZXdDb25kaXRpb25zIiwiaSIsInZhbCIsImZvckVhY2giLCJmaWVsZCIsImMiLCJyZW1vdmVDb25kaXRpb24iLCJhZGRCbGFua0NvbmRpdGlvbiIsImUiLCJEYXRlIiwiZ2V0VGltZSIsImNuIiwicHJldmVudERlZmF1bHQiLCJBcnJheSIsImZyb20iLCJGb3JtRGF0YSIsInRhcmdldCIsImNsb3NlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJBY3Rpb25WaWV3IiwiYWN0aW9uIiwiZWZmZWN0cyIsInJlbW92ZUFjdGlvbiIsIlBsYW5DcnVtYlZpZXciLCJjcnVtYiIsIlBsYW5WaWV3IiwicGxhbiIsImNydW1icyIsImxlbmd0aCIsIkFwcCIsImFnZW50IiwiQWdlbnQiLCJnb2FscyIsInB1c2giLCJjbG9uZSIsImFkZEFjdGlvbiIsImdldFBsYW4iLCJhR29hbCIsInJlbW92ZSIsImFuQWN0aW9uIiwiY29udGVudHMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sSUFBSUMsUUFBUUMsSUFBWixDQUNULFdBRFMsRUFFUCxFQUFJQyxlQUFlLElBQW5CLEVBRk8sQ0FBYjs7QUFJQSxJQUFNQyxVQUFVLENBQ1osSUFBSUgsUUFBUUksTUFBWixDQUNJLFFBREosRUFFTSxFQUFJQyxpQkFBaUIsSUFBckIsRUFGTixFQUdNLEVBQUlILGVBQWUsSUFBbkIsRUFITixDQURZLEVBTVYsSUFBSUYsUUFBUUksTUFBWixDQUNFLFlBREYsRUFFSSxFQUFJRSxnQkFBZ0IsSUFBcEIsRUFGSixFQUdJLEVBQUlELGlCQUFpQixJQUFyQixFQUhKLENBTlUsRUFXVixJQUFJTCxRQUFRSSxNQUFaLENBQ0UsWUFERixFQUVJLEVBRkosRUFHSSxFQUFJRSxnQkFBZ0IsSUFBcEIsRUFISixDQVhVLENBQWhCLEM7O0lBdUJNQyxROzs7QUFDRixzQkFBYUMsS0FBYixFQUFxQjtBQUFBOztBQUFBLHdIQUNUQSxLQURTOztBQUVqQixjQUFLQyxLQUFMLEdBQWE7QUFDVEMscUJBQVM7QUFEQSxTQUFiLENBRmlCO0FBSWhCOzs7O21DQUVPQyxJLEVBQU87QUFBRyxtQkFBT0EsT0FBTyxNQUFQLEdBQWdCLE9BQXZCO0FBQThCOzs7aUNBRTNDO0FBQUE7O0FBQ0wsZ0JBQUlDLGFBQWFDLE9BQU9DLElBQVAsQ0FBYSxLQUFLTixLQUFMLENBQVdULElBQVgsQ0FBZ0JhLFVBQTdCLEVBQTBDRyxHQUExQyxDQUFnRDtBQUFBLGtGQUFxQkMsR0FBckIsU0FBdUMsT0FBTyxPQUFLUixLQUFMLENBQVdULElBQVgsQ0FBZ0JhLFVBQWhCLENBQTJCSSxHQUEzQixDQUFQLEtBQTJDLFNBQTNDLEdBQXVELE9BQUtDLFVBQUwsQ0FBaUIsT0FBS1QsS0FBTCxDQUFXVCxJQUFYLENBQWdCYSxVQUFoQixDQUEyQkksR0FBM0IsQ0FBakIsQ0FBdkQsR0FBNEcsT0FBS1IsS0FBTCxDQUFXVCxJQUFYLENBQWdCYSxVQUFoQixDQUEyQkksR0FBM0IsQ0FBbko7QUFBQSxhQUFoRCxDQUFqQjtBQUNBLGdCQUFNRSxZQUFZLFNBQVpBLFNBQVksR0FBTTtBQUFHLHVCQUFLQyxRQUFMLENBQWdCLEVBQUVULFNBQVMsS0FBWCxFQUFoQjtBQUFrQyxhQUE3RDtBQUNBLGdCQUFNVSxTQUFTLFNBQVRBLE1BQVMsR0FBTTtBQUFHLHVCQUFLRCxRQUFMO0FBQWUsYUFBdkM7O0FBRUEseUNBQ2UsTUFEZjtBQUFBLDJCQUUwQjtBQUFBLDJCQUFLLE9BQUtYLEtBQUwsQ0FBV2EsVUFBWCxFQUFMO0FBQUE7QUFGMUI7QUFBQSwyQkFHMEI7QUFBQSwyQkFBSyxPQUFLRixRQUFMLENBQWUsRUFBRVQsU0FBUyxJQUFYLEVBQWYsQ0FBTDtBQUFBO0FBSDFCLHNDQUltQixVQUpuQixzRUFLMEIsS0FBS0YsS0FBTCxDQUFXVCxJQUFYLENBQWdCaUIsR0FMMUMsNkVBTStCLEtBQUtSLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQnVCLFFBTi9DLDBFQVNrQlYsVUFUbEIsS0FXVSxLQUFLSCxLQUFMLENBQVdDLE9BQVgsbUJBQXNCLFVBQXRCO0FBQUEsd0JBQXdDLEtBQUtGLEtBQUwsQ0FBV1QsSUFBbkQ7QUFBQSw2QkFBc0VtQixTQUF0RTtBQUFBLDBCQUEyRkU7QUFBM0YsaUJBQXlHLEVBWG5IO0FBWVU7Ozs7RUExQktHLFFBQVFDLFM7O0lBNEJ6QkMsVTs7O0FBQ0Ysd0JBQWFqQixLQUFiLEVBQXFCO0FBQUE7O0FBQUEsNkhBQ1RBLEtBRFM7O0FBQUEsZUFNckJrQixJQU5xQixHQU1kLFVBQUVDLE1BQUYsRUFBYztBQUNqQixnQkFBSUMsZ0JBQWdCLEVBQXBCOztBQURpQix1Q0FHVEMsQ0FIUztBQUliLG9CQUFJYixZQUFKO0FBQUEsb0JBQVNjLFlBQVQ7O0FBRUFILHVCQUFPSSxPQUFQLENBQWlCLGlCQUFTO0FBQ3RCLHdCQUFHQyxNQUFNLENBQU4sS0FBWSxjQUFjSCxDQUFkLEdBQWtCLEtBQWpDLEVBQXlDO0FBQUNiLDhCQUFNZ0IsTUFBTSxDQUFOLENBQU47QUFBYztBQUN4RCx3QkFBR0EsTUFBTSxDQUFOLEtBQVksY0FBY0gsQ0FBZCxHQUFrQixLQUFqQyxFQUF5QztBQUFDQyw4QkFBTUUsTUFBTSxDQUFOLENBQU47QUFBYztBQUFBLGlCQUY1RDs7QUFJQSxvQkFBRyxPQUFPaEIsR0FBUCxLQUFlLFdBQWxCLEVBQWdDO0FBQUNZLGtDQUFjWixHQUFkLElBQXFCYyxHQUFyQjtBQUF3QjtBQVY1Qzs7QUFHakIsaUJBQUksSUFBSUQsSUFBSSxDQUFaLEVBQWVBLEtBQUssT0FBS3BCLEtBQUwsQ0FBV3dCLENBQS9CLEVBQWtDSixHQUFsQyxFQUF3QztBQUFBLHNCQUFoQ0EsQ0FBZ0M7QUFPcUI7O0FBRTdELG1CQUFLckIsS0FBTCxDQUFXVCxJQUFYLENBQWdCYSxVQUFoQixHQUE2QmdCLGFBQTdCO0FBQ0EsbUJBQUtwQixLQUFMLENBQVdVLFNBQVg7QUFBc0IsU0FuQkw7O0FBQUEsZUFxQnJCZ0IsZUFyQnFCLEdBcUJILFVBQUVsQixHQUFGLEVBQVc7QUFDekIsbUJBQU8sT0FBS1IsS0FBTCxDQUFXVCxJQUFYLENBQWdCYSxVQUFoQixDQUEyQkksR0FBM0IsQ0FBUDtBQUNBLG1CQUFLUixLQUFMLENBQVdZLE1BQVg7QUFBbUIsU0F2QkY7O0FBQUEsZUF5QnJCZSxpQkF6QnFCLEdBeUJELFVBQUVDLENBQUYsRUFBUztBQUN6QixtQkFBSzVCLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQmEsVUFBaEIsQ0FBNEIsaUJBQWtCLElBQUl5QixJQUFKLEVBQUQsQ0FBYUMsT0FBYixFQUE3QyxJQUF3RSxJQUF4RTtBQUNBLG1CQUFLOUIsS0FBTCxDQUFXWSxNQUFYO0FBQW1CLFNBM0JGOztBQUVqQixlQUFLWCxLQUFMLEdBQWE7QUFDVHdCLGVBQUc7QUFETSxTQUFiLENBRmlCO0FBSWhCOzs7O2lDQXlCSTtBQUFBOztBQUNMLGdCQUFJckIsYUFBYUMsT0FBT0MsSUFBUCxDQUFhLEtBQUtOLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQmEsVUFBN0IsRUFBMENHLEdBQTFDLENBQWdELFVBQUVDLEdBQUYsRUFBVztBQUN4RSxvQkFBSXVCLEtBQUssT0FBSzlCLEtBQUwsQ0FBV3dCLENBQVgsRUFBVDtBQUNBO0FBQUEsNEJBRXFCLFFBRnJCO0FBQUEsK0JBRXdDO0FBQUEsK0JBQUssT0FBS0MsZUFBTCxDQUFzQmxCLEdBQXRCLENBQUw7QUFBQTtBQUZ4QztBQUFBLDRCQUdvQixNQUhwQjtBQUFBLDRCQUdrQyxjQUFjdUIsRUFBZCxHQUFtQixLQUhyRDtBQUFBLG1DQUd5RSxlQUh6RTtBQUFBLDZCQUdpR3ZCO0FBSGpHO0FBQUEsNEJBSW9CLE1BSnBCO0FBQUEsNEJBSWtDLGNBQWN1QixFQUFkLEdBQW1CLEtBSnJEO0FBQUEsbUNBSXlFLGlCQUp6RTtBQUFBLDZCQUltRyxPQUFLL0IsS0FBTCxDQUFXVCxJQUFYLENBQWdCYSxVQUFoQixDQUEyQkksR0FBM0I7QUFKbkc7QUFLUSxhQVBLLENBQWpCOztBQVNBLHlDQUNlLFNBRGYsd0JBRW1CLE9BRm5CLHlCQUd1QixjQUh2Qix5QkFJMkIsVUFKM0IsNEJBSzhCLGlCQUw5QjtBQUFBLDJCQUswRDtBQUFBLDJCQUFNLE9BQUtSLEtBQUwsQ0FBV1UsU0FBWCxFQUFOO0FBQUE7QUFMMUQ7QUFBQSx5QkFNMEI7QUFOMUIsd0NBUXVCLGVBUnZCO0FBQUEsd0JBV2dDLE1BWGhDO0FBQUEsd0JBVzRDLEtBWDVDO0FBQUEsK0JBVzhELEtBWDlEO0FBQUEseUJBVzRFLEtBQUtWLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQmlCO0FBWDVGO0FBQUEsd0JBZ0JnQyxRQWhCaEM7QUFBQSx1QkFnQjZDLEdBaEI3QztBQUFBLHdCQWdCc0QsR0FoQnREO0FBQUEsd0JBZ0IrRCxVQWhCL0Q7QUFBQSwrQkFnQnNGLFVBaEJ0RjtBQUFBLHlCQWdCeUcsS0FBS1IsS0FBTCxDQUFXVCxJQUFYLENBQWdCdUI7QUFoQnpILG1GQW1CNEIsZ0JBbkI1QixFQW9Cc0JWLFVBcEJ0QjtBQUFBLDRCQW1Cd0QscUJBQUs7QUFBRXdCLHNCQUFFSSxjQUFGLElBQW9CLE9BQUtkLElBQUwsQ0FBV2UsTUFBTUMsSUFBTixDQUFZLElBQUlDLFFBQUosQ0FBY1AsRUFBRVEsTUFBaEIsQ0FBWixDQUFYLENBQXBCO0FBQXlFO0FBbkJ4STtBQUFBLDJCQXNCa0MsS0FBS1Q7QUF0QnZDLHdDQXdCdUIsY0F4QnZCO0FBQUEsMkJBMEJrQyxLQUFLVTtBQTFCdkM7QUFBQSwyQkEyQmtDO0FBQUEsMkJBQUtDLFNBQVNDLHNCQUFULENBQWlDLGdCQUFqQyxFQUFvRCxDQUFwRCxFQUF1REMsYUFBdkQsQ0FBc0UsSUFBSUMsV0FBSixDQUFnQixRQUFoQixFQUEwQixFQUFDQyxTQUFTLElBQVYsRUFBZ0JDLFlBQVksSUFBNUIsRUFBMUIsQ0FBdEUsQ0FBTDtBQUFBO0FBM0JsQztBQThCVTs7OztFQXRFTzVCLFFBQVFDLFM7O0lBeUUzQjRCLFU7OztBQUNGLHdCQUFhNUMsS0FBYixFQUFxQjtBQUFBOztBQUFBLHVIQUFXQSxLQUFYO0FBQWdCOzs7O21DQUV6QkcsSSxFQUFPO0FBQUcsbUJBQU9BLE9BQU8sTUFBUCxHQUFnQixPQUF2QjtBQUE4Qjs7O2lDQUUzQztBQUFBOztBQUNMLGdCQUFJQyxhQUFhQyxPQUFPQyxJQUFQLENBQWEsS0FBS04sS0FBTCxDQUFXNkMsTUFBWCxDQUFrQnpDLFVBQS9CLEVBQTRDRyxHQUE1QyxDQUFrRDtBQUFBLGtGQUFxQkMsR0FBckIsU0FBdUMsT0FBS0MsVUFBTCxDQUFpQixPQUFLVCxLQUFMLENBQVc2QyxNQUFYLENBQWtCekMsVUFBbEIsQ0FBNkJJLEdBQTdCLENBQWpCLENBQXZDO0FBQUEsYUFBbEQsQ0FBakI7QUFDQSxnQkFBSXNDLFVBQVV6QyxPQUFPQyxJQUFQLENBQWEsS0FBS04sS0FBTCxDQUFXNkMsTUFBWCxDQUFrQkMsT0FBL0IsRUFBeUN2QyxHQUF6QyxDQUErQztBQUFBLGtGQUFxQkMsR0FBckIsU0FBdUMsT0FBS0MsVUFBTCxDQUFpQixPQUFLVCxLQUFMLENBQVc2QyxNQUFYLENBQWtCQyxPQUFsQixDQUEwQnRDLEdBQTFCLENBQWpCLENBQXZDO0FBQUEsYUFBL0MsQ0FBZDs7QUFFQSx5Q0FDZSxNQURmO0FBQUEsMkJBRTBCO0FBQUEsMkJBQUssT0FBS1IsS0FBTCxDQUFXK0MsWUFBWCxFQUFMO0FBQUE7QUFGMUIsc0NBR21CLFVBSG5CLHNFQUkwQixLQUFLL0MsS0FBTCxDQUFXNkMsTUFBWCxDQUFrQnJDLEdBSjVDLDBFQU9rQkosVUFQbEIsMENBU2tCMEMsT0FUbEI7QUFXVTs7OztFQXBCTy9CLFFBQVFDLFM7O0lBc0IzQmdDLGE7OztBQUNGLDJCQUFhaEQsS0FBYixFQUFxQjtBQUFBOztBQUFBLDZIQUFXQSxLQUFYO0FBQWdCOzs7O2lDQUU1QjtBQUFHLHdDQUFtQixXQUFuQixFQUFpQyxLQUFLQSxLQUFMLENBQVdpRCxLQUE1QztBQUF3RDs7OztFQUg1Q2xDLFFBQVFDLFM7O0lBSzlCa0MsUTs7O0FBQ0Ysc0JBQWFsRCxLQUFiLEVBQXFCO0FBQUE7O0FBQUEsbUhBQVdBLEtBQVg7QUFBZ0I7Ozs7aUNBRTVCO0FBQ0wsZ0JBQUcsS0FBS21ELElBQUwsSUFBYSxLQUFLbkQsS0FBTCxDQUFXbUQsSUFBWCxDQUFnQkMsTUFBaEIsQ0FBdUJDLE1BQXZDLEVBQWdEO0FBQzVDLG9CQUFJRCxTQUFTLEtBQUtwRCxLQUFMLENBQVdtRCxJQUFYLENBQWdCQyxNQUFoQixDQUF1QjdDLEdBQXZCLENBQTZCO0FBQUEsMkNBQVUsYUFBVjtBQUFBLGlDQUFnQzBDLE1BQU16QztBQUF0QztBQUFBLGlCQUE3QixDQUFiOztBQUVBLDhIQUVpQyxLQUFLUixLQUFMLENBQVdtRCxJQUFYLENBQWdCNUQsSUFBaEIsQ0FBcUJpQixHQUZ0RCxxQ0FHYzRDLE1BSGQ7QUFJVSxhQVBkLE1BUUs7QUFDRDtBQUEwQjtBQUFBOzs7O0VBYmZyQyxRQUFRQyxTOztJQWV6QnNDLEc7OztBQUNGLGlCQUFhdEQsS0FBYixFQUFxQjtBQUFBOztBQUFBLCtHQUNUQSxLQURTOztBQUdqQixZQUFJdUQsUUFBUSxJQUFJL0QsUUFBUWdFLEtBQVosRUFBWjs7QUFFQUQsY0FBTUUsS0FBTixDQUFZQyxJQUFaLENBQW1CbkUsS0FBS29FLEtBQUwsRUFBbkI7QUFDQWhFLGdCQUFRNEIsT0FBUixDQUFrQjtBQUFBLG1CQUFVZ0MsTUFBTUssU0FBTixDQUFrQmYsT0FBT2MsS0FBUCxFQUFsQixDQUFWO0FBQUEsU0FBbEI7O0FBRUEsZUFBSzFELEtBQUwsR0FBYTtBQUNUc0QsbUJBQU9BLEtBREU7QUFFUEosa0JBQU1JLE1BQU1NLE9BQU4sRUFGQyxFQUFiLENBUmlCO0FBVVU7Ozs7bUNBRW5CQyxLLEVBQVE7QUFDaEIsaUJBQUs3RCxLQUFMLENBQVdzRCxLQUFYLENBQWlCRSxLQUFqQixDQUF1Qk0sTUFBdkIsQ0FBZ0NELEtBQWhDO0FBQ0EsaUJBQUtuRCxRQUFMLENBQWdCLEVBQUV3QyxNQUFNLEtBQUtsRCxLQUFMLENBQVdzRCxLQUFYLENBQWlCTSxPQUFqQixFQUFSLEVBQWhCO0FBQW9EOzs7cUNBRTFDRyxRLEVBQVc7QUFDckIsaUJBQUsvRCxLQUFMLENBQVdzRCxLQUFYLENBQWlCUixZQUFqQixDQUFnQ2lCLFFBQWhDO0FBQ0EsaUJBQUtyRCxRQUFMLENBQWdCLEVBQUV3QyxNQUFNLEtBQUtsRCxLQUFMLENBQVdzRCxLQUFYLENBQWlCTSxPQUFqQixFQUFSLEVBQWhCO0FBQW9EOzs7aUNBRS9DO0FBQUE7O0FBQ0wsZ0JBQU1sRSxVQUFVLEtBQUtNLEtBQUwsQ0FBV3NELEtBQVgsQ0FBaUI1RCxPQUFqQixDQUF5QlksR0FBekIsQ0FBK0I7QUFBQSx1Q0FDMUMsVUFEMEM7QUFBQSw4QkFDSHNDLE1BREc7QUFBQSxvQ0FDcUI7QUFBQSwrQkFBTSxRQUFLRSxZQUFMLENBQW1CRixNQUFuQixDQUFOO0FBQUE7QUFEckIsbUJBQ3pCQSxPQUFPckMsR0FEa0I7QUFBQSxhQUEvQixDQUFoQjs7QUFHQSxnQkFBTWlELFFBQVEsS0FBS3hELEtBQUwsQ0FBV3NELEtBQVgsQ0FBaUJFLEtBQWpCLENBQXVCUSxRQUF2QixDQUFnQzFELEdBQWhDLENBQXNDO0FBQUEsdUNBQy9DLFFBRCtDO0FBQUEsNEJBQ2RoQixJQURjO0FBQUEsa0NBQ007QUFBQSwrQkFBTSxRQUFLc0IsVUFBTCxDQUFpQnRCLElBQWpCLENBQU47QUFBQTtBQUROLG1CQUNoQ0EsS0FBS2lCLEdBRDJCO0FBQUEsYUFBdEMsQ0FBZDs7QUFHQSx5RkFHVWlELEtBSFYsNkNBS1U5RCxPQUxWLGtCQU1TLFFBTlQ7QUFBQSx3QkFNeUIsS0FBS00sS0FBTCxDQUFXa0Q7QUFOcEM7QUFPVTs7OztFQW5DQXBDLFFBQVFDLFM7O0FBcUMxQixJQUFJa0QsWUFBWTVCLFNBQVM2QixjQUFULENBQTBCLFdBQTFCLENBQWhCOztBQUVBcEQsUUFBUXFELE1BQVIsaUJBQWtCLEdBQWxCLEdBQTBCRixTQUExQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnb2FsID0gbmV3IFBsYW5uZXIuR29hbCBAXG4gICAgJ0tpbGxFbmVteSdcbiAgICAsIEB7fSBrVGFyZ2V0SXNEZWFkOiB0cnVlXG5cbmNvbnN0IGFjdGlvbnMgPSBAW11cbiAgICBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnQXR0YWNrJ1xuICAgICAgICAsIEB7fSBrV2VhcG9uSXNMb2FkZWQ6IHRydWVcbiAgICAgICAgLCBAe30ga1RhcmdldElzRGVhZDogdHJ1ZVxuXG4gICAgLCBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnTG9hZFdlYXBvbidcbiAgICAgICAgLCBAe30ga1dlYXBvbklzQXJtZWQ6IHRydWVcbiAgICAgICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiB0cnVlXG5cbiAgICAsIG5ldyBQbGFubmVyLkFjdGlvbiBAXG4gICAgICAgICdEcmF3V2VhcG9uJ1xuICAgICAgICAsIHt9XG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0FybWVkOiB0cnVlXG5cblxuXG5cblxuXG5cblxuY2xhc3MgR29hbFZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6XG4gICAgICAgIHN1cGVyIEAgcHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH1cblxuICAgIHJlbmRlckJvb2woIGJvb2wgKSA6OiByZXR1cm4gYm9vbCA/ICd0cnVlJyA6ICdmYWxzZSdcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGxldCBjb25kaXRpb25zID0gT2JqZWN0LmtleXMoIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zICkubWFwIEAga2V5ID0+IDxsaT48c3Ryb25nPnsga2V5IH08L3N0cm9uZz46IHsgdHlwZW9mIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zW2tleV0gPT09ICdib29sZWFuJyA/IHRoaXMucmVuZGVyQm9vbCggdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNba2V5XSApIDogdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNba2V5XSB9PC9saT5cbiAgICAgICAgY29uc3QgZXhpdE1vZGFsID0gKCkgPT4gOjogdGhpcy5zZXRTdGF0ZSBAIHsgZWRpdGluZzogZmFsc2UgfVxuICAgICAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiA6OiB0aGlzLnNldFN0YXRlKClcblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyBlID0+IHRoaXMucHJvcHMucmVtb3ZlR29hbCgpIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17IGUgPT4gdGhpcy5zZXRTdGF0ZSggeyBlZGl0aW5nOiB0cnVlIH0gKSB9PkU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8cD5LZXk6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmdvYWwua2V5IH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgPHA+UHJpb3JpdHk6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmdvYWwucHJpb3JpdHkgfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQ29uZGl0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgPHVsPnsgY29uZGl0aW9ucyB9PC91bD5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVkaXRpbmcgPyA8R29hbEVkaXRvciBnb2FsPXsgdGhpcy5wcm9wcy5nb2FsIH0gZXhpdE1vZGFsPXsgZXhpdE1vZGFsIH0gdXBkYXRlPXsgdXBkYXRlIH0gLz4gOiAnJyB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuY2xhc3MgR29hbEVkaXRvciBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjpcbiAgICAgICAgc3VwZXIgQCBwcm9wc1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYzogMFxuICAgICAgICB9XG5cbiAgICBzYXZlID0gKCBmaWVsZHMgKSA9PiA6OlxuICAgICAgICBsZXQgbmV3Q29uZGl0aW9ucyA9IHt9XG5cbiAgICAgICAgZm9yIGxldCBpID0gMDsgaSA8PSB0aGlzLnN0YXRlLmM7IGkrKyA6OlxuICAgICAgICAgICAgbGV0IGtleSwgdmFsXG5cbiAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoIEAgZmllbGQgPT4gOjpcbiAgICAgICAgICAgICAgICBpZiBmaWVsZFswXSA9PSAnY29uZGl0aW9uJyArIGkgKyAna2V5JyA6OiBrZXkgPSBmaWVsZFsxXVxuICAgICAgICAgICAgICAgIGlmIGZpZWxkWzBdID09ICdjb25kaXRpb24nICsgaSArICd2YWwnIDo6IHZhbCA9IGZpZWxkWzFdXG5cbiAgICAgICAgICAgIGlmIHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnIDo6IG5ld0NvbmRpdGlvbnNba2V5XSA9IHZhbFxuXG4gICAgICAgIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zID0gbmV3Q29uZGl0aW9uc1xuICAgICAgICB0aGlzLnByb3BzLmV4aXRNb2RhbCgpXG5cbiAgICByZW1vdmVDb25kaXRpb24gPSAoIGtleSApID0+IDo6XG4gICAgICAgIGRlbGV0ZSB0aGlzLnByb3BzLmdvYWwuY29uZGl0aW9uc1trZXldXG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlKClcblxuICAgIGFkZEJsYW5rQ29uZGl0aW9uID0gKCBlICkgPT4gOjpcbiAgICAgICAgdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNbICduZXdDb25kaXRpb24nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSBdID0gbnVsbFxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZSgpXG5cbiAgICByZW5kZXIoKSA6OlxuICAgICAgICBsZXQgY29uZGl0aW9ucyA9IE9iamVjdC5rZXlzKCB0aGlzLnByb3BzLmdvYWwuY29uZGl0aW9ucyApLm1hcCBAICgga2V5ICkgPT4gOjpcbiAgICAgICAgICAgIGxldCBjbiA9IHRoaXMuc3RhdGUuYysrXG4gICAgICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsgZSA9PiB0aGlzLnJlbW92ZUNvbmRpdGlvbigga2V5ICkgfT5YPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9eyAnY29uZGl0aW9uJyArIGNuICsgJ2tleScgfSBwbGFjZWhvbGRlcj1cIkNvbmRpdGlvbiBLZXlcIiB2YWx1ZT17IGtleSB9PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9eyAnY29uZGl0aW9uJyArIGNuICsgJ3ZhbCcgfSBwbGFjZWhvbGRlcj1cIkNvbmRpdGlvbiBWYWx1ZVwiIHZhbHVlPXsgdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNba2V5XSB9PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1jbG9zZS1idG5cIiBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5leGl0TW9kYWwoKSB9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxociBzdHlsZT1cImNsZWFyOiBib3RoO1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtleTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwia2V5XCIgcGxhY2Vob2xkZXI9XCJLZXlcIiB2YWx1ZT17IHRoaXMucHJvcHMuZ29hbC5rZXkgfT48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW9yaXR5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIHN0ZXA9XCIxXCIgbmFtZT1cInByaW9yaXR5XCIgcGxhY2Vob2xkZXI9XCJQcmlvcml0eVwiIHZhbHVlPXsgdGhpcy5wcm9wcy5nb2FsLnByaW9yaXR5IH0+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5Db25kaXRpb25zOjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZ29hbEVkaXRvckZvcm1cIiBvblN1Ym1pdD17IGUgPT4geyBlLnByZXZlbnREZWZhdWx0KCksIHRoaXMuc2F2ZSggQXJyYXkuZnJvbSggbmV3IEZvcm1EYXRhKCBlLnRhcmdldCApICkgKSB9IH0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY29uZGl0aW9ucyB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyB0aGlzLmFkZEJsYW5rQ29uZGl0aW9uIH0+QWRkIE5ldyBDb25kaXRpb248L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsgdGhpcy5jbG9zZSB9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsgZSA9PiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCAnZ29hbEVkaXRvckZvcm0nIClbMF0uZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KCdzdWJtaXQnLCB7YnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZX0pICkgfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cblxuY2xhc3MgQWN0aW9uVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyQm9vbCggYm9vbCApIDo6IHJldHVybiBib29sID8gJ3RydWUnIDogJ2ZhbHNlJ1xuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgbGV0IGNvbmRpdGlvbnMgPSBPYmplY3Qua2V5cyggdGhpcy5wcm9wcy5hY3Rpb24uY29uZGl0aW9ucyApLm1hcCBAIGtleSA9PiA8bGk+PHN0cm9uZz57IGtleSB9PC9zdHJvbmc+OiB7IHRoaXMucmVuZGVyQm9vbCggdGhpcy5wcm9wcy5hY3Rpb24uY29uZGl0aW9uc1trZXldICkgfTwvbGk+XG4gICAgICAgIGxldCBlZmZlY3RzID0gT2JqZWN0LmtleXMoIHRoaXMucHJvcHMuYWN0aW9uLmVmZmVjdHMgKS5tYXAgQCBrZXkgPT4gPGxpPjxzdHJvbmc+eyBrZXkgfTwvc3Ryb25nPjogeyB0aGlzLnJlbmRlckJvb2woIHRoaXMucHJvcHMuYWN0aW9uLmVmZmVjdHNba2V5XSApIH08L2xpPlxuXG4gICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17IGUgPT4gdGhpcy5wcm9wcy5yZW1vdmVBY3Rpb24oKSB9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8cD5LZXk6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmFjdGlvbi5rZXkgfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQ29uZGl0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgPHVsPnsgY29uZGl0aW9ucyB9PC91bD5cbiAgICAgICAgICAgICAgICAgICAgRWZmZWN0czpcbiAgICAgICAgICAgICAgICAgICAgPHVsPnsgZWZmZWN0cyB9PC91bD5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuY2xhc3MgUGxhbkNydW1iVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyKCkgOjogcmV0dXJuIEAgPGxpIGNsYXNzPVwicGxhbmNydW1iXCI+eyB0aGlzLnByb3BzLmNydW1iIH08L2xpPlxuXG5jbGFzcyBQbGFuVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgaWYgdGhpcy5wbGFuICYmIHRoaXMucHJvcHMucGxhbi5jcnVtYnMubGVuZ3RoIDo6XG4gICAgICAgICAgICBsZXQgY3J1bWJzID0gdGhpcy5wcm9wcy5wbGFuLmNydW1icy5tYXAgQCBjcnVtYiA9PiA8UGxhbkNydW1iVmlldyBjcnVtYj17IGNydW1iLmtleSB9IC8+XG5cbiAgICAgICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHA+WmVlIHBsYW4gdG8gPHN0cm9uZz57IHRoaXMucHJvcHMucGxhbi5nb2FsLmtleSB9PC9zdHJvbmc+OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPG9sPnsgY3J1bWJzIH08L29sPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBlbHNlIDo6XG4gICAgICAgICAgICByZXR1cm4gQCA8cD5ObyByZXN1bHQuPC9wPlxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6XG4gICAgICAgIHN1cGVyIEAgcHJvcHNcblxuICAgICAgICBsZXQgYWdlbnQgPSBuZXcgUGxhbm5lci5BZ2VudCgpXG5cbiAgICAgICAgYWdlbnQuZ29hbHMucHVzaCBAIGdvYWwuY2xvbmUoKVxuICAgICAgICBhY3Rpb25zLmZvckVhY2ggQCBhY3Rpb24gPT4gYWdlbnQuYWRkQWN0aW9uIEAgYWN0aW9uLmNsb25lKClcblxuICAgICAgICB0aGlzLnN0YXRlID0gOjpcbiAgICAgICAgICAgIGFnZW50OiBhZ2VudFxuICAgICAgICAgICAgLCBwbGFuOiBhZ2VudC5nZXRQbGFuKClcblxuICAgIHJlbW92ZUdvYWwoIGFHb2FsICkgOjpcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2VudC5nb2Fscy5yZW1vdmUgQCBhR29hbFxuICAgICAgICB0aGlzLnNldFN0YXRlIEAgeyBwbGFuOiB0aGlzLnN0YXRlLmFnZW50LmdldFBsYW4oKSB9XG5cbiAgICByZW1vdmVBY3Rpb24oIGFuQWN0aW9uICkgOjpcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2VudC5yZW1vdmVBY3Rpb24gQCBhbkFjdGlvblxuICAgICAgICB0aGlzLnNldFN0YXRlIEAgeyBwbGFuOiB0aGlzLnN0YXRlLmFnZW50LmdldFBsYW4oKSB9XG5cbiAgICByZW5kZXIoKSA6OlxuICAgICAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hZ2VudC5hY3Rpb25zLm1hcCBAIGFjdGlvbiA9PlxuICAgICAgICAgICAgPEFjdGlvblZpZXcga2V5PXsgYWN0aW9uLmtleSB9IGFjdGlvbj17IGFjdGlvbiB9IHJlbW92ZUFjdGlvbj17ICgpID0+IHRoaXMucmVtb3ZlQWN0aW9uKCBhY3Rpb24gKSB9IC8+XG5cbiAgICAgICAgY29uc3QgZ29hbHMgPSB0aGlzLnN0YXRlLmFnZW50LmdvYWxzLmNvbnRlbnRzLm1hcCBAIGdvYWwgPT5cbiAgICAgICAgICAgIDxHb2FsVmlldyBrZXk9eyBnb2FsLmtleSB9IGdvYWw9eyBnb2FsIH0gcmVtb3ZlR29hbD17ICgpID0+IHRoaXMucmVtb3ZlR29hbCggZ29hbCApIH0gLz5cblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cD5aZWUgZ29hbHo6PC9wPlxuICAgICAgICAgICAgICAgIHsgZ29hbHMgfVxuICAgICAgICAgICAgICAgIDxwPlplZSBha3NodW56OjwvcD5cbiAgICAgICAgICAgICAgICB7IGFjdGlvbnMgfVxuICAgICAgICAgICAgICAgIDxQbGFuVmlldyBwbGFuPXsgdGhpcy5zdGF0ZS5wbGFuIH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgQCAnY29udGFpbmVyJ1xuXG5JbmZlcm5vLnJlbmRlciBAIDxBcHAgLz4sIGNvbnRhaW5lclxuIl19