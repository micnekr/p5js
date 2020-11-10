const QUESTION = 0;
const ANSWER = 1;
const VARIABLE = 2;

class Chatbot {
  constructor() {
    this.answers = {};
    this.division = {
      "+ ": {
        "script": undefined,
        "regexp": "\\+ ",
        "mode": QUESTION
      },
      "- ": {
        "script": undefined,
        "regexp": "\\- ",
        "mode": ANSWER
      },
      "var ": {
        "script": undefined,
        "regexp": "var ",
        "mode": VARIABLE
      }
    };
    this.variables = {};
    // this.replacements = {};// TODO: edit replacements
  }

  async add(url) {
    // get data from file
    await fetch(url)
      .then(r => r.text())
      .then(t => {
        let text = t;
        // parse it
        this.answers = this.parse(text);
      })
  }

  parse(text) {
    // replacements
    text = text.replace(/\n/g, "");

    // divide into lines
    let lines = this.lineBrDiv(text);

    // execution mode
    let mode = 1; //0==add QUESTION , 1== add ANSWER, 2== add VARIABLE
    // key for a stranswers
    let key;
    let answers = {};

    // loop through all lines
    for (let expr of lines) {
      // if is a division string, execute it
      if (this.division[expr] != undefined) {
        if (this.division[expr].script == undefined) {
          mode = this.division[expr].mode;
        } else {
          eval(this.division[expr].script);
        }
      } else {
        switch (mode) {
          // if is a key, prepare it and save
          case 0:
            // convert the string
            expr = this.toRegExp(expr);

            key = expr.toLowerCase();
            break;
            // if is an answer, add it with the key
          case 1:
            if (answers[key] == undefined) {
              answers[key] = [expr];
            } else {
              answers[key].push(expr);
            }
            break;
            // if is a variable declaring, add it
          case 2:
            this.parseVar(expr);
            break;
        }
      }
    }
    return answers;
  }

  reply(request) {
    // simplify string so it matches more
    request = request.toLowerCase();
    // keys to iterate
    let keys = Object.keys(this.answers);
    // null object to replace
    let vals = {
      "key": null,
      "score": -1
    };

    // iterate over keys, choose best
    for (key of keys) {
      // if suits
      if (new RegExp("^" + key + "$").test(request)) {

        // if is better than previous one, push it
        let similarity = (key.match(/\w/g) || []).length;
        if (vals.score < similarity) {
          vals = {
            "key": key,
            "score": similarity
          };
        }
      }
    }
    // if no answer, error
    if (vals.key == null) {
      throw Error("No answer avaliable for " + request);
    }

    // work out answer
    let answer = this.execAnswer(vals["key"], request);
    return answer;
  }

  randomOf(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  lineBrDiv(text) {
    // split by division characters
    let sep = "(";
    let keys = Object.keys(this.division);
    for (let key of keys) {
      sep += this.division[key]["regexp"] + "|";
    }
    sep = sep.substring(0, sep.length - 1);
    sep += ")";
    let lines = text.split(new RegExp(sep, "g"));
    // delete the first empty string
    lines.splice(0, 1);
    return lines;
  }

  toRegExp(expr) {
    let reg;
    // delete \r
    reg = expr.replace("\r", "");

    // replace (
    reg = reg.replace("(", "(?:")

    // replacements
    // replace []
    reg = reg.replace(/\[(.*?)\]/g, (match, symbols) => {
      if (symbols.indexOf("[") == -1 && symbols.indexOf("]") == -1 && symbols.indexOf("|") == -1) {
        return "(?:" + symbols + ")?";
      } else {
        return match;
      }
    })
    reg = reg.replace(/\*/g, "(.+)");
    return reg;
  }

  execAnswer(rs, str) {
    let answer = this.randomOf(this.answers[rs]);
    // stars

    // find all star replacements
    let result = new RegExp("^" + rs + "$").exec(str);
    let stars = [];
    for (var i = 1; i < result.length; i++) {
      if (result[i] == undefined) {
        result[i] = "";
      }
      stars[i - 1] = result[i];
    }

    for (var i = 0; i < stars.length; i++) {
      let star = stars[i];
      let starnum = i + 1;
      answer = answer.replace(new RegExp("<star" + starnum + ">", "g"), star);
    }

    // bind this for a callback
    answer = this.bracketsParse(answer)
    return answer;
  }

  parseVar(text) {
    let varMatch = text.match(/(\w+)\s*=?\s*(\w*)/);
    if (varMatch[2] == undefined) {
      throw Error("Variable should be declared");
    }
    this.variables[varMatch[1]] = varMatch[2];
  }

  bracketsParse(text, opening = "<", closing = ">") {
    // if needs expanding
    if (text.indexOf(opening) == -1) {
      return text;
    } else {
      let output = "";
      let level = 0;
      let found = false;
      let index = text.length;
      for (let charI in text) {
        let char = text[charI];
        if (char == opening) {
          level++;
          found = true;
        } else if (char == closing) {
          level--;
          found = true;
        }
        // if )(
        if (level < 0) {
          throw Error("Brackets mismatch in " + text);
        }
        if (char == closing && found && level == 0) {
          index = Number(charI);
          break;
        }
      }
      let brackets = [];
      brackets[0] = text.substring(0, text.indexOf(opening));
      brackets[1] = text.substring(text.indexOf(opening) + 1, index);
      brackets[2] = text.substring(index + 1, text.length);
      console.log(brackets);
      for (let pieceI in brackets) {
        let piece = brackets[pieceI];
        if (piece.indexOf("=") != -1 && this.variables[piece.substring(1, piece.indexOf("=") - 1)] != undefined && pieceI == 1) {
          // right and left parts
          let rP = piece.substring(piece.indexOf("=") + 1, piece.length);
          rP = this.bracketsParse(rP);
          let lP = piece.substring(1, piece.indexOf("=") - 1);
          this.variables[lP] = eval(rP);
        } else if (this.variables[piece] != undefined) {
          output += this.variables[piece];
        } else {
          output += this.bracketsParse(piece, opening, closing);
        }
      }
      return output;
    }
  }
}