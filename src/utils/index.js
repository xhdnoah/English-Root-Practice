"use strict";
exports.__esModule = true;
exports.popTheLastNumber = exports.stripHTMLTag = exports.searchForRoot = exports.splitWord = exports.isLegal = void 0;
var isLegal = function (val) { return /^[a-z_A-Z_._(_)_0-9'!,'?-]$/.test(val); };
exports.isLegal = isLegal;
var splitWord = function (str, separator) {
    if (str === '' || separator === '') {
        return [];
    }
    var separatorIndex = str.search(separator);
    if (separatorIndex === -1) {
        return [];
    }
    return [str.slice(0, separatorIndex), str.slice(separatorIndex + 1, -1)];
};
exports.splitWord = splitWord;
var searchForRoot = function (word, root) {
    var indexOfRoot = word.indexOf(root);
    if (indexOfRoot === -1) {
        return [-1];
    }
    return [indexOfRoot, indexOfRoot + root.length];
};
exports.searchForRoot = searchForRoot;
var stripHTMLTag = function (str) {
    return str.replace(/(<([^>]+)>)/gi, "");
};
exports.stripHTMLTag = stripHTMLTag;
var popTheLastNumber = function (str) {
    var matchNumber = str.match(/\d+/);
    if (matchNumber == null) {
        return {
            example: str,
            frequency: Infinity
        };
    }
    return {
        example: str.replace(/[0-9★]/g, '').trim(),
        frequency: parseInt(matchNumber.pop())
    };
};
exports.popTheLastNumber = popTheLastNumber;
