var express = require('express');
var router = express.Router();
const libEdit = require('./libEdit');
const lib = require("../public/Data/users.json");

router.post('/newpost', function (req, res, next){
  const data = req.body;
  libEdit.addPost(data.token, data.postText);
  res.end();
});

router.post('/reg', function(req, res, next) {
  const data = req.body;
  let userId = libEdit.addUser(data.mail, data.password, data.bday, data.name);
  res.json(res.json({
    status: true,
    name: data.name,
    mail: data.mail,
    token: userId,
    role: "1"
  }));
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
        role: lib[id].role
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

router.put('/news', function (req, res, next){
  const params = req.body;
  let data = libEdit.getNews(params.token, params.type);
  res.json(data);
});

router.put('/friends', function (req, res, next) {
  const params = req.body;
  const friends = lib[params.token].friends;
  res.json(libEdit.getFriends(params.token));
});

module.exports = router;
