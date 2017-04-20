import express from 'express';
const router = express.Router();

// import usersRoute from './users'

const ensureAdminAuthenticated = (req, res, next) => {
  if(req.decoded) next()
  // else res.status(401).end()
  else res.status(403).json({ success: false, message: 'No token provided.' })
};

router.get('/visitor-data', (req, res, next) => res.json({ success: true }))

// //anything below this users need to be authenticated
router.use('/', ensureAdminAuthenticated)

router.get('/protected-data', (req, res, next) => res.json({ success: true }))


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

export default router
