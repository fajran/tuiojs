
tuio.connector.add('npTuioClient', {
	init: function() {
		var failmsg = "Unable to initialize npTuioClient plugin.";
		var id = "__tuiojs_connector_npTuioClient";
		var el = document.getElementById(id);
		if (el == undefined) {
			var el = document.createElement('object');
			el.setAttribute('id', id);
			el.setAttribute('type', 'application/x-tuio');
			el.appendChild(document.createTextNode(failmsg));
			document.body.appendChild(el);
		}

		// TODO: check if the plugin can be loaded. 
		//       if so, hide the plugin (display:none).
	}
});

function tuio_callback(type, sid, fid, x, y, angle)  {
	tuio.callback(type, sid, fid, x, y, angle);
}

