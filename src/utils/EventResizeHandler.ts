import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {DateUltra} from "./DateUltra.ts";

export class EventResizeHandler {
    endDateBackup?:Date;
    endEvent?:VuelCalendarEvent;
    startDateBackup?:Date;
    startEvent?:VuelCalendarEvent;
    dateUltra:DateUltra = new DateUltra();

    public onEventStartResizeStart(event:VuelCalendarEvent){
        this.startDateBackup = new Date(event.start);
        this.startEvent = event;
    }
    public onEventStartResizeDayOver(date:Date, time:string){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        this.startEvent!.start = newDateTime;
    }
    public onEventStartResizeEnd(){
        this.startEvent!.start = this.startDateBackup!;
        this.startDateBackup = undefined;
        this.startEvent = undefined;
    }
    public onEventEndResizeStart(event:VuelCalendarEvent){
        this.endDateBackup = new Date(event.end);
        this.endEvent = event;
    }
    public onEventEndResizeDayOver(date:Date, time:string){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        this.endEvent!.end = newDateTime;
    }
    public onEventEndResizeEnd(){
        this.endEvent!.end = this.endDateBackup!;
        this.endDateBackup = undefined;
        this.endEvent = undefined;
    }
    public onEventEndResizeDrop(date:Date, time:string){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        console.log('end resize drop,', newDateTime, time);
    }
    public onEventStartResizeDrop(date:Date, time:string){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        console.log('start resize drop,', newDateTime, time);
    }

}