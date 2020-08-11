const Queue = require('./queue.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const moment = require('moment');

const view = (data) => {
  const queue = {
    id: data.id,
    institutionId: data.institutionId,
    physicianId: data.physicianId,
    patientId: data.patientId,
    date: moment(data.date).format('MMMM DD, YYYY'),
    queueNumber: data.queueNumber,
    type: data.type,
    status: data.status,
    reason: data.reason,
    patient: `${data.patient.firstName} ${data.patient.lastName}`,
    createdAt: moment(data.createdAt).format('MMMM DD, YYYY'),
    updatedAt: data.updatedAt
  }

  return queue;
}

const controller = {
  getAll: (req, res) => {
    return Queue
      .scope('patient')
      .findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Queue
      .scope('patient')
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Queue'))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getScopes: (req, res) => {
    const { query: { type, status, physicianId, institutionId, current } } = req;

    const scopes = [];
    if (type) scopes.push({ method: ['type', type] });
    if (status) scopes.push({ method: ['status', status] });
    if (physicianId) scopes.push({ method: ['physician', physicianId] });
    if (institutionId) scopes.push({ method: ['institution', institutionId] })
    if (current) scopes.push('current')

    return Queue
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
  update: (req, res) => {
    const { params: { id } } = req;
    return Queue
      .update(req.body, { where: { id: id } })
      .then(() => res.json('queue Updated'))
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const queueData = req.body;
    const { payload: { userId } } = req;
    queueData.physicianId = userId;
    return Queue
      .count({ where: { date: queueData.date, type: queueData.type, institutionId: queueData.institutionId } })
      .then(count => {
        queueData['queueNumber'] = count + 1;
        return Queue.create(queueData);
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },

}

module.exports = controller;