'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (opts) {
    var ms = new _jmMsCore2.default(opts);
    ms.use(_jmLog4js2.default).use(_jmMsHttp2.default.moduleServer).use(_jmMsHttp2.default.moduleClient).use(_jmMsWs2.default.moduleServer).use(_jmMsWs2.default.moduleClient);
    return ms;
};

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

var _jmMsHttp = require('jm-ms-http');

var _jmMsHttp2 = _interopRequireDefault(_jmMsHttp);

var _jmMsWs = require('jm-ms-ws');

var _jmMsWs2 = _interopRequireDefault(_jmMsWs);

var _jmLog4js = require('jm-log4js');

var _jmLog4js2 = _interopRequireDefault(_jmLog4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];