const router = require('express').Router();
const {loggingMiddleware, sessionVerify }= require('../middleware/middleware')
const {getPost, addPost, assignPost ,register, login} = require('../controllers/postController');


router.post('/login', login)
router.post('/register', register);

router.get('/',sessionVerify, getPost)
router.post('/',sessionVerify, addPost)
router.put('/:title',sessionVerify, assignPost)

module.exports = router;



