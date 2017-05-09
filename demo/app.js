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

        _this.dosomething = function (evt) {
            console.log('clicked as prop', { this: _this, evt: evt });
        };

        return _this;
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
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this2.renderBool(_this2.props.goal.conditions[key])]);
            });

            return createVNode(2, 'div', 'card', [createVNode(2, 'button', null, 'X', {
                'onClick': this.dosomething
            }), createVNode(2, 'div', 'clearing'), createVNode(2, 'p', null, ['Key: ', createVNode(2, 'strong', null, this.props.goal.key)]), createVNode(2, 'p', null, ['Priority: ', createVNode(2, 'strong', null, this.props.goal.priority)]), createVNode(2, 'p', null, ['Conditions:', createVNode(2, 'ul', null, conditions)])]);
        }
    }]);

    return GoalView;
}(Inferno.Component);

var ActionView = function (_Inferno$Component2) {
    _inherits(ActionView, _Inferno$Component2);

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
            var _this4 = this;

            var conditions = Object.keys(this.props.action.conditions).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this4.renderBool(_this4.props.action.conditions[key])]);
            });
            var effects = Object.keys(this.props.action.effects).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this4.renderBool(_this4.props.action.effects[key])]);
            });

            return createVNode(2, 'div', 'card', [createVNode(2, 'button', null, 'X', {
                'onClick': function onClick(evt) {
                    return _this4.props.removeAction();
                }
            }), createVNode(2, 'div', 'clearing'), createVNode(2, 'p', null, ['Key: ', createVNode(2, 'strong', null, this.props.action.key)]), createVNode(2, 'p', null, ['Conditions:', createVNode(2, 'ul', null, conditions), 'Effects:', createVNode(2, 'ul', null, effects)])]);
        }
    }]);

    return ActionView;
}(Inferno.Component);

var PlanCrumbView = function (_Inferno$Component3) {
    _inherits(PlanCrumbView, _Inferno$Component3);

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

var PlanView = function (_Inferno$Component4) {
    _inherits(PlanView, _Inferno$Component4);

    function PlanView(props) {
        _classCallCheck(this, PlanView);

        return _possibleConstructorReturn(this, (PlanView.__proto__ || Object.getPrototypeOf(PlanView)).call(this, props));
    }

    _createClass(PlanView, [{
        key: 'render',
        value: function render() {
            if (this.props.crumbs.length) {
                var crumbs = this.props.crumbs.map(function (crumb) {
                    return createVNode(16, PlanCrumbView, null, null, {
                        'crumb': crumb.key
                    });
                });
                return createVNode(2, 'ol', null, crumbs);
            } else {
                return createVNode(2, 'p', null, 'No result.');
            }
        }
    }]);

    return PlanView;
}(Inferno.Component);

var App = function (_Inferno$Component5) {
    _inherits(App, _Inferno$Component5);

    function App(props) {
        _classCallCheck(this, App);

        var _this7 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var agent = new Planner.Agent();

        agent.goals.push(goal.clone());
        actions.forEach(function (action) {
            return agent.addAction(action.clone());
        });

        _this7.state = {
            agent: agent,
            plan: agent.getPlan() };return _this7;
    }

    _createClass(App, [{
        key: 'removeAction',
        value: function removeAction(anAction) {
            this.state.agent.removeAction(anAction);
            this.setState({ plan: this.state.agent.getPlan() });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var actions = this.state.agent.actions.map(function (action) {
                return createVNode(16, ActionView, null, null, {
                    'action': action,
                    'removeAction': function removeAction() {
                        return _this8.removeAction(action);
                    }
                }, action.key);
            });

            return createVNode(2, 'div', null, [createVNode(2, 'p', null, 'Zee goalz:'), createVNode(16, GoalView, null, null, {
                'goal': this.state.agent.getGoal()
            }), createVNode(2, 'p', null, 'Zee akshunz:'), actions, createVNode(2, 'p', null, 'Zee plan:'), createVNode(16, PlanView, null, null, {
                'crumbs': this.state.plan
            })]);
        }
    }]);

    return App;
}(Inferno.Component);

var container = document.getElementById('container');

Inferno.render(createVNode(16, App), container);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiZ29hbCIsIlBsYW5uZXIiLCJHb2FsIiwia1RhcmdldElzRGVhZCIsImFjdGlvbnMiLCJBY3Rpb24iLCJrV2VhcG9uSXNMb2FkZWQiLCJrV2VhcG9uSXNBcm1lZCIsIkdvYWxWaWV3IiwicHJvcHMiLCJkb3NvbWV0aGluZyIsImV2dCIsImNvbnNvbGUiLCJsb2ciLCJ0aGlzIiwiYm9vbCIsImNvbmRpdGlvbnMiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwicmVuZGVyQm9vbCIsInByaW9yaXR5IiwiSW5mZXJubyIsIkNvbXBvbmVudCIsIkFjdGlvblZpZXciLCJhY3Rpb24iLCJlZmZlY3RzIiwicmVtb3ZlQWN0aW9uIiwiUGxhbkNydW1iVmlldyIsImNydW1iIiwiUGxhblZpZXciLCJjcnVtYnMiLCJsZW5ndGgiLCJBcHAiLCJhZ2VudCIsIkFnZW50IiwiZ29hbHMiLCJwdXNoIiwiY2xvbmUiLCJmb3JFYWNoIiwiYWRkQWN0aW9uIiwic3RhdGUiLCJwbGFuIiwiZ2V0UGxhbiIsImFuQWN0aW9uIiwic2V0U3RhdGUiLCJnZXRHb2FsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sSUFBSUMsUUFBUUMsSUFBWixDQUNULFdBRFMsRUFFUCxFQUFJQyxlQUFlLElBQW5CLEVBRk8sQ0FBYjs7QUFJQSxJQUFNQyxVQUFVLENBQ1osSUFBSUgsUUFBUUksTUFBWixDQUNJLFFBREosRUFFTSxFQUFJQyxpQkFBaUIsSUFBckIsRUFGTixFQUdNLEVBQUlILGVBQWUsSUFBbkIsRUFITixDQURZLEVBTVYsSUFBSUYsUUFBUUksTUFBWixDQUNFLFlBREYsRUFFSSxFQUFJRSxnQkFBZ0IsSUFBcEIsRUFGSixFQUdJLEVBQUlELGlCQUFpQixJQUFyQixFQUhKLENBTlUsRUFXVixJQUFJTCxRQUFRSSxNQUFaLENBQ0UsWUFE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QUxWLDBEQU9TLFFBUFQ7QUFBQSwwQkFPMkIsS0FBS3NDLEtBQUwsQ0FBV0M7QUFQdEM7QUFRVTs7OztFQTdCQXBCLFFBQVFDLFM7O0FBK0IxQixJQUFJd0IsWUFBWUMsU0FBU0MsY0FBVCxDQUEwQixXQUExQixDQUFoQjs7QUFFQTNCLFFBQVE0QixNQUFSLGlCQUFrQixHQUFsQixHQUEwQkgsU0FBMUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ29hbCA9IG5ldyBQbGFubmVyLkdvYWwgQFxuICAgICdLaWxsRW5lbXknXG4gICAgLCBAe30ga1RhcmdldElzRGVhZDogdHJ1ZVxuXG5jb25zdCBhY3Rpb25zID0gQFtdXG4gICAgbmV3IFBsYW5uZXIuQWN0aW9uIEBcbiAgICAgICAgJ0F0dGFjaydcbiAgICAgICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiB0cnVlXG4gICAgICAgICwgQHt9IGtUYXJnZXRJc0RlYWQ6IHRydWVcblxuICAgICwgbmV3IFBsYW5uZXIuQWN0aW9uIEBcbiAgICAgICAgJ0xvYWRXZWFwb24nXG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0FybWVkOiB0cnVlXG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0xvYWRlZDogdHJ1ZVxuXG4gICAgLCBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnRHJhd1dlYXBvbidcbiAgICAgICAgLCB7fVxuICAgICAgICAsIEB7fSBrV2VhcG9uSXNBcm1lZDogdHJ1ZVxuXG5cblxuXG5cblxuXG5cbmNsYXNzIEdvYWxWaWV3IGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OiBzdXBlciBAIHByb3BzXG5cbiAgICBkb3NvbWV0aGluZyA9ICggZXZ0ICkgPT4gOjogY29uc29sZS5sb2cgQCAnY2xpY2tlZCBhcyBwcm9wJywgQHt9IHRoaXM6IHRoaXMsIGV2dFxuXG4gICAgcmVuZGVyQm9vbCggYm9vbCApIDo6IHJldHVybiBib29sID8gJ3RydWUnIDogJ2ZhbHNlJ1xuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgbGV0IGNvbmRpdGlvbnMgPSBPYmplY3Qua2V5cyggdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnMgKS5tYXAgQCBrZXkgPT4gPGxpPjxzdHJvbmc+eyBrZXkgfTwvc3Ryb25nPjogeyB0aGlzLnJlbmRlckJvb2woIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zW2tleV0gKSB9PC9saT5cblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyB0aGlzLmRvc29tZXRoaW5nIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxwPktleTogPHN0cm9uZz57IHRoaXMucHJvcHMuZ29hbC5rZXkgfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5Qcmlvcml0eTogPHN0cm9uZz57IHRoaXMucHJvcHMuZ29hbC5wcmlvcml0eSB9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBDb25kaXRpb25zOlxuICAgICAgICAgICAgICAgICAgICA8dWw+eyBjb25kaXRpb25zIH08L3VsPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5jbGFzcyBBY3Rpb25WaWV3IGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OiBzdXBlciBAIHByb3BzXG5cbiAgICByZW5kZXJCb29sKCBib29sICkgOjogcmV0dXJuIGJvb2wgPyAndHJ1ZScgOiAnZmFsc2UnXG5cbiAgICByZW5kZXIoKSA6OlxuICAgICAgICBsZXQgY29uZGl0aW9ucyA9IE9iamVjdC5rZXlzKCB0aGlzLnByb3BzLmFjdGlvbi5jb25kaXRpb25zICkubWFwIEAga2V5ID0+IDxsaT48c3Ryb25nPnsga2V5IH08L3N0cm9uZz46IHsgdGhpcy5yZW5kZXJCb29sKCB0aGlzLnByb3BzLmFjdGlvbi5jb25kaXRpb25zW2tleV0gKSB9PC9saT5cbiAgICAgICAgbGV0IGVmZmVjdHMgPSBPYmplY3Qua2V5cyggdGhpcy5wcm9wcy5hY3Rpb24uZWZmZWN0cyApLm1hcCBAIGtleSA9PiA8bGk+PHN0cm9uZz57IGtleSB9PC9zdHJvbmc+OiB7IHRoaXMucmVuZGVyQm9vbCggdGhpcy5wcm9wcy5hY3Rpb24uZWZmZWN0c1trZXldICkgfTwvbGk+XG5cbiAgICAgICAgcmV0dXJuIEBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsgZXZ0ID0+IHRoaXMucHJvcHMucmVtb3ZlQWN0aW9uKCkgfT5YPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyaW5nXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHA+S2V5OiA8c3Ryb25nPnsgdGhpcy5wcm9wcy5hY3Rpb24ua2V5IH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIENvbmRpdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIDx1bD57IGNvbmRpdGlvbnMgfTwvdWw+XG4gICAgICAgICAgICAgICAgICAgIEVmZmVjdHM6XG4gICAgICAgICAgICAgICAgICAgIDx1bD57IGVmZmVjdHMgfTwvdWw+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbmNsYXNzIFBsYW5DcnVtYlZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6IHN1cGVyIEAgcHJvcHNcblxuICAgIHJlbmRlcigpIDo6IHJldHVybiBAIDxsaSBjbGFzcz1cInBsYW5jcnVtYlwiPnsgdGhpcy5wcm9wcy5jcnVtYiB9PC9saT5cblxuY2xhc3MgUGxhblZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6IHN1cGVyIEAgcHJvcHNcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGlmIHRoaXMucHJvcHMuY3J1bWJzLmxlbmd0aCA6OlxuICAgICAgICAgICAgbGV0IGNydW1icyA9IHRoaXMucHJvcHMuY3J1bWJzLm1hcCBAIGNydW1iID0+IDxQbGFuQ3J1bWJWaWV3IGNydW1iPXsgY3J1bWIua2V5IH0gLz5cbiAgICAgICAgICAgIHJldHVybiBAIDxvbD57IGNydW1icyB9PC9vbD5cbiAgICAgICAgZWxzZSA6OlxuICAgICAgICAgICAgcmV0dXJuIEAgPHA+Tm8gcmVzdWx0LjwvcD5cblxuY2xhc3MgQXBwIGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OlxuICAgICAgICBzdXBlciBAIHByb3BzXG5cbiAgICAgICAgbGV0IGFnZW50ID0gbmV3IFBsYW5uZXIuQWdlbnQoKVxuXG4gICAgICAgIGFnZW50LmdvYWxzLnB1c2ggQCBnb2FsLmNsb25lKClcbiAgICAgICAgYWN0aW9ucy5mb3JFYWNoIEAgYWN0aW9uID0+IGFnZW50LmFkZEFjdGlvbiBAIGFjdGlvbi5jbG9uZSgpXG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IDo6XG4gICAgICAgICAgICBhZ2VudDogYWdlbnRcbiAgICAgICAgICAgICwgcGxhbjogYWdlbnQuZ2V0UGxhbigpXG5cbiAgICByZW1vdmVBY3Rpb24oIGFuQWN0aW9uICkgOjpcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2VudC5yZW1vdmVBY3Rpb24gQCBhbkFjdGlvblxuICAgICAgICB0aGlzLnNldFN0YXRlIEAgeyBwbGFuOiB0aGlzLnN0YXRlLmFnZW50LmdldFBsYW4oKSB9XG5cbiAgICByZW5kZXIoKSA6OlxuICAgICAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hZ2VudC5hY3Rpb25zLm1hcCBAIGFjdGlvbiA9PlxuICAgICAgICAgICAgPEFjdGlvblZpZXcga2V5PXsgYWN0aW9uLmtleSB9IGFjdGlvbj17IGFjdGlvbiB9IHJlbW92ZUFjdGlvbj17ICgpID0+IHRoaXMucmVtb3ZlQWN0aW9uKCBhY3Rpb24gKSB9IC8+XG5cbiAgICAgICAgcmV0dXJuIEBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+WmVlIGdvYWx6OjwvcD5cbiAgICAgICAgICAgICAgICA8R29hbFZpZXcgZ29hbD17IHRoaXMuc3RhdGUuYWdlbnQuZ2V0R29hbCgpIH0gLz5cbiAgICAgICAgICAgICAgICA8cD5aZWUgYWtzaHVuejo8L3A+XG4gICAgICAgICAgICAgICAgeyBhY3Rpb25zIH1cbiAgICAgICAgICAgICAgICA8cD5aZWUgcGxhbjo8L3A+XG4gICAgICAgICAgICAgICAgPFBsYW5WaWV3IGNydW1icz17IHRoaXMuc3RhdGUucGxhbiB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIEAgJ2NvbnRhaW5lcidcblxuSW5mZXJuby5yZW5kZXIgQCA8QXBwIC8+LCBjb250YWluZXJcbiJdfQ==