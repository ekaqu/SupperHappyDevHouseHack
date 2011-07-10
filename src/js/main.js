YUI().use('node', function(Y) {
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
      }
    });
  });
});
