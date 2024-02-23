export class Helper{
  public convertPercentageToTime(percentage: number):string {
    const totalMinutes = percentage * 24 * 60 /100;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return time;
  }
  public getTimeFromDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  public convertTimeToPercentage(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / (24 * 60)) * 100;
    return percentage;
  }
  public convertTimeDistanceToPercentage(startTimeString: string, endTimeString: string): number {
    const [startHours, startMinutes] = startTimeString.split(':').map(Number);
    const [endHours, endMinutes] = endTimeString.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    let timeDistance = endTotalMinutes - startTotalMinutes;
    if (timeDistance < 0) {
        timeDistance += 24 * 60;
    }
    const percentage = (timeDistance / (24 * 60)) * 100;
    return percentage;
  }
  
  public hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

}