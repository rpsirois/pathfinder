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

        _this3.save = function () {
            var passesValidation = true;
            var variableValidator = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|await|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/;

            // validate key
            var keyNode = document.getElementsByName('key')[0];
            if (!variableValidator.test(_this3.state.goalKey)) {
                passesValidation = false;
                console.log('key not valid');
                if (!keyNode.classList.contains('invalid')) {
                    keyNode.classList.add('invalid');
                }
            } else {
                if (keyNode.classList.contains('invalid')) {
                    keyNode.classList.remove('invalid');
                }
            }

            // validate priority
            var priorityNode = document.getElementsByName('priority')[0];
            if (isNaN(_this3.state.goalPriority) || _this3.state.goalPriority < 0) {
                passesValidation = false;
                console.log('priority is not valid');
                if (!priorityNode.classList.contains('invalid')) {
                    priorityNode.classList.add('invalid');
                }
            } else {
                if (priorityNode.classList.contains('invalid')) {
                    priorityNode.classList.remove('invalid');
                }
            }

            // validate conditions
            var newConditions = {};
            var conditionNodes = Array.from(document.getElementsByClassName('goalEditorForm')[0].getElementsByTagName('input'));
            var _loop = function _loop(i) {
                var cKeyNode = void 0,
                    cKey = void 0,
                    cVal = void 0;

                conditionNodes.forEach(function (node) {
                    var nodeName = node.getAttribute('name');

                    if (nodeName == 'condition' + i + 'val') {
                        cVal = node.value;
                    }
                    if (nodeName == 'condition' + i + 'key') {
                        cKeyNode = node;
                        cKey = node.value;
                    }
                });

                if (!variableValidator.test(cKey)) {
                    passesValidation = false;
                    console.log('condition key "' + cKey + '" is not valid');
                    if (!cKeyNode.classList.contains('invalid')) {
                        cKeyNode.classList.add('invalid');
                    }
                } else {
                    if (cKeyNode.classList.contains('invalid')) {
                        cKeyNode.classList.remove('invalid');
                    }
                }

                if (typeof cKey !== 'undefined') {
                    newConditions[cKey] = cVal;
                }
            };

            for (var i = 0; i <= _this3.state.c; i++) {
                _loop(i);
            }

            if (passesValidation) {
                _this3.props.goal.key = _this3.state.goalKey;
                _this3.props.goal.priority = _this3.state.goalPriority;
                _this3.props.goal.conditions = newConditions;
                _this3.props.exitModal();
            } else {
                console.log('update errors');
            }
        };

        _this3.removeCondition = function (key) {
            _this3.state.conditions = _this3.state.conditions.filter(function (kv) {
                return kv[0] != key;
            });
            _this3.setState();
        };

        _this3.indexOf2DArr = function (arr, col, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][col] == val) {
                    return i;
                }
            }
            return -1;
        };

        _this3.conditionChanged = function (e) {
            var conditionDataNodes = Array.from(e.target.parentNode.getElementsByTagName('input'));
            var oldKey = void 0,
                conditionsIdx = void 0;

            conditionDataNodes.forEach(function (node) {
                if (node.getAttribute('name').indexOf('key') >= 0) {
                    oldKey = node.getAttribute('prevVal');
                    conditionsIdx = _this3.indexOf2DArr(_this3.state.conditions, 0, oldKey);
                }
            });

            conditionDataNodes.map(function (node) {
                if (node.getAttribute('name').indexOf('val') >= 0) {
                    _this3.state.conditions[conditionsIdx][1] = node.value;
                }
                if (node.getAttribute('name').indexOf('key') >= 0) {
                    _this3.state.conditions[conditionsIdx][0] = node.value;
                    node.setAttribute('prevVal', node.value);
                }
            });
        };

        _this3.addBlankCondition = function (e) {
            _this3.state.conditions.push(['newCondition' + _this3.state.n++, null]);
            _this3.setState();
        };

        _this3.keyChanged = function (e) {
            _this3.state.goalKey = e.target.value;
        };

        _this3.priorityChanged = function (e) {
            _this3.state.goalPriority = e.target.value;
        };

        _this3.state = {
            c: -1,
            n: 0,
            goalKey: props.goal.key,
            goalPriority: props.goal.priority,
            conditions: Object.keys(props.goal.conditions).map(function (key) {
                return [key, props.goal.conditions[key]];
            }) };return _this3;
    }

    _createClass(GoalEditor, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            this.state.c = -1;
            var conditions = this.state.conditions.map(function (kv) {
                _this4.state.c += 1;
                var key = kv[0];
                var val = kv[1];
                var cn = _this4.state.c;
                return createVNode(2, 'div', 'editConditionRow', [createVNode(2, 'button', null, 'X', {
                    'type': 'button',
                    'onClick': function onClick(e) {
                        return _this4.removeCondition(key);
                    }
                }), createVNode(512, 'input', null, null, {
                    'type': 'text',
                    'onChange': function onChange(e) {
                        return _this4.conditionChanged(e);
                    },
                    'name': 'condition' + cn + 'key',
                    'placeholder': 'Condition Key',
                    'value': key,
                    'prevVal': key
                }), createVNode(512, 'input', null, null, {
                    'type': 'text',
                    'onChange': function onChange(e) {
                        return _this4.conditionChanged(e);
                    },
                    'name': 'condition' + cn + 'val',
                    'placeholder': 'Condition Value',
                    'value': val
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
                'value': this.state.goalKey,
                'onChange': function onChange(e) {
                    return _this4.keyChanged(e);
                }
            })]), createVNode(2, 'br'), createVNode(2, 'label', null, ['Priority:', createVNode(512, 'input', null, null, {
                'type': 'number',
                'min': '0',
                'step': '1',
                'name': 'priority',
                'placeholder': 'Priority',
                'value': this.state.goalPriority,
                'onChange': function onChange(e) {
                    return _this4.priorityChanged(e);
                }
            })]), createVNode(2, 'p', null, 'Conditions:'), createVNode(2, 'form', 'goalEditorForm', conditions, {
                'onSubmit': function onSubmit(e) {
                    e.preventDefault(), _this4.save();
                }
            }), createVNode(2, 'button', null, 'Add New Condition', {
                'onClick': this.addBlankCondition
            })]), createVNode(2, 'div', 'modal-footer', [createVNode(2, 'hr'), createVNode(2, 'button', null, 'Cancel', {
                'onClick': function onClick() {
                    return _this4.props.exitModal();
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3kiXSwibmFtZXMiOlsiZ29hbCIsIlBsYW5uZXIiLCJHb2FsIiwia1RhcmdldElzRGVhZCIsImFjdGlvbnMiLCJBY3Rpb24iLCJrV2VhcG9uSXNMb2FkZWQiLCJrV2VhcG9uSXNBcm1lZCIsIkdvYWxWaWV3IiwicHJvcHMiLCJzdGF0ZSIsImVkaXRpbmciLCJib29sIiwiY29uZGl0aW9ucyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJyZW5kZXJCb29sIiwiZXhpdE1vZGFsIiwic2V0U3RhdGUiLCJ1cGRhdGUiLCJyZW1vdmVHb2FsIiwicHJpb3JpdHkiLCJJbmZlcm5vIiwiQ29tcG9uZW50IiwiR29hbEVkaXRvciIsInNhdmUiLCJwYXNzZXNWYWxpZGF0aW9uIiwidmFyaWFibGVWYWxpZGF0b3IiLCJrZXlOb2RlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5TmFtZSIsInRlc3QiLCJnb2FsS2V5IiwiY29uc29sZSIsImxvZyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwicmVtb3ZlIiwicHJpb3JpdHlOb2RlIiwiaXNOYU4iLCJnb2FsUHJpb3JpdHkiLCJuZXdDb25kaXRpb25zIiwiY29uZGl0aW9uTm9kZXMiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpIiwiY0tleU5vZGUiLCJjS2V5IiwiY1ZhbCIsImZvckVhY2giLCJub2RlTmFtZSIsIm5vZGUiLCJnZXRBdHRyaWJ1dGUiLCJ2YWx1ZSIsImMiLCJyZW1vdmVDb25kaXRpb24iLCJmaWx0ZXIiLCJrdiIsImluZGV4T2YyREFyciIsImFyciIsImNvbCIsInZhbCIsImxlbmd0aCIsImNvbmRpdGlvbkNoYW5nZWQiLCJlIiwiY29uZGl0aW9uRGF0YU5vZGVzIiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsIm9sZEtleSIsImNvbmRpdGlvbnNJZHgiLCJpbmRleE9mIiwic2V0QXR0cmlidXRlIiwiYWRkQmxhbmtDb25kaXRpb24iLCJwdXNoIiwibiIsImtleUNoYW5nZWQiLCJwcmlvcml0eUNoYW5nZWQiLCJjbiIsInByZXZlbnREZWZhdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJBY3Rpb25WaWV3IiwiYWN0aW9uIiwiZWZmZWN0cyIsInJlbW92ZUFjdGlvbiIsIlBsYW5DcnVtYlZpZXciLCJjcnVtYiIsIlBsYW5WaWV3IiwicGxhbiIsImNydW1icyIsIkFwcCIsImFnZW50IiwiQWdlbnQiLCJnb2FscyIsImNsb25lIiwiYWRkQWN0aW9uIiwiZ2V0UGxhbiIsImFHb2FsIiwiYW5BY3Rpb24iLCJjb250ZW50cyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxJQUFJQyxRQUFRQyxJQUFaLENBQ1QsV0FEUyxFQUVQLEVBQUlDLGVBQWUsSUFBbkIsRUFGTyxDQUFiOztBQUlBLElBQU1DLFVBQVUsQ0FDWixJQUFJSCxRQUFRSSxNQUFaLENBQ0ksUUFESixFQUVNLEVBQUlDLGlCQUFpQixJQUFyQixFQUZOLEVBR00sRUFBSUgsZUFBZSxJQUFuQixFQUhOLENBRFksRUFNVixJQUFJRixRQUFRSSxNQUFaLENBQ0UsWUFERixFQUVJLEVBQUlFLGdCQUFnQixJQUFwQixFQUZKLEVBR0ksRUFBSUQsaUJBQWlCLElBQXJCLEVBSEosQ0FOVSxFQVdWLElBQUlMLFFBQVFJLE1BQVosQ0FDRSxZQURGLEVBRUksRUFGSixFQUdJLEVBQUlFLGdCQUFnQixJQUFwQixFQUhKLENBWFUsQ0FBaEIsQzs7SUFxQk1DLFE7OztBQUNGLHNCQUFhQyxLQUFiLEVBQXFCO0FBQUE7O0FBQUEsd0hBQ1RBLEtBRFM7O0FBRWpCLGNBQUtDLEtBQUwsR0FBYTtBQUNUQyxxQkFBUztBQURBLFNBQWIsQ0FGaUI7QUFJaEI7Ozs7bUNBRU9DLEksRUFBTztBQUFHLG1CQUFPQSxPQUFPLE1BQVAsR0FB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Q0FBV3dGLEtBQVgsQ0FBaUJQLFlBQWpCLENBQWdDYyxRQUFoQztBQUNBLGlCQUFLckYsUUFBTCxDQUFnQixFQUFFMkUsTUFBTSxLQUFLckYsS0FBTCxDQUFXd0YsS0FBWCxDQUFpQkssT0FBakIsRUFBUixFQUFoQjtBQUFvRDs7O2lDQUUvQztBQUFBOztBQUNMLGdCQUFNbkcsVUFBVSxLQUFLTSxLQUFMLENBQVd3RixLQUFYLENBQWlCOUYsT0FBakIsQ0FBeUJZLEdBQXpCLENBQStCO0FBQUEsdUNBQzFDLFVBRDBDO0FBQUEsOEJBQ0h5RSxNQURHO0FBQUEsb0NBQ3FCO0FBQUEsK0JBQU0sUUFBS0UsWUFBTCxDQUFtQkYsTUFBbkIsQ0FBTjtBQUFBO0FBRHJCLG1CQUN6QkEsT0FBT3hFLEdBRGtCO0FBQUEsYUFBL0IsQ0FBaEI7O0FBR0EsZ0JBQU1tRixRQUFRLEtBQUsxRixLQUFMLENBQVd3RixLQUFYLENBQWlCRSxLQUFqQixDQUF1Qk0sUUFBdkIsQ0FBZ0MxRixHQUFoQyxDQUFzQztBQUFBLHVDQUMvQyxRQUQrQztBQUFBLDRCQUNkaEIsSUFEYztBQUFBLGtDQUNNO0FBQUEsK0JBQU0sUUFBS3NCLFVBQUwsQ0FBaUJ0QixJQUFqQixDQUFOO0FBQUE7QUFETixtQkFDaENBLEtBQUtpQixHQUQyQjtBQUFBLGFBQXRDLENBQWQ7O0FBR0EseUZBR1VtRixLQUhWLDZDQUtVaEcsT0FMVixrQkFNUyxRQU5UO0FBQUEsd0JBTXlCLEtBQUtNLEtBQUwsQ0FBV3FGO0FBTnBDO0FBT1U7Ozs7RUFuQ0F2RSxRQUFRQyxTOztBQXFDMUIsSUFBSWtGLFlBQVk1RSxTQUFTNkUsY0FBVCxDQUEwQixXQUExQixDQUFoQjs7QUFFQXBGLFFBQVFxRixNQUFSLGlCQUFrQixHQUFsQixHQUEwQkYsU0FBMUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ29hbCA9IG5ldyBQbGFubmVyLkdvYWwgQFxuICAgICdLaWxsRW5lbXknXG4gICAgLCBAe30ga1RhcmdldElzRGVhZDogdHJ1ZVxuXG5jb25zdCBhY3Rpb25zID0gQFtdXG4gICAgbmV3IFBsYW5uZXIuQWN0aW9uIEBcbiAgICAgICAgJ0F0dGFjaydcbiAgICAgICAgLCBAe30ga1dlYXBvbklzTG9hZGVkOiB0cnVlXG4gICAgICAgICwgQHt9IGtUYXJnZXRJc0RlYWQ6IHRydWVcblxuICAgICwgbmV3IFBsYW5uZXIuQWN0aW9uIEBcbiAgICAgICAgJ0xvYWRXZWFwb24nXG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0FybWVkOiB0cnVlXG4gICAgICAgICwgQHt9IGtXZWFwb25Jc0xvYWRlZDogdHJ1ZVxuXG4gICAgLCBuZXcgUGxhbm5lci5BY3Rpb24gQFxuICAgICAgICAnRHJhd1dlYXBvbidcbiAgICAgICAgLCB7fVxuICAgICAgICAsIEB7fSBrV2VhcG9uSXNBcm1lZDogdHJ1ZVxuXG5cblxuXG5cblxuY2xhc3MgR29hbFZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6XG4gICAgICAgIHN1cGVyIEAgcHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH1cblxuICAgIHJlbmRlckJvb2woIGJvb2wgKSA6OiByZXR1cm4gYm9vbCA/ICd0cnVlJyA6ICdmYWxzZSdcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGxldCBjb25kaXRpb25zID0gT2JqZWN0LmtleXMoIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zICkubWFwIEAga2V5ID0+IDxsaT48c3Ryb25nPnsga2V5IH08L3N0cm9uZz46IHsgdHlwZW9mIHRoaXMucHJvcHMuZ29hbC5jb25kaXRpb25zW2tleV0gPT09ICdib29sZWFuJyA/IHRoaXMucmVuZGVyQm9vbCggdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNba2V5XSApIDogdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnNba2V5XSB9PC9saT5cbiAgICAgICAgY29uc3QgZXhpdE1vZGFsID0gKCkgPT4gOjogdGhpcy5zZXRTdGF0ZSBAIHsgZWRpdGluZzogZmFsc2UgfVxuICAgICAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiA6OiB0aGlzLnNldFN0YXRlKClcblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyBlID0+IHRoaXMucHJvcHMucmVtb3ZlR29hbCgpIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17IGUgPT4gdGhpcy5zZXRTdGF0ZSggeyBlZGl0aW5nOiB0cnVlIH0gKSB9PkU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8cD5LZXk6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmdvYWwua2V5IH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgPHA+UHJpb3JpdHk6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmdvYWwucHJpb3JpdHkgfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQ29uZGl0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgPHVsPnsgY29uZGl0aW9ucyB9PC91bD5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVkaXRpbmcgPyA8R29hbEVkaXRvciBnb2FsPXsgdGhpcy5wcm9wcy5nb2FsIH0gZXhpdE1vZGFsPXsgZXhpdE1vZGFsIH0gdXBkYXRlPXsgdXBkYXRlIH0gLz4gOiAnJyB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuY2xhc3MgR29hbEVkaXRvciBleHRlbmRzIEluZmVybm8uQ29tcG9uZW50IDo6XG4gICAgY29uc3RydWN0b3IoIHByb3BzICkgOjpcbiAgICAgICAgc3VwZXIgQCBwcm9wc1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYzogLTFcbiAgICAgICAgICAgICwgbjogMFxuICAgICAgICAgICAgLCBnb2FsS2V5OiBwcm9wcy5nb2FsLmtleVxuICAgICAgICAgICAgLCBnb2FsUHJpb3JpdHk6IHByb3BzLmdvYWwucHJpb3JpdHlcbiAgICAgICAgICAgICwgY29uZGl0aW9uczogT2JqZWN0LmtleXMoIHByb3BzLmdvYWwuY29uZGl0aW9ucyApLm1hcCBAICgga2V5ICkgPT4gWyBrZXksIHByb3BzLmdvYWwuY29uZGl0aW9uc1trZXldIF1cbiAgICAgICAgfVxuXG4gICAgc2F2ZSA9ICgpID0+IDo6XG4gICAgICAgIGxldCBwYXNzZXNWYWxpZGF0aW9uID0gdHJ1ZVxuICAgICAgICBsZXQgdmFyaWFibGVWYWxpZGF0b3IgPSAgL14oPyEoPzpkb3xpZnxpbnxmb3J8bGV0fG5ld3x0cnl8dmFyfGNhc2V8ZWxzZXxlbnVtfGV2YWx8bnVsbHx0aGlzfHRydWV8dm9pZHx3aXRofGF3YWl0fGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fGZhbHNlfHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxleHBvcnR8aW1wb3J0fHB1YmxpY3xyZXR1cm58c3RhdGljfHN3aXRjaHx0eXBlb2Z8ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufGFyZ3VtZW50c3xpbnRlcmZhY2V8cHJvdGVjdGVkfGltcGxlbWVudHN8aW5zdGFuY2VvZikkKSg/OltcXCRBLVpfYS16XFx4QUFcXHhCNVxceEJBXFx4QzAtXFx4RDZcXHhEOC1cXHhGNlxceEY4LVxcdTAyQzFcXHUwMkM2LVxcdTAyRDFcXHUwMkUwLVxcdTAyRTRcXHUwMkVDXFx1MDJFRVxcdTAzNzAtXFx1MDM3NFxcdTAzNzZcXHUwMzc3XFx1MDM3QS1cXHUwMzdEXFx1MDM3RlxcdTAzODZcXHUwMzg4LVxcdTAzOEFcXHUwMzhDXFx1MDM4RS1cXHUwM0ExXFx1MDNBMy1cXHUwM0Y1XFx1MDNGNy1cXHUwNDgxXFx1MDQ4QS1cXHUwNTJGXFx1MDUzMS1cXHUwNTU2XFx1MDU1OVxcdTA1NjEtXFx1MDU4N1xcdTA1RDAtXFx1MDVFQVxcdTA1RjAtXFx1MDVGMlxcdTA2MjAtXFx1MDY0QVxcdTA2NkVcXHUwNjZGXFx1MDY3MS1cXHUwNkQzXFx1MDZENVxcdTA2RTVcXHUwNkU2XFx1MDZFRVxcdTA2RUZcXHUwNkZBLVxcdTA2RkNcXHUwNkZGXFx1MDcxMFxcdTA3MTItXFx1MDcyRlxcdTA3NEQtXFx1MDdBNVxcdTA3QjFcXHUwN0NBLVxcdTA3RUFcXHUwN0Y0XFx1MDdGNVxcdTA3RkFcXHUwODAwLVxcdTA4MTVcXHUwODFBXFx1MDgyNFxcdTA4MjhcXHUwODQwLVxcdTA4NThcXHUwOEEwLVxcdTA4QjRcXHUwOEI2LVxcdTA4QkRcXHUwOTA0LVxcdTA5MzlcXHUwOTNEXFx1MDk1MFxcdTA5NTgtXFx1MDk2MVxcdTA5NzEtXFx1MDk4MFxcdTA5ODUtXFx1MDk4Q1xcdTA5OEZcXHUwOTkwXFx1MDk5My1cXHUwOUE4XFx1MDlBQS1cXHUwOUIwXFx1MDlCMlxcdTA5QjYtXFx1MDlCOVxcdTA5QkRcXHUwOUNFXFx1MDlEQ1xcdTA5RERcXHUwOURGLVxcdTA5RTFcXHUwOUYwXFx1MDlGMVxcdTBBMDUtXFx1MEEwQVxcdTBBMEZcXHUwQTEwXFx1MEExMy1cXHUwQTI4XFx1MEEyQS1cXHUwQTMwXFx1MEEzMlxcdTBBMzNcXHUwQTM1XFx1MEEzNlxcdTBBMzhcXHUwQTM5XFx1MEE1OS1cXHUwQTVDXFx1MEE1RVxcdTBBNzItXFx1MEE3NFxcdTBBODUtXFx1MEE4RFxcdTBBOEYtXFx1MEE5MVxcdTBBOTMtXFx1MEFBOFxcdTBBQUEtXFx1MEFCMFxcdTBBQjJcXHUwQUIzXFx1MEFCNS1cXHUwQUI5XFx1MEFCRFxcdTBBRDBcXHUwQUUwXFx1MEFFMVxcdTBBRjlcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzRFxcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYxXFx1MEI3MVxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4LVxcdTBDNUFcXHUwQzYwXFx1MEM2MVxcdTBDODBcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JEXFx1MENERVxcdTBDRTBcXHUwQ0UxXFx1MENGMVxcdTBDRjJcXHUwRDA1LVxcdTBEMENcXHUwRDBFLVxcdTBEMTBcXHUwRDEyLVxcdTBEM0FcXHUwRDNEXFx1MEQ0RVxcdTBENTQtXFx1MEQ1NlxcdTBENUYtXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NlxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVDNlxcdTBFREMtXFx1MEVERlxcdTBGMDBcXHUwRjQwLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjg4LVxcdTBGOENcXHUxMDAwLVxcdTEwMkFcXHUxMDNGXFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTUwLVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDN0RcXHUxQzgwLVxcdTFDODhcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTFEMDAtXFx1MURCRlxcdTFFMDAtXFx1MUYxNVxcdTFGMTgtXFx1MUYxRFxcdTFGMjAtXFx1MUY0NVxcdTFGNDgtXFx1MUY0RFxcdTFGNTAtXFx1MUY1N1xcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUYtXFx1MUY3RFxcdTFGODAtXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUwLVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMDJcXHUyMTA3XFx1MjEwQS1cXHUyMTEzXFx1MjExNVxcdTIxMTgtXFx1MjExRFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMkEtXFx1MjEzOVxcdTIxM0MtXFx1MjEzRlxcdTIxNDUtXFx1MjE0OVxcdTIxNEVcXHUyMTYwLVxcdTIxODhcXHUyQzAwLVxcdTJDMkVcXHUyQzMwLVxcdTJDNUVcXHUyQzYwLVxcdTJDRTRcXHUyQ0VCLVxcdTJDRUVcXHUyQ0YyXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyOVxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUItXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYxRlxcdUE2MkFcXHVBNjJCXFx1QTY0MC1cXHVBNjZFXFx1QTY3Ri1cXHVBNjlEXFx1QTZBMC1cXHVBNkVGXFx1QTcxNy1cXHVBNzFGXFx1QTcyMi1cXHVBNzg4XFx1QTc4Qi1cXHVBN0FFXFx1QTdCMC1cXHVBN0I3XFx1QTdGNy1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE4RkRcXHVBOTBBLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGXFx1QTlFMC1cXHVBOUU0XFx1QTlFNi1cXHVBOUVGXFx1QTlGQS1cXHVBOUZFXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTc2XFx1QUE3QVxcdUFBN0UtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVBXFx1QUFGMi1cXHVBQUY0XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYyMS1cXHVGRjNBXFx1RkY0MS1cXHVGRjVBXFx1RkY2Ni1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXXxcXHVEODAwW1xcdURDMDAtXFx1REMwQlxcdURDMEQtXFx1REMyNlxcdURDMjgtXFx1REMzQVxcdURDM0NcXHVEQzNEXFx1REMzRi1cXHVEQzREXFx1REM1MC1cXHVEQzVEXFx1REM4MC1cXHVEQ0ZBXFx1REQ0MC1cXHVERDc0XFx1REU4MC1cXHVERTlDXFx1REVBMC1cXHVERUQwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjc1XFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdURDQjAtXFx1RENEM1xcdURDRDgtXFx1RENGQlxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDBcXHVERTEwLVxcdURFMTNcXHVERTE1LVxcdURFMTdcXHVERTE5LVxcdURFMzNcXHVERTYwLVxcdURFN0NcXHVERTgwLVxcdURFOUNcXHVERUMwLVxcdURFQzdcXHVERUM5LVxcdURFRTRcXHVERjAwLVxcdURGMzVcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNzJcXHVERjgwLVxcdURGOTFdfFxcdUQ4MDNbXFx1REMwMC1cXHVEQzQ4XFx1REM4MC1cXHVEQ0IyXFx1RENDMC1cXHVEQ0YyXXxcXHVEODA0W1xcdURDMDMtXFx1REMzN1xcdURDODMtXFx1RENBRlxcdURDRDAtXFx1RENFOFxcdUREMDMtXFx1REQyNlxcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVERERBXFx1REREQ1xcdURFMDAtXFx1REUxMVxcdURFMTMtXFx1REUyQlxcdURFODAtXFx1REU4NlxcdURFODhcXHVERThBLVxcdURFOERcXHVERThGLVxcdURFOURcXHVERTlGLVxcdURFQThcXHVERUIwLVxcdURFREVcXHVERjA1LVxcdURGMENcXHVERjBGXFx1REYxMFxcdURGMTMtXFx1REYyOFxcdURGMkEtXFx1REYzMFxcdURGMzJcXHVERjMzXFx1REYzNS1cXHVERjM5XFx1REYzRFxcdURGNTBcXHVERjVELVxcdURGNjFdfFxcdUQ4MDVbXFx1REMwMC1cXHVEQzM0XFx1REM0Ny1cXHVEQzRBXFx1REM4MC1cXHVEQ0FGXFx1RENDNFxcdURDQzVcXHVEQ0M3XFx1REQ4MC1cXHVEREFFXFx1REREOC1cXHVERERCXFx1REUwMC1cXHVERTJGXFx1REU0NFxcdURFODAtXFx1REVBQVxcdURGMDAtXFx1REYxOV18XFx1RDgwNltcXHVEQ0EwLVxcdURDREZcXHVEQ0ZGXFx1REVDMC1cXHVERUY4XXxcXHVEODA3W1xcdURDMDAtXFx1REMwOFxcdURDMEEtXFx1REMyRVxcdURDNDBcXHVEQzcyLVxcdURDOEZdfFxcdUQ4MDhbXFx1REMwMC1cXHVERjk5XXxcXHVEODA5W1xcdURDMDAtXFx1REM2RVxcdURDODAtXFx1REQ0M118W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODQwLVxcdUQ4NjhcXHVEODZBLVxcdUQ4NkNcXHVEODZGLVxcdUQ4NzJdW1xcdURDMDAtXFx1REZGRl18XFx1RDgwRFtcXHVEQzAwLVxcdURDMkVdfFxcdUQ4MTFbXFx1REMwMC1cXHVERTQ2XXxcXHVEODFBW1xcdURDMDAtXFx1REUzOFxcdURFNDAtXFx1REU1RVxcdURFRDAtXFx1REVFRFxcdURGMDAtXFx1REYyRlxcdURGNDAtXFx1REY0M1xcdURGNjMtXFx1REY3N1xcdURGN0QtXFx1REY4Rl18XFx1RDgxQltcXHVERjAwLVxcdURGNDRcXHVERjUwXFx1REY5My1cXHVERjlGXFx1REZFMF18XFx1RDgyMVtcXHVEQzAwLVxcdURGRUNdfFxcdUQ4MjJbXFx1REMwMC1cXHVERUYyXXxcXHVEODJDW1xcdURDMDBcXHVEQzAxXXxcXHVEODJGW1xcdURDMDAtXFx1REM2QVxcdURDNzAtXFx1REM3Q1xcdURDODAtXFx1REM4OFxcdURDOTAtXFx1REM5OV18XFx1RDgzNVtcXHVEQzAwLVxcdURDNTRcXHVEQzU2LVxcdURDOUNcXHVEQzlFXFx1REM5RlxcdURDQTJcXHVEQ0E1XFx1RENBNlxcdURDQTktXFx1RENBQ1xcdURDQUUtXFx1RENCOVxcdURDQkJcXHVEQ0JELVxcdURDQzNcXHVEQ0M1LVxcdUREMDVcXHVERDA3LVxcdUREMEFcXHVERDBELVxcdUREMTRcXHVERDE2LVxcdUREMUNcXHVERDFFLVxcdUREMzlcXHVERDNCLVxcdUREM0VcXHVERDQwLVxcdURENDRcXHVERDQ2XFx1REQ0QS1cXHVERDUwXFx1REQ1Mi1cXHVERUE1XFx1REVBOC1cXHVERUMwXFx1REVDMi1cXHVERURBXFx1REVEQy1cXHVERUZBXFx1REVGQy1cXHVERjE0XFx1REYxNi1cXHVERjM0XFx1REYzNi1cXHVERjRFXFx1REY1MC1cXHVERjZFXFx1REY3MC1cXHVERjg4XFx1REY4QS1cXHVERkE4XFx1REZBQS1cXHVERkMyXFx1REZDNC1cXHVERkNCXXxcXHVEODNBW1xcdURDMDAtXFx1RENDNFxcdUREMDAtXFx1REQ0M118XFx1RDgzQltcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODY5W1xcdURDMDAtXFx1REVENlxcdURGMDAtXFx1REZGRl18XFx1RDg2RFtcXHVEQzAwLVxcdURGMzRcXHVERjQwLVxcdURGRkZdfFxcdUQ4NkVbXFx1REMwMC1cXHVEQzFEXFx1REMyMC1cXHVERkZGXXxcXHVEODczW1xcdURDMDAtXFx1REVBMV18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdKSg/OltcXCQwLTlBLVpfYS16XFx4QUFcXHhCNVxceEI3XFx4QkFcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDJDMVxcdTAyQzYtXFx1MDJEMVxcdTAyRTAtXFx1MDJFNFxcdTAyRUNcXHUwMkVFXFx1MDMwMC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdBLVxcdTAzN0RcXHUwMzdGXFx1MDM4Ni1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0ODMtXFx1MDQ4N1xcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNTkxLVxcdTA1QkRcXHUwNUJGXFx1MDVDMVxcdTA1QzJcXHUwNUM0XFx1MDVDNVxcdTA1QzdcXHUwNUQwLVxcdTA1RUFcXHUwNUYwLVxcdTA1RjJcXHUwNjEwLVxcdTA2MUFcXHUwNjIwLVxcdTA2NjlcXHUwNjZFLVxcdTA2RDNcXHUwNkQ1LVxcdTA2RENcXHUwNkRGLVxcdTA2RThcXHUwNkVBLVxcdTA2RkNcXHUwNkZGXFx1MDcxMC1cXHUwNzRBXFx1MDc0RC1cXHUwN0IxXFx1MDdDMC1cXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgyRFxcdTA4NDAtXFx1MDg1QlxcdTA4QTAtXFx1MDhCNFxcdTA4QjYtXFx1MDhCRFxcdTA4RDQtXFx1MDhFMVxcdTA4RTMtXFx1MDk2M1xcdTA5NjYtXFx1MDk2RlxcdTA5NzEtXFx1MDk4M1xcdTA5ODUtXFx1MDk4Q1xcdTA5OEZcXHUwOTkwXFx1MDk5My1cXHUwOUE4XFx1MDlBQS1cXHUwOUIwXFx1MDlCMlxcdTA5QjYtXFx1MDlCOVxcdTA5QkMtXFx1MDlDNFxcdTA5QzdcXHUwOUM4XFx1MDlDQi1cXHUwOUNFXFx1MDlEN1xcdTA5RENcXHUwOUREXFx1MDlERi1cXHUwOUUzXFx1MDlFNi1cXHUwOUYxXFx1MEEwMS1cXHUwQTAzXFx1MEEwNS1cXHUwQTBBXFx1MEEwRlxcdTBBMTBcXHUwQTEzLVxcdTBBMjhcXHUwQTJBLVxcdTBBMzBcXHUwQTMyXFx1MEEzM1xcdTBBMzVcXHUwQTM2XFx1MEEzOFxcdTBBMzlcXHUwQTNDXFx1MEEzRS1cXHUwQTQyXFx1MEE0N1xcdTBBNDhcXHUwQTRCLVxcdTBBNERcXHUwQTUxXFx1MEE1OS1cXHUwQTVDXFx1MEE1RVxcdTBBNjYtXFx1MEE3NVxcdTBBODEtXFx1MEE4M1xcdTBBODUtXFx1MEE4RFxcdTBBOEYtXFx1MEE5MVxcdTBBOTMtXFx1MEFBOFxcdTBBQUEtXFx1MEFCMFxcdTBBQjJcXHUwQUIzXFx1MEFCNS1cXHUwQUI5XFx1MEFCQy1cXHUwQUM1XFx1MEFDNy1cXHUwQUM5XFx1MEFDQi1cXHUwQUNEXFx1MEFEMFxcdTBBRTAtXFx1MEFFM1xcdTBBRTYtXFx1MEFFRlxcdTBBRjlcXHUwQjAxLVxcdTBCMDNcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzQy1cXHUwQjQ0XFx1MEI0N1xcdTBCNDhcXHUwQjRCLVxcdTBCNERcXHUwQjU2XFx1MEI1N1xcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYzXFx1MEI2Ni1cXHUwQjZGXFx1MEI3MVxcdTBCODJcXHUwQjgzXFx1MEI4NS1cXHUwQjhBXFx1MEI4RS1cXHUwQjkwXFx1MEI5Mi1cXHUwQjk1XFx1MEI5OVxcdTBCOUFcXHUwQjlDXFx1MEI5RVxcdTBCOUZcXHUwQkEzXFx1MEJBNFxcdTBCQTgtXFx1MEJBQVxcdTBCQUUtXFx1MEJCOVxcdTBCQkUtXFx1MEJDMlxcdTBCQzYtXFx1MEJDOFxcdTBCQ0EtXFx1MEJDRFxcdTBCRDBcXHUwQkQ3XFx1MEJFNi1cXHUwQkVGXFx1MEMwMC1cXHUwQzAzXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzM5XFx1MEMzRC1cXHUwQzQ0XFx1MEM0Ni1cXHUwQzQ4XFx1MEM0QS1cXHUwQzREXFx1MEM1NVxcdTBDNTZcXHUwQzU4LVxcdTBDNUFcXHUwQzYwLVxcdTBDNjNcXHUwQzY2LVxcdTBDNkZcXHUwQzgwLVxcdTBDODNcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JDLVxcdTBDQzRcXHUwQ0M2LVxcdTBDQzhcXHUwQ0NBLVxcdTBDQ0RcXHUwQ0Q1XFx1MENENlxcdTBDREVcXHUwQ0UwLVxcdTBDRTNcXHUwQ0U2LVxcdTBDRUZcXHUwQ0YxXFx1MENGMlxcdTBEMDEtXFx1MEQwM1xcdTBEMDUtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0QtXFx1MEQ0NFxcdTBENDYtXFx1MEQ0OFxcdTBENEEtXFx1MEQ0RVxcdTBENTQtXFx1MEQ1N1xcdTBENUYtXFx1MEQ2M1xcdTBENjYtXFx1MEQ2RlxcdTBEN0EtXFx1MEQ3RlxcdTBEODJcXHUwRDgzXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBEQ0FcXHUwRENGLVxcdTBERDRcXHUwREQ2XFx1MEREOC1cXHUwRERGXFx1MERFNi1cXHUwREVGXFx1MERGMlxcdTBERjNcXHUwRTAxLVxcdTBFM0FcXHUwRTQwLVxcdTBFNEVcXHUwRTUwLVxcdTBFNTlcXHUwRTgxXFx1MEU4MlxcdTBFODRcXHUwRTg3XFx1MEU4OFxcdTBFOEFcXHUwRThEXFx1MEU5NC1cXHUwRTk3XFx1MEU5OS1cXHUwRTlGXFx1MEVBMS1cXHUwRUEzXFx1MEVBNVxcdTBFQTdcXHUwRUFBXFx1MEVBQlxcdTBFQUQtXFx1MEVCOVxcdTBFQkItXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUM4LVxcdTBFQ0RcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYxOFxcdTBGMTlcXHUwRjIwLVxcdTBGMjlcXHUwRjM1XFx1MEYzN1xcdTBGMzlcXHUwRjNFLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjcxLVxcdTBGODRcXHUwRjg2LVxcdTBGOTdcXHUwRjk5LVxcdTBGQkNcXHUwRkM2XFx1MTAwMC1cXHUxMDQ5XFx1MTA1MC1cXHUxMDlEXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzNUQtXFx1MTM1RlxcdTEzNjktXFx1MTM3MVxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNVxcdTEzRjgtXFx1MTNGRFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RUUtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxNFxcdTE3MjAtXFx1MTczNFxcdTE3NDAtXFx1MTc1M1xcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3NzJcXHUxNzczXFx1MTc4MC1cXHUxN0QzXFx1MTdEN1xcdTE3RENcXHUxN0REXFx1MTdFMC1cXHUxN0U5XFx1MTgwQi1cXHUxODBEXFx1MTgxMC1cXHUxODE5XFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTkyMC1cXHUxOTJCXFx1MTkzMC1cXHUxOTNCXFx1MTk0Ni1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MTlEMC1cXHUxOURBXFx1MUEwMC1cXHUxQTFCXFx1MUEyMC1cXHUxQTVFXFx1MUE2MC1cXHUxQTdDXFx1MUE3Ri1cXHUxQTg5XFx1MUE5MC1cXHUxQTk5XFx1MUFBN1xcdTFBQjAtXFx1MUFCRFxcdTFCMDAtXFx1MUI0QlxcdTFCNTAtXFx1MUI1OVxcdTFCNkItXFx1MUI3M1xcdTFCODAtXFx1MUJGM1xcdTFDMDAtXFx1MUMzN1xcdTFDNDAtXFx1MUM0OVxcdTFDNEQtXFx1MUM3RFxcdTFDODAtXFx1MUM4OFxcdTFDRDAtXFx1MUNEMlxcdTFDRDQtXFx1MUNGNlxcdTFDRjhcXHUxQ0Y5XFx1MUQwMC1cXHUxREY1XFx1MURGQi1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwMENcXHUyMDBEXFx1MjAzRlxcdTIwNDBcXHUyMDU0XFx1MjA3MVxcdTIwN0ZcXHUyMDkwLVxcdTIwOUNcXHUyMEQwLVxcdTIwRENcXHUyMEUxXFx1MjBFNS1cXHUyMEYwXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOC1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNjAtXFx1MjE4OFxcdTJDMDAtXFx1MkMyRVxcdTJDMzAtXFx1MkM1RVxcdTJDNjAtXFx1MkNFNFxcdTJDRUItXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEN0YtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJERTAtXFx1MkRGRlxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyRlxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOTktXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYyQlxcdUE2NDAtXFx1QTY2RlxcdUE2NzQtXFx1QTY3RFxcdUE2N0YtXFx1QTZGMVxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTdBRVxcdUE3QjAtXFx1QTdCN1xcdUE3RjctXFx1QTgyN1xcdUE4NDAtXFx1QTg3M1xcdUE4ODAtXFx1QThDNVxcdUE4RDAtXFx1QThEOVxcdUE4RTAtXFx1QThGN1xcdUE4RkJcXHVBOEZEXFx1QTkwMC1cXHVBOTJEXFx1QTkzMC1cXHVBOTUzXFx1QTk2MC1cXHVBOTdDXFx1QTk4MC1cXHVBOUMwXFx1QTlDRi1cXHVBOUQ5XFx1QTlFMC1cXHVBOUZFXFx1QUEwMC1cXHVBQTM2XFx1QUE0MC1cXHVBQTREXFx1QUE1MC1cXHVBQTU5XFx1QUE2MC1cXHVBQTc2XFx1QUE3QS1cXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVGXFx1QUFGMi1cXHVBQUY2XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkVBXFx1QUJFQ1xcdUFCRURcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFELVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFMDAtXFx1RkUwRlxcdUZFMjAtXFx1RkUyRlxcdUZFMzNcXHVGRTM0XFx1RkU0RC1cXHVGRTRGXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYxMC1cXHVGRjE5XFx1RkYyMS1cXHVGRjNBXFx1RkYzRlxcdUZGNDEtXFx1RkY1QVxcdUZGNjYtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ118XFx1RDgwMFtcXHVEQzAwLVxcdURDMEJcXHVEQzBELVxcdURDMjZcXHVEQzI4LVxcdURDM0FcXHVEQzNDXFx1REMzRFxcdURDM0YtXFx1REM0RFxcdURDNTAtXFx1REM1RFxcdURDODAtXFx1RENGQVxcdURENDAtXFx1REQ3NFxcdURERkRcXHVERTgwLVxcdURFOUNcXHVERUEwLVxcdURFRDBcXHVERUUwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjdBXFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdURDQTAtXFx1RENBOVxcdURDQjAtXFx1RENEM1xcdURDRDgtXFx1RENGQlxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDAtXFx1REUwM1xcdURFMDVcXHVERTA2XFx1REUwQy1cXHVERTEzXFx1REUxNS1cXHVERTE3XFx1REUxOS1cXHVERTMzXFx1REUzOC1cXHVERTNBXFx1REUzRlxcdURFNjAtXFx1REU3Q1xcdURFODAtXFx1REU5Q1xcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY3MlxcdURGODAtXFx1REY5MV18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJdfFxcdUQ4MDRbXFx1REMwMC1cXHVEQzQ2XFx1REM2Ni1cXHVEQzZGXFx1REM3Ri1cXHVEQ0JBXFx1RENEMC1cXHVEQ0U4XFx1RENGMC1cXHVEQ0Y5XFx1REQwMC1cXHVERDM0XFx1REQzNi1cXHVERDNGXFx1REQ1MC1cXHVERDczXFx1REQ3NlxcdUREODAtXFx1RERDNFxcdUREQ0EtXFx1RERDQ1xcdURERDAtXFx1REREQVxcdURERENcXHVERTAwLVxcdURFMTFcXHVERTEzLVxcdURFMzdcXHVERTNFXFx1REU4MC1cXHVERTg2XFx1REU4OFxcdURFOEEtXFx1REU4RFxcdURFOEYtXFx1REU5RFxcdURFOUYtXFx1REVBOFxcdURFQjAtXFx1REVFQVxcdURFRjAtXFx1REVGOVxcdURGMDAtXFx1REYwM1xcdURGMDUtXFx1REYwQ1xcdURGMEZcXHVERjEwXFx1REYxMy1cXHVERjI4XFx1REYyQS1cXHVERjMwXFx1REYzMlxcdURGMzNcXHVERjM1LVxcdURGMzlcXHVERjNDLVxcdURGNDRcXHVERjQ3XFx1REY0OFxcdURGNEItXFx1REY0RFxcdURGNTBcXHVERjU3XFx1REY1RC1cXHVERjYzXFx1REY2Ni1cXHVERjZDXFx1REY3MC1cXHVERjc0XXxcXHVEODA1W1xcdURDMDAtXFx1REM0QVxcdURDNTAtXFx1REM1OVxcdURDODAtXFx1RENDNVxcdURDQzdcXHVEQ0QwLVxcdURDRDlcXHVERDgwLVxcdUREQjVcXHVEREI4LVxcdUREQzBcXHVEREQ4LVxcdURERERcXHVERTAwLVxcdURFNDBcXHVERTQ0XFx1REU1MC1cXHVERTU5XFx1REU4MC1cXHVERUI3XFx1REVDMC1cXHVERUM5XFx1REYwMC1cXHVERjE5XFx1REYxRC1cXHVERjJCXFx1REYzMC1cXHVERjM5XXxcXHVEODA2W1xcdURDQTAtXFx1RENFOVxcdURDRkZcXHVERUMwLVxcdURFRjhdfFxcdUQ4MDdbXFx1REMwMC1cXHVEQzA4XFx1REMwQS1cXHVEQzM2XFx1REMzOC1cXHVEQzQwXFx1REM1MC1cXHVEQzU5XFx1REM3Mi1cXHVEQzhGXFx1REM5Mi1cXHVEQ0E3XFx1RENBOS1cXHVEQ0I2XXxcXHVEODA4W1xcdURDMDAtXFx1REY5OV18XFx1RDgwOVtcXHVEQzAwLVxcdURDNkVcXHVEQzgwLVxcdURENDNdfFtcXHVEODBDXFx1RDgxQy1cXHVEODIwXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERTYwLVxcdURFNjlcXHVERUQwLVxcdURFRURcXHVERUYwLVxcdURFRjRcXHVERjAwLVxcdURGMzZcXHVERjQwLVxcdURGNDNcXHVERjUwLVxcdURGNTlcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REYwMC1cXHVERjQ0XFx1REY1MC1cXHVERjdFXFx1REY4Ri1cXHVERjlGXFx1REZFMF18XFx1RDgyMVtcXHVEQzAwLVxcdURGRUNdfFxcdUQ4MjJbXFx1REMwMC1cXHVERUYyXXxcXHVEODJDW1xcdURDMDBcXHVEQzAxXXxcXHVEODJGW1xcdURDMDAtXFx1REM2QVxcdURDNzAtXFx1REM3Q1xcdURDODAtXFx1REM4OFxcdURDOTAtXFx1REM5OVxcdURDOURcXHVEQzlFXXxcXHVEODM0W1xcdURENjUtXFx1REQ2OVxcdURENkQtXFx1REQ3MlxcdUREN0ItXFx1REQ4MlxcdUREODUtXFx1REQ4QlxcdUREQUEtXFx1RERBRFxcdURFNDItXFx1REU0NF18XFx1RDgzNVtcXHVEQzAwLVxcdURDNTRcXHVEQzU2LVxcdURDOUNcXHVEQzlFXFx1REM5RlxcdURDQTJcXHVEQ0E1XFx1RENBNlxcdURDQTktXFx1RENBQ1xcdURDQUUtXFx1RENCOVxcdURDQkJcXHVEQ0JELVxcdURDQzNcXHVEQ0M1LVxcdUREMDVcXHVERDA3LVxcdUREMEFcXHVERDBELVxcdUREMTRcXHVERDE2LVxcdUREMUNcXHVERDFFLVxcdUREMzlcXHVERDNCLVxcdUREM0VcXHVERDQwLVxcdURENDRcXHVERDQ2XFx1REQ0QS1cXHVERDUwXFx1REQ1Mi1cXHVERUE1XFx1REVBOC1cXHVERUMwXFx1REVDMi1cXHVERURBXFx1REVEQy1cXHVERUZBXFx1REVGQy1cXHVERjE0XFx1REYxNi1cXHVERjM0XFx1REYzNi1cXHVERjRFXFx1REY1MC1cXHVERjZFXFx1REY3MC1cXHVERjg4XFx1REY4QS1cXHVERkE4XFx1REZBQS1cXHVERkMyXFx1REZDNC1cXHVERkNCXFx1REZDRS1cXHVERkZGXXxcXHVEODM2W1xcdURFMDAtXFx1REUzNlxcdURFM0ItXFx1REU2Q1xcdURFNzVcXHVERTg0XFx1REU5Qi1cXHVERTlGXFx1REVBMS1cXHVERUFGXXxcXHVEODM4W1xcdURDMDAtXFx1REMwNlxcdURDMDgtXFx1REMxOFxcdURDMUItXFx1REMyMVxcdURDMjNcXHVEQzI0XFx1REMyNi1cXHVEQzJBXXxcXHVEODNBW1xcdURDMDAtXFx1RENDNFxcdURDRDAtXFx1RENENlxcdUREMDAtXFx1REQ0QVxcdURENTAtXFx1REQ1OV18XFx1RDgzQltcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODY5W1xcdURDMDAtXFx1REVENlxcdURGMDAtXFx1REZGRl18XFx1RDg2RFtcXHVEQzAwLVxcdURGMzRcXHVERjQwLVxcdURGRkZdfFxcdUQ4NkVbXFx1REMwMC1cXHVEQzFEXFx1REMyMC1cXHVERkZGXXxcXHVEODczW1xcdURDMDAtXFx1REVBMV18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdfFxcdURCNDBbXFx1REQwMC1cXHVEREVGXSkqJC9cblxuICAgICAgICAvLyB2YWxpZGF0ZSBrZXlcbiAgICAgICAgbGV0IGtleU5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSggJ2tleScgKVswXVxuICAgICAgICBpZiAhdmFyaWFibGVWYWxpZGF0b3IudGVzdCBAIHRoaXMuc3RhdGUuZ29hbEtleSA6OlxuICAgICAgICAgICAgcGFzc2VzVmFsaWRhdGlvbiA9IGZhbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyBAICdrZXkgbm90IHZhbGlkJ1xuICAgICAgICAgICAgaWYgIWtleU5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zIEAgJ2ludmFsaWQnIDo6IGtleU5vZGUuY2xhc3NMaXN0LmFkZCBAICdpbnZhbGlkJ1xuICAgICAgICBlbHNlIDo6XG4gICAgICAgICAgICBpZiBrZXlOb2RlLmNsYXNzTGlzdC5jb250YWlucyBAICdpbnZhbGlkJyA6OiBrZXlOb2RlLmNsYXNzTGlzdC5yZW1vdmUgQCAnaW52YWxpZCdcblxuICAgICAgICAvLyB2YWxpZGF0ZSBwcmlvcml0eVxuICAgICAgICBsZXQgcHJpb3JpdHlOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoICdwcmlvcml0eScgKVswXVxuICAgICAgICBpZiBpc05hTiggdGhpcy5zdGF0ZS5nb2FsUHJpb3JpdHkgKSB8fCB0aGlzLnN0YXRlLmdvYWxQcmlvcml0eSA8IDAgOjpcbiAgICAgICAgICAgIHBhc3Nlc1ZhbGlkYXRpb24gPSBmYWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2cgQCAncHJpb3JpdHkgaXMgbm90IHZhbGlkJ1xuICAgICAgICAgICAgaWYgIXByaW9yaXR5Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMgQCAnaW52YWxpZCcgOjogcHJpb3JpdHlOb2RlLmNsYXNzTGlzdC5hZGQgQCAnaW52YWxpZCdcbiAgICAgICAgZWxzZSA6OlxuICAgICAgICAgICAgaWYgcHJpb3JpdHlOb2RlLmNsYXNzTGlzdC5jb250YWlucyBAICdpbnZhbGlkJyA6OiBwcmlvcml0eU5vZGUuY2xhc3NMaXN0LnJlbW92ZSBAICdpbnZhbGlkJ1xuXG4gICAgICAgIC8vIHZhbGlkYXRlIGNvbmRpdGlvbnNcbiAgICAgICAgbGV0IG5ld0NvbmRpdGlvbnMgPSB7fVxuICAgICAgICBsZXQgY29uZGl0aW9uTm9kZXMgPSBBcnJheS5mcm9tIEAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggJ2dvYWxFZGl0b3JGb3JtJyApWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnaW5wdXQnIClcblxuICAgICAgICBmb3IgbGV0IGkgPSAwOyBpIDw9IHRoaXMuc3RhdGUuYzsgaSsrIDo6XG4gICAgICAgICAgICBsZXQgY0tleU5vZGUsIGNLZXksIGNWYWxcblxuICAgICAgICAgICAgY29uZGl0aW9uTm9kZXMuZm9yRWFjaCBAIG5vZGUgPT4gOjpcbiAgICAgICAgICAgICAgICBsZXQgbm9kZU5hbWUgPSBub2RlLmdldEF0dHJpYnV0ZSBAICduYW1lJ1xuXG4gICAgICAgICAgICAgICAgaWYgbm9kZU5hbWUgPT0gJ2NvbmRpdGlvbicgKyBpICsgJ3ZhbCcgOjogY1ZhbCA9IG5vZGUudmFsdWVcbiAgICAgICAgICAgICAgICBpZiBub2RlTmFtZSA9PSAnY29uZGl0aW9uJyArIGkgKyAna2V5JyA6OlxuICAgICAgICAgICAgICAgICAgICBjS2V5Tm9kZSA9IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgY0tleSA9IG5vZGUudmFsdWVcblxuICAgICAgICAgICAgaWYgIXZhcmlhYmxlVmFsaWRhdG9yLnRlc3QgQCBjS2V5IDo6XG4gICAgICAgICAgICAgICAgcGFzc2VzVmFsaWRhdGlvbiA9IGZhbHNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgQCAnY29uZGl0aW9uIGtleSBcIicgKyBjS2V5ICsgJ1wiIGlzIG5vdCB2YWxpZCdcbiAgICAgICAgICAgICAgICBpZiAhY0tleU5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zIEAgJ2ludmFsaWQnIDo6IGNLZXlOb2RlLmNsYXNzTGlzdC5hZGQgQCAnaW52YWxpZCdcbiAgICAgICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgICAgICBpZiBjS2V5Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMgQCAnaW52YWxpZCcgOjogY0tleU5vZGUuY2xhc3NMaXN0LnJlbW92ZSBAICdpbnZhbGlkJ1xuXG4gICAgICAgICAgICBpZiB0eXBlb2YgY0tleSAhPT0gJ3VuZGVmaW5lZCcgOjogbmV3Q29uZGl0aW9uc1tjS2V5XSA9IGNWYWxcblxuICAgICAgICBpZiBwYXNzZXNWYWxpZGF0aW9uIDo6XG4gICAgICAgICAgICB0aGlzLnByb3BzLmdvYWwua2V5ID0gdGhpcy5zdGF0ZS5nb2FsS2V5XG4gICAgICAgICAgICB0aGlzLnByb3BzLmdvYWwucHJpb3JpdHkgPSB0aGlzLnN0YXRlLmdvYWxQcmlvcml0eVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nb2FsLmNvbmRpdGlvbnMgPSBuZXdDb25kaXRpb25zXG4gICAgICAgICAgICB0aGlzLnByb3BzLmV4aXRNb2RhbCgpXG4gICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEAgJ3VwZGF0ZSBlcnJvcnMnXG5cbiAgICByZW1vdmVDb25kaXRpb24gPSAoIGtleSApID0+IDo6XG4gICAgICAgIHRoaXMuc3RhdGUuY29uZGl0aW9ucyA9IHRoaXMuc3RhdGUuY29uZGl0aW9ucy5maWx0ZXIgQCAoIGt2ICkgPT4ga3ZbMF0gIT0ga2V5XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKVxuXG4gICAgaW5kZXhPZjJEQXJyID0gKCBhcnIsIGNvbCwgdmFsICkgPT4gOjpcbiAgICAgICAgZm9yIGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyA6OlxuICAgICAgICAgICAgaWYgYXJyW2ldW2NvbF0gPT0gdmFsIDo6IHJldHVybiBpXG4gICAgICAgIHJldHVybiAtMVxuXG4gICAgY29uZGl0aW9uQ2hhbmdlZCA9ICggZSApID0+IDo6XG4gICAgICAgIGxldCBjb25kaXRpb25EYXRhTm9kZXMgPSBBcnJheS5mcm9tIEAgZS50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSBAICdpbnB1dCdcbiAgICAgICAgbGV0IG9sZEtleSwgY29uZGl0aW9uc0lkeFxuXG4gICAgICAgIGNvbmRpdGlvbkRhdGFOb2Rlcy5mb3JFYWNoIEAgKCBub2RlICkgPT4gOjpcbiAgICAgICAgICAgIGlmIG5vZGUuZ2V0QXR0cmlidXRlKCAnbmFtZScgKS5pbmRleE9mKCAna2V5JyApID49IDAgOjpcbiAgICAgICAgICAgICAgICBvbGRLZXkgPSBub2RlLmdldEF0dHJpYnV0ZSBAICdwcmV2VmFsJ1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvbnNJZHggPSB0aGlzLmluZGV4T2YyREFyciggdGhpcy5zdGF0ZS5jb25kaXRpb25zLCAwLCBvbGRLZXkgKVxuXG4gICAgICAgIGNvbmRpdGlvbkRhdGFOb2Rlcy5tYXAgQCAoIG5vZGUgKSA9PiA6OlxuICAgICAgICAgICAgaWYgbm9kZS5nZXRBdHRyaWJ1dGUoICduYW1lJyApLmluZGV4T2YoICd2YWwnICkgPj0gMCA6OiB0aGlzLnN0YXRlLmNvbmRpdGlvbnNbY29uZGl0aW9uc0lkeF1bMV0gPSBub2RlLnZhbHVlXG4gICAgICAgICAgICBpZiBub2RlLmdldEF0dHJpYnV0ZSggJ25hbWUnICkuaW5kZXhPZiggJ2tleScgKSA+PSAwIDo6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb25kaXRpb25zW2NvbmRpdGlvbnNJZHhdWzBdID0gbm9kZS52YWx1ZVxuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlIEAgJ3ByZXZWYWwnLCBub2RlLnZhbHVlXG5cbiAgICBhZGRCbGFua0NvbmRpdGlvbiA9ICggZSApID0+IDo6XG4gICAgICAgIHRoaXMuc3RhdGUuY29uZGl0aW9ucy5wdXNoIEAgWyAnbmV3Q29uZGl0aW9uJyArIHRoaXMuc3RhdGUubisrLCBudWxsIF1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgpXG5cbiAgICBrZXlDaGFuZ2VkID0gKCBlICkgPT4gOjpcbiAgICAgICAgdGhpcy5zdGF0ZS5nb2FsS2V5ID0gZS50YXJnZXQudmFsdWVcblxuICAgIHByaW9yaXR5Q2hhbmdlZCA9ICggZSApID0+IDo6XG4gICAgICAgIHRoaXMuc3RhdGUuZ29hbFByaW9yaXR5ID0gZS50YXJnZXQudmFsdWVcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIHRoaXMuc3RhdGUuYyA9IC0xXG4gICAgICAgIGxldCBjb25kaXRpb25zID0gdGhpcy5zdGF0ZS5jb25kaXRpb25zLm1hcCBAICgga3YgKSA9PiA6OlxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jICs9IDFcbiAgICAgICAgICAgIGxldCBrZXkgPSBrdlswXVxuICAgICAgICAgICAgbGV0IHZhbCA9IGt2WzFdXG4gICAgICAgICAgICBsZXQgY24gPSB0aGlzLnN0YXRlLmNcbiAgICAgICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRDb25kaXRpb25Sb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17IGUgPT4gdGhpcy5yZW1vdmVDb25kaXRpb24oIGtleSApIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17IGUgPT4gdGhpcy5jb25kaXRpb25DaGFuZ2VkKCBlICkgfSBuYW1lPXsgJ2NvbmRpdGlvbicgKyBjbiArICdrZXknIH0gcGxhY2Vob2xkZXI9XCJDb25kaXRpb24gS2V5XCIgdmFsdWU9eyBrZXkgfSBwcmV2VmFsPXsga2V5IH0+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgb25DaGFuZ2U9eyBlID0+IHRoaXMuY29uZGl0aW9uQ2hhbmdlZCggZSApIH0gbmFtZT17ICdjb25kaXRpb24nICsgY24gKyAndmFsJyB9IHBsYWNlaG9sZGVyPVwiQ29uZGl0aW9uIFZhbHVlXCIgdmFsdWU9eyB2YWwgfT48L2lucHV0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHJldHVybiBAXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1jbG9zZS1idG5cIiBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5leGl0TW9kYWwoKSB9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxociBzdHlsZT1cImNsZWFyOiBib3RoO1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtleTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwia2V5XCIgcGxhY2Vob2xkZXI9XCJLZXlcIiB2YWx1ZT17IHRoaXMuc3RhdGUuZ29hbEtleSB9IG9uQ2hhbmdlPXsgZSA9PiB0aGlzLmtleUNoYW5nZWQoIGUgKSB9ID48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW9yaXR5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIHN0ZXA9XCIxXCIgbmFtZT1cInByaW9yaXR5XCIgcGxhY2Vob2xkZXI9XCJQcmlvcml0eVwiIHZhbHVlPXsgdGhpcy5zdGF0ZS5nb2FsUHJpb3JpdHkgfSBvbkNoYW5nZT17IGUgPT4gdGhpcy5wcmlvcml0eUNoYW5nZWQoIGUgKSB9ID48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNvbmRpdGlvbnM6PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJnb2FsRWRpdG9yRm9ybVwiIG9uU3VibWl0PXsgZSA9PiB7IGUucHJldmVudERlZmF1bHQoKSwgdGhpcy5zYXZlKCkgfSB9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNvbmRpdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsgdGhpcy5hZGRCbGFua0NvbmRpdGlvbiB9PkFkZCBOZXcgQ29uZGl0aW9uPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMuZXhpdE1vZGFsKCkgfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17IGUgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggJ2dvYWxFZGl0b3JGb3JtJyApWzBdLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCgnc3VibWl0Jywge2J1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KSApIH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbmNsYXNzIEFjdGlvblZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6IHN1cGVyIEAgcHJvcHNcblxuICAgIHJlbmRlckJvb2woIGJvb2wgKSA6OiByZXR1cm4gYm9vbCA/ICd0cnVlJyA6ICdmYWxzZSdcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGxldCBjb25kaXRpb25zID0gT2JqZWN0LmtleXMoIHRoaXMucHJvcHMuYWN0aW9uLmNvbmRpdGlvbnMgKS5tYXAgQCBrZXkgPT4gPGxpPjxzdHJvbmc+eyBrZXkgfTwvc3Ryb25nPjogeyB0aGlzLnJlbmRlckJvb2woIHRoaXMucHJvcHMuYWN0aW9uLmNvbmRpdGlvbnNba2V5XSApIH08L2xpPlxuICAgICAgICBsZXQgZWZmZWN0cyA9IE9iamVjdC5rZXlzKCB0aGlzLnByb3BzLmFjdGlvbi5lZmZlY3RzICkubWFwIEAga2V5ID0+IDxsaT48c3Ryb25nPnsga2V5IH08L3N0cm9uZz46IHsgdGhpcy5yZW5kZXJCb29sKCB0aGlzLnByb3BzLmFjdGlvbi5lZmZlY3RzW2tleV0gKSB9PC9saT5cblxuICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyBlID0+IHRoaXMucHJvcHMucmVtb3ZlQWN0aW9uKCkgfT5YPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyaW5nXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHA+S2V5OiA8c3Ryb25nPnsgdGhpcy5wcm9wcy5hY3Rpb24ua2V5IH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIENvbmRpdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIDx1bD57IGNvbmRpdGlvbnMgfTwvdWw+XG4gICAgICAgICAgICAgICAgICAgIEVmZmVjdHM6XG4gICAgICAgICAgICAgICAgICAgIDx1bD57IGVmZmVjdHMgfTwvdWw+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbmNsYXNzIFBsYW5DcnVtYlZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6IHN1cGVyIEAgcHJvcHNcblxuICAgIHJlbmRlcigpIDo6IHJldHVybiBAIDxsaSBjbGFzcz1cInBsYW5jcnVtYlwiPnsgdGhpcy5wcm9wcy5jcnVtYiB9PC9saT5cblxuY2xhc3MgUGxhblZpZXcgZXh0ZW5kcyBJbmZlcm5vLkNvbXBvbmVudCA6OlxuICAgIGNvbnN0cnVjdG9yKCBwcm9wcyApIDo6IHN1cGVyIEAgcHJvcHNcblxuICAgIHJlbmRlcigpIDo6XG4gICAgICAgIGlmIHRoaXMucGxhbiAmJiB0aGlzLnByb3BzLnBsYW4uY3J1bWJzLmxlbmd0aCA6OlxuICAgICAgICAgICAgbGV0IGNydW1icyA9IHRoaXMucHJvcHMucGxhbi5jcnVtYnMubWFwIEAgY3J1bWIgPT4gPFBsYW5DcnVtYlZpZXcgY3J1bWI9eyBjcnVtYi5rZXkgfSAvPlxuXG4gICAgICAgICAgICByZXR1cm4gQFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPlplZSBwbGFuIHRvIDxzdHJvbmc+eyB0aGlzLnByb3BzLnBsYW4uZ29hbC5rZXkgfTwvc3Ryb25nPjo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxvbD57IGNydW1icyB9PC9vbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgZWxzZSA6OlxuICAgICAgICAgICAgcmV0dXJuIEAgPHA+Tm8gcmVzdWx0LjwvcD5cblxuY2xhc3MgQXBwIGV4dGVuZHMgSW5mZXJuby5Db21wb25lbnQgOjpcbiAgICBjb25zdHJ1Y3RvciggcHJvcHMgKSA6OlxuICAgICAgICBzdXBlciBAIHByb3BzXG5cbiAgICAgICAgbGV0IGFnZW50ID0gbmV3IFBsYW5uZXIuQWdlbnQoKVxuXG4gICAgICAgIGFnZW50LmdvYWxzLnB1c2ggQCBnb2FsLmNsb25lKClcbiAgICAgICAgYWN0aW9ucy5mb3JFYWNoIEAgYWN0aW9uID0+IGFnZW50LmFkZEFjdGlvbiBAIGFjdGlvbi5jbG9uZSgpXG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IDo6XG4gICAgICAgICAgICBhZ2VudDogYWdlbnRcbiAgICAgICAgICAgICwgcGxhbjogYWdlbnQuZ2V0UGxhbigpXG5cbiAgICByZW1vdmVHb2FsKCBhR29hbCApIDo6XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlbnQuZ29hbHMucmVtb3ZlIEAgYUdvYWxcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSBAIHsgcGxhbjogdGhpcy5zdGF0ZS5hZ2VudC5nZXRQbGFuKCkgfVxuXG4gICAgcmVtb3ZlQWN0aW9uKCBhbkFjdGlvbiApIDo6XG4gICAgICAgIHRoaXMuc3RhdGUuYWdlbnQucmVtb3ZlQWN0aW9uIEAgYW5BY3Rpb25cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSBAIHsgcGxhbjogdGhpcy5zdGF0ZS5hZ2VudC5nZXRQbGFuKCkgfVxuXG4gICAgcmVuZGVyKCkgOjpcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuc3RhdGUuYWdlbnQuYWN0aW9ucy5tYXAgQCBhY3Rpb24gPT5cbiAgICAgICAgICAgIDxBY3Rpb25WaWV3IGtleT17IGFjdGlvbi5rZXkgfSBhY3Rpb249eyBhY3Rpb24gfSByZW1vdmVBY3Rpb249eyAoKSA9PiB0aGlzLnJlbW92ZUFjdGlvbiggYWN0aW9uICkgfSAvPlxuXG4gICAgICAgIGNvbnN0IGdvYWxzID0gdGhpcy5zdGF0ZS5hZ2VudC5nb2Fscy5jb250ZW50cy5tYXAgQCBnb2FsID0+XG4gICAgICAgICAgICA8R29hbFZpZXcga2V5PXsgZ29hbC5rZXkgfSBnb2FsPXsgZ29hbCB9IHJlbW92ZUdvYWw9eyAoKSA9PiB0aGlzLnJlbW92ZUdvYWwoIGdvYWwgKSB9IC8+XG5cbiAgICAgICAgcmV0dXJuIEBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+WmVlIGdvYWx6OjwvcD5cbiAgICAgICAgICAgICAgICB7IGdvYWxzIH1cbiAgICAgICAgICAgICAgICA8cD5aZWUgYWtzaHVuejo8L3A+XG4gICAgICAgICAgICAgICAgeyBhY3Rpb25zIH1cbiAgICAgICAgICAgICAgICA8UGxhblZpZXcgcGxhbj17IHRoaXMuc3RhdGUucGxhbiB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIEAgJ2NvbnRhaW5lcidcblxuSW5mZXJuby5yZW5kZXIgQCA8QXBwIC8+LCBjb250YWluZXJcbiJdfQ==