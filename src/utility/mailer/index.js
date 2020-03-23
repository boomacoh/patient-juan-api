const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../../config');
const Email = require('email-templates');

class Nodemailer {

  constructor(recepient) {
    this.recepient = recepient;
    const emailerAccount = config.emailerAccount.split(':');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wittywalletapp@gmail.com',
        pass: 'wittywalletteam'
      }
      // host: 'smtp.mailtrap.io',
      // port: 2525,
      // auth: {
      //   user: emailerAccount[0],
      //   pass: emailerAccount[1]
      // }
    });
    this.email = new Email({
      message: {
        from: 'wittywalletapp@gmail.com'
      },
      send: config.sendEmail,
      preview: false,
      transport: transporter,
      views: {
        options: {
          extension: 'hbs'
        }
      }
    });
  }

  setTemplate(template, locals) {
    this.template = template;
    this.locals = locals;
    return this;
  }

  setSubject(subject) {
    this.subject = subject;
    return this;
  }

  sendHtml() {
    const mailOptions = {
      template: path.join(__dirname, './templates/', this.template),
      message: {
        to: this.recepient
      },
      locals: this.locals
    };

    mailOptions.locals.subject = this.subject;
    mailOptions.locals.name = this.name;

    return this.email
      .send(mailOptions)
      .catch(err => { throw err; });
  }
}

module.exports = Nodemailer;