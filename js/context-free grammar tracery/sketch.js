//                                variables
let text = {
  "start": ">Hello, #human#.\n>My id number is #id#.\n>I was programmed to tell you a story.\n>System:alert(generating_story).line_138\n>#[hero:#characters#]story#",
  "human": ["human", "human being"],
  "id": ["W2.1.3-alfa", "R.O.B.O.T-914", "Num_4246", "r_1.4.0"],


  "story": "Once upon a time, there was #hero.a#. This #hero# was very #heroadj#. #[second: #secondCh#][name: #names#]plot#",
  "plot": "His #second# was lost, so #name# wanted to save him.\n By the way, the #hero#`s name was #name#.\n  So he went to #place# and #endings#",

  "robot": "saw a robot there.\n As #hero# was good at programming, he changed the robot`s programm to find #name#`s #second#.\n The robot completed the task in less than #time.a#. The #hero# was so #happy#, so he made the robot tell others his story. He also was shy, so he changed something in it.\n\n#start#",
  "found": "found #second# there.",
  "endings": ["#robot#", "#found#"],
  "characters": ["knight", "dragon", "sailor", "prince"],
  "secondCh": ["friend", "father", "brother", "son"],
  "names": ["John", "Peter", "Bob", "Josh", "Chris"],
  "place": ["his house", "bar", "his #second#`s house"],
  "time": ["few minutes", "hour", "day"],
  "heroadj": ["kind", "funny", "noble", "strange"],
  "happy": ["happy", "cheerful", "glad", "joyful"]
}
let grammar;
let output;

function setup() {
  noCanvas();
  grammar = tracery.createGrammar(text);
  let result = grammar.flatten("#start#");
  output = select("#output");
  console.log(result);
  output.html(result.replace(/\n/g, "<br/>"));
}