exports.bottomUp = function (tokens, dict) {

    // TODO:// make sure that all words are known

    // change all strings to lower case
    for (let i = 0; i < tokens.length; i++) {
        // encapsulate in an array to store the tree in the second place
        tokens[i] = [tokens[i].toLowerCase()];
    }

    let stack = [];

    let i = 0;
    while (i < tokens.length - 1 || stack.length !== 1) {
        let token = tokens[i];
        // // eof is undefined
        // let lookAhead = tokens[i+1];

        // shift
        if(i < tokens.length) {
            stack.push(token);
            i++;
        }

        // reduce
        let result;
        do {
            result = reduce(stack, dict);
        }while(result !== undefined);
    }

    // stack[0] is ["#sentence", tree], stack[0][1] is tree
    return stack[0][1];
};

function reduce(stack, dict) {
    // look at every rule to see if it applies
    let longestHandle;
    let longestHandleLength = 0;
    let longestHandleKey;
    for (let key of Object.keys(dict)) {
        let rule = dict[key];
        for (option of rule) {
            let optionTokens = option.split(" ");
            let optionTokensLength = optionTokens.length;
            // see if it matches
            let matches = true;
            for (let j = 0; j < optionTokensLength; j++) {
                if (stack[stack.length - 1 - j] === undefined || stack[stack.length - 1 - j][0] !== optionTokens[optionTokensLength - 1 - j]) {
                    matches = false;
                    break;
                }
            }

            // if it matches, reduce
            if (matches) {
                // check if it is better then the other handles:
                if(optionTokensLength > longestHandleLength){
                    longestHandleLength = optionTokensLength;
                    longestHandle = optionTokens;
                    longestHandleKey = key;
                }
            }
        }
    }

    // if nothing found, return
    if (longestHandleLength === 0){
        return;
    }

    let popped = [];

    // delete last tokens
    for (let j = 0; j < longestHandleLength; j++) {
        // unshift prepends to the array
        popped.unshift(stack.pop());
    }

    let outObj = {};
    outObj[longestHandleKey] = popped;

    let tree = {};

    for (previousWord of popped){
        let previousTree = previousWord[1];
        if(previousTree === undefined){
            if (tree["_terminal"] === undefined){
                tree["_terminal"] = [];
            }

            tree["_terminal"].push(previousWord[0]);
        }else{
            tree[previousWord[0]] = previousTree;
        }
    }

    // add the new token
    stack.push([longestHandleKey, tree]);
    return outObj;
}