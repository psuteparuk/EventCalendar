/* Calendar Model */

var Calendar = function(events) {
  this.events = [];
  this.setEvents(events || []);
};

Calendar.prototype.setEvents = function(events) {
  this.events = [];
  events.forEach(function(ev) {
    this.events.push(new Event(ev.start, ev.end));
  }.bind(this));
};

Calendar.prototype.update = function(events) {
  this.setEvents(events);
};

/* Event Model */

var Event = function(start, end) {
  this.start = start;
  this.end = end;
};
