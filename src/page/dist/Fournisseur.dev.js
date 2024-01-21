"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _NavBar = _interopRequireDefault(require("../component/NavBar"));

var _vsc = require("react-icons/vsc");

var _TopBoard = _interopRequireDefault(require("../component/TopBoard"));

var _AddFournisseurModal = _interopRequireDefault(require("../component/AddFournisseurModal"));

var _EditFournisseurModal = _interopRequireDefault(require("../component/EditFournisseurModal"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Fournisseur() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      fournisseurs = _useState2[0],
      setFournisseurs = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentFournisseur = _useState4[0],
      setCurrentFournisseur = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isAddModalOpen = _useState6[0],
      setIsAddModalOpen = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isEditModalOpen = _useState8[0],
      setIsEditModalOpen = _useState8[1];

  var fetchFournisseurs = function fetchFournisseurs() {
    _axios["default"].get('http://localhost:3001/fournisseurs').then(function (response) {
      setFournisseurs(response.data);
    })["catch"](function (error) {
      console.error('Error fetching fournisseurs:', error);
    });
  };

  (0, _react.useEffect)(function () {
    fetchFournisseurs();
  }, []);

  var handleAddFournisseur = function handleAddFournisseur() {
    setCurrentFournisseur(null);
    setIsAddModalOpen(true);
  };

  var handleEditFournisseur = function handleEditFournisseur(fournisseur) {
    setCurrentFournisseur(fournisseur);
    setIsEditModalOpen(true);
  };

  var handleDeleteFournisseur = function handleDeleteFournisseur(code) {
    _axios["default"]["delete"]("http://localhost:3001/fournisseurs/".concat(code)).then(function () {
      fetchFournisseurs();
    })["catch"](function (error) {
      console.error('Error deleting fournisseur:', error);
    });
  };

  var handleSaveFournisseur = function handleSaveFournisseur(fournisseurData) {
    var action = currentFournisseur ? _axios["default"].put("http://localhost:3001/fournisseurs/".concat(currentFournisseur.code), fournisseurData) : _axios["default"].post('http://localhost:3001/fournisseurs', fournisseurData);
    action.then(function () {
      fetchFournisseurs();
    })["catch"](function (error) {
      console.error('Error saving fournisseur:', error);
    });
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  }; // ... Rest of your Fournisseur component JSX including map function
  // Replace FournisseurModal with AddFournisseurModal and EditFournisseurModal

}

var _default = Fournisseur;
exports["default"] = _default;