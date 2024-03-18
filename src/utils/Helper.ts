import {DateUltra} from "./DateUltra.ts";

export class Helper{

  public daysEnumerable = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  public daysEnumerableFromMonday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  public monthsEnumerable: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
  ];
  dateUltra = new DateUltra();
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


public convertPercentageToTime( percentage: number, startHour: number = 0, endHour:number = 0 ) : string
{
    const totalMinutes = percentage * (endHour - startHour) * 60 / 100;
    const hours = Math.floor(totalMinutes / 60) + startHour;
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

    public convertTimeToPercentage( timeString: string, startHour: number = 0, endHour:number = 24,start:Date, startDate:Date, loopedDay:number ) : number
    {
        const currentDay = this.dateUltra.addDays(startDate, loopedDay-1);

        let [hours, minutes] = timeString.split(':')
            .map(Number);
        if(!this.dateUltra.isSameDate(currentDay, start)){
            [hours, minutes] = "00:00".split(':')
                .map(Number);
        }
        const totalMinutes = Math.max((hours - startHour) * 60 + minutes, 0);
        const totalHours = endHour - startHour;
        return (totalMinutes / (totalHours * 60)) * 100;
        // console.log(
        //     'time to per',
        //     percentage
        // );
    }

public convertTimeDistanceToPercentage( start: Date, end: Date, startHour: number = 0, endHour:number = 24, startDate:Date, loopedDay:number ) : number
{
    const currentDay = this.dateUltra.addDays(startDate, loopedDay-1);

    const startTimelineMilis = startHour * 3600 * 1000;
    const endTimelineMilis = endHour * 3600 * 1000;
    const timeLineDuration = (endTimelineMilis - startTimelineMilis)

    const startHourEventMilis = start.getHours() * 3600 * 1000;
    const startMinuteEventMilis = start.getMinutes() * 60 * 1000;
    const startSecondEventMilis = start.getSeconds() * 1000;
    const startEventMilis = startHourEventMilis + startMinuteEventMilis + startSecondEventMilis;

    const endHourEventMilis = end.getHours() * 3600 * 1000;
    const endMinuteEventMilis = end.getMinutes() * 60 * 1000;
    const endSecondEventMilis = end.getSeconds() * 1000;
    const endEventMilis = endHourEventMilis + endMinuteEventMilis + endSecondEventMilis;

    if(!this.dateUltra.isSameDate(currentDay, end) && !this.dateUltra.isSameDate(currentDay, start)){
        return 100;
    }

    let eventDuration = end.getTime() - start.getTime();

    if(startTimelineMilis > startEventMilis && this.dateUltra.isSameDate(currentDay, start)){
       eventDuration -= (startTimelineMilis - startEventMilis)
    }

    if(startTimelineMilis > endEventMilis && this.dateUltra.isSameDate(currentDay, end)){
        eventDuration = 0;
    }



    if(this.dateUltra.isSameDate(currentDay, end) && !this.dateUltra.isSameDate(currentDay, start)){
        let nd = new Date(new Date().setHours(24 + (startHour) ,0,0));
        const _end = new Date(new Date(end).setDate(nd.getDate()))
        eventDuration = _end.getTime() - nd.getTime();
        if(startTimelineMilis > endEventMilis ){
            eventDuration = 0;
        }
    }

    let percentage =  (eventDuration / timeLineDuration) * 100;

    return percentage;
}

  public hours = Array.from(
      {length: 24}, (_, i) => `${i.toString().padStart(2, '0')}`
  )

  public getHours( startHourConfigurable: number = 0, endHourConfigurable:number = 24 )
  {
    return this.hours.slice(startHourConfigurable, endHourConfigurable);
  }

  public isCurrentDay(startDateConfigurable?:Date,  day?:number)
  {
    const today = new Date();

    const startDate = this.pairDateToContainer(startDateConfigurable!, day!)

    return (startDate! as Date).getDate() === today.getDate() &&
           (startDate! as Date).getMonth() === today.getMonth() &&
           (startDate! as Date).getFullYear() === today.getFullYear();
  }
  public pairDateToContainer( startDate: Date, day: number, convert?:string): Date | string | number
  {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + day - 1);
        switch(convert){
            case 'toLocaleDateString':
                return newDate.toLocaleDateString();
            case 'getDay':
                return newDate.getDay();
            case 'getDayEnumerable':
                return this.daysEnumerable[newDate.getDay()];
            default:
                return newDate;
        }
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
      const targetDate = new Date(this.getDayFromFirstDayByAdd(date, addDayNumber));
      targetDate.setHours(0, 0, 0, 0);

      return events.reduce((accumulator, event) => {
          const startWithoutTime = new Date(event.start);
          startWithoutTime.setHours(0, 0, 0, 0);
          const endWithoutTime = new Date(event.end);
          endWithoutTime.setHours(0, 0, 0, 0);

          if (startWithoutTime.getTime() === targetDate.getTime() || endWithoutTime.getTime() === targetDate.getTime()) {
              return accumulator + 1;
          } else {
              return accumulator;
          }
      }, 0);

  }
  public addToDate(date: Date, addDayNumber: number): Date {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + addDayNumber);
      return newDate;
  }
    public getDaysDifference(startDate: Date, endDate: Date): number {
        if (startDate.getFullYear() === endDate.getFullYear() &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getDate() === endDate.getDate()) {
            return 1;
        }
        if (endDate < startDate) {
            return 1;
        }

        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays+1;
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
  public dateToMonthAndDayContainer(startDate:Date, day:number){
      return this.dateToMonthAndDay(this.getDayFromFirstDayByAdd(startDate, day))
  }

  public setTimeToDate(date:Date, time:string){
      const [hours, minutes] = time.split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      return new Date(date);
  }
}