  //                           variables
  let canvas;
  let data;
  let users = {};
  let submitButton;
  let k = 5;
  let similarityScores;
  let titles;
  let dropdowns = [];
  let outputDiv;
  let outputDivs = [];

  function preload() {
    // load data ratings
    data = loadJSON("movies.json");
  }

  function setup() {
    titles = data.titles;
    // setup dom
    outputDiv = select("#resultDiv");
    submitButton = select("#submit");
    // create selectors for movies ratings
    for (var i = 0; i < titles.length; i++) {
      // create div and put selection in it
      let div = createDiv(titles[i]);
      let selection = createSelect('');
      div.parent("ratingSelect");
      selection.parent(div);
      // add options
      fillOptions(selection);
    }
    // make name - object lookup table
    for (i = 0; i < data.users.length; i++) {
      let name = data.users[i].name;
      users[name] = data.users[i];
    }
    // add action for submit button
    submitButton.mousePressed(predictRatings);
  }

  function predictRatings() {
    // new object
    let newUser = {};
    // fill with all information for titles
    for (var i = 0; i < dropdowns.length; i++) {
      let newTitle = titles[i];
      let newRating = dropdowns[i].value();
      // fill null if have not seen film
      if(newRating == "have not seen"){
        newRating = null;
      }
      // finaly, add to object
      newUser[newTitle] = newRating;
    }
    // find top k similar users
    findNear(newUser);
    // clean previous results
    for (var i = 0; i < outputDivs.length; i++) {
      outputDivs[i].remove();
    }
    outputDivs = [];
    // predict
    // foreach title
    for (var i = 0; i < titles.length; i++) {
      let title = titles[i];
      // if not stated
      if(newUser[title] == null){
        let similaritySum = 0;
        let weightedSum = 0;
        for (var j = 0; j < k; j++) {
          let score = similarityScores[data.users[j].name];
          let ratings = data.users[j];
          let rating = ratings[title];
          if(rating != null){
            similaritySum += rating;
            weightedSum += rating*score;
          }
        }
        let stars = weightedSum / similaritySum * 5;
        // results
        let newDiv = createDiv(title + ": " + stars);
        newDiv.parent(outputDiv);
        outputDivs.push(newDiv);
      }
    }
    // results
    // for (var i = 0; i < titles.length; i++) {
    //   let title = titles[i];
    //   if(newUser[title] == null){
    //     let newDiv = createDiv(title);
    //     outputDivs.push(newDiv);
    //     newDiv.parent(outputDiv);
    //   }
    // }
  }

  function findNear(testForObj) {
   // table name-similarity
   similarityScores = {};
   // fill in all similarity scores
   for (var i = 0; i < data.users.length; i++) {
     let userData = data.users[i];
     // do not compare person to himself
     if(userData.name != testForObj.name){
       // calculate similarity
       let similarity = calcScore(testForObj, users[userData.name]);
       // fill table
       similarityScores[userData.name] = similarity;
     }else{
       // if is compared to itself, do not count by setting similarity to -1
       similarityScores[userData.name] = -1;
     }
   }
   // sort by similarity
   data.users.sort(compareSimilarities);
   return data.users;
}

function compareSimilarities(a, b) {
  // sort by similarity score
 let score1 = similarityScores[a.name];
 let score2 = similarityScores[b.name];
 return score2-score1;
}

function fillOptions(selection) {
  // add null option
  selection.option("have not seen");
  for (var j = 1; j < 6; j++) {
    // fill 1 to 5 stars
    selection.option(j);
  }
  // push to selections array
  dropdowns.push(selection);
}
