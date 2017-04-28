'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionView = function (_Inferno$Component) {
    _inherits(ActionView, _Inferno$Component);

    function ActionView(props) {
        _classCallCheck(this, ActionView);

        var _this = _possibleConstructorReturn(this, (ActionView.__proto__ || Object.getPrototypeOf(ActionView)).call(this));

        _this.state = props.action;return _this;
    }

    _createClass(ActionView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return Inferno.createElement('div', {}, [Inferno.createElement('p', {}, 'Key: ' + this.state.key), Inferno.createElement('p', {}, 'aKey: ' + this.state.aKey), Inferno.createElement('p', {}, 'Conditions:'), Inferno.createElement('ul', {}, Object.keys(this.state.conditions).map(function (key) {
                return Inferno.createElement('li', {}, key + ': ' + _this2.state.conditions[key]);
            })), Inferno.createElement('ul', {}, Object.keys(this.state.effects).map(function (key) {
                return Inferno.createElement('li', {}, key + ': ' + _this2.state.effects[key]);
            }))]);
        }
    }]);

    return ActionView;
}(Inferno.Component);

var renderIt = function renderIt(bool) {
    return bool ? 'true' : 'false';
};
var createVNode = Inferno.createVNode;

var ActionViewSecond = function (_Inferno$Component2) {
    _inherits(ActionViewSecond, _Inferno$Component2);

    function ActionViewSecond(props) {
        _classCallCheck(this, ActionViewSecond);

        var _this3 = _possibleConstructorReturn(this, (ActionViewSecond.__proto__ || Object.getPrototypeOf(ActionViewSecond)).call(this, props));

        console.log('props', props);
        _this3.state = {
            action: props.action
        };return _this3;
    }

    _createClass(ActionViewSecond, [{
        key: 'render',
        value: function render() {
            var action = this.state.action;
            console.log(action);
            var conditionListOne = Object.keys(action.conditions).map(function (key) {
                return createVNode(2, 'li', null, [' key : ', renderIt(action.conditions[key])]);
            });
            var conditionListTwo = Object.keys(action.effects).map(function (key) {
                return createVNode(2, 'li', null, [' key :  ', renderIt(action.effects[key])]);
            });
            return createVNode(2, 'div', null, [createVNode(2, 'p', null, [' Key: ', action.key, ' ']), createVNode(2, 'p', null, [' \'Conditions:\'', createVNode(2, 'ul', null, conditionListOne), createVNode(2, 'ul', null, conditionListTwo)])]);
        }
    }]);

    return ActionViewSecond;
}(Inferno.Component);

var exampleAction = new Planner.Action('Attack', { kWeaponIsLoaded: false }, { kTargetIsDead: true });

//Inferno.render @ Inferno.createElement( ActionView, exampleAction ), document.getElementById @ 'container'
//Inferno.render @ <ActionViewSecond action={exampleAction}/>, node  // This one should work, but it doesn't =(
//
var node = document.getElementById('container');
Inferno.render(Inferno.createElement(ActionViewSecond, { action: exampleAction }), node);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiQWN0aW9uVmlldyIsInByb3BzIiwic3RhdGUiLCJhY3Rpb24iLCJJbmZlcm5vIiwiY3JlYXRlRWxlbWVudCIsImtleSIsImFLZXkiLCJPYmplY3QiLCJrZXlzIiwiY29uZGl0aW9ucyIsIm1hcCIsImVmZmVjdHMiLCJDb21wb25lbnQiLCJyZW5kZXJJdCIsImJvb2wiLCJBY3Rpb25WaWV3U2Vjb25kIiwiY29uc29sZSIsImxvZyIsImNvbmRpdGlvbkxpc3RPbmUiLCJjb25kaXRpb25MaXN0VHdvIiwiZXhhbXBsZUFjdGlvbiIsIlBsYW5uZXIiLCJBY3Rpb24iLCJrV2VhcG9uSXNMb2FkZWQiLCJrVGFyZ2V0SXNEZWFkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsVTs7O0FBQ0Ysd0JBQWFDLEtBQWIsRUFBcUI7QUFBQTs7QUFBQTs7QUFFakIsY0FBS0MsS0FBTCxHQUFhRCxNQUFNRSxNQUFuQixDQUZpQjtBQUVROzs7O2lDQUVwQjtBQUFBOztBQUNMLG1CQUFPQyxRQUFRQyxhQUFSLENBQXdCLEtBQXhCLEVBQStCLEVBQS9CLEVBQW1DLENBQ3RDRCxRQUFRQyxhQUFSLENBQXdCLEdBQXhCLEVBQTZCLEVBQTdCLEVBQWlDLFVBQVUsS0FBS0gsS0FBTCxDQUFXSSxHQUF0RCxDQURzQyxFQUVwQ0YsUUFBUUMsYUFBUixDQUF3QixHQUF4QixFQUE2QixFQUE3QixFQUFpQyxXQUFXLEtBQUtILEtBQUwsQ0FBV0ssSUFBdkQsQ0FGb0MsRUFHcENILFFBQVFDLGFBQVIsQ0FBd0IsR0FBeEIsRUFBNkIsRUFBN0IsRUFBaUMsYUFBakMsQ0FIb0MsRUFJcENELFFBQVFDLGFBQVIsQ0FBd0IsSUFBeEIsRUFBOEIsRUFBOUIsRUFBa0NHLE9BQU9DLElBQVAsQ0FBYSxLQUFLUCxLQUFMLENBQVdRLFVBQXhCLEVBQXFDQyxHQUFyQyxDQUEwQztBQUFBLHVCQUFPUCxRQUFRQyxhQUFSLENBQXdCLElBQXhCLEVBQThCLEVBQTlCLEVBQWtDQyxNQUFNLElBQU4sR0FBYSxPQUFLSixLQUFMLENBQVdRLFVBQVgsQ0FBc0JKLEdBQXRCLENBQS9DLENBQVA7QUFBQSxhQUExQyxDQUFsQyxDQUpvQyxFQUtwQ0YsUUFBUUMsYUFBUixDQUF3QixJQUF4QixFQUE4QixFQUE5QixFQUFrQ0csT0FBT0MsSUFBUCxDQUFhLEtBQUtQLEtBQUwsQ0FBV1UsT0FBeEIsRUFBa0NELEdBQWxDLENBQXVDO0FBQUEsdUJBQU9QLFFBQVFDLGFBQVIsQ0FBd0IsSUFBeEIsRUFBOEIsRUFBOUIsRUFBa0NDLE1BQU0sSUFBTixHQUFhLE9BQUtKLEtBQUwsQ0FBV1UsT0FBWCxDQUFtQk4sR0FBbkIsQ0FBL0MsQ0FBUDtBQUFBLGFBQXZDLENBQWxDLENBTG9DLENBQW5DLENBQVA7QUFLOEo7Ozs7RUFYN0lGLFFBQVFTLFM7O0FBYWpDLElBQU1DLFdBQVcsU0FBWEEsUUFBVztBQUFBLFdBQVFDLE9BQU8sTUFBUCxHQUFnQixPQUF4QjtBQUFBLENBQWpCOzs7SUFDTUMsZ0I7OztBQUNGLDhCQUFhZixLQUFiLEVBQXFCO0FBQUE7O0FBQUEseUlBQ1hBLEtBRFc7O0FBRWpCZ0IsZ0JBQVFDLEdBQVIsQ0FBYyxPQUFkLEVBQXVCakIsS0FBdkI7QUFDQSxlQUFLQyxLQUFMLEdBQWE7QUFDWEMsb0JBQU9GLE1BQU1FO0FBREYsU0FBYixDQUhpQjtBQUtoQjs7OztpQ0FFSTtBQUNMLGdCQUFJQSxTQUFTLEtBQUtELEtBQUwsQ0FBV0MsTUFBeEI7QUFDQWMsb0JBQVFDLEdBQVIsQ0FBY2YsTUFBZDtBQUNBLGdCQUFJZ0IsbUJBQW1CWCxPQUFPQyxJQUFQLENBQWFOLE9BQU9PLFVBQXBCLEVBQWlDQyxHQUFqQyxDQUFzQztBQUFBLDhEQUFvQkcsU0FBU1gsT0FBT08sVUFBUCxDQUFrQkosR0FBbEIsQ0FBVCxDQUFwQjtBQUFBLGFBQXRDLENBQXZCO0FBQ0EsZ0JBQUljLG1CQUFtQlosT0FBT0MsSUFBUCxDQUFhTixPQUFPUyxPQUFwQixFQUE4QkQsR0FBOUIsQ0FBbUM7QUFBQSwrREFBcUJHLFNBQVNYLE9BQU9TLE9BQVAsQ0FBZU4sR0FBZixDQUFULENBQXJCO0FBQUEsYUFBbkMsQ0FBdkI7QUFDQSxxRkFFZ0JILE9BQU9HLEdBRnZCLG1GQUlhYSxnQkFKYiw4QkFLYUMsZ0JBTGI7QUFPVTs7OztFQXBCYWhCLFFBQVFTLFM7O0FBc0J2QyxJQUFJUSxnQkFBZ0IsSUFBSUMsUUFBUUMsTUFBWixDQUNoQixRQURnQixFQUVkLEVBQUlDLGlCQUFpQixLQUFyQixFQUZjLEVBR2QsRUFBSUMsZUFBZSxJQUFuQixFQUhjLENBQXBCOztBQUtBO0FBQ0E7QUFDQTtBQUNBLElBQUlDLE9BQU9DLFNBQVNDLGNBQVQsQ0FBMEIsV0FBMUIsQ0FBWDtBQUNBeEIsUUFBUXlCLE1BQVIsQ0FBaUJ6QixRQUFRQyxhQUFSLENBQXNCVyxnQkFBdEIsRUFBd0MsRUFBQ2IsUUFBT2tCLGFBQVIsRUFBeEMsQ0FBakIsRUFBa0ZLLElBQWxGIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFjdGlvblZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHByb3BzLmFjdGlvblxuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgcmV0dXJuIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdkaXYnLCB7fSwgOjpbXVxuICAgICAgICAgICAgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3AnLCB7fSwgJ0tleTogJyArIHRoaXMuc3RhdGUua2V5XG4gICAgICAgICAgICAsIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdwJywge30sICdhS2V5OiAnICsgdGhpcy5zdGF0ZS5hS2V5XG4gICAgICAgICAgICAsIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdwJywge30sICdDb25kaXRpb25zOidcbiAgICAgICAgICAgICwgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3VsJywge30sIE9iamVjdC5rZXlzKCB0aGlzLnN0YXRlLmNvbmRpdGlvbnMgKS5tYXAoIGtleSA9PiBJbmZlcm5vLmNyZWF0ZUVsZW1lbnQgQCAnbGknLCB7fSwga2V5ICsgJzogJyArIHRoaXMuc3RhdGUuY29uZGl0aW9uc1trZXldIClcbiAgICAgICAgICAgICwgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3VsJywge30sIE9iamVjdC5rZXlzKCB0aGlzLnN0YXRlLmVmZmVjdHMgKS5tYXAoIGtleSA9PiBJbmZlcm5vLmNyZWF0ZUVsZW1lbnQgQCAnbGknLCB7fSwga2V5ICsgJzogJyArIHRoaXMuc3RhdGUuZWZmZWN0c1trZXldIClcblxuY29uc3QgcmVuZGVySXQgPSBib29sID0+IGJvb2wgPyAndHJ1ZScgOiAnZmFsc2UnXG5jbGFzcyBBY3Rpb25WaWV3U2Vjb25kIGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OlxuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgY29uc29sZS5sb2cgQCAncHJvcHMnLCBwcm9wc1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgIGFjdGlvbjpwcm9wcy5hY3Rpb25cbiAgICAgICAgfVxuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuc3RhdGUuYWN0aW9uXG4gICAgICAgIGNvbnNvbGUubG9nIEAgYWN0aW9uXG4gICAgICAgIGxldCBjb25kaXRpb25MaXN0T25lID0gT2JqZWN0LmtleXMoIGFjdGlvbi5jb25kaXRpb25zICkubWFwKCBrZXkgPT4gKDxsaT4ga2V5IDoge3JlbmRlckl0KGFjdGlvbi5jb25kaXRpb25zW2tleV0pfTwvbGk+KSApXG4gICAgICAgIGxldCBjb25kaXRpb25MaXN0VHdvID0gT2JqZWN0LmtleXMoIGFjdGlvbi5lZmZlY3RzICkubWFwKCBrZXkgPT4gKDxsaT4ga2V5IDogIHtyZW5kZXJJdChhY3Rpb24uZWZmZWN0c1trZXldKX08L2xpPikgKVxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHA+IEtleToge2FjdGlvbi5rZXl9IDwvcD5cbiAgICAgICAgICAgICAgPHA+ICdDb25kaXRpb25zOidcbiAgICAgICAgICAgICAgICA8dWw+e2NvbmRpdGlvbkxpc3RPbmV9PC91bD5cbiAgICAgICAgICAgICAgICA8dWw+e2NvbmRpdGlvbkxpc3RUd299PC91bD5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbmxldCBleGFtcGxlQWN0aW9uID0gbmV3IFBsYW5uZXIuQWN0aW9uIEBcbiAgICAnQXR0YWNrJ1xuICAgICwgQHt9IGtXZWFwb25Jc0xvYWRlZDogZmFsc2VcbiAgICAsIEB7fSBrVGFyZ2V0SXNEZWFkOiB0cnVlXG5cbi8vSW5mZXJuby5yZW5kZXIgQCBJbmZlcm5vLmNyZWF0ZUVsZW1lbnQoIEFjdGlvblZpZXcsIGV4YW1wbGVBY3Rpb24gKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgQCAnY29udGFpbmVyJ1xuLy9JbmZlcm5vLnJlbmRlciBAIDxBY3Rpb25WaWV3U2Vjb25kIGFjdGlvbj17ZXhhbXBsZUFjdGlvbn0vPiwgbm9kZSAgLy8gVGhpcyBvbmUgc2hvdWxkIHdvcmssIGJ1dCBpdCBkb2Vzbid0ID0oXG4vL1xubGV0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBAICdjb250YWluZXInXG5JbmZlcm5vLnJlbmRlciBAIEluZmVybm8uY3JlYXRlRWxlbWVudChBY3Rpb25WaWV3U2Vjb25kLCB7YWN0aW9uOmV4YW1wbGVBY3Rpb259KSwgbm9kZVxuIl19