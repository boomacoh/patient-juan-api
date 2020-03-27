const sharp = require('sharp');
const path = require('path');

// const x = path.join(__dirname, '../../../public/images/profile/');
// console.log(x);
// console.log(path.resolve(x));

class UploadImage {

  constructor(imageFile) {
    this.imageFile = imageFile;
    this.imageDirectory = path.join(__dirname, '../../../public/images/profile/');
  }

  saveImage() {
    const filename = UploadImage.createFileName();
    const filepath = UploadImage.path(filename);
    console.log('FILE PATH: ', filepath);

    sharp(this.imageFile.buffer)
      .resize(300, 300, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toFile(this.imageDirectory + filename)
      .then(success => console.log(success))
      .catch(error => console.log(error));

    return filename;
  }

  static createFileName() {
    return `${Date.now()}.png`;
  }

  static path(filename) {
    return path.resolve(`${this.imageDirectory}/${filename}`);
  }

}

module.exports = UploadImage;