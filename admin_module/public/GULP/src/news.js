$.getJSON("/Data/users.json", lib => loadNews(lib, window.location.href.split('-')[1]));
function loadNews(lib, id) {
  $('#title').text('Новости друзей ' + lib[id].name);
  let friends = lib[id].friends;
  $.getJSON("/Data/news.json", news => addNews(lib, news, friends));
}
function addNews(users, news, friends) {
  console.log(friends);
  for (let friend of friends) {
    console.log(users[friend]);
    for (let new_id of users[friend].news) {
      let new_post = news[new_id];
      jQuery('<div>', {
        id: new_id,
        class: 'news-block'
      }).appendTo(document.body);
      let source = 'images/';
      if (users[friend].img) source += users[friend].img;else source += 'usr-def.png';
      jQuery('<img>').attr('src', source).attr('class', 'avatar').appendTo('#' + new_id);
      jQuery('<div>', {
        id: 'text-block' + new_id,
        class: 'text-block'
      }).appendTo('#' + new_id);
      jQuery('<h2>').text(users[friend].name).appendTo('#text-block' + new_id);
      jQuery('<p>').text(new_post.text).appendTo('#text-block' + new_id);
      if (new_post.img) jQuery('<img>').attr('src', new_post.img).attr('class', 'inside-img').appendTo('#' + new_id);
    }
  }
}