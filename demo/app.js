'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = Inferno.createVNode;

var ActionView = function (_Inferno$Component) {
    _inherits(ActionView, _Inferno$Component);

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
            var _this2 = this;

            var conditions = Object.keys(this.props.action.conditions).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this2.renderBool(_this2.props.action.conditions[key])]);
            });
            var effects = Object.keys(this.props.action.effects).map(function (key) {
                return createVNode(2, 'li', null, [createVNode(2, 'strong', null, key), ': ', _this2.renderBool(_this2.props.action.effects[key])]);
            });

            return createVNode(2, 'div', null, [createVNode(2, 'p', null, ['Key: ', this.props.action.key]), createVNode(2, 'p', null, ['Conditions:', createVNode(2, 'ul', null, conditions), createVNode(2, 'ul', null, effects)])]);
        }
    }]);

    return ActionView;
}(Inferno.Component);

var exampleAction = new Planner.Action('Attack', { kWeaponIsLoaded: false }, { kTargetIsDead: false });

var container = document.getElementById('container');
Inferno.render(createVNode(16, ActionView, null, null, {
    'action': exampleAction
}), container);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiQWN0aW9uVmlldyIsInByb3BzIiwiYm9vbCIsImNvbmRpdGlvbnMiLCJPYmplY3QiLCJrZXlzIiwiYWN0aW9uIiwibWFwIiwia2V5IiwicmVuZGVyQm9vbCIsImVmZmVjdHMiLCJJbmZlcm5vIiwiQ29tcG9uZW50IiwiZXhhbXBsZUFjdGlvbiIsIlBsYW5uZXIiLCJBY3Rpb24iLCJrV2VhcG9uSXNMb2FkZWQiLCJrVGFyZ2V0SXNEZWFkIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQU1BLFU7OztBQUNGLHdCQUFhQyxLQUFiLEVBQXFCO0FBQUE7O0FBQUEsdUhBQVdBLEtBQVg7QUFBZ0I7Ozs7bUNBRXpCQyxJLEVBQU87QUFBRyxtQkFBT0EsT0FBTyxNQUFQLEdBQWdCLE9BQXZCO0FBQThCOzs7aUNBRTNDO0FBQUE7O0FBQ0wsZ0JBQUlDLGFBQWFDLE9BQU9DLElBQVAsQ0FBYSxLQUFLSixLQUFMLENBQVdLLE1BQVgsQ0FBa0JILFVBQS9CLEVBQTRDSSxHQUE1QyxDQUFrRDtBQUFBLGtGQUFxQkMsR0FBckIsU0FBdUMsT0FBS0MsVUFBTCxDQUFpQixPQUFLUixLQUFMLENBQVdLLE1BQVgsQ0FBa0JILFVBQWxCLENBQTZCSyxHQUE3QixDQUFqQixDQUF2QztBQUFBLGFBQWxELENBQWpCO0FBQ0EsZ0JBQUlFLFVBQVVOLE9BQU9DLElBQVAsQ0FBYSxLQUFLSixLQUFMLENBQVdLLE1BQVgsQ0FBa0JJLE9BQS9CLEVBQXlDSCxHQUF6QyxDQUErQztBQUFBLGtGQUFxQkMsR0FBckIsU0FBdUMsT0FBS0MsVUFBTCxDQUFpQixPQUFLUixLQUFMLENBQVdLLE1BQVgsQ0FBa0JJLE9BQWxCLENBQTBCRixHQUExQixDQUFqQixDQUF2QztBQUFBLGFBQS9DLENBQWQ7O0FBRUEsb0ZBRWdCLEtBQUtQLEtBQUwsQ0FBV0ssTUFBWCxDQUFrQkUsR0FGbEMseUVBSWNMLFVBSmQsOEJBS2NPLE9BTGQ7QUFPVTs7OztFQWhCT0MsUUFBUUMsUzs7QUFrQmpDLElBQUlDLGdCQUFnQixJQUFJQyxRQUFRQyxNQUFaLENBQ2hCLFFBRGdCLEVBRWQsRUFBSUMsaUJBQWlCLEtBQXJCLEVBRmMsRUFHZCxFQUFJQyxlQUFlLEtBQW5CLEVBSGMsQ0FBcEI7O0FBS0EsSUFBSUMsWUFBWUMsU0FBU0MsY0FBVCxDQUEwQixXQUExQixDQUFoQjtBQUNBVCxRQUFRVSxNQUFSLGlCQUFrQixVQUFsQjtBQUFBLGNBQXNDUjtBQUF0QyxJQUEwREssU0FBMUQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWN0aW9uVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjogc3VwZXIgQCBwcm9wc1xuXG4gICAgcmVuZGVyQm9vbCggYm9vbCApIDo6IHJldHVybiBib29sID8gJ3RydWUnIDogJ2ZhbHNlJ1xuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgbGV0IGNvbmRpdGlvbnMgPSBPYmplY3Qua2V5cyggdGhpcy5wcm9wcy5hY3Rpb24uY29uZGl0aW9ucyApLm1hcCBAIGtleSA9PiA8bGk+PHN0cm9uZz57IGtleSB9PC9zdHJvbmc+OiB7IHRoaXMucmVuZGVyQm9vbCggdGhpcy5wcm9wcy5hY3Rpb24uY29uZGl0aW9uc1trZXldICkgfTwvbGk+XG4gICAgICAgIGxldCBlZmZlY3RzID0gT2JqZWN0LmtleXMoIHRoaXMucHJvcHMuYWN0aW9uLmVmZmVjdHMgKS5tYXAgQCBrZXkgPT4gPGxpPjxzdHJvbmc+eyBrZXkgfTwvc3Ryb25nPjogeyB0aGlzLnJlbmRlckJvb2woIHRoaXMucHJvcHMuYWN0aW9uLmVmZmVjdHNba2V5XSApIH08L2xpPlxuXG4gICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cD5LZXk6IHsgdGhpcy5wcm9wcy5hY3Rpb24ua2V5IH08L3A+XG4gICAgICAgICAgICAgIDxwPkNvbmRpdGlvbnM6XG4gICAgICAgICAgICAgICAgPHVsPnsgY29uZGl0aW9ucyB9PC91bD5cbiAgICAgICAgICAgICAgICA8dWw+eyBlZmZlY3RzIH08L3VsPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxubGV0IGV4YW1wbGVBY3Rpb24gPSBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICdBdHRhY2snXG4gICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiBmYWxzZVxuICAgICwgQHt9IGtUYXJnZXRJc0RlYWQ6IGZhbHNlXG5cbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBAICdjb250YWluZXInXG5JbmZlcm5vLnJlbmRlciBAIDxBY3Rpb25WaWV3IGFjdGlvbj17IGV4YW1wbGVBY3Rpb24gfSAvPiwgY29udGFpbmVyXG4iXX0=