const fs = require('fs');

let languageToLanguageVocabs = {};
let languageVocabs = {};

// TODO:// change to be more general


exports.englishToRussian = function (parsedBody, language) {

    // do not reload the dictionary
    if(languageToLanguageVocabs["engToRus"] === undefined){
        let rawdata = fs.readFileSync('english-russian_dictionary.json');
        languageToLanguageVocabs["engToRus"] = JSON.parse(rawdata);
    }
    if(languageVocabs["rus"] === undefined){
        let rawdata = fs.readFileSync('russianGrammar.json');
        languageVocabs["rus"] = JSON.parse(rawdata);
    }

    let parsedTranslation = recursivelyTranslateToParsed(parsedBody, languageToLanguageVocabs["engToRus"]);

    // combine into a sentence
    return recursivelyConvertTreeIntoSentence(parsedTranslation, languageVocabs["rus"])
};

function recursivelyTranslateToParsed(parsedBody, translationDictionary, lastKey) {

    // if it is an object with terminal words
    if(!Array.isArray(parsedBody) && parsedBody["_terminal"] !== undefined){
        // if last key is not in the dictionary, it is not translated
        if(translationDictionary[lastKey] === undefined){
            return "";
        }

        let compoundWord = parsedBody["_terminal"].join(" ");
        // find the translation
        let translation = translationDictionary[lastKey][compoundWord];
        // leave it if it is not translatable
        if(translation === undefined){
            translation = word;
        }

        // get the first element
        translation = translation[0];

        return translation;
    }

    for (let key of Object.keys(parsedBody)){
            let bitToTranslate = parsedBody[key];
            let result = recursivelyTranslateToParsed(bitToTranslate, translationDictionary, key);
            if(result === ""){
                // delete unused
                delete parsedBody[key];
            }else if(typeof result === 'string' || result instanceof String){
                // set translation
                bitToTranslate["_terminal"] = result;
            }
    }

    return parsedBody;
}

function recursivelyConvertTreeIntoSentence(parsedTranslation, targetGrammar, lastKey = "#sentence") {
    // return the terminal symbol if present
    if(parsedTranslation["_terminal"] !== undefined){
        return parsedTranslation["_terminal"];
    }

    let sentence = [];
    let ruleTokens = findSuitableRule(parsedTranslation, targetGrammar, lastKey);

    // finally, fill the sentence
    for(let key of ruleTokens){
        sentence.push(recursivelyConvertTreeIntoSentence(parsedTranslation[key], targetGrammar, key));
    }

    return sentence.join(" ");
}

function findSuitableRule(parsedTranslation, targetGrammar, lastKey) {
    let translatedTokens = Object.keys(parsedTranslation);

    // count the appearance of the words
    let tokenWordCount = countNumOfWords(translatedTokens);

    // check if any rule also needs all these words
    for(let rule of targetGrammar[lastKey]){
        let ruleTokens = rule.split(" ");

        // must be the same length
        if(ruleTokens.length !== translatedTokens.length){
            break
        }
        let ruleWordCount = countNumOfWords(ruleTokens);

        // check
        for(let countKey of translatedTokens){
            if(ruleWordCount[countKey] !== tokenWordCount[countKey]){
                break;
            }
        }

        // it is suitable
        return ruleTokens;
    }
    return false;
}

function countNumOfWords(arr) {
    let count = {};
    for(let word of arr){
        if(count[word] === undefined){
            count[word] = 1;
        }else{
            count[word]++;
        }
    }

    return count;
}