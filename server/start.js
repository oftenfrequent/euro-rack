import chalk from 'chalk'
import db from './db'
import ExpressApp from './app'

const port = (process.env.PORT || 3000)

const startServer = () => {
  const app = ExpressApp(db)

  app.listen(port, () => console.log(chalk.green(`Server locked in at port ${port}`)))
}

db.sync()
.then(startServer)
.catch(err => console.log(chalk.red(err.stack)))
