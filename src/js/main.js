YUI().use('json','node', 'io', 'querystring-stringify-simple', 'querystring', function(Y) {
  var map = Y.one('.brian-map');

  // when user clicks, add an input
  map.on('click', function(e) {
    var child = Y.Node.create('<input class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px" type="text"></input>');
    map.append(child);
    child.focus();
    child.on('keypress', function(press) {
      if(press.keyCode == 13) {
        var text = child.get('value');
        map.append('<div class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px">'+text+'</div>');
        child.remove();

          Y.log(Y.QueryString.stringify({
            word: text,
            x: e.clientX,
            y: e.clientY
          }));
        // call backend
        Y.io('server/backend.php', {
          method: 'POST',
          data: {
            word: text,
            x: e.clientX,
            y: e.clientY
          },
          on: {
            complete: function(id,rsp,err) {
              Y.log(id);
              Y.log(rsp.responseText);
              Y.log(err);
            }
          }
        });
      }
    });
  });
  
  // fetch data and post it on the site
  var largestId = 0;
  function reloadAll() {
    Y.log(largestId);
    Y.io('server/backend.php?from=' + largestId, {
      on : {
        complete: function(id, rsp, err) {
          var words = Y.JSON.parse(rsp.responseText);
          Y.each(words, function(word) {
            Y.log(word);
            map.append('<div class="brian-map-element" style="left: '+word.x+'px; top: '+word.y+'px">'+word.word+'</div>');
            largestId = word.id;
            Y.log(largestId);
          });
          Y.log(largestId);
        }
      }
    });
  }
  setInterval(reloadAll, 1000);
});
