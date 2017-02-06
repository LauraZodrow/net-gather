var colors = [
    '#FAC9B8',
    '#E5D4C0',
    '#495159',
    '#96C5B0',
    '#A7FFF6'
]

var getColor = function() {
    var index = Math.floor(Math.random() * colors.length)
    return colors[index];
}

module.exports=  getColor
