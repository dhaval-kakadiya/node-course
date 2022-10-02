const express = require('express')
const router = express.Router()


const {addUser, getUser, getUserById, updateUser, deleteUser } = require('../controllers/userController')

// <<<<<<<<<<< MAIN GET-PUT-DELETE ROUTES WITH AUTHENTICATE >>>>>>>>>>>>>>>>
router.post('/adduser', addUser)
// router.get('/', addUserget)
router.get('/', getUser)
router.get('/:id', getUserById)
router.post('/:id', updateUser)
router.get('/delete-user/:id', deleteUser)

module.exports = router