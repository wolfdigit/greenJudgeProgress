var gistId = "136d79db156bc623f101b2903c8a866f";
var username = "wolfdigit-bot";
var password = "b68c1ce5a959d9c01fec18aa361087dbdaaa7892";

var gistCache = null;
function getGist(callback) {
  if (gistCache) return callback(gistCache);
  $.ajax({
    method: "GET",
    url: "https://api.github.com/gists/"+gistId,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    }
  })
    .done(function(data) {
      gistCache = data;
      callback(data);
    });
}

function getFile(filename, callback) {
  getGist(function(gist) {
    if (gist['files'][filename]) {
      callback(gist['files'][filename]['content']);
    }
    else {
      callback(null);
    }
  });
}

function putFile(filename, data, callback) {
  obj = {files:{}};
  obj['files'][filename] = {content: data};
  gistCache = null;
  $.ajax({
    method: "PATCH",
    url: "https://api.github.com/gists/"+gistId,
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    }
  })
    .done(function(data) {
      gistCache = data;
      if (callback) callback(data);
    });
}