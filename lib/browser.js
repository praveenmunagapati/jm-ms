'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (opts) {
    var ms = new _jmMsCore2.default(opts);
    ms.use(_browser2.default.moduleClient).use(_browser4.default.moduleClient);
    return ms;
};

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

var _browser = require('jm-ms-http/lib/browser');

var _browser2 = _interopRequireDefault(_browser);

var _browser3 = require('jm-ms-ws/lib/browser');

var _browser4 = _interopRequireDefault(_browser3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];