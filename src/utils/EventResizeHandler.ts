import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {DateUltra} from "./DateUltra.ts";
import {VuelCalendarResize} from "./types/VuelCalendarResize.ts";
import {Logger} from "./Logger.ts";

export class EventResizeHandler {
    endDateBackup?:Date;
    endEvent?:VuelCalendarEvent;
    endDateNew?:Date;
    startDateBackup?:Date;
    startEvent?:VuelCalendarEvent;
    startDateNew?:Date;
    dateUltra:DateUltra = new DateUltra();
    logger:Logger;
    constructor(logger:Logger) {
        this.logger = logger
    }
    public onEventStartResizeStart(event:VuelCalendarEvent){
        this.startDateBackup = new Date(event.start);
        this.startEvent = event;
    }
    public onEventStartResizeDayOver(date:Date, time:string){
        this.onEventStartResizeGenerator().return()
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        // this.startEvent!.start = newDateTime;
        this.startDateNew = newDateTime;
        this.onEventStartResizeGenerator().next();
    }
    private* onEventStartResizeGenerator (){
        yield this.startEvent!.start = this.startDateNew!;
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
        this.onEventEndResizeGenerator().return();
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        this.endDateNew = newDateTime;
        this.onEventEndResizeGenerator().next()
    }
    private* onEventEndResizeGenerator (){
        yield this.endEvent!.end = this.endDateNew!;
    }
    public onEventEndResizeEnd(){
        // this.endEvent!.end = this.endDateBackup!;
        this.endDateBackup = undefined;
        this.endEvent = undefined;
    }
    public onEventEndResizeDrop(date:Date, time:string, apiCall:(resized:VuelCalendarResize) => void){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        const decline =()=>{
            this.endEvent!.end = this.endDateBackup!
        }
        if(newDateTime < this.endEvent!.start){
            this.logger.customWarn('resize','Event end resize', 'endDate must be set in future from startDate')
            decline()
            return;
        }
        apiCall({
            event:this.endEvent!,
            newDateTime,
            oldDateTime:this.endDateBackup!,
            accept:()=>{
                this.endEvent!.end = newDateTime
            },
            decline
        })
    }
    public onEventStartResizeDrop(date:Date, time:string, apiCall:(resized:VuelCalendarResize) => void){
        const newDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        const decline = ()=>{
            this.startEvent!.start = this.startDateBackup!
        }
        if(newDateTime > this.startEvent!.end){
            this.logger.customWarn('resize','Event start resize', 'startDate must be earlier than endDate')
            decline()
            return;
        }
        apiCall({
            event:this.startEvent!,
            newDateTime,
            oldDateTime:this.startDateBackup!,
            accept:()=>{
                this.startEvent!.start = newDateTime
            },
            decline

        });
    }

}