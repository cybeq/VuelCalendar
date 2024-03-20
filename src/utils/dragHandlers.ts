import type {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {Helper} from "./Helper.ts";


const onDragStart = (e:DragEvent, event:VuelCalendarEvent, cloneFunction:Function) => {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer!.setDragImage(img, 0, 0);

    ((e.target as HTMLElement).parentElement as HTMLElement).style.opacity='0.5'

    const clone = ((e.target as HTMLElement).parentElement as HTMLElement).cloneNode(true) as HTMLDivElement;
    clone.style.opacity='1'
    clone.style.zIndex='6'
    clone.style.position="fixed";
    cloneFunction('append',clone, event);
};
const onDragEnd = (e:DragEvent, cloneFunction:Function) =>{
    ((e.target as HTMLElement).parentElement as HTMLElement).style.opacity='1'
    cloneFunction('remove');
}

const onDragOver = (event:DragEvent, dragClone:HTMLDivElement | undefined,  bgBackup:undefined|string, draggingColor:string, id:string, dragEvent?:VuelCalendarEvent) =>{
    if(!dragEvent){
        return;
    }
    event.preventDefault();
    event.stopPropagation();
    const container = document.getElementById(id);
    if(container && bgBackup){
        container.style.backgroundColor=draggingColor
    }
    if(dragClone) {
        const x = event.clientX;
        const y = event.clientY;
        dragClone!.style.left = '0';
        dragClone!.style.top = '0';
        dragClone!.style.marginLeft = x + 'px';
        dragClone!.style.marginTop = y + 'px';
    }
}

const getClickAndDropData = (event:MouseEvent|DragEvent, day:number, helper:Helper, startHourConfigurable:number, endHourConfigurable:number=24, startDateConfigurable:Date, getEventsToContainer:Function) =>{
    const el = (event.currentTarget! as HTMLElement);
    const clickedWidthFromLeft = event.clientX - el.getBoundingClientRect().left
    const percentClicked = (clickedWidthFromLeft / el.offsetWidth) * 100;
    const clickedDay = helper.addToDate(startDateConfigurable!, day-1)
    const clickedTime =    helper.convertPercentageToTime(percentClicked, startHourConfigurable, endHourConfigurable);
    const daysEvents  = getEventsToContainer(day)
    return {el,clickedWidthFromLeft, percentClicked, clickedDay, clickedTime, daysEvents}
}
const onDragLeave = (bgBackup:string | undefined, id:string)=>{
    const container = document.getElementById(id);
    if(container && bgBackup){
        container.style.backgroundColor=bgBackup
    }
}

export {onDragStart, onDragEnd, onDragOver, getClickAndDropData, onDragLeave}