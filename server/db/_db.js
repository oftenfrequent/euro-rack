require('dotenv').config()
import Sequelize from 'sequelize'

if (!process.env.DATABASE_URI) {
	console.error('You must configure your .env file properly first')
	console.error('See .env.example for an example of how to get started')
	process.exit()
}

const db = new Sequelize(process.env.DATABASE_URI, {
  logging: process.env.NODE_ENV != 'production' ? console.log : false,
  native: false
});

export default db
