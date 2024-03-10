

## How to Use

### Vue
````html
<section class="w-[800px]">
   <VuelCalendar :vuelCalendarOptions="vuelCalendarOptions" ></VuelCalendar>
</section>
/* These settings will cause the calendar to extend the document downward when expanding the timeline downwards. */
````
````html
<section class="w-[800px] max-h[600px] overflow-auto">
   <VuelCalendar :vuelCalendarOptions="vuelCalendarOptions" ></VuelCalendar>
</section>
/* 
If you enforce height through styling, you must also set overflow!!.
This prevents your document from expanding, allowing the calendar to be extendable downwards. 
However, remember!
You must set the maximum height equal to the height parameter for the calendarOptions object. 
This is crucial for the correct functioning of the calendar. 
*/
````

### TS/JS Object
```ts
calendarApi: {} as VuelCalendarApi,
calendarOptions:{
        height:600, /* The initial height of the calendar*/
        theme:'dark', /* 'dark' and 'light' theme available */
        startDate:new Date(), /* Define the first day being displayed on the calendar */
        daysForward:5, /* Minimum 1, this parameter defines how many days after the start day should be displayed */
        startHour:17, /* Minimum 0, Max 23, define time from 'startHour' to 23:59 */
        onCalendarApiReady:(api:VuelCalendarApi)=>{
          this.calendarApi = api;
          api.setEvents( [
            {
              id:1,
              label:'Event #1',
              data:{},
              start:new Date(new Date().setHours(8, 0)),
              end:new Date(new Date().setHours(23, 0)),
            }
          ]) /* after API is ready you can set new Events to the calendar */
        },
        onDayClicked:(day:VuelCalendarDay)=>
        { 
            /* The function returns the day that was clicked, along with the time and date on the timeline, as well as the events that belong to this day.*/
        },
        onEventClicked:(event:VuelCalendarEvent)=>
        {
           /* The function returns the event that was clicked, along with the time and date of start and end, as well as the data:any that belong to this event.*/
        },
```
# API functions

### Change timeline start date

-------------------------

```ts 
calendarApi.setDate(date);
```
- date: Type of **Date**

**This function is responsible for changing the startDate to a new date. If you change this date, your timeline will set the initial date to this date.**


---------------------------

### Set new events

```ts 
calendarApi.setEvents(events);
```
- events: Type of **VuelCalendarEvent**

**This function is responsible for deleting old events and replacing them with new ones.**

---------------------------
### Pushing events

```ts 
calendarApi.addEvents(events);
```
- events: Type of **VuelCalendarEvent**

**This function is responsible for adding new events to the current ones.**

---------------------------

### Remove events by param

```ts 
calendarApi.removeEventsByParamLog(param, value);
```
- param: Type of **String**
- value: Type of **any**

**This function is responsible for removing the selected event. For example, by sending the parameter string 'id' with the value 5, we will remove the event with id === 5**
````js
calendarApi.removeEventsByParamLog('id', 5);
/* event with id 5 has been removed */
````
---------------------------
### Edit events by param

```ts 
calendarApicalendarApi.configureEventsByParam(param, value, object);
```
- param: Type of **String**
- value: Type of **any**
- object: Type of **VuelCalendarEvent**

**This function is responsible for finding the event with the specified parameter and value, and then replacing the values for that parameter. For example, if we insert 'id' in the parameter, 5 in the value, and {start: todaysDate, end: todaysDatePlus2Hours, data: {employees: listOfEmployees}} in the object, then in the event with id 5, the start and end dates will be changed, and the object data of any type will be assigned a list of employees.**

````ts
calendarApi.configureEventsByParam(
    'id', 5, 
        {
           start:startDate, 
           end:endDate, 
           data:{
             employees:[]
           }
        })
/* params has been changed to event id === 5 */
````

