let table;
let data = {};

function preload() {
  table = loadTable("AFINN-111.txt", "tsv");
}

function setup() {
  console.log(table);
  for (var i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let word = row.get(0);
    let score = row.get(1);
    // console.log(word+score);
    data[word] = score;
  }
  saveJSON(data, "AFINN.json");
}
