const parser = require("./parser");
const fs = require('fs');
const translator = require('./translator');
const russian = require('./languageRules/russian');
console.log(russian.changeCase("неде́ля", russian.PREPOSITIONAL, russian.NEUTER, russian.PLURAL));

let rawdata = fs.readFileSync('englishGrammar.json');
let dict = JSON.parse(rawdata);

let sentence = "A woman stroked two furry dice";

let tokens = [];
for (token of sentence.split(/\W+/)) {
    if (token !== '') {
        tokens.push(token);
    }
}

let parsed = parser.bottomUp(tokens, dict);
// console.log(JSON.stringify(parsed, null, 4));
console.log(JSON.stringify(translator.englishToRussian(parsed, "russian"), null, 4));