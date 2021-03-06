require('dotenv').config()
import chalk from 'chalk'
import path  from 'path'
import util from 'util'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import httpProxy from 'http-proxy'
// import { renderToString } from 'react-dom/server'
// import { match, RouterContext } from 'react-router'

// import appRoutes from '../../browser/pages/index'
// import NotFoundPage from '../../browser/pages/NotFoundPage'
import authentication from './authentication'
import routes from './routes/index'
import bundle from '../dev-bundle'

const isProduction = process.env.NODE_ENV === 'production'
const rootPath = path.join(__dirname, '../../')
const indexPath = isProduction ? path.join(rootPath, './server/dist/index.html') : path.join(rootPath, './server/dist/dev-index.html')

console.log('INDEX___PATH______________', indexPath)

// const faviconPath = path.join(rootPath, './server/app/views/favicon.png')
const app = express()

const AppPipeline = (db) => {

  app.use(express.static(path.join(rootPath, './server/dist')));

  // Parsing
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.set('view engine', 'ejs')
  // app.set('views', path.join(__dirname, '../dist'));

  if (!isProduction) {
    console.log('---------- NOT PRODUCTION -------------')
    const proxy = httpProxy.createProxyServer({changeOrigin: true})
    bundle()

    app.use(logMiddleware)
    app.get('/*.js', (req, res) => {
      console.log('request for webpack-dev-server')
      proxy.web(req, res, { target: 'http://localhost:8080'})
    })

    proxy.on('error', function(e) {
      console.log('Could not connect to proxy, please try again...')
    })
  } else {
    console.log('######### - IS PRODUCTION - #########')
  }

  // connect auth to app
  authentication(app, db)

  // Static stuff
  // app.use(favicon(app.getValue('faviconPath')));

  app.use('/api', routes)
  app.use(ErrorCatchingMiddleWare)
  app.get('/*', (req, res) => {
    console.log('HEREH YET???')
    // match({routes: appRoutes(), location: req.url},
    //   (err, redirectLocation, renderProps) => {
    //     if(err) return res.status(500).send(err.message)
    //     if(redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    //     let markup
    //     if(renderProps) {
    //       markup = renderToString(<RouterContext {...renderProps}/>)
    //     } else {
    //       markup = renderToString(<NotFoundPage/>)
    //       res.status(404)
    //     }

    //     return res.render('index', { markup })
    //   }
    // )
    return res.sendFile(indexPath)
  })
  app.use(ErrorCatchingEndWare)

  return app
}


const logMiddleware = (req, res, next) => {
    util.log(('---NEW REQUEST---'))
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path))
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)))
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)))
    next()
}

// 404s for asset files not found
const ErrorCatchingMiddleWare = (req, res, next) => {
  if(path.extname(req.path).length > 0) {
    let err = new Error('File Not Found')
    err.status = 404
    next(err)
  } else {
    next()
  }
}

const ErrorCatchingEndWare = (db) => {
  app.use((err, req, res, next) => {
    console.log(chalk.red(err))
    console.log(chalk.red(err.stack))
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

export default AppPipeline
