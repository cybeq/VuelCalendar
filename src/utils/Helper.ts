export class Helper{
 
  public getTimeFromDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  // public convertTimeToPercentage(timeString: string, startHour:number = 0): number {
  //   const [hours, minutes] = timeString.split(':').map(Number);
  //   const totalMinutes = hours * 60 + minutes;
  //   const percentage = (totalMinutes / (24 * 60)) * 100;
  //   return percentage;
  // }
  // public convertPercentageToTime(percentage: number, startHour:number = 0):string {
  //   const totalMinutes = percentage * 24 * 60 /100;
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = Math.floor(totalMinutes % 60);
  //   const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  //   return time;
  // }
  // public convertTimeDistanceToPercentage(startTimeString: string, endTimeString: string, startHour:number = 0): number {
  //   const [startHours, startMinutes] = startTimeString.split(':').map(Number);
  //   const [endHours, endMinutes] = endTimeString.split(':').map(Number);
  //   const startTotalMinutes = startHours * 60 + startMinutes;
  //   const endTotalMinutes = endHours * 60 + endMinutes;
  //   let timeDistance = endTotalMinutes - startTotalMinutes;
  //   if (timeDistance < 0) {
  //       timeDistance += 24 * 60;
  //   }
  //   const percentage = (timeDistance / (24 * 60)) * 100;
  //   return percentage;
  // }
  public convertTimeToPercentage(timeString: string, startHour: number = 0): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = (hours - startHour) * 60 + minutes; // Odejmujemy startHour
    const totalHours = 24 - startHour; // Ustalamy ilość godzin po przesunięciu
    const percentage = (totalMinutes / (totalHours * 60)) * 100; // Dzielimy przez ilość minut w dostępnych godzinach
    console.log('time to per', percentage);
    
    return percentage;
}

public convertPercentageToTime(percentage: number, startHour: number = 0): string {
    const totalMinutes = percentage * (24 - startHour) * 60 / 100; // Mnożymy przez 24 - startHour
    const hours = Math.floor(totalMinutes / 60) + startHour; // Dodajemy startHour
    const minutes = Math.floor(totalMinutes % 60);
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return time;
}

public convertTimeDistanceToPercentage(startTimeString: string, endTimeString: string, startHour: number = 0): number {
    const [startHours, startMinutes] = startTimeString.split(':').map(Number);
    const [endHours, endMinutes] = endTimeString.split(':').map(Number);
    let startTotalMinutes = (startHours - startHour) * 60 + startMinutes; // Odejmujemy startHour
    let endTotalMinutes = (endHours - startHour) * 60 + endMinutes; // Odejmujemy startHour
    if (startTotalMinutes < 0) {
        startTotalMinutes += (24 - startHour) * 60; // Mnożymy przez 24 - startHour
    }
    if (endTotalMinutes < 0) {
        endTotalMinutes += (24 - startHour) * 60; // Mnożymy przez 24 - startHour
    }
    let timeDistance = endTotalMinutes - startTotalMinutes;
    if (timeDistance < 0) {
        timeDistance += (24 - startHour) * 60; // Mnożymy przez 24 - startHour
    }
    const percentage = (timeDistance / ((24 - startHour) * 60)) * 100; // Dzielimy przez 24 - startHour
    console.log('distance to per', percentage);
    
    return percentage;
}
  
  public hours = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}`)
  public getHours(startHourConfigurable:number = 0){
    return this.hours.slice(startHourConfigurable);
  }
  public daysEnumerable = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  public isCurrentDay(startDate:Date, daysForward:number){
    const today = new Date();
    

    const futureDate =new Date( new Date(today.getTime() + (daysForward -1) * 24 * 60 * 60 * 1000));
    console.log(futureDate, 'futureDay');
    
 
    return startDate.getDate() === futureDate.getDate() &&
           startDate.getMonth() === futureDate.getMonth() &&
           startDate.getFullYear() === futureDate.getFullYear();
  }
}