class TypedQuestion extends Question {
  constructor(questionObj, element) {
    super(questionObj, element);
    element.html(this.constructHTML(questionObj));
    this.answerElement = $("div>input", element);
  }

  setOnAnswer(cb){
    this.answerElement.on('keypress', function (evt) {

      // if it is a whitespace
      if(evt.which == 13) {
        // asign "this" value
        cb.call(this, evt, $(this).val());
      }
    });
  }

  getAnswer(){
    return this.answerElement.val();
  }

  constructHTML(questionObj) {
    let out = `<h3 class="question-heading">${questionObj.question}</h3>`;

    out += `<div class="typed-question-input-container"><input type="text" class="typed-question-input"></div>`;

    return out;
  }
}
