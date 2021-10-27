"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.auth = void 0;

var _app = require("@firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _firebaseConfig = _interopRequireDefault(require("./config/firebaseConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebase = (0, _app.initializeApp)(_firebaseConfig["default"]);
var auth = (0, _auth.getAuth)(firebase);
exports.auth = auth;
var db = (0, _firestore.getFirestore)(firebase);
exports.db = db;