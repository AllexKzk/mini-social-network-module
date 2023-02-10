const fs = require('fs');
const lib = require("../public/Data/users.json");

function addUser(mail, password, bday, name) {
    const lib = require('../public/Data/users.json');
    let id = parseInt(Object.keys(lib).pop()) + 1;
    let data = {
        name: name,
        mail: mail,
        password: password,
        bday: bday,
        img: "1.jpg",
        role: "2",
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
module.exports.addUser = addUser;

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
module.exports.getNews = getNews;

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
module.exports.getFriends = getFriends;

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

module.exports.addPost = addPost;

function delFriend(userId, friendId){
    const lib = require("../public/Data/users.json");
    let user = lib[userId];
    user.friends.splice(user.friends.indexOf(friendId), 1);

    lib[userId] = user;
    fs.writeFileSync('./public/Data/users.json', JSON.stringify(lib));
}
module.exports.delFriend = delFriend;

function updateAvatar(id, fields, files){
    const lib = require('../public/Data/users.json');
    console.log(files);
    if (files.avatar[0].size) {
        fs.rename(files.avatar[0].path, './public/images/' + id + '.jpg', function (err) {
            if (err) throw err;
        });
        console.log("NEW IMG: " + files.avatar[0].path);
        lib[id].img = id + '.jpg';
    }
    fs.writeFileSync('./public/Data/users.json', JSON.stringify(lib));
}
module.exports.updateAvatar = updateAvatar;

function editUser(fields, files) {
    const lib = require('../public/Data/users.json');
    let id = fields.id;

    lib[id].name = fields.userName;
    lib[id].bday = fields.date;
    lib[id].mail = fields.mail;
    console.log(files.avatar[0].size);
    if (files.avatar[0].size) {
        fs.rename(files.avatar[0].path, './public/images/' + id + '.jpg', function (err) {
            if (err) throw err;
        });
        lib[id].img = id + '.jpg';
    }
    console.log(lib);
    fs.writeFileSync('./public/Data/users.json', JSON.stringify(lib));
}

module.exports.editUser = editUser;