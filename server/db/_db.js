require('dotenv').config()
import Sequelize from 'sequelize'

const db = new Sequelize(process.env.DATABASE_URI, {
  logging: process.env.NODE_ENV != 'production' ? console.log : false,
  native: false
});

export default db
