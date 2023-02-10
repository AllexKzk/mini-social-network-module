var express = require('express');
const path = require("path");
const fs = require('fs');
var multiparty = require('multiparty');
var router = express.Router();
const libChange = require('./libChange');
const lib = require('../public/Data/users.json');

router.put('/updateimage:num', function (req, res, next){
  let id = req.params.num;
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    libChange.updateAvatar(id, fields, files);
  });
  res.end();
});

router.put('/delfriend', function (req, res, next){
  let data = req.body;
  libChange.delFriend(data.user, data.friend);
  res.end();
});

router.post('/newpost', function (req, res, next){
  const data = req.body;
  libChange.addPost(data.token, data.postText);
  res.end();
});

router.get('/getavatar:num', function (req, res, next){
  let id = req.params.num;
  let userAvatar = lib[id].img;
  console.log("AVATAR: " + userAvatar);
  res.sendFile(path.resolve(__dirname, '../public/images/' + userAvatar));
});

router.post('/reg', function(req, res, next) {
  const data = req.body;
  let userId = libChange.addUser(data.mail, data.password, data.bday, data.name);
  res.json(res.json({
    status: true,
    name: data.name,
    mail: data.mail,
    token: userId,
    role: "1",
    img: ""
  }));
});

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/GULP/index.html'));
});

router.put('/', function (req, res, next){
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    libChange.editUser(fields, files);
  });
  res.end();
});

router.get('/friends-:num', function (req, res, next){
  res.sendFile(path.resolve(__dirname, '../public/GULP/friends.html'));
});

router.put('/friends', function (req, res, next) {
  const params = req.body;
  const friends = lib[params.token].friends;
  res.json(libChange.getFriends(params.token));
});

router.get('/news-:num', function (req, res, next){
  res.sendFile(path.resolve(__dirname, '../public/GULP/news.html'));
});

router.put('/news', function (req, res, next){
  const params = req.body;
  let data = libChange.getNews(params.token, params.type);
  res.json(data);
});

router.put('/edituser', function (req, res, next){
  let data = req.body;
  console.log(data);
  fs.writeFileSync(path.resolve(__dirname, '../public/Data/users.json'), JSON.stringify(data));
  res.end();
});

router.post('/login', function (req, res, next) {
  const data = req.body;
  for (let id in lib) {
    if (lib[id].mail === data.mail && lib[id].password === data.password){
      res.json({
        status: true,
        name: lib[id].name,
        mail: lib[id].mail,
        token: id,
        role: lib[id].role,
        avatar: lib[id].img
      });
      return;
    }
  }
  res.json({
    status: false,
    name: null,
    mail: null,
    token: null
  });
});

module.exports = router;
