const knex = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogged = await knex('users').where({ email }).first();
    if (!userLogged) return res.status(404).json({ message: 'Usuário não encontrado!' });

    const pw = await bcrypt.compare(password, userLogged.password);
    if (pw == false) return res.status(401).json({ message: 'Email ou senha incorretos' });

    const token = jwt.sign({ id: userLogged.id }, process.env.JWT_SECRET);

    const user = {
      id: userLogged.id,
      name: userLogged.name,
      email: userLogged.email
    }

    const response = { user, token };

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json({ message: `${error.message}` })
  }
}

module.exports = login;