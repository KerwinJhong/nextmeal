const { ensureAuthenticated, isAuthAdmin, getUser } = require('../config/auth')
const mainRoute = require('./mainRoute')
const restRoute = require('./restRoute')
const userRoute = require('./userRoute')
const ownerRoute = require('./ownerRoute')
const adminRoute = require('./adminRoute')

module.exports = (app) => {
  app.use('/api', mainRoute)
  app.use('/api/restaurants', restRoute)
  app.use('/api/users', userRoute)
  app.use('/api/admin', adminRoute)
  app.use('/api/owner', ownerRoute)
}