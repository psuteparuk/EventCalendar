/********** Calendar Model **********/

var Calendar = function(events) {
  // eventGroups is a 3-dimensional list.
  // Each element in eventGroups represent one connected group of events.
  // Each group is a list of lists where each list represents a column of events.
  // Example: [[[e1,e4],[e2]],[[e3]]] means there are two connected groups, i.e. {e1,e2,e4} and {e3},
  // where in the first group {e1,e4} lies in the same column with {e2} in another column.
  this.eventGroups = [];

  this.setEvents(events || []);
};

Calendar.prototype.setEvents = function(events) {
  // Clear current eventGroups
  this.eventGroups = [];

  // Sort new events by start time and then by end time
  events.sort(Event.compare);

  // Populate eventGroups
  var lastEvent = null;
  events.forEach(function(ev) {
    var event = new Event(ev.start,ev.end);

    if (lastEvent === null || !event.collidesWith(lastEvent)) {
      // Disconnect from last group. Creat a new one.
      var newGroup = [[event]];
      this.eventGroups.push(newGroup);
    } else {
      var numGroups = this.eventGroups.length;
      var lastGroup = this.eventGroups[numGroups-1];

      // Find the first column in the last group that does not collide with this event.
      var ind = 0;
      while (ind < lastGroup.length) {
        var col = lastGroup[ind];
        if (!event.collidesWith(col[col.length-1])) {
          this.eventGroups[numGroups-1][ind].push(event);
          break;
        }
        ind++;
      }

      // If it collides with every column, create a new one.
      if (ind === lastGroup.length) this.eventGroups[numGroups-1].push([event]);
    }

    if (lastEvent === null) lastEvent = event;
    else lastEvent = lastEvent.end < event.end ? event : lastEvent;
  }.bind(this));
};

Calendar.prototype.update = function(events) {
  this.setEvents(events);
  $(this).trigger('eventsUpdated');
};

/********** Event Model **********/

var Event = function(start, end) {
  if (start >= end) return;
  this.start = start;
  this.end = end;
};

Event.prototype.collidesWith = function(event) {
  if (this.start < event.start) return this.end > event.start;
  else return this.start < event.end;
};

Event.compare = function(event1, event2) {
  if (event1.start === event2.start) return event1.end - event2.end;
  else return event1.start - event2.start;
};
