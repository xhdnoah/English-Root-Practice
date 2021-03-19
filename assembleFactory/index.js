
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var rootList = require("./test.json");
var index_1 = require("../src/utils/index");
var js_mdict_1 = require("js-mdict");
var fs = require('fs');
var natural = require('natural');
var checkWord = require('check-word');
var englishWord = checkWord('en');
var stemmer = natural.LancasterStemmer;
var mdict = new js_mdict_1["default"]('./english-root.mdx');
var newRootList = rootList.map(function (rootData) {
    var root = rootData.root, examples = rootData.examples;
    var newStemmers = [];
    var exampleDatas = [];
    var word = index_1.splitWord(typeof examples === 'string' ? examples : examples[0], '[(|（]')[0];
    var definition = mdict.lookup(word).definition;
    definition.split(/(?:<br>)?\r\n/).forEach(function (ex) {
        var index = exampleDatas.length;
        var example = index_1.stripHTMLTag(ex);
        var exampleWord = example.split(/,|\s/)[0].trim();
        if (exampleWord.includes(root) &&
            !newStemmers.includes(stemmer.stem(exampleWord))
        && englishWord.check(exampleWord)
        ) {
            var exampleData = index_1.popTheLastNumber(example);
            newStemmers.push(stemmer.stem(exampleWord));
            if (exampleDatas.length === 0) {
                exampleDatas.push(exampleData);
            }
            else {
                for (var i = 0; i < exampleDatas.length; i++) {
                    if (exampleDatas[i].frequency > exampleData.frequency) {
                        index = i;
                        break;
                    }
                }
            }
            exampleDatas.splice(index, 0, exampleData);
        }
    });
    var newExamples = exampleDatas.map(function (exampleData) {
        return exampleData.example;
    });
    return __assign(__assign({}, rootData), { newExamples: newExamples });
});
fs.writeFile('./test.json', JSON.stringify(newRootList), function (err) {
    console.log(err);
});
// parcel build mdict.js --out-dir mdict --no-minify --target main && node mdict/mdict.js && prettier --write ./test.json
