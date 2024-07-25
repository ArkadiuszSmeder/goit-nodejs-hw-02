const Jimp = require("jimp");

const MAX_AVATAR_SIZE = 250;

const isImageAndTransform = async (path) =>
    new Promise((resolve) => {
        Jimp.read(path, async (err, image) => {
            if (err) resolve(false)
            
            try {
                await image
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