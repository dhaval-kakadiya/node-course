const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const dashboardRouter = require('./dashboardRouter')

router.use('/', authRouter)
router.use('/dashboard',dashboardRouter)
router.use('/user', userRouter)

module.exports = router
