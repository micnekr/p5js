 function gridSetup(cols, rows, w, h, wallsAsLine, randomGeneration) {
  // making a 1d array
  let grid = new Array(cols);
  // making a 2d array
  for (i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  // assigning values
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j, w, h, grid, wallsAsLine, randomGeneration);
    }
  }
  return grid;
}
