const knex = require('../connection');

const editTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { title } = req.body;
  const { id: userId } = req.user;

  try {
    const task = await knex('tasks').where({ id: taskId, user_id: userId });
    if (!task) return res.status(404).json({ message: 'Tarefa não pode ser encontrada' });

    await knex('tasks').where({ id: taskId }).update({
      title: title
    }, ['*']);

    return res.status(200).json({ message: 'Tarefa editada com sucesso' });
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = editTask