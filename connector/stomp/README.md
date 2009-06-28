TUIOjs
======

A TUIO gateway for javascript.

Data flow
---------

The data flow can be illustrated more or less like the following.

    Tracker =[tuio]=> gateway => message queue =[stomp/http]=> browser.

Requirements
------------

- [orbited](http://orbited.org/)
- [pytuio](http://code.google.com/p/pytuio/)
- [stompy](http://code.google.com/p/stomppy/)
- [jquery](http://jquery.org)
- a fast browser. Tested with safari 4 on mac os x tiger.

Screencast
----------

<http://www.screencast.com/t/6ACXWUph>


