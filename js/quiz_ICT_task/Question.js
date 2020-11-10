class Question {
  constructor(questionObj, element) {
    this.questionObj = questionObj;
    this.element = element;

    element.addClass("questionBox");
  }

  static parseInfo(html){
    return JSON.parse(html);
  }
}
