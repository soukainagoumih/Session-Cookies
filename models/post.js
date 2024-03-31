const fs = require('fs');
const express = require('express');



const registerUsers =  (user) => {
    const users = getAllUsers();
    if(users.find(x => x.email === user.email)) {
        throw new Error()
    }else {
        users.push(user)
        fs.writeFileSync('./models/user.json', JSON.stringify(users))
        return users;
    }
}




// const getAllPosts = (PATH) => {
//     let read = fs.readFileSync(PATH, 'utf8');
//     let posts = JSON.parse(read);
//     return posts;
// }

const getAllPosts = () => {
    let read = fs.readFileSync('./models/posts.json', 'utf8');
    let posts = JSON.parse(read);
    return posts;
}

const getAllUsers = () => {
    let read = fs.readFileSync('./models/user.json', 'utf8');
    let posts = JSON.parse(read);
    return posts;
}

const createPost = (post) => {
    let posts = getAllPosts();
    posts.push(post);
    console.log(posts);
    fs.writeFileSync('./models/posts.json', JSON.stringify(posts))
    //return posts;
}

const updatePost = (title, updateValue) => {
    let posts = getAllPosts();
    let index = posts.findIndex(post => post.title === title)
    if(index === -1) {
        return "it doesn't exist"
    }
    posts[index].author = updateValue
    console.log(posts[index])
    
    // console.log(posts);
    fs.writeFileSync('./models/posts.json', JSON.stringify(posts))

    return posts
}


module.exports = {getAllPosts , createPost, updatePost, registerUsers, getAllUsers}