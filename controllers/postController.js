const bcrypt = require('bcrypt')
const { getAllPosts, createPost, updatePost, registerUsers, getAllUsers} = require('../models/post.js');


const getPost = (req,res) => {
    let post = getAllPosts();
    res.send(post);
}

const addPost = (req,res) => {
    let newpost = req.body;
    console.log(newpost);
    let post = createPost(newpost)
    res.status(201).send(post);
}

const assignPost = (req, res) => {
    const posts = getAllPosts();
    const postTitle = req.params.title;
    const auth = req.body.author;
    let output = updatePost(postTitle,auth)
    res.send(output);
}


const register = (req,res) => {
    const newUser = req.body;
    const hashedPassword = bcrypt.hashSync(newUser.password,10)
    newUser.password = hashedPassword;
    // console.log(newUser)
    try{
    let user = registerUsers(newUser);
    res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
}

const login = (req,res) => {
    const users = getAllUsers()
    // const logger = req.body;
    const user = users.find(x => x.email === req.body.email )
    if(!user){
        res.status(400).send('Invalid email')
    }else{
        if(bcrypt.compareSync(req.body.password , user.password)){
            req.session.user = user
            res.status(200).send(`welcome ${user.name}`)
        }else {
            res.status(400).send('Invalid password')
        }
    }
}
module.exports = {
    getPost,
    addPost,
    assignPost,
    register,
    login
}