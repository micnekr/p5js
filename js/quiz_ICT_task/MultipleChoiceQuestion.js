class MultipleChoiceQuestion extends Question {
  constructor(questionObj, element) {
    super(questionObj, element);
    element.html(this.constructHTML(questionObj));

    this.answerElements = $("div.multiple-choice-answer", element);
    this.answerElt = undefined;
  }

  setOnAnswer(cb){
    let questionInstance = this;
    this.answerElements.click(function (evt) {

      // set the answer element
      questionInstance.answerElt = $(this);

      // loop through the other answers to delete this class
      $("div", this.element).each(function () {
        $(this).removeClass("selected");
      })

      // show the selected answer
      $(this).addClass("selected");

      // asign "this" value
      cb.call(this, evt, $(this).text());
    });
  }

  getAnswer(){
    if(!this.answerElt){
      return undefined;
    }
    return this.answerElt.text();
  }

  constructHTML(questionObj) {
    let out = `<h3 class="question-heading">${questionObj.question}</h3>`;
    out += '<table class="multiple-choice-answers">';

    // rows
    for(let i = 0; i < Math.ceil(questionObj.answers.length/2); i++){
      let answersLeft = questionObj.answers.length - i * 2;

      out += "<tr>";


      // cols
      for(let j = 0; j < Math.min(answersLeft, 2); j++){
        let colspan = answersLeft === 1 ? 2 : 1;
        out += `<td colspan="${colspan}"><div class="multiple-choice-answer">${questionObj.answers[i * 2 + j]}</div></td>`
      }
      out += "</tr>";
    }
    out += "</table>";

    return out;
  }
}
