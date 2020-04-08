const Queue = require('./queue.model');

const controller = {
  getAll: async (req, res) => {
    const { query: { type } } = req;
    const { query: { status } } = req;

    const scopes = [];
    if (type) scopes.push({ method: ['type', type] });
    if (status) scopes.push({ method: ['status', status] });

    return await Queue
      .scope(scopes, 'patient')
      .findAll()
      .then(queues => {

        res.send(queues);
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      });
  },
  getOne: async (req, res) => {
    const { params: { queueId } } = req;
    return await Queue.findOne({ where: { queueId: queueId } })
      .then(queue => {
        console.log(Object.keys(queue.__proto__))
        res.send(queue);
      })
      .catch(err => res.send(500, err))
  },
  create: async (req, res) => {
    return await Queue.create(req.body)
      .then(queue => res.send(queue))
      .catch(err => res.status(500).send(err));
  }
}

module.exports = controller;