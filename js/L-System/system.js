class LSystem {
  constructor(rules) {
    this.rules = rules;
  }

  generate(axiom, rounds) {
    if (rounds == 0) {
      return axiom;
    }
    let sentence = "";
    for (let i = 0; i < axiom.length; i++) {
      let cur = axiom.charAt(i);
      let sub = this.rules[cur];
      if (sub == undefined) {
        sub = cur;
      }
      sentence += sub;
    }
    return this.generate(sentence, rounds - 1);
  }
}