const knex = require('../connection');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

  try {

    const userExist = await knex('users').where({ email }).first();
    if (userExist) return res.status(400).json({ message: 'Email já cadastrado' });

    const pw = await bcrypt.hash(password, 10)

    const user = await knex('users').insert({
      name,
      email,
      password: pw
    }).returning('*');

    return res.status(200).json(user[0])

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = signUp;