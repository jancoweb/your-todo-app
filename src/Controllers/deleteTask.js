const knex = require('../connection');

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;

  try {

    const task = await knex('tasks').where({ id: taskId, user_id: userId });
    if (!task) return res.status(404).json({ message: 'Não foi possível encontrar a task' })

    await knex('tasks').delete().where({ id: taskId });

    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = deleteTask