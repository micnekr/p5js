const variableDeclaring = "=";
const separationSymbols = "#"

class Grammar {
  constructor(rules) {
    this.rules = rules;
    this.variables = {};
  }

  choose(rule) {
    let chosen = "";
    if (rule instanceof Array) {
      chosen = random(rule);
    } else {
      chosen = rule;
    }
    return chosen;
  }

  expand(start = "start") {
    let output = this.execRule(start);
    return output;
  }

  execRule(rule) {
    // get rule or variable content
    let content = this.choose(this.rules[rule]) || this.variables[rule];
    // if is not a rule, return the input
    if (content == undefined) {
      return rule;
    }

    let result = this.parse(content);
    // push the content to the array.
    // arr.push(divided.join(" "));
    return result.join("");
  }

  parse(content) {
    // find # symbols
    let divided = content.split(separationSymbols);
    // if wrong number of tokens
    if (divided.length % 2 == 0) {
      throw new Error("Number of '#'s should be even");
      return;
    }
    // result variable
    let result = [];
    // loop through all tokens
    for (let partIndex in divided) {
      let part = divided[partIndex];
      // ever second token is special
      if (partIndex % 2 == 1) {
        // if special
        result[partIndex] = this.interpret(part);
      } else {
        // if is just text, add it
        result[partIndex] = divided[partIndex];
      }
    }
    return result;
  }

  interpret(part) {
    switch (true) {
      // a rule
      case part.indexOf(variableDeclaring) == -1 && (this.rules[part] != undefined || this.variables[part] != undefined):
        // is a rule
        return this.execRule(part);
        break;
        // new variable
      case part.indexOf(variableDeclaring) != -1:
        // declaring a variable
        let variable = part.substring(0, part.indexOf(variableDeclaring));
        let value = part.substring(part.indexOf(variableDeclaring) + 1, part.length);
        value = this.execRule(value);
        this.variables[variable] = value;
        break;

      default:
        throw new Error("'" + part + "'" + " is not declared or is not a rule");
    }
  }
}