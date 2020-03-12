const Invitation = require('../../models/invitation.model');
const User = require('../../models/user.model');
const Institution = require('../../models//institution.model');
const { handleEntityNotFound, handleError, handleErrorMsg, respondWithResult } = require('../../services/handlers');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
  getEntries: async (req, res) => {
    await Invitation.findAll()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getEntry: async (req, res, next) => {
    const { body: { email, clinic } } = req;
    await Invitation.findOne({ email: email, clinic: clinic })
      .then(handleEntityNotFound(res))
      .then(user => {
        if (!user) next();
        return res.status(400).send('User already invited in selected clinic');
      })
      .catch(handleError(res));
  },
  checkInUsers: async (req, res, next) => {
    const { body: { email } } = req;

    await User.findOne({ email: email }, {include: [Institution]})
      .then(handleEntityNotFound(res))
      .then(user => {
        if (user) {
         res.send(user);
        }
        next()
      })
      .catch(handleError(res));
  },
  sendInvite: async (req, res, next) => {
    const { body: { email, clinic, invitedBy, access } } = req;

    await Invitation.findOne({ email: email, clinic: clinic })
      .then(handleEntityNotFound(res))
      .then(tempUser => {
        if (tempUser) {
          res.status(500).send('You have already invited that person!')
        }

      })
      .catch(handleError(res))

    const tempUser = await Invitation.build({
      email: email,
      clinic: clinic,
      invitedBy: invitedBy,
      access: access
    });

    let invitationToken = await tempUser.generateToken();

    return await tempUser.save()
      .then(handleEntityNotFound(res))
      .then(tempUser => {

        const mailer = new NodeMailer(tempUser.email);

        const message = {
          username: tempUser.email.split('@')[0],
          invitedBy: tempUser.invitedBy,
          link: `http://localhost:3000/patient-juan/invitations/accept/${invitationToken.token}`
        };

        mailer
          .setTemplate('invitation', message)
          .setSubject(`Welcome to ${tempUser.clinic}`)
          .sendHtml();

        return tempUser;
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  accept: async (req, res) => {
    res.status(301).redirect('http://www.google.com/' + req.params.invitationToken);


    // res.json(req.params.invitationToken);

    // await Invitation.findByPk(payload.id)
    //   .then(handleEntityNotFound(res))
    //   .then(tempUser => {
    //     const email = tempUser.email;
    //     const access = tempUser.access;
    //     const clinic = tempUser.clinic;

    //     tempUser.status = 'approved';
    //     return tempUser.save()
    //       .then(updated => {
    //         console.log(updated);
    //         return res.status(301).redirect(`http://localhost:3000/patient-juan/${email}/${access}/${clinic}`);
    //       })
    //       .catch(err => res.status(500).send(err));
    //   })
    //   .catch(handleError(res));
  },
  nextOne: (req, res, next) => {
    console.log('This is req1', req.body);
    const newEmail = 'liandra@gmail.com';
    res.locals.anotherEmail = newEmail;
    next()
  },
  nextThree: (req, res, next) => {
    console.log('This is req3', req.body)
    res.send(req.body);
  },
  nextTwo: (req, res, next) => {
    console.log('This is req2', JSON.stringify(res.locals));
    next();
  }
}

module.exports = controller;