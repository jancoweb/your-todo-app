const knex = require('../connection');

const addTask = async (req, res) => {
  const { title } = req.body;
  const { id: userId } = req.user
  try {

    const newTask = await knex('tasks').insert({ title, user_id: userId }).returning('*');

    return res.status(200).json(newTask);

  } catch (e) {
    return res.status(400).json({ message: `${e.message}` })
  }
}

module.exports = addTask;