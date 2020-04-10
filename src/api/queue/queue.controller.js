const Queue = require('./queue.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const moment = require('moment');

const view = (data) => {
  const queue = {
    queueId: data.queueId,
    institutionId: data.institutionId,
    doctorId: data.doctorId,
    patientId: data.patientId,
    date: moment(data.date).format('MMMM DD, YYYY'),
    queueNumber: data.queueNumber,
    type: data.type,
    status: data.status,
    reason: data.reason,
    patient: `${data.patient.firstName} ${data.patient.lastName}`,
    createdAt: moment(data.createdAt).format('MMMM DD, YYYY')
  }

  return queue;
}

const controller = {
  getAll: async (req, res) => {
    return await Queue
      .scope('patient')
      .findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getOne: async (req, res) => {
    const { params: { queueId } } = req;
    return await Queue
      .scope('patient')
      .findOne({ where: { queueId: queueId } })
      .then(handleEntityNotFound(res, 'Queue'))
      .then(queue => {
        // console.log(Object.keys(queue.__proto__))
        res.send(queue);
      })
      .catch(handleError(res));
  },
  getScopes: async (req, res) => {
    const { query: { type, status, doctorId, institutionId, current } } = req;

    const scopes = [];
    if (type) scopes.push({ method: ['type', type] });
    if (status) scopes.push({ method: ['status', status] });
    if (doctorId) scopes.push({ method: ['doctor', doctorId] });
    if (institutionId) scopes.push({ method: ['institution', institutionId] })
    if (current) scopes.push('current')

    return await Queue
      .scope(scopes, 'patient')
      .findAll()
      .then(queues => {
        res.status(200).send(queues.map(queue => { return view(queue) }))
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      });
  },
  create: async (req, res) => {

    return await Queue.count({ where: { date: req.body.date, type: req.body.type } })
      .then(count => {
        const queueNumber = count + 1;

        return Queue.create(req.body)
          .then(queue => {
            queue.queueNumber = queueNumber;
            queue.save();
            return queue
          })
          .catch(handleError(res));
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  count: async (req, res) => {

    Queue.count({ where: { date: new Date() } })
      .then(count => {
        return res.json(`There are ${count} items`);
      })
      .catch(handleError(res));
  }
}

module.exports = controller;