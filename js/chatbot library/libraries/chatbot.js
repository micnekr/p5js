const QUESTION = 0;
const ANSWER = 1;
const VARIABLE = 2;

class Chatbot {
  constructor() {
    this.answers = {};
    this.division = {
      "+ ": {
        "script": "mode = QUESTION;",
        "regexp": "\\+ "
      },
      "- ": {
        "script": "mode = ANSWER;",
        "regexp": "\\- "
      },
      "var ": {
        "script": "mode = VARIABLE",
        "regexp": "var "
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

    // // if starts without +
    // if (lines[0] != "+ ") {
    //   throw Error("Requests should start with +");
    // } // TODO: change error detection

    // execution mode
    let mode = 1; //0==add QUESTION , 1== add ANSWER, 2== add VARIABLE
    // key for a stranswers
    let key;
    let answers = {};

    // loop through all lines
    for (let expr of lines) {
      // if is a division string, execute it
      if (this.division[expr] != undefined) {
        eval(this.division[expr].script);
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
    answer = answer.replace(/#(\w+)\s*=?\s*(\w*)#/g, this.varRegExpReplacer);
    return answer;
  }

  parseVar(text) {
    let varMatch = text.match(/(\w+)\s*=?\s*(\w*)/);
    if (varMatch[2] == undefined) {
      throw Error("Variable should be declared");
    }
    this.variables[varMatch[1]] = varMatch[2];
  }

  varRegExpReplacerFun() {
    let name = arguments[1];
    let value = arguments[2];
    if (value == "") {
      return this.variables[name];
    } else {
      this.variables[name] = value;
      return "";
    }
  }

  varRegExpReplacer() {
    return varRegExpReplacerFun.bind(this)
  }
}