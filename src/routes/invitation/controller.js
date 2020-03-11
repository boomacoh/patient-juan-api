const Invitation = require('../../models/invitation.model');
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
  invite: async (req, res) => {
    const { body: { email, clinic, invitedBy, access } } = req;

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
  }
}

module.exports = controller;