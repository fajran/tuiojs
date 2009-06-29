
tuio.setConnector({
	_failmsg: "Unable to initialize npTuioClient plugin.",
	_id: "__tuiojs_connector_npTuioClient",

	start: function() {
		var el = document.getElementById(this._id);
		if (el == undefined) {
			var el = document.createElement('object');
			el.setAttribute('id', this._id);
			el.setAttribute('type', 'application/x-tuio');
			el.appendChild(document.createTextNode(this._failmsg));
			document.body.appendChild(el);
		}

		// TODO: check if the plugin can be loaded. 
		//       if so, hide the plugin (display:none).
	},

	stop: function() {
		var el = document.getElementById(this._id);
		if (el != undefined) {
			document.body.removeChild(el);
		}
	}
});

function tuio_callback(type, sid, fid, x, y, angle)  {
	tuio.callback(type, sid, fid, x, y, angle);
}

