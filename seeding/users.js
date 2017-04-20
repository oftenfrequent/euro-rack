import db from '../server/db/_db'
import chalk from 'chalk'
// get models for seeding
import User from '../server/db/models/user'

db.authenticate()
	.then( () => User.findAll() )
	.then( users => !users.length ? createUsers() : [] )
	.then( newUsers => {
		if (newUsers.length) console.log(chalk.green('Users seeded!'))
		else console.log(chalk.blue('Users already exist!'))
		process.exit(0)
	})
  .catch(err => {
    console.log('Unable to connect to the database:', err)
    process.exit(1)
  })

const createUsers = () => {
	const users = [
		{email: 'asd@asd', password: 'asdf', firstName: 'Adminguy', lastName: 'Shrouder', admin: true},
		{email: 'blah@bleh', password: 'blah', firstName: 'Stephen', lastName: 'Purlicker'}

	]

	const addUsers = users.map(user => User.create(user))
	return Promise.all(addUsers)
}