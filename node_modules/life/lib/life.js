module.exports = function update(cells, rule) {
  var result = []
  var count = cells.length
  if (!count) return result
  for (var i = 0; i < cells.length; i += 2) {
    var x = cells[i]
    var y = cells[i + 1]
    var n = 0
    for (var dy = -1; dy <= 1; dy++) {
      var ny = y + dy
      for (var dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue // ignore center cell (closed neighborhood)
        var nx = x + dx
        for (var j = 0; j < cells.length; j += 2) {
          if (cells[j] === nx && cells[j + 1] === ny) {
            break // this neighbor has previously been added to the stack, ignore it
          }
        }
        if (j < cells.length) { // if we broke early
          if (j < count) { // if the cell we broke on is alive
            n++ // increase the count of living neighbors for the current cell
          }
        } else if (i < count) { // otherwise if the current cell is alive
          cells.push(nx, ny) // add the neighbor cell to the perimeter
        }
      }
    }
    if (rule.birth.indexOf(n) !== -1 && i >= count
    || rule.survival.indexOf(n) !== -1 && i < count) {
      result.push(x, y) // this cell will live during the next generation
    }
  }
  cells.length = count // truncate perimeter cells
  return result
}
