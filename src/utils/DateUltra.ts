
export class DateUltra{
    public addDays(date:Date, value:number):Date{
        return new Date(new Date(new Date(date)).setDate(date.getDate() + (value as number)))
    }
    public timeDifference(start:Date, end:Date):number{
        const [_start, _end]  = this.convertToSameDate(start, end);
        return _start.getTime() - _end.getTime();
    }
    public timeZero(date:Date):Date{
        return new Date(new Date(date).setHours(0,0,0));
    }
    public isBiggerDate(start:Date, end:Date):boolean{
        return this.timeZero(start) > this.timeZero(end)
    }
    public isLowerDate(start:Date, end:Date):boolean{
        return this.timeZero(start) < this.timeZero(end)
    }
    public isBiggerTime(start:Date, end:Date){
        const [_start, _end]  = this.convertToSameDate(start, end);
        return _start > _end;
    }
    public daysDifference(start:Date, end:Date):number{
        const startZero = this.timeZero(start)
        const endZero = this.timeZero(end)
        return Math.round((startZero.getTime() - endZero.getTime()) / (1000 * 3600 * 24))
    }
    public convertToSameDate(start:Date, end:Date):Date[]{
        return [new Date(start),   new Date(new Date(new Date(new Date(end).setFullYear(start.getFullYear())).setDate(start.getDate())).setMonth(start.getMonth()))]
    }

    public isSameDate(start:Date, end:Date):boolean{
        return (start.getDate() === end.getDate() &&
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear())
    }
}