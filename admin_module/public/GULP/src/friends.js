$.getJSON("/Data/users.json", lib => loadFriends(lib, window.location.href.split('-')[1]));
function loadFriends(lib, id) {
  $('#title').text('Список друзей ' + lib[id].name);
  friends_of_id = {};
  for (let friend_id of lib[id].friends) friends_of_id[friend_id] = lib[friend_id];
  console.log(friends_of_id);
  setUsers(friends_of_id);
}