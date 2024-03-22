
import { Helper } from "./Helper.ts";

export class MouseTimeHandler{
    show = false;
    time = '00:00';
    helper:Helper;
    constructor(helper:Helper) {
        this.helper = helper;
    }
    move(event:MouseEvent, el:HTMLDivElement,startHourConfigurable:number, endHourConfigurable:number ){
        this.show = true;
        el.style.left = event.clientX  >= window.innerWidth ? '0px': event.clientX - 100 +'px'
        el.style.top = event.clientY + 20 +'px'

        this.time = this.helper.getTimeFromClick(event, this.helper, startHourConfigurable, endHourConfigurable);
    }
    out(){
        this.show = false;
    }
}