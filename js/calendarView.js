var CalendarView = function(calendar, options) {
  options = options || {};
  this.calendar = calendar;
  this.numHours = options.numHours || 12; // number of hours in the calendar starting from 9am

  $('.calendar').css({ 'height': 60*this.numHours + 'px' });
  $('.calendar-bg').css({ 'height': 60*this.numHours + 'px' });
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
  var $calendarBg = $('.calendar-bg');
  for (var i = 0; i < this.numHours; ++i) {
    $calendarBg.append('<tr><td></td></tr>');
  }

  this.renderEvents();
};

CalendarView.prototype.renderEvents = function() {
  return;
};
