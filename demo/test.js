'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = Inferno.createVNode;

var InputTest = function (_Inferno$Component) {
    _inherits(InputTest, _Inferno$Component);

    function InputTest(props) {
        _classCallCheck(this, InputTest);

        var _this = _possibleConstructorReturn(this, (InputTest.__proto__ || Object.getPrototypeOf(InputTest)).call(this, props));

        _this.state = {
            name: 'inferno' };return _this;
    }

    _createClass(InputTest, [{
        key: 'render',
        value: function render() {
            return createVNode(512, 'input', null, null, {
                'name': this.state.name,
                'value': this.state.name
            });
        }
    }]);

    return InputTest;
}(Inferno.Component);

var container = document.getElementById('container');

Inferno.render(createVNode(16, InputTest), container);

Array.from(document.getElementsByTagName('input')).forEach(function (node) {
    console.log('Node:', node.getAttribute('name'), '\tDefault Value:', node.defaultValue);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanN5Il0sIm5hbWVzIjpbIklucHV0VGVzdCIsInByb3BzIiwic3RhdGUiLCJuYW1lIiwiSW5mZXJubyIsIkNvbXBvbmVudCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImZvckVhY2giLCJub2RlIiwiY29uc29sZSIsImxvZyIsImdldEF0dHJpYnV0ZSIsImRlZmF1bHRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQU1BLFM7OztBQUNGLHVCQUFhQyxLQUFiLEVBQXFCO0FBQUE7O0FBQUEsMEhBQ1RBLEtBRFM7O0FBRWpCLGNBQUtDLEtBQUwsR0FBYTtBQUNUQyxrQkFBTSxTQURHLEVBQWIsQ0FGaUI7QUFHRTs7OztpQ0FFZDtBQUNMO0FBQUEsd0JBQ2tCLEtBQUtELEtBQUwsQ0FBV0MsSUFEN0I7QUFBQSx5QkFDNEMsS0FBS0QsS0FBTCxDQUFXQztBQUR2RDtBQUNnRTs7OztFQVJoREMsUUFBUUMsUzs7QUFVaEMsSUFBSUMsWUFBWUMsU0FBU0MsY0FBVCxDQUEwQixXQUExQixDQUFoQjs7QUFFQUosUUFBUUssTUFBUixpQkFBa0IsU0FBbEIsR0FBZ0NILFNBQWhDOztBQUVBSSxNQUFNQyxJQUFOLENBQVlKLFNBQVNLLG9CQUFULENBQStCLE9BQS9CLENBQVosRUFBdURDLE9BQXZELENBQWlFLFVBQUVDLElBQUYsRUFBWTtBQUN6RUMsWUFBUUMsR0FBUixDQUFjLE9BQWQsRUFBdUJGLEtBQUtHLFlBQUwsQ0FBbUIsTUFBbkIsQ0FBdkIsRUFBb0Qsa0JBQXBELEVBQXdFSCxLQUFLSSxZQUE3RTtBQUF5RixDQUQ3RiIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSW5wdXRUZXN0IGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OlxuICAgICAgICBzdXBlciBAIHByb3BzXG4gICAgICAgIHRoaXMuc3RhdGUgPSA6OlxuICAgICAgICAgICAgbmFtZTogJ2luZmVybm8nXG4gICAgXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgcmV0dXJuIEBcbiAgICAgICAgICAgIDxpbnB1dCBuYW1lPXsgdGhpcy5zdGF0ZS5uYW1lIH0gdmFsdWU9eyB0aGlzLnN0YXRlLm5hbWUgfSAvPlxuXG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgQCAnY29udGFpbmVyJ1xuXG5JbmZlcm5vLnJlbmRlciBAIDxJbnB1dFRlc3QgLz4sIGNvbnRhaW5lclxuXG5BcnJheS5mcm9tKCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2lucHV0JyApICkuZm9yRWFjaCBAICggbm9kZSApID0+IDo6XG4gICAgY29uc29sZS5sb2cgQCAnTm9kZTonLCBub2RlLmdldEF0dHJpYnV0ZSggJ25hbWUnICksICdcXHREZWZhdWx0IFZhbHVlOicsIG5vZGUuZGVmYXVsdFZhbHVlXG4iXX0=