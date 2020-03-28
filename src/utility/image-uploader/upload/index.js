const sharp = require('sharp');
const path = require('path');

class UploadImage {

  constructor(imageFile) {
    this.imageFile = imageFile;
  }

  saveImage() {
    const filename = UploadImage.createFileName();
    const filepath = UploadImage.path(filename);

    return sharp(this.imageFile.buffer)
      .resize(300, 300, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toFile(filepath)
      .then(success => {
        return { filename: filename, message: success };
      })
      .catch(error => {
        return error;
      });
  }

  static createFileName() {
    return `${Date.now()}.png`;
  }

  static path(filename) {
    return path.resolve(__dirname, '../../../public/images/profile/', filename);
  }

}

module.exports = UploadImage;