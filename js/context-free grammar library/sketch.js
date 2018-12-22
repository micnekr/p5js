//                                variables
let text = {
  "start": "#greeting#, #name=names##name#! How are you? ...Sorry, you are not #name# #name# #name# #name# #name# #name# #name# #name#",
  "greeting": ["Hi", "Hello"],
  "names": ["Alex", "John"]
}
let grammar;
let output;

function setup() {
  noCanvas();
  grammar = new Grammar(text);
  let result = grammar.expand();
  output = select("#output");
  console.log(result);
  output.html(result.replace(/\n/g, "<br/>"));
}