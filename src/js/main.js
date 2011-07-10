YUI().use('node', function(Y) {
  var map = Y.one('.brian-map');
  map.on('click', function(e) {
    Y.log(e.clientX);
    Y.log(e.clientY);
	var child = Y.Node.create('<div class="brian-map-element" class="textbox" style="left: '+e.clientX+'px; top: '+e.clientY+'px"><input type="text" /></div>');
    //map.append('<div class="brian-map-element" class="textbox" style="left: '+e.clientX+'px; top: '+e.clientY+'px"><input type="text" /></div>');
console.log(child);
child.children.item(0).focus(true);
    map.append(child);
	
  });
});
