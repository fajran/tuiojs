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
			s.send("C R %d %f %f" % (c, d[1], d[2]), destination="/topic/home")
			ld.pop(c)

		# for c in tba:
		# 	s.send("C N %d" % c, destination="/topic/home")

		for c in t.cursors():
			data = (c.sessionid, c.xpos, c.ypos)
			if not ld.get(c.sessionid, None) == data:
				if c.sessionid in tba:
					msg = "C N %d %f %f" % data
				else:
					msg = "C U %d %f %f" % data
				s.send(msg, destination="/topic/home")
				ld[c.sessionid] = data
				cnt += 1
				print cnt
				print "[cursor] [%d] (%f, %f) (%f, %f) %f" % (c.sessionid, c.xpos, c.ypos, c.xmot, c.ymot, c.mot_accel)
except KeyboardInterrupt:
	t.stop()

