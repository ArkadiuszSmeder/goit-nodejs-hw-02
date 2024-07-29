const Jimp = require("jimp");

const MAX_AVATAR_SIZE = 250;

const isImageAndTransform = async (path) =>
    new Promise((resolve) => {
        console.log('path to file', path)
        Jimp.read(path, async (err, image) => {
            if (err) {
                console.log(err)
                resolve(false)
                return
            }
            
            try {
                image
                    .rotate(360)
                    .resize(MAX_AVATAR_SIZE, MAX_AVATAR_SIZE)
                    .write(path)
                resolve(true)
            } catch (err) {
                console.log(err)
                resolve(false)
            }
        })
    })

module.exports = isImageAndTransform;