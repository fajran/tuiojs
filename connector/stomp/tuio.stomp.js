
tuio.connector.add('stomp', {

	_host: 'localhost',
	_port: 61613,
	_user: 'guest',
	_pass: 'guest',
	_topic: '/topic/home',

	_client: undefined,

	start: function() {
		var self = this;
		var sc = new STOMPClient();
		self._client = sc;

		sc.onopen = function() {
		}
		sc.onclose = function(code) {
		}
		sc.onerror = function(err) {
		}
		sc.onerrorframe = function(frame) {
		}
		sc.onconnectedframe = function() {
			sc.subscribe(self._topic, {exchange:''});
		}
		sc.onmessageframe = function(frame) {
			self._process(frame.body.split(" "));
		}
		setTimeout(function() {
			sc.connect(self._host, self._port, self._user, self._pass);
		}, 10);
	},

	stop: function() {
		this._client.reset();
	},

	_process: function(data) {
		var type = parseInt(data[0]);
		var sid = parseInt(data[1]);
		var fid = parseInt(data[2]);
		var x = parseFloat(data[3]);
		var y = parseFloat(data[4]);
		var angle = parseFloat(data[5]);

		tuio.callback(type, sid, fid, x, y, angle);
	}
});
