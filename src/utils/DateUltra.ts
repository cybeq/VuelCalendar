
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
    public daysDifferenceCeil(start:Date, end:Date):number{
        const startZero = this.timeZero(start)
        const endZero = this.timeZero(end)
        return Math.ceil((startZero.getTime() - endZero.getTime()) / (1000 * 3600 * 24))
    }
    public convertToSameDate(start:Date, end:Date):Date[]{
        return [new Date(start),   new Date(new Date(new Date(new Date(end).setFullYear(start.getFullYear())).setDate(start.getDate())).setMonth(start.getMonth()))]
    }

    public isSameDate(start:Date, end:Date):boolean{
        return (start.getDate() === end.getDate() &&
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear())
    }

    public toTimeString(date:Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const hoursString = hours < 10 ? '0' + hours : '' + hours;
        const minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
        return hoursString + ':' + minutesString;
    }
    public copyTime(from:Date, to:Date): Date{
        let _from = new Date(from);
        let _to = new Date(to);
        _to = new Date(_to.setHours(_from.getHours()));
        _to = new Date(_to.setMinutes(_from.getMinutes()));
        _to = new Date(_to.setSeconds(_from.getSeconds()));
        return _to;
    }
    public addHrMinSec(date:Date, hours:number, minutes:number, seconds:number){
        let _date = new Date(date);
        _date = new Date(_date.setHours(_date.getHours() + hours));
        _date = new Date(_date.setMinutes(_date.getMinutes() + minutes));
        _date = new Date(_date.setSeconds(_date.getSeconds() + seconds));
        return _date;
    }
    public setTimeToDateWithTimeString(date:Date, timeString:string){
        const _date = new Date(date);
        const [hours, minutes] = timeString.split(':')
            .map(Number);
        return new Date(_date.setHours(hours,minutes));
    }
}