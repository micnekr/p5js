const NOMINATIVE = exports.NOMINATIVE = 0; // Именительный падеж
const GENITIVE = exports.GENITIVE = 1; // Родительный падеж
const DATIVE = exports.DATIVE = 2;// Дательный падеж
const ACCUSATIVE = exports.ACCUSATIVE = 3;// Винительный падеж
const INSTRUMENTAL = exports.INSTRUMENTAL = 4;// Творительный падеж
const PREPOSITIONAL = exports.PREPOSITIONAL = 5;// Предложный падеж


const SINGULAR = exports.SINGULAR = 0;
const PLURAL = exports.PLURAL = 1;

const MASCULINE = exports.MASCULINE = 0;
const FEMENINE = exports.FEMENINE = 1;
const NEUTER = exports.NEUTER = 2;

const ANIMATE = exports.ANIMATE = 0;
const INANIMATE = exports.INANIMATE = 1;

const CONSONANTS = exports.CONSONANTS = "бвгджзйклмнпрстфхцчшщ";
const VOWELS = exports.VOWELS = "аэыуояеёюи";

// склонение
exports.changeCase = function changeCase(word, wordCase, wordGender, wordQuantity, wordAnimate) {
    switch (wordCase) {
        case NOMINATIVE:
            return nominativeNoun(word, wordGender, wordQuantity);
        case GENITIVE:
            return genitiveNoun(word, wordGender, wordQuantity);
        case DATIVE:
            return dativeNoun(word, wordGender, wordQuantity);
        case ACCUSATIVE:
            return accusativeNoun(word, wordGender, wordQuantity, wordAnimate);
        case INSTRUMENTAL:
            return instrumentalNoun(word, wordGender, wordQuantity);
        case PREPOSITIONAL:
            return prepositionalNoun(word, wordGender, wordQuantity);
    }
};

function nominativeNoun(word, wordGender, wordQuantity) {
    let rules;
    if(wordQuantity === SINGULAR){
        return word;
    }else{
        if(wordGender === MASCULINE){
            rules = [
                ["й", "и"],
                ["гкхжчшщ", "", "и"],
                [CONSONANTS, "", "ы"],
                ["ь", "и"]
            ];
        }else if(wordGender === FEMENINE){
            rules = [
                ["гкхжчшщ", "а", "и"],
                ["а", "ы"],
                ["ия", "ии"],
                ["я", "и"],
                ["ь", "и"]
            ];
        }else{
            rules = [
                ["о", "а"],
                ["е", "я"],
                ["м", "я", "ена"]
            ]
        }
    }

    return useRulesToChangeTheWord(rules, word);
}

function genitiveNoun(word, wordGender, wordQuantity) {
    let rules;
    if(wordQuantity === SINGULAR){
        rules = [
            [
                ["й", "я"],
                [CONSONANTS, "", "а"],
                ["ь", "я"]
            ],
            [
                ["кгхжшщч", "а", "и"],
                ["а", "ы"],
                ["я", "и"],
                ["ь", "и"]
            ],
            [
                ["цжшщ", "е", "а"],
                ["о", "а"],
                ["е", "я"]
            ]
        ]
    }else{
        rules = [
            [
                ["жчшщ", "", "ей"],
                ["ь", "ей"],
                ["й", "ёв"],
                ["ц", "", "ев"],
                [CONSONANTS, "", "ов"]
            ],
            [
                ["а", ""],
                [CONSONANTS, "я", "ь"],
                [VOWELS, "я", "й"],
                ["ь", "ей"]
            ],
            [
                ["о", ""],
                ["и", "е", "й"],
                ["ье", "ий"],
                [CONSONANTS, "е", ""]
            ]
        ]
    }

    return useRulesToChangeTheWord(rules[wordGender], word);
}

function dativeNoun(word, wordGender, wordQuantity) {
    let rules;
    if(wordQuantity === SINGULAR){
        rules = [
            [
                ["й", "ю"],
                [CONSONANTS, "", "у"],
                ["ь", "ю"]
            ],
            [
                ["и", "я", "и"],
                ["а", "е"],
                ["я", "е"],
                ["ь", "и"]
            ],
            [
                ["цжшщ", "е", "у"],
                ["о", "у"],
                ["е", "ю"]
            ]
        ]
    }else{
        let allGenderRule = [
            ["жчшщ", "е", "ам"],
            ["й", "ям"],
            [CONSONANTS, "", "ам"],
            ["ь", "ям"],
            ["е", "ям"],
            ["а", "ам"],
            ["о", "ам"]
        ];
        rules = [allGenderRule, allGenderRule, allGenderRule]
    }

    return useRulesToChangeTheWord(rules[wordGender], word);
}

function accusativeNoun(word, wordGender, wordQuantity, wordAnimate) {
    if(wordGender === MASCULINE && wordQuantity === SINGULAR && wordAnimate === INANIMATE){
        return word;
    }
    let rules;
    if(wordQuantity === SINGULAR){
        rules = [
            [
                ["й", "я"],
                [CONSONANTS, "", "а"],
                ["ь", "я"]
            ],
            [
                ["а", "у"],
                ["я", "ю"],
                ["ь", "ь"]
            ],
            [
                ["", ""]
            ]
        ]
    }else{
        if(wordAnimate === ANIMATE){
            return genitiveNoun(word, wordGender, wordQuantity);
        }else{
            return nominativeNoun(word, wordGender, wordQuantity);
        }
    }

    return useRulesToChangeTheWord(rules[wordGender], word);
}

function instrumentalNoun(word, wordGender, wordQuantity) {
    let rules;
    if(wordQuantity === SINGULAR){
        rules = [
            [
                ["й", "ем"],
                ["ь", "ем"],
                ["жшчщц", "","ем"],
                [CONSONANTS, "", "ом"]
            ],
            [
                ["жшщч", "а", "ей"],
                ["ь", "ю"],
                ["я", "ей"],
                ["а", "ой"]
            ],
            [
                ["я", "енем"],
                ["", "м"]
            ]
        ]
    }else{
        let allGenderRule = [
            [CONSONANTS, "", "ами"],
            ["о", "ами"],
            ["а", "ами"],
            ["?", "ями"]
        ];
        rules = [allGenderRule, allGenderRule, allGenderRule]
    }

    return useRulesToChangeTheWord(rules[wordGender], word);
}

function prepositionalNoun(word, wordGender, wordQuantity) {
    let rules;
    if(wordQuantity === SINGULAR){
        rules = [
            [
                ["ь", "е"],
                ["", "е"],
            ],
            [
                ["и", "я", "и"],
                ["ь", "и"],
                ["а", "е"],
                ["я", "е"]
            ],
            [
                ["и", "е", "и"],
                ["о", "е"],
                ["е", "е"]
            ]
        ]
    }else{
        let allGenderRule = [
            ["а", "ах"],
            ["о", "ах"],
            [CONSONANTS, "", "ах"],
            ["?", "ях"]
        ];
        rules = [allGenderRule, allGenderRule, allGenderRule]
    }

    return useRulesToChangeTheWord(rules[wordGender], word);
}

function useRulesToChangeTheWord(rules, word) {
    for(let rule of rules){
        if(rule.length === 2){
            let result = replaceEnding(word, rule[0], rule[1]);
            if(result !== undefined){
                return result;
            }
        }else{
            let result = replaceEndingWithPrecedingLetterCheck(word, rule[0], rule[1], rule[2]);
            if(result !== undefined){
                return result;
            }
        }
    }

    // word unknown
    return word;
}

function replaceEndingWithPrecedingLetterCheck(word, possiblePrecedingLetters, remove, add) {
    if(possiblePrecedingLetters.includes(word[word.length - remove.length - 1])){
        return replaceEnding(word, remove, add);
    }
    return undefined;
}

function replaceEnding(word, remove, add){
    if(word.endsWith(remove) || remove === "?"){
        return word.substring(0, word.length - remove.length) + add;
    }
    return undefined;
}