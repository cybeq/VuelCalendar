export class Helper{

  public daysEnumerable = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  public daysEnumerableFromMonday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  public monthsEnumerable: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  public getTimeFromDate( date: Date ) : string
  {
    const hours = date.getHours()
        .toString()
        .padStart(2, '0');

    const minutes = date.getMinutes()
        .toString()
        .padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  public convertTimeToPercentage( timeString: string, startHour: number = 0 ) : number
  {
    const [hours, minutes] = timeString.split(':')
        .map(Number);
    const totalMinutes = Math.max((hours - startHour) * 60 + minutes, 0);
    const totalHours = 24 - startHour;
    const percentage = (totalMinutes / (totalHours * 60)) * 100;
    // console.log(
    //     'time to per',
    //     percentage
    // );

    return percentage;
}

public convertPercentageToTime( percentage: number, startHour: number = 0 ) : string
{
    const totalMinutes = percentage * (24 - startHour) * 60 / 100;
    const hours = Math.floor(totalMinutes / 60) + startHour;
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

public convertTimeDistanceToPercentage( startTimeString: string, endTimeString: string, startHour: number = 0 ) : number
{
    let [startHours, startMinutes] = startTimeString.split(':')
        .map(Number);
    const [endHours, endMinutes] = endTimeString.split(':')
        .map(Number);

    if(startHour > startHours){
        startHours = startHour
    }

    let startTotalMinutes = (startHours - startHour) * 60 + startMinutes;

    let endTotalMinutes = (endHours - startHour) * 60 + endMinutes;

    if (startTotalMinutes < 0) {
        startTotalMinutes += (24 - startHour) * 60;
    }

    if (endTotalMinutes < 0) {
        endTotalMinutes += (24 - startHour) * 60;
    }

    let timeDistance = endTotalMinutes - startTotalMinutes;

    if (timeDistance < 0) {
        timeDistance += (24 - startHour) * 60;
    }

    const percentage = (timeDistance / ((24 - startHour) * 60)) * 100;

    // console.log(
    //     'distance to per',
    //     percentage
    // );

    return percentage;
}

  public hours = Array.from(
      {length: 24}, (_, i) => `${i.toString().padStart(2, '0')}`
  )

  public getHours( startHourConfigurable: number = 0 )
  {
    return this.hours.slice(startHourConfigurable);
  }

  public isCurrentDay(startDate:Date)
  {
    const today = new Date();

    return startDate.getDate() === today.getDate() &&
           startDate.getMonth() === today.getMonth() &&
           startDate.getFullYear() === today.getFullYear();
  }

  public firstDayOfMonthByDate( data: Date ) : Date
  {
    return new Date(data.getFullYear(), data.getMonth(), 1);
  }
  public getDayFromFirstDayByAdd( date: Date, addDayNumber: number) : Date
  {
    // const firstDayOfMonth = this.firstDayOfMonthByDate(date);
    const firstDayOfMonth = this.findFirstMonday(date);
    const newDate = new Date(firstDayOfMonth);
    newDate.setDate(firstDayOfMonth.getDate() + addDayNumber);
    return newDate;
  }
  public countEventsForDay( date: Date, addDayNumber: number, events: Array<any>) : number
  {
    return events.filter( event =>
    {
      const startWithoutTime = new Date(event.start);
      startWithoutTime.setHours(0, 0, 0, 0); 
      const endWithoutTime = new Date(event.end);
      endWithoutTime.setHours(0, 0, 0, 0); 
      const todayWithoutTime = new Date(this.getDayFromFirstDayByAdd(date, addDayNumber));
      todayWithoutTime.setHours(0, 0, 0, 0); 
      return startWithoutTime.getTime() === todayWithoutTime.getTime() || endWithoutTime.getTime() === todayWithoutTime.getTime();
    })
        .length;
  }
  public addToDate( date: Date, addDayNumber: number) : Date
  {
    date.setDate(date.getDate() + addDayNumber);
    return date;
  }
  public findFirstMonday( date: Date )
  {
      let currentDate = new Date(date);

      if (currentDate.getDate() === 1 && currentDate.getDay() === 1)
      {
          return currentDate;
      }
      else
      {
          currentDate.setDate(1);

          while (currentDate.getDay() !== 1) {
              currentDate.setDate(currentDate.getDate() - 1);
          }
          return new Date(currentDate);
      }
  }

  public dateToMonthAndDay(date:Date): string{
      const monthIndex: number = date.getMonth();
      const day: number = date.getDate();
      const formattedDay: string = ("0" + day).slice(-2);
      return `${this.monthsEnumerable[monthIndex]} ${formattedDay}`;
  }

  public setTimeToDate(date:Date, time:string){
      const [hours, minutes] = time.split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      return new Date(date);
  }
}