/********** Calendar View **********/

var CalendarView = function(calendar, options) {
  options = options || {};
  this.calendar = calendar;
  this.numHours = options.numHours || 12; // number of hours in the calendar starting from 9am

  $('.calendar').css({ 'height': 60*this.numHours + 'px' });
  $('.calendar-bg').css({ 'height': 60*this.numHours + 'px' });

  $(this.calendar).on('eventsUpdated', this.renderEvents.bind(this));
};

CalendarView.prototype.render = function() {
  this.renderLegend();
  this.renderCalendar();
};

CalendarView.prototype.renderLegend = function() {
  var $legend = $('.legend');
  $legend.empty();

  for (var i = 0; i <= this.numHours; ++i) {
    var hour = (i + 9) % 24;
    var ampm = hour < 12 ? 'AM' : 'PM';
    var $hour = $('<li>' + '<span>' + hour + ':00</span>' + ampm + '</li>');
    var $halfHour = $('<li>' + hour + ':30</li>');
    $legend.append($hour);
    if (i < this.numHours) $legend.append($halfHour);
  }
};

CalendarView.prototype.renderCalendar = function() {
  this.renderBackground();
  this.renderEvents();
};

CalendarView.prototype.renderBackground = function() {
  var $calendarBg = $('.calendar-bg');
  for (var i = 0; i < this.numHours; ++i) {
    $calendarBg.append('<tr><td></td></tr>');
  }
};

CalendarView.prototype.renderEvents = function() {
  var $calendar = $('.calendar');
  var calendarWidth = $calendar.width();

  // The width and position of each event depends on the
  // number of columns in a group.
  this.calendar.eventGroups.forEach(function(group) {
    var numCols = group.length;
    var width = (calendarWidth - 6*(numCols-1)) / numCols; // divide the width equally
    group.forEach(function(col, colInd) {
      col.forEach(function(ev) {
        var eventView = new EventView(ev, {
          left: colInd*calendarWidth/numCols + (colInd > 0 ? 13 : 10), // offset to the right column
          width: width
        });
        eventView.render();
      });
    });
  });
};

/********** Event View **********/

var EventView = function(event, options) {
  this.event = event;
  this.options = options || {};
};

EventView.prototype.render = function() {
  var $calendar = $('.calendar');
  var $eventItem = $('<li></li>');
  $eventItem.css({
    left: (this.options.left || 10) + 'px',
    top: (this.options.top || this.event.start) + 'px',
    width: (this.options.width || $calendar.width()) + 'px',
    height: (this.options.height || (this.event.end-this.event.start)) + 'px'
  });
  $calendar.append($eventItem);
};
