import tuio
import stomp

s = stomp.Connection()
s.start()
s.connect()

cnt = 0

current = []
ld = {}

t = tuio.Tracking()
try:
	while True:
		t.update()

		active = []
		for c in t.cursors():
			active.append(c.sessionid)

		tbr = []
		for c in current:
			if c not in active:
				tbr.append(c)

		tba = []
		for c in active:
			if c not in current:
				tba.append(c)

		current = active

		for c in tbr:
			d = ld[c]
			# cursor removed = 5
			s.send("5 %d %d %f %f 0" % (c, c, d[1], d[2]), destination="/topic/home")
			ld.pop(c)

		# for c in tba:
		# 	s.send("C N %d" % c, destination="/topic/home")

		for c in t.cursors():
			data = (c.sessionid, c.sessionid, c.xpos, c.ypos)
			if not ld.get(c.sessionid, None) == data:
				if c.sessionid in tba:
					# cursor new = 3
					msg = "3 %d %d %f %f 0" % data
				else:
					# cursor update = 4
					msg = "4 %d %d %f %f 0" % data
				s.send(msg, destination="/topic/home")
				ld[c.sessionid] = data
				cnt += 1

except KeyboardInterrupt:
	t.stop()

