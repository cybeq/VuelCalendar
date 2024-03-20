import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {DateUltra} from "./DateUltra.ts";
import {VuelCalendarResize} from "./types/VuelCalendarResize.ts";

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
        // this.startEvent!.start = this.startDateBackup!;
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
        // this.endEvent!.end = this.endDateBackup!;
        this.endDateBackup = undefined;
        this.endEvent = undefined;
    }
    public onEventEndResizeDrop(date:Date, time:string, apiCall:(resized:VuelCalendarResize) => void){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        apiCall({
            event:this.endEvent!,
            newDateTime,
            oldDateTime:this.endDateBackup!,
            accept:()=>{
                this.endEvent!.end = newDateTime
            },
            decline:()=>{
                this.endEvent!.end = this.endDateBackup!
            }
        })
    }
    public onEventStartResizeDrop(date:Date, time:string, apiCall:(resized:VuelCalendarResize) => void){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        apiCall({
            event:this.startEvent!,
            newDateTime,
            oldDateTime:this.startDateBackup!,
            accept:()=>{
                this.startEvent!.start = newDateTime
            },
            decline:()=>{
                this.startEvent!.start = this.startDateBackup!
            }

        });
    }

}