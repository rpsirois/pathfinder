'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoalComponents = require('./goal.js');
var ActionComponents = require('./action.js');

var goal = new Planner.Goal('KillEnemy', { kTargetIsDead: true });

var actions = [new Planner.Action('Attack', { kWeaponIsLoaded: true }, { kTargetIsDead: true }), new Planner.Action('LoadWeapon', { kWeaponIsArmed: true }, { kWeaponIsLoaded: true }), new Planner.Action('DrawWeapon', {}, { kWeaponIsArmed: true })];var createVNode = Inferno.createVNode;

var PlanCrumbView = function (_Inferno$Component) {
    _inherits(PlanCrumbView, _Inferno$Component);

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

var PlanView = function (_Inferno$Component2) {
    _inherits(PlanView, _Inferno$Component2);

    function PlanView(props) {
        _classCallCheck(this, PlanView);

        return _possibleConstructorReturn(this, (PlanView.__proto__ || Object.getPrototypeOf(PlanView)).call(this, props));
    }

    _createClass(PlanView, [{
        key: 'render',
        value: function render() {
            if (this.props.plan && this.props.plan.path && this.props.plan.path.length) {
                var crumbs = this.props.plan.path.map(function (crumb) {
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

var App = function (_Inferno$Component3) {
    _inherits(App, _Inferno$Component3);

    function App(props) {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this3.updatePlan = function () {
            _this3.setState({ plan: _this3.state.agent.getPlan() });
        };

        _this3.addGoal = function () {
            _this3.state.agent.goals.push(new Planner.Goal());
            _this3.setState();
        };

        _this3.addAction = function () {
            _this3.state.agent.actions.push(new Planner.Action());
            _this3.setState();
        };

        var agent = new Planner.Agent();

        agent.goals.push(goal.clone());
        actions.forEach(function (action) {
            return agent.addAction(action.clone());
        });

        _this3.state = {
            agent: agent,
            plan: agent.getPlan() };return _this3;
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
            var _this4 = this;

            var actions = this.state.agent.actions.map(function (action) {
                return createVNode(16, ActionComponents.ActionView, null, null, {
                    'action': action,
                    'removeAction': function removeAction() {
                        return _this4.removeAction(action);
                    },
                    'updatePlan': _this4.updatePlan
                }, action.key);
            });

            var goals = this.state.agent.goals.contents.map(function (goal) {
                return createVNode(16, GoalComponents.GoalView, null, null, {
                    'goal': goal,
                    'removeGoal': function removeGoal() {
                        return _this4.removeGoal(goal);
                    },
                    'updatePlan': _this4.updatePlan
                }, goal.key);
            });

            return createVNode(2, 'div', null, [createVNode(2, 'p', null, ['Zee goalz:', createVNode(2, 'button', null, 'Add Goal', {
                'onClick': this.addGoal
            })]), goals, createVNode(2, 'p', null, ['Zee akshunz:', createVNode(2, 'button', null, 'Add Action', {
                'onClick': this.addAction
            })]), actions, createVNode(16, PlanView, null, null, {
                'plan': this.state.plan
            })]);
        }
    }]);

    return App;
}(Inferno.Component);

var container = document.getElementById('container');

Inferno.render(createVNode(16, App), container);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiR29hbENvbXBvbmVudHMiLCJyZXF1aXJlIiwiQWN0aW9uQ29tcG9uZW50cyIsImdvYWwiLCJQbGFubmVyIiwiR29hbCIsImtUYXJnZXRJc0RlYWQiLCJhY3Rpb25zIiwiQWN0aW9uIiwia1dlYXBvbklzTG9hZGVkIiwia1dlYXBvbklzQXJtZWQiLCJQbGFuQ3J1bWJWaWV3IiwicHJvcHMiLCJjcnVtYiIsIkluZmVybm8iLCJDb21wb25lbnQiLCJQbGFuVmlldyIsInBsYW4iLCJwYXRoIiwibGVuZ3RoIiwiY3J1bWJzIiwibWFwIiwia2V5IiwiQXBwIiwidXBkYXRlUGxhbiIsInNldFN0YXRlIiwic3RhdGUiLCJhZ2VudCIsImdldFBsYW4iLCJhZGRHb2FsIiwiZ29hbHMiLCJwdXNoIiwiYWRkQWN0aW9uIiwiQWdlbnQiLCJjbG9uZSIsImZvckVhY2giLCJhY3Rpb24iLCJhR29hbCIsInJlbW92ZSIsImFuQWN0aW9uIiwicmVtb3ZlQWN0aW9uIiwiY29udGVudHMiLCJyZW1vdmVHb2FsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLGlCQUFpQkMsUUFBVSxXQUFWLENBQXZCO0FBQ0EsSUFBTUMsbUJBQW1CRCxRQUFVLGFBQVYsQ0FBekI7O0FBRUEsSUFBTUUsT0FBTyxJQUFJQyxRQUFRQyxJQUFaLENBQ1QsV0FEUyxFQUVQLEVBQUlDLGVBQWUsSUFBbkIsRUFGTyxDQUFiOztBQUlBLElBQU1DLFVBQVUsQ0FDWixJQUFJSCxRQUFRSSxNQUFaLENBQ0ksUUFESixFQUVNLEVBQUlDLGlCQUFpQixJQUFyQixFQUZOLEVBR00sRUFBSUgsZUFBZSxJQUFuQixFQUhOLENBRFksRUFNVixJQUFJRixRQUFRSSxNQUFaLENBQ0UsWUFERixFQUVJLEVBQUlFLGdCQUFnQixJQUFwQixFQUZKLEVBR0ksRUFBSUQsaUJBQWlCLElBQXJC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VSxLQUFLbUIsS0FBTCxDQUFXQyxLQUFYLENBQWlCcEIsT0FBakIsQ0FBeUJjLEdBQXpCLENBQStCO0FBQUEsdUNBQzFDLGlCQUFpQixVQUR5QjtBQUFBLDhCQUNjZSxNQURkO0FBQUEsb0NBQ3NDO0FBQUEsK0JBQU0sT0FBS0ksWUFBTCxDQUFtQkosTUFBbkIsQ0FBTjtBQUFBLHFCQUR0QztBQUFBLGtDQUN1RixPQUFLWjtBQUQ1RixtQkFDUlksT0FBT2QsR0FEQztBQUFBLGFBQS9CLENBQWhCOztBQUdBLGdCQUFNUSxRQUFRLEtBQUtKLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkcsS0FBakIsQ0FBdUJXLFFBQXZCLENBQWdDcEIsR0FBaEMsQ0FBc0M7QUFBQSx1Q0FDL0MsZUFBZSxRQURnQztBQUFBLDRCQUNDbEIsSUFERDtBQUFBLGtDQUNxQjtBQUFBLCtCQUFNLE9BQUt1QyxVQUFMLENBQWlCdkMsSUFBakIsQ0FBTjtBQUFBLHFCQURyQjtBQUFBLGtDQUNrRSxPQUFLcUI7QUFEdkUsbUJBQ2pCckIsS0FBS21CLEdBRFk7QUFBQSxhQUF0QyxDQUFkOztBQUdBO0FBQUEsMkJBRXVDLEtBQUtPO0FBRjVDLGtCQUdVQyxLQUhWO0FBQUEsMkJBSXlDLEtBQUtFO0FBSjlDLGtCQUtVekIsT0FMVixrQkFNUyxRQU5UO0FBQUEsd0JBTXlCLEtBQUttQixLQUFMLENBQVdUO0FBTnBDO0FBT1U7Ozs7RUE3Q0FILFFBQVFDLFM7O0FBK0MxQixJQUFJNEIsWUFBWUMsU0FBU0MsY0FBVCxDQUEwQixXQUExQixDQUFoQjs7QUFFQS9CLFFBQVFnQyxNQUFSLGlCQUFrQixHQUFsQixHQUEwQkgsU0FBMUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR29hbENvbXBvbmVudHMgPSByZXF1aXJlIEAgJy4vZ29hbC5qcydcbmNvbnN0IEFjdGlvbkNvbXBvbmVudHMgPSByZXF1aXJlIEAgJy4vYWN0aW9uLmpzJ1xuXG5jb25zdCBnb2FsID0gbmV3IFBsYW5uZXIuR29hbCBAXG4gICAgJ0tpbGxFbmVteSdcbiAgICAsIEB7fSBrVGFyZ2V0SXNEZWFkOiB0cnVlXG5cbmNvbnN0IGFjdGlvbnMgPSBAW11cbiAgICBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnQXR0YWNrJ1xuICAgICAgICAsIEB7fSBrV2VhcG9uSXNMb2FkZWQ6IHRydWVcbiAgICAgICAgLCBAe30ga1RhcmdldElzRGVhZDogdHJ1ZVxuXG4gICAgLCBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnTG9hZFdlYXBvbidcbiAgICAgICAgLCBAe30ga1dlYXBvbklzQXJtZWQ6IHRydWVcbiAgICAgICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiB0cnVlXG5cbiAgICAsIG5ldyBQbGFubmVyLkFjdGlvbiBAXG4gICAgICAgICdEcmF3V2VhcG9uJ1xuICAgICAgICAsIHt9XG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0FybWVkOiB0cnVlXG5cblxuY2xhc3MgUGxhbkNydW1iVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyKCkgOjogcmV0dXJuIEAgPGxpIGNsYXNzPVwicGxhbmNydW1iXCI+eyB0aGlzLnByb3BzLmNydW1iIH08L2xpPlxuXG5jbGFzcyBQbGFuVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgaWYgdGhpcy5wcm9wcy5wbGFuICYmIHRoaXMucHJvcHMucGxhbi5wYXRoICYmIHRoaXMucHJvcHMucGxhbi5wYXRoLmxlbmd0aCA6OlxuICAgICAgICAgICAgbGV0IGNydW1icyA9IHRoaXMucHJvcHMucGxhbi5wYXRoLm1hcCBAIGNydW1iID0+IDxQbGFuQ3J1bWJWaWV3IGNydW1iPXsgY3J1bWIua2V5IH0gLz5cblxuICAgICAgICAgICAgcmV0dXJuIEBcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cD5aZWUgcGxhbiB0byA8c3Ryb25nPnsgdGhpcy5wcm9wcy5wbGFuLmdvYWwua2V5IH08L3N0cm9uZz46PC9wPlxuICAgICAgICAgICAgICAgICAgICA8b2w+eyBjcnVtYnMgfTwvb2w+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgIHJldHVybiBAIDxwPk5vIHJlc3VsdC48L3A+XG5cbmNsYXNzIEFwcCBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjpcbiAgICAgICAgc3VwZXIgQCBwcm9wc1xuXG4gICAgICAgIGxldCBhZ2VudCA9IG5ldyBQbGFubmVyLkFnZW50KClcblxuICAgICAgICBhZ2VudC5nb2Fscy5wdXNoIEAgZ29hbC5jbG9uZSgpXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaCBAIGFjdGlvbiA9PiBhZ2VudC5hZGRBY3Rpb24gQCBhY3Rpb24uY2xvbmUoKVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSA6OlxuICAgICAgICAgICAgYWdlbnQ6IGFnZW50XG4gICAgICAgICAgICAsIHBsYW46IGFnZW50LmdldFBsYW4oKVxuXG4gICAgdXBkYXRlUGxhbiA9ICgpID0+IDo6IHRoaXMuc2V0U3RhdGUgQCB7IHBsYW46IHRoaXMuc3RhdGUuYWdlbnQuZ2V0UGxhbigpIH1cblxuICAgIGFkZEdvYWwgPSAoKSA9PiA6OlxuICAgICAgICB0aGlzLnN0YXRlLmFnZW50LmdvYWxzLnB1c2ggQCBuZXcgUGxhbm5lci5Hb2FsKClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgpXG5cbiAgICByZW1vdmVHb2FsKCBhR29hbCApIDo6XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlbnQuZ29hbHMucmVtb3ZlIEAgYUdvYWxcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSBAIHsgcGxhbjogdGhpcy5zdGF0ZS5hZ2VudC5nZXRQbGFuKCkgfVxuXG4gICAgYWRkQWN0aW9uID0gKCkgPT4gOjpcbiAgICAgICAgdGhpcy5zdGF0ZS5hZ2VudC5hY3Rpb25zLnB1c2ggQCBuZXcgUGxhbm5lci5BY3Rpb24oKVxuICAgICAgICB0aGlzLnNldFN0YXRlKClcblxuICAgIHJlbW92ZUFjdGlvbiggYW5BY3Rpb24gKSA6OlxuICAgICAgICB0aGlzLnN0YXRlLmFnZW50LnJlbW92ZUFjdGlvbiBAIGFuQWN0aW9uXG4gICAgICAgIHRoaXMuc2V0U3RhdGUgQCB7IHBsYW46IHRoaXMuc3RhdGUuYWdlbnQuZ2V0UGxhbigpIH1cblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnN0YXRlLmFnZW50LmFjdGlvbnMubWFwIEAgYWN0aW9uID0+XG4gICAgICAgICAgICA8QWN0aW9uQ29tcG9uZW50cy5BY3Rpb25WaWV3IGtleT17IGFjdGlvbi5rZXkgfSBhY3Rpb249eyBhY3Rpb24gfSByZW1vdmVBY3Rpb249eyAoKSA9PiB0aGlzLnJlbW92ZUFjdGlvbiggYWN0aW9uICkgfSB1cGRhdGVQbGFuPXsgdGhpcy51cGRhdGVQbGFuIH0gLz5cblxuICAgICAgICBjb25zdCBnb2FscyA9IHRoaXMuc3RhdGUuYWdlbnQuZ29hbHMuY29udGVudHMubWFwIEAgZ29hbCA9PlxuICAgICAgICAgICAgPEdvYWxDb21wb25lbnRzLkdvYWxWaWV3IGtleT17IGdvYWwua2V5IH0gZ29hbD17IGdvYWwgfSByZW1vdmVHb2FsPXsgKCkgPT4gdGhpcy5yZW1vdmVHb2FsKCBnb2FsICkgfSB1cGRhdGVQbGFuPXsgdGhpcy51cGRhdGVQbGFuIH0gLz5cblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cD5aZWUgZ29hbHo6PGJ1dHRvbiBvbkNsaWNrPXsgdGhpcy5hZGRHb2FsIH0+QWRkIEdvYWw8L2J1dHRvbj48L3A+XG4gICAgICAgICAgICAgICAgeyBnb2FscyB9XG4gICAgICAgICAgICAgICAgPHA+WmVlIGFrc2h1bno6PGJ1dHRvbiBvbkNsaWNrPXsgdGhpcy5hZGRBY3Rpb24gfT5BZGQgQWN0aW9uPC9idXR0b24+PC9wPlxuICAgICAgICAgICAgICAgIHsgYWN0aW9ucyB9XG4gICAgICAgICAgICAgICAgPFBsYW5WaWV3IHBsYW49eyB0aGlzLnN0YXRlLnBsYW4gfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBAICdjb250YWluZXInXG5cbkluZmVybm8ucmVuZGVyIEAgPEFwcCAvPiwgY29udGFpbmVyXG4iXX0=