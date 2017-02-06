var catArray = [
'https://static.pexels.com/photos/25453/pexels-photo-25453.jpg',
'https://static.pexels.com/photos/25453/pexels-photo-25453.jpg',
'https://static.pexels.com/photos/171227/pexels-photo-171227.jpeg',
'https://static.pexels.com/photos/171216/pexels-photo-171216.jpeg',
'https://static.pexels.com/photos/113766/pexels-photo-113766.jpeg',
'https://static.pexels.com/photos/192384/pexels-photo-192384.jpeg',
'https://static.pexels.com/photos/165752/pexels-photo-165752.jpeg',
'https://static.pexels.com/photos/20787/pexels-photo.jpg',
'https://static.pexels.com/photos/17773/pexels-photo.jpg',
'https://static.pexels.com/photos/39255/cat-favorite-relaxation-rest-39255.jpeg',
'https://static.pexels.com/photos/75898/pexels-photo-75898.jpeg',
'https://static.pexels.com/photos/107971/pexels-photo-107971.jpeg',
'https://static.pexels.com/photos/219501/pexels-photo-219501.jpeg',
'https://static.pexels.com/photos/8415/pexels-photo.jpg',
'https://static.pexels.com/photos/209800/pexels-photo-209800.jpeg',
'https://static.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg',
'https://static.pexels.com/photos/106131/pexels-photo-106131.jpeg'
]

var getArray = function() {
    const index = Math.floor(Math.random() * catArray.length)
    return catArray[index];
}

module.exports = getArray
