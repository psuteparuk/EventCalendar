# EventCalendar
Javascript for a Google-Calendar-style event calendar.
View it [here](http://psuteparuk.github.io/EventCalendar).

## Usage
Include `calendar.js` and `calendarView.js` (as well as JQuery) in your HTML file and call a global function `layOutDay(events)`.
`events` is a list of objects with attributes `start` and `end`. The values of both attributes represent the minutes after 9am.
For example, `{ start: 30, end: 150 }` represents an event from 9.30am to 11.30am.
