
(function() {
	var TUIO = function() {
		// Listener class

		this.Listener = function(impl) {
			if (impl != undefined) {
				// override original method implementation
				for (var key in impl) {
					this[key] = impl[key];
				}
			}
		}
		this.Listener.prototype = {
			object_add:    function(data) { },
			object_update: function(data) { },
			object_remove: function(data) { },
			cursor_add:    function(data) { },
			cursor_update: function(data) { },
			cursor_remove: function(data) { }
		}

		// Instance variables

		this.objects = [];
		this.cursors = [];

		this._data = {};

		this._default_listener = new this.Listener();
		this._listeners = [this._default_listener];

		this._connector = undefined;

	};
	TUIO.prototype = {
		start: function(name) {
			var c = this._connector;
			if (c != undefined) {
				if (c.start != undefined) {
					c.start();
				}
			}
		},

		stop: function() {
			var c = this._connector;
			if (c != undefined) {
				if (c.stop != undefined) {
					c.stop();
				}
			}
		},

		setConnector: function(connector) {
			this._connector = connector;
		},
		
		addListener: function(listener) {
			this._listeners.push(listener);
		},
		removeListener: function(listener) {
			this._listeners.splice(this._listeners.indexOf(listener), 1);
		},

		_invoke: function(method, data) {
			var i, len = this._listeners.length;
			for (i=0; i<len; i++) {
				var listener = this._listeners[i];
				listener[method](data);
			}
		},

		callback: function(type, sid, fid, x, y, angle) {
			var data;
			
			if ((type != 0) && (type != 3)) {
				data = this._data[sid];
			}
			else {
				data = {
					sid: sid,
					fid: fid,
					path: []
				}
				this._data[sid] = data;
			}

			data.path.push([x, y]);
	
			data.x = x;
			data.y = y;
			
			if (type < 3) {
				data.angle = angle;
			}
	
			switch (type) {
				case 0: 
					this.objects.push(data);
					this._invoke('object_add', data);
					break;
	
				case 1: 
					this._invoke('object_update', data);
					break;
	
				case 2: 
					this.objects.splice(this.objects.indexOf(data), 1);
					this._invoke('object_remove', data);
					break;
	
				case 3: 
					this.cursors.push(data);
					this._invoke('cursor_add', data);
					break;
	
				case 4: 
					this._invoke('cursor_update', data);
					break;
	
				case 5: 
					this.cursors.splice(this.cursors.indexOf(data), 1);
					this._invoke('cursor_remove', data);
					break;
	
				default:
					break;
			}
	
			if ((type == 2) || (type == 5)) {
				delete this._data[sid];
			}
		},

		// Convenient callbacks set

		object_add:    function(f) { this._default_listener.object_add = f;    },
		object_update: function(f) { this._default_listener.object_update = f; },
		object_remove: function(f) { this._default_listener.object_remove = f; },
		cursor_add:    function(f) { this._default_listener.cursor_add = f;    },
		cursor_update: function(f) { this._default_listener.cursor_update = f; },
		cursor_remove: function(f) { this._default_listener.cursor_remove = f; }

	};
	this.tuio = new TUIO(); 
})();

