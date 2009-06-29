
// add hooks
(function(){
this.Processing.addTuioObject    = undefined;
this.Processing.updateTuioObject = undefined;
this.Processing.removeTuioObject = undefined;
this.Processing.addTuioCursor    = undefined;
this.Processing.updateTuioCursor = undefined;
this.Processing.removeTuioCursor = undefined;
})();

(function(){

var tuio = this.tuio;

function wrapPath(d) {
	var i, len = d.path.length;
	var res = [];
	for (i=0; i<len; i++) {
		var pos = d.path[i];
		res.push({
			getX: function() { return pos[0]; },
			getY: function() { return pos[1]; },

			getScreenX: function(width) { return width * pos[0]; },
			getScreenY: function(height) { return height * pos[1]; },
		});
	}
	return res;
}

function wrapObject(d) {
	return {
		getSessionID: function() { return d.sid; },
		getSymbolID: function() { return d.fid; },
		getX: function() { return d.x; },
		getY: function() { return d.y; },
		getAngle: function() { return d.angle; },

		getScreenX: function(width) { return width * d.x; },
		getScreenY: function(height) { return height * d.y; },

		getPath: function() { return wrapPath(d); },
	};
}

function wrapCursor(d) {
	return {
		getSessionID: function() { return d.sid; },
		getCursorId: function() { return d.fid; },
		getX: function() { return d.x; },
		getY: function() { return d.y; },

		getScreenX: function(width) { return width * d.x; },
		getScreenY: function(height) { return height * d.y; },

		getPath: function() { return wrapPath(d); },
	};
}

tuio.TuioProcessing = function(p) {
	var listener = new tuio.Listener({
		object_add:    function(d) { if (p.addTuioObject)    p.addTuioObject(wrapObject(d));    },
		object_update: function(d) { if (p.updateTuioObject) p.updateTuioObject(wrapObject(d)); },
		object_remove: function(d) { if (p.removeTuioObject) p.removeTuioObject(wrapObject(d)); },
		cursor_add:    function(d) { if (p.addTuioCursor)    p.addTuioCursor(wrapCursor(d));    },
		cursor_update: function(d) { if (p.updateTuioCursor) p.updateTuioCursor(wrapCursor(d)); },
		cursor_remove: function(d) { if (p.removeTuioCursor) p.removeTuioCursor(wrapCursor(d)); }
	});
	tuio.addListener(listener);
	tuio.start();
};

tuio.TuioProcessing.prototype = {
	getTuioObjects: function() {
		var res = [];
		var i, len = tuio.objects.length;
		for (i=0; i<len; i++) {
			res.push(wrapObject(tuio.objects[i]));
		}
		return res;
	},

	getTuioCursors: function() {
		var res = [];
		var i, len = tuio.cursors.length;
		for (i=0; i<len; i++) {
			res.push(wrapCursor(tuio.cursors[i]));
		}
		return res;
	}
};

})();

