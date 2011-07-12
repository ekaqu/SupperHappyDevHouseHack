YUI().use('json','node', 'io', 'querystring-stringify-simple', 'querystring', function(Y) {
  var map = Y.one('.brian-map'),
    child, 
    largestId = 0;

  // when user clicks, add an input
  map.on('click', function(e) {
    // if user clicks someplace else, remove the last input
    if(child) child.remove();
    child = Y.Node.create('<input class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px" type="text"></input>');
    map.append(child);
    child.focus();
    child.on('keypress', function(press) {
      if(press.keyCode == 13) { // if spacebar
        var text = child.get('value');
        child.remove();

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
              largestId = rsp.responseText;
              insertElement(map,e.clientX,e.clientY,text);
            }
          }
        });
      }
    });
  });

  function insertElement(map, x, y, word) {
    map.append('<div class="brian-map-element" style="left: '+ x +'px; top: '+ y +'px">'+ word +'</div>');
  }
  
  // fetch data and post it on the site
  function reloadAll() {
    Y.io('server/backend.php?from=' + largestId, {
      on : {
        complete: function(id, rsp, err) {
          var words = Y.JSON.parse(rsp.responseText);
          Y.log(words);
          Y.each(words, function(word) {
            insertElement(map,word.x,word.y,word.word);
            largestId = word.id;
          });
          Y.log(largestId);
        }
      }
    });
  }
  reloadAll();
  setInterval(reloadAll, 5000);
});
