TUIOjs
======

A TUIO gateway for javascript.

Data flow
=========

The data flow can be illustrated more or less like the following.

    Tracker =[tuio]=> gateway => message queue =[stomp]=> browser.

Requirements
============

- [orbited](http://orbited.org/)
- [pytuio](http://code.google.com/p/pytuio/)
- [stompy](http://code.google.com/p/stomppy/)
- [jquery](http://jquery.org)
- a fast browser. Tested with safari 4 on mac os x tiger.

