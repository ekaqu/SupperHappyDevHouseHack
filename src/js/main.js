YUI().use('node', 'io', function(Y) {
  var map = Y.one('.brian-map');
  map.on('click', function(e) {
    var child = Y.Node.create('<input class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px" type="text"></input>');
    map.append(child);
    child.focus();
    child.on('keypress', function(press) {
      if(press.keyCode == 13) {
        var text = child.get('value');
        map.append('<div class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px">'+text+'</div>');
        child.remove();

        // call backend
        Y.io('http://192.168.190.121/backend.php', {
          method: "POST",
          data: {
            word: text,
            x: e.clientX,
            y: e.clientY
          },
          headers: {
            'Content-Type': 'application/json'
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
});
