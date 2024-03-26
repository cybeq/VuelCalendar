import type {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {DateUltra} from "./DateUltra.ts";
import {VuelCalendarDrop} from "./types/VuelCalendarDrop.ts";
import {Helper} from "./Helper.ts";
import {PreventResize, PushToSplit} from "./types/function-types/innerFunctionsTypes.ts";

export class EventDragHandler{
    dateUltra = new DateUltra();
    oldStartDateTimeBackup?:Date;
    oldEndDateTimeBackup?:Date;
    helper:Helper = new Helper();

    onDragStart(e:DragEvent, event:VuelCalendarEvent, cloneFunction:Function, pushSplit:PushToSplit, preventResize:PreventResize, excludedDay:number){
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer!.setDragImage(img, 0, 0);
        preventResize(()=>{
            cloneFunction('append', event);
            const oldStartDateTime = new Date(event.start);
            const oldEndDateTime = new Date(event.end);
            this.oldStartDateTimeBackup = oldStartDateTime;
            this.oldEndDateTimeBackup = oldEndDateTime;
            event.dragged = true;
            pushSplit(event, excludedDay)
        })

        // event.independent = true;
    };
    onDragOver(event:DragEvent,
               bgBackup:undefined|string,
               draggingColor:string,
               id:string,
               dragEvent:VuelCalendarEvent|undefined,
               date:Date,
               time:string)
    {
        if(!dragEvent){
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const container = document.getElementById(id);
        if(container && bgBackup){
            container.style.backgroundColor=draggingColor
        }
        const oldStartDateTime = new Date(dragEvent.start);
        const newStartDateTime = this.dateUltra.setTimeToDateWithTimeString(date,time);
        const diff = newStartDateTime.getTime() - oldStartDateTime.getTime();
        dragEvent.start = newStartDateTime;
        dragEvent.end = new Date((dragEvent.end.getTime() + diff))

        console.log('drag over', date)
    }
    onDragLeave(bgBackup:string | undefined, id:string){
        const container = document.getElementById(id);
        if(container && bgBackup){
            container.style.backgroundColor=bgBackup
        }
    }
    onDragEnd(cloneFunction:Function, preventResize:PreventResize){
        preventResize(()=>{
            cloneFunction('remove');
        })
    }
    onDrop(e:MouseEvent, event:VuelCalendarEvent, apiCall:(drop:VuelCalendarDrop)=>void ){
        apiCall(
            {
                clickEvent:e,
                event:event,
                newStartDateTime:event.start,
                newEndDateTime:event.end,
                oldStartDateTime:this.oldStartDateTimeBackup!,
                oldEndDateTime:this.oldEndDateTimeBackup!,
                accept:()=>{
                },
                decline:()=>{
                    event.start = this.oldStartDateTimeBackup!;
                    event.end = this.oldEndDateTimeBackup!;
                }
            }
        )
    }

}