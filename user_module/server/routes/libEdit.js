const fs = require('fs');
const news = require("../public/Data/news.json");
const lib = require("../public/Data/users.json");
const users = require("../public/Data/users.json");

function addUser(mail, password, bday, name) {
    const lib = require('../public/Data/users.json');
    let id = parseInt(Object.keys(lib).pop()) + 1;
    let data = {
        name: name,
        mail: mail,
        password: password,
        bday: bday,
        img: "1.jpg",
        role: "1",
        status: "1",
        friends: [
        ],
        news: [
        ]
    };
    lib[id] = data;
    fs.writeFileSync('./public/Data/users.json', JSON.stringify(lib));
    return id;
}

function getNews(token, type) {
    const news = require('../public/Data/news.json');
    const users = require('../public/Data/users.json');
    let user = users[token];
    let news_source = [];
    if (type === 'friends')
        news_source = user.friends;
    else
        news_source = [token];

    let data = [];
    for (key in news) {
        if (news_source.indexOf(news[key].author) !== -1){
            data.push(news[key]);
        }
    }
    return data;
}

function addPost(token, text) {
    const news = require('../public/Data/news.json');
    const users = require('../public/Data/users.json');

    let postId = 0;
    if (Object.keys(news).pop())
        postId = parseInt(Object.keys(news).pop()) + 1;
    users[token].news.push(postId);
    fs.writeFileSync('./public/Data/users.json', JSON.stringify(users));

    postData = {
        author: token,
        authorName: users[token].name,
        text: text
    }
    news[postId] = postData;
    fs.writeFileSync('./public/Data/news.json', JSON.stringify(news));
}

function getFriends(token){
    const users = require('../public/Data/users.json');
    const friends = users[token].friends;
    let data = [];
    for (let id of friends) {
        data.push({
            friendToken: id,
            friendName: users[id].name
        });
    }
    return data;
}

exports.getFriends = getFriends;
exports.addPost = addPost;
exports.getNews = getNews;
exports.addUser = addUser;