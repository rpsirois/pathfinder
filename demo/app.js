class ActionView extends Inferno.Component {
    constructor(action) {
        super();
        this.state = action;
    }

    render() {
        return Inferno.createElement('div', {}, [Inferno.createElement('p', {}, 'Key: ' + this.state.key), Inferno.createElement('p', {}, 'aKey: ' + this.state.aKey), Inferno.createElement('p', {}, 'Conditions:'), Inferno.createElement('ul', {}, Object.keys(this.state.conditions).map(key => Inferno.createElement('li', {}, key + ': ' + this.state.conditions[key]))), Inferno.createElement('ul', {}, Object.keys(this.state.effects).map(key => Inferno.createElement('li', {}, key + ': ' + this.state.effects[key])))]);
    }
}

let exampleAction = new Planner.Action('Attack', { kWeaponIsLoaded: true }, { kTargetIsDead: true });

console.log(exampleAction);
exampleAction.aKey = exampleAction.key;

Inferno.render(Inferno.createElement(ActionView, exampleAction), document.getElementById('container'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiQWN0aW9uVmlldyIsIkluZmVybm8iLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImFjdGlvbiIsInN0YXRlIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsImtleSIsImFLZXkiLCJPYmplY3QiLCJrZXlzIiwiY29uZGl0aW9ucyIsIm1hcCIsImVmZmVjdHMiLCJleGFtcGxlQWN0aW9uIiwiUGxhbm5lciIsIkFjdGlvbiIsImtXZWFwb25Jc0xvYWRlZCIsImtUYXJnZXRJc0RlYWQiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsVUFBTixTQUF5QkMsUUFBUUMsU0FBakMsQ0FBMkM7QUFDdkNDLGdCQUFhQyxNQUFiLEVBQXNCO0FBQ2xCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhRCxNQUFiO0FBQW1COztBQUV2QkUsYUFBUztBQUNMLGVBQU9MLFFBQVFNLGFBQVIsQ0FBd0IsS0FBeEIsRUFBK0IsRUFBL0IsRUFBbUMsQ0FDdENOLFFBQVFNLGFBQVIsQ0FBd0IsR0FBeEIsRUFBNkIsRUFBN0IsRUFBaUMsVUFBVSxLQUFLRixLQUFMLENBQVdHLEdBQXRELENBRHNDLEVBRXBDUCxRQUFRTSxhQUFSLENBQXdCLEdBQXhCLEVBQTZCLEVBQTdCLEVBQWlDLFdBQVcsS0FBS0YsS0FBTCxDQUFXSSxJQUF2RCxDQUZvQyxFQUdwQ1IsUUFBUU0sYUFBUixDQUF3QixHQUF4QixFQUE2QixFQUE3QixFQUFpQyxhQUFqQyxDQUhvQyxFQUlwQ04sUUFBUU0sYUFBUixDQUF3QixJQUF4QixFQUE4QixFQUE5QixFQUFrQ0csT0FBT0MsSUFBUCxDQUFhLEtBQUtOLEtBQUwsQ0FBV08sVUFBeEIsRUFBcUNDLEdBQXJDLENBQTBDTCxPQUFPUCxRQUFRTSxhQUFSLENBQXdCLElBQXhCLEVBQThCLEVBQTlCLEVBQWtDQyxNQUFNLElBQU4sR0FBYSxLQUFLSCxLQUFMLENBQVdPLFVBQVgsQ0FBc0JKLEdBQXRCLENBQS9DLENBQWpELENBQWxDLENBSm9DLEVBS3BDUCxRQUFRTSxhQUFSLENBQXdCLElBQXhCLEVBQThCLEVBQTlCLEVBQWtDRyxPQUFPQyxJQUFQLENBQWEsS0FBS04sS0FBTCxDQUFXUyxPQUF4QixFQUFrQ0QsR0FBbEMsQ0FBdUNMLE9BQU9QLFFBQVFNLGFBQVIsQ0FBd0IsSUFBeEIsRUFBOEIsRUFBOUIsRUFBa0NDLE1BQU0sSUFBTixHQUFhLEtBQUtILEtBQUwsQ0FBV1MsT0FBWCxDQUFtQk4sR0FBbkIsQ0FBL0MsQ0FBOUMsQ0FBbEMsQ0FMb0MsQ0FBbkMsQ0FBUDtBQUs4SjtBQVgzSDs7QUFhM0MsSUFBSU8sZ0JBQWdCLElBQUlDLFFBQVFDLE1BQVosQ0FDaEIsUUFEZ0IsRUFFZCxFQUFJQyxpQkFBaUIsSUFBckIsRUFGYyxFQUdkLEVBQUlDLGVBQWUsSUFBbkIsRUFIYyxDQUFwQjs7QUFLQUMsUUFBUUMsR0FBUixDQUFjTixhQUFkO0FBQ0FBLGNBQWNOLElBQWQsR0FBcUJNLGNBQWNQLEdBQW5DOztBQUVBUCxRQUFRSyxNQUFSLENBQWlCTCxRQUFRTSxhQUFSLENBQXVCUCxVQUF2QixFQUFtQ2UsYUFBbkMsQ0FBakIsRUFBcUVPLFNBQVNDLGNBQVQsQ0FBMEIsV0FBMUIsQ0FBckUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWN0aW9uVmlldyBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIGFjdGlvbiApIDo6XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGFjdGlvblxuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgcmV0dXJuIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdkaXYnLCB7fSwgOjpbXVxuICAgICAgICAgICAgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3AnLCB7fSwgJ0tleTogJyArIHRoaXMuc3RhdGUua2V5XG4gICAgICAgICAgICAsIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdwJywge30sICdhS2V5OiAnICsgdGhpcy5zdGF0ZS5hS2V5XG4gICAgICAgICAgICAsIEluZmVybm8uY3JlYXRlRWxlbWVudCBAICdwJywge30sICdDb25kaXRpb25zOidcbiAgICAgICAgICAgICwgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3VsJywge30sIE9iamVjdC5rZXlzKCB0aGlzLnN0YXRlLmNvbmRpdGlvbnMgKS5tYXAoIGtleSA9PiBJbmZlcm5vLmNyZWF0ZUVsZW1lbnQgQCAnbGknLCB7fSwga2V5ICsgJzogJyArIHRoaXMuc3RhdGUuY29uZGl0aW9uc1trZXldIClcbiAgICAgICAgICAgICwgSW5mZXJuby5jcmVhdGVFbGVtZW50IEAgJ3VsJywge30sIE9iamVjdC5rZXlzKCB0aGlzLnN0YXRlLmVmZmVjdHMgKS5tYXAoIGtleSA9PiBJbmZlcm5vLmNyZWF0ZUVsZW1lbnQgQCAnbGknLCB7fSwga2V5ICsgJzogJyArIHRoaXMuc3RhdGUuZWZmZWN0c1trZXldIClcblxubGV0IGV4YW1wbGVBY3Rpb24gPSBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICdBdHRhY2snXG4gICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiB0cnVlXG4gICAgLCBAe30ga1RhcmdldElzRGVhZDogdHJ1ZVxuXG5jb25zb2xlLmxvZyBAIGV4YW1wbGVBY3Rpb25cbmV4YW1wbGVBY3Rpb24uYUtleSA9IGV4YW1wbGVBY3Rpb24ua2V5XG5cbkluZmVybm8ucmVuZGVyIEAgSW5mZXJuby5jcmVhdGVFbGVtZW50KCBBY3Rpb25WaWV3LCBleGFtcGxlQWN0aW9uICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIEAgJ2NvbnRhaW5lcidcbiJdfQ==