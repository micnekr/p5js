function calcScore(person1, person2, mode = 0) {
  switch (mode) {
    case 0:
      output = euclideanDist(person1, person2);
      break;
    default:
      console.warn("Error: no mode ", mode, " exists");
  }
  return output;
}


function euclideanDist(person1, person2) {
  // get summ of differences of squares of person
  let summOfSquares = 0;
  // foreach title
  for (var i = 0; i < titles.length; i++) {
    let title = titles[i];
    // get each persons ratings
    let user1rating = person1[title];
    let user2rating = person2[title];
    // if not null
    if(user1rating != null && user2rating != null){
      // diff
      let userDiff = user1rating - user2rating;
      summOfSquares += userDiff*userDiff;
    }
  }
  let dist = sqrt(summOfSquares);
  let similarity = 1/(dist + 1);
  return similarity;
}
