const knex = require('../connection');

const getTasks = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const allTasks = await knex('tasks').where({ user_id: userId });

    return res.status(200).json(allTasks);

  } catch (error) {
    return res.status(500).json({ message: `${error.message}` })
  }
}

module.exports = getTasks;