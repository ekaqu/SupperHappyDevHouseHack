YUI().use('node', function(Y) {
  var map = Y.one('.brian-map');
  map.on('click', function(e) {
    Y.log(e.clientX);
    Y.log(e.clientY);
    map.append('<div class="brian-map-element" style="left: '+e.clientX+'px; top: '+e.clientY+'px">MOOO</div>');
  });
});
