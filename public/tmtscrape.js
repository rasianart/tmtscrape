function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

httpGetAsync('/data', function(data) {
  data = JSON.parse(data);
  console.log(data.length);
  for (var x = 0; x < data.length; x++) {
    $('#content').append('<iframe class="bandcamp_embed" src="' + data[x] + '"></iframe>');
  }
})
