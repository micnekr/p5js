let questions = [];

const questionTypes = {
  "multiple-choice": MultipleChoiceQuestion,
  "typed": TypedQuestion
}

$(document).ready(function(){
  $(".question").each(function () {

    // get the information
    let questionInfoObj = Question.parseInfo($(this).html());
    let classes = $(this).attr('class').split(" ");

    // look what class the question is
    let suitableClass;
    for(possibleClass of classes){
      if(questionTypes[possibleClass]){
        suitableClass = possibleClass;
        break;
      }
    }
    if(suitableClass === undefined){
      return;
    }

    // get the correct class
    let questionObj = new questionTypes[suitableClass](questionInfoObj, $(this));

    questions.push(questionObj);

    questionObj.setOnAnswer(function (evt, answer) {
      console.log(questionObj.getAnswer());
      console.log("Your answer: " + '"' + answer + '"');
    })
  })
});
