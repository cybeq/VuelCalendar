<template>
  <div class="vuelcalendar-c1-container"
       :style="`
            display:flex;
            position:relative;
            width:100%;
            border-top-right-radius:'12px',
            borderBottomRightRadius:'12px',
            height:${height! + 50} +'px';
            border-radius:12px`"
       v-if="viewMode === 'days'"
  >
    <nav class="vuelcalendar-left-corner"
         :style="{
           position:'relative',
           overflow:'hidden',
           background:theme.colors.primary,
           width:'40px',
           borderTopLeftRadius:'12px',
           borderBottomLeftRadius:'12px',
           borderTop:'solid 2px',
           borderLeft:'solid 2px',
           borderColor:theme.colors.surface,
           }"
    >
      <div :style="{height:'50px',minHeight: '50px', maxHeight: '50px',borderBottom:'solid 2px',borderColor:theme.colors.surface }"/>
      <div
        v-for="day in daysForwardConfigurable"
        :key="day"
        class="vuelcalendar-day-label-container"
        :id="`day_label-${day}`"
        :style="{
           overflow:'hidden',
           display:'grid',
           gridTemplateColumns:'1fr 1fr',
           color:theme.colors.textPrimary,
           whiteSpace: 'nowrap',
           fontSize:'0.9em',
           boxSizing:'border-box',
           background:theme.colors.primary,
           width:'100%',
           height:rowHeight +'px',
           borderBottom:'solid 3px',

           borderColor:theme.colors.surface }
        ">
        <div class="week-day-label"
             :style="{
                  fontWeight:'bold',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  maxWidth:'20px',
                  'writing-mode': 'vertical-lr',
                  'unicode-bidi': 'plaintext',
                  'text-orientation': 'mixed',
                  boxSizing:'border-box'}">

          {{ helper.pairDateToContainer(startDateConfigurable!, day, 'getDayEnumerable') }}

        </div>
        <div :class="`vuelcalendar-day-label${isCurrentDay(day) ? '-current':''}`"
             :style="{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:isCurrentDay(day) ? theme.colors.highlight : theme.colors.menuBg,
              'writing-mode': 'vertical-lr',
              'unicode-bidi': 'plaintext',
              'text-orientation': 'mixed',
              maxWidth:'20px'}
        ">

          {{helper.pairDateToContainer(startDateConfigurable!, day, 'toLocaleDateString') }}

        </div>
       </div>

       <VuelCalendarResizer
          :theme="theme"
          target-on-sidebar
          :days-forward-configurable="daysForwardConfigurable"
          :view-mode="viewMode"
          :row-height="rowHeight" />

    </nav>
    <div :style="{
            width:'100%',
            height:'100%',
            overflowY:'hidden',
            overflowX:'auto',
            borderTopRightRadius:'12px',
            borderBottomRightRadius:'12px',
            borderRight:'solid 2px',
            borderColor:theme.colors.surface,
    }">
    <nav id="timeline"
        class="vuelcalendar-timeline"
        :style="{
            height:'50px',
            borderBottom:'solid 2px',
            borderTop:'solid 2px',
            borderTopRightRadius:'12px',
            width:'100%',
            overflow:'hidden',
            minWidth:'1200px',
            backgroundColor: theme.colors.primary,
            borderColor:theme.colors.surface,
            display:'grid',
            gridTemplateColumns:`repeat(${endHourConfigurable-startHourConfigurable},1fr)`}
    ">
          <div
            v-for="hour in helper.getHours(startHourConfigurable, endHourConfigurable)"
            :key="hour"
            class="hour"
            :style="{
                borderLeft: 'solid 1px',
                borderColor:theme.colors.surface,
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                color:theme.colors.textPrimary}
          ">
            <span> {{ hour }} </span> <span :style="{fontSize:'0.8em',marginTop:'-3px'}"> 00 </span>

          </div>
    </nav>

    <main ref="container"
          :style="{
              minHeight: height + 'px',
              maxHeight:theme.lockResize ? height +'px' : 'unset',
              width:'100%',
              borderBottomRightRadius:'12px',
              height:'100%',
              boxSizing:'border-box',
              minWidth:'1200px',
              overflow:'auto'  }"

    >
        <div :id="`vuelcalendar_day-${day}`"
             class="vuelcalendar-day"
             v-for="day in daysForwardConfigurable"
             :key="day"
             @click="onDayClick($event, day)"
             @dblclick="onDayDblClick($event, day)"
             @dragover.prevent.stop="
             ($event)=> {
               onDragOver($event, dragClone,bgBackup,theme.colors.dragging, `vuelcalendar_day-${day}`, dragEvent);
               onEventEndResizeDragOver($event, day);
               onEventStartResizeDragOver($event, day);
             }
              "
             @dragleave.prevent.stop="onDragLeave(bgBackup, `vuelcalendar_day-${day}`)"
             @dragend.prevent.stop="onDragLeave(bgBackup, `vuelcalendar_day-${day}`)"
             @drop.prevent.stop="($event)=>{
               onDrop($event, day, bgBackup,`vuelcalendar_day-${day}`);
               onEventStartResizeDrop($event, day);
               onEventEndResizeDrop($event, day);
             }"
             :style="{
               height:`${rowHeight}px`,
               backgroundColor:theme.colors.primary,
               color:theme.colors.textPrimary,
               width:'100%',
               position:'relative',
               overflow:'hidden',
               boxSizing:'border-box' }"
        >
          <div style="margin-top:15px">

            <VuelCalendarEventContainer
                :theme="theme"
                :helper="helper"
                :loopedDay="day"
                :renderer="vuelCalendarOptions.renderer"
                :clone="clone"
                :draggable-events="vuelCalendarOptions.draggableEvents"
                :resizable-events="vuelCalendarOptions.resizableEvents"
                :events="getEventsToContainer(day)"
                :on-event-clicked="vuelCalendarApi.onEventClicked"
                :start-hour-configurable="startHourConfigurable"
                :end-hour-configurable="endHourConfigurable"
                :start-date-configurable="startDateConfigurable"
                :event-resize-handler="eventResizeHandler"
            />

          </div>
            <div
                class="vuelcalendar-hour-box-container"
                :style="{
                    position:'absolute',
                    width:'100%',
                    top:'0',
                    display:'grid',
                    gridTemplateColumns:`repeat(${endHourConfigurable-startHourConfigurable},1fr)`,
                    pointerEvents:'none',
                    height:'100%'}"
            >
                <div v-for="r in endHourConfigurable-startHourConfigurable"
                     class="vuelcalendar-hour-box"
                     :key="r"
                     :style="{
                       borderLeft:'solid 1px',
                       borderColor:theme.colors.surface,
                       height:'100%'}"
                />
            </div>

            <VuelCalendarResizer
                :theme="theme"
                :days-forward-configurable="daysForwardConfigurable"
                :view-mode="viewMode"
                :row-height="rowHeight" />

          </div>
    </main>
  </div>
    <VuelCalendarResizer
        :style="{
           borderBottomLeftRadius:'12px',
           borderBottomRightRadius:'12px',

        }"
        :theme="theme"
        target-on-sidebar
        :days-forward-configurable="daysForwardConfigurable"
        :view-mode="viewMode"
        :row-height="rowHeight" />
</div>

<!-- month view -->

<VuelCalendarMonthDisplay
    :set-view-mode="setViewMode"
    :days-forward-configurable="daysForwardConfigurable"
    :row-height="rowHeight"
    :events-configurable="eventsConfigurable"
    :start-date-configurable="startDateConfigurable"
    :set-date-from-month-calendar="setDateFromMonthCalendar"
    :helper="helper"
    :theme="theme"
    :height="height"
    :view-mode="viewMode"/>

</template>
<script lang="ts">
import {defineComponent, reactive, toRaw} from 'vue';
import { Helper } from '../utils/Helper';
import { VuelCalendarOptions } from '../utils/VuelCalendarOptions';
import type { PropType } from 'vue';
import {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import VuelCalendarEventContainer from "./VuelCalendarEventContainer.vue";
import VuelCalendarResizer from "./VuelCalendarResizer.vue";
import VuelCalendarMonthDisplay from "./VuelCalendarMonthDisplay.vue";
import {Colors} from "../utils/types/Colors.ts";
import {getClickAndDropData, onDragLeave, onDragOver} from "../utils/dragHandlers.ts";
import {
  AddEvents, ConfigureEventsByParam,
  RemoveEventsByParam, SetDateRange, SetDaysForward, SetEndHour,
  SetEvents,
  SetStartDate, SetStartHour, SetTimeRange, SwitchViewMode
} from "../utils/types/function-types/apiFunctionsTypes.ts";
import {DateUltra} from "../utils/DateUltra.ts";
import {EventResizeHandler} from "../utils/EventResizeHandler.ts";
export default defineComponent({
  components:{
    VuelCalendarResizer,
    VuelCalendarEventContainer,
    VuelCalendarMonthDisplay
  },
  setup(){
    const helper = new Helper();
    const dateUltra = new DateUltra();
    const eventResizeHandler = new EventResizeHandler()
    return {
      helper,
      dateUltra,
      eventResizeHandler
    }
  },
  props:{
    vuelCalendarOptions:{
      type: Object as PropType<VuelCalendarOptions>,
      required: true,
    },
    colors:{
      type: Object as PropType<Colors>,
    }
  },
  computed:{
    theme(){
      return{
        colors:{
        surface: this.colors?.surface
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#fff' : (this.vuelCalendarApi.theme === 'dark' ? '#36373a' : '#fff')),

        primary: this.colors?.primary
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#f1f1f1' : (this.vuelCalendarApi.theme === 'dark' ? '#242528' : '#f1f1f1')),

        event: this.colors?.event
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#7469b6' : (this.vuelCalendarApi.theme === 'dark' ? '#039be5' : '#7469b6')),

        highlight: this.colors?.highlight
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#ad88c6' : (this.vuelCalendarApi.theme === 'dark' ? '#438789' : '#ad88c6')),

        textPrimary: this.colors?.textPrimary
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#000000' : (this.vuelCalendarApi.theme === 'dark' ? '#f5f4f5' : '#000000')),

        menuBg: this.colors?.menuBg
            ??
            (this.vuelCalendarApi.theme === 'light' ?
            '#ffe6e6' : (this.vuelCalendarApi.theme === 'dark' ? '#5b5c5c' : '#ffe6e6')),

        dragging: this.colors?.dragging
            ??
            (this.vuelCalendarApi.theme === 'light' ?
                '#fff4e6' : (this.vuelCalendarApi.theme === 'dark' ? '#3d3e51' : '#fff4e6')),
        },

        lockResize:this.vuelCalendarApi.lockResize
      }
    },
    height(){
      return this.vuelCalendarApi.height! < 200 ? 200 : this.vuelCalendarApi.height
    },
    isCurrentDay(){
      return (day:number)  => this.helper.isCurrentDay(this.startDateConfigurable, day);
    }
  },
  data(){
    return{
      vuelCalendarApi:new VuelCalendarOptions(
        this.vuelCalendarOptions,
        this.setNewStartDate as SetStartDate,
        this.setEvents as SetEvents,
        this.addEvents as AddEvents,
        this.removeEventsByParam as RemoveEventsByParam,
        this.configureEventsByParam as ConfigureEventsByParam,
        this.setStartHour as SetStartHour,
        this.setViewMode as SwitchViewMode,
        this.setDaysForward as SetDaysForward,
        this.setDateRange as SetDateRange,
        this.setEndHour as SetEndHour,
        this.setTimeRange as SetTimeRange,
      ),
      rowHeight: 0,
      resizer: {
        isResizing: false,
        resizedElBottom: null as Number | null,
        resizedEl: null as HTMLDivElement | null,
      },
      startDateConfigurable:   this.vuelCalendarOptions.startDate ?? new Date(),
      eventsConfigurable:      [] as VuelCalendarEvent[],
      daysForwardConfigurable: this.vuelCalendarOptions.daysForward <1 ? 1 : this.vuelCalendarOptions.daysForward,

      startHourConfigurable:   (this.vuelCalendarOptions.startHour ?? 0) < 1 ? 0 : (this.vuelCalendarOptions.startHour ?? 0),
      endHourConfigurable:     (this.vuelCalendarOptions.endHour ?? 24) > 24 ? 24 :(this.vuelCalendarOptions.endHour ?? 24),

      viewMode:                'days',

      dragClone:undefined as HTMLDivElement | undefined,
      dragEvent:undefined as VuelCalendarEvent | undefined,
      bodyOverflowState:undefined as undefined | string,
      bgBackup:undefined as string |undefined,
    }
  },
  created()
  {
    this.$nextTick( () =>
    {
      const containerHeight = (this.$refs.container as HTMLDivElement).offsetHeight;
      this.rowHeight = (containerHeight / (this.daysForwardConfigurable));
      if(this.rowHeight < 100){
        this.rowHeight = 100;
      }
      this.vuelCalendarApi.onVuelCalendarReadyResolve();
      this.bgBackup = (document.querySelector('.vuelcalendar-day')as HTMLDivElement)!.style .backgroundColor;
    })
  },
  methods:{
    clone(method:string, el?:HTMLDivElement, event?:VuelCalendarEvent){switch(method){case "append":this.dragClone = el;this.dragEvent = event;this.bodyOverflowState = document.body.style.overflow;document.body.style.overflow="hidden";document.body.appendChild(this.dragClone!);break;case "remove":document.body.style.overflow = this.bodyOverflowState!;this.bodyOverflowState = undefined;document.body.removeChild(this.dragClone!);this.dragClone = undefined;this.dragEvent = undefined;break;}},
    onDragOver,
    onDragLeave,
    onDrop(event:DragEvent, day:number, bgBackup:string | undefined, id:string){
      if(!this.dragEvent){
        return;
      }
      const container = document.getElementById(id);
      if(container && bgBackup){
        container.style.backgroundColor=bgBackup
      }
      const { clickedDay, clickedTime, daysEvents }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable, this.endHourConfigurable, this.startDateConfigurable, this.getEventsToContainer)
      const droppedDate = this.helper.setTimeToDate(clickedDay,clickedTime);


      const previousEnd = new Date(this.dragEvent!.end);
      const previousStart = new Date(this.dragEvent!.start);
      const newStart = new Date(droppedDate);

      const timeDifferenceMilliseconds = newStart.getTime() - previousStart.getTime();
      const endDateCorrection = new Date(previousEnd.getTime() + timeDifferenceMilliseconds);
      this.preventResize(()=>
      {
        this.vuelCalendarApi.onEventDropped(
            {
              clickEvent:event,
              date:droppedDate,
              time:clickedTime,
              events:daysEvents,
              event:this.dragEvent!,
              endDateCorrection,
              accept:()=>{
                this.dragEvent!.start = droppedDate;
                this.dragEvent!.end = endDateCorrection;
              },
              decline:()=>{}
            }
        )
      })

    },
    onDayClick(event:MouseEvent, day:number)
    {
      const { clickedDay, clickedTime, daysEvents }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)
      this.vuelCalendarApi.onDayClicked({clickEvent:event, date:this.helper.setTimeToDate(clickedDay,clickedTime), time:clickedTime, events:daysEvents })
    },
    onDayDblClick(event:MouseEvent, day:number)
    {
      const { clickedDay, clickedTime, daysEvents }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)
      this.vuelCalendarApi.onDayDblClicked({clickEvent:event, date:this.helper.setTimeToDate(clickedDay,clickedTime), time:clickedTime, events:daysEvents })
    },
    onEventEndResizeDragOver(event:MouseEvent, day:number){
      if(this.dragEvent){
        return;
      }
      if(!this.eventResizeHandler.endEvent){
        return;
      }
      const { clickedDay, clickedTime }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)

      this.preventResize(()=>
      {
        this.eventResizeHandler.onEventEndResizeDayOver(clickedDay, clickedTime);
      })
    },
    onEventStartResizeDragOver(event:MouseEvent, day:number){
      if(this.dragEvent){
        return;
      }
      if(!this.eventResizeHandler.startEvent){
        return;
      }
      const { clickedDay, clickedTime }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)

      this.preventResize(()=>
      {
        this.eventResizeHandler.onEventStartResizeDayOver(clickedDay, clickedTime);
      })
    },
    onEventStartResizeDrop(event:MouseEvent, day:number){
      if(this.dragEvent){
        return;
      }
      if(!this.eventResizeHandler.startEvent){
        return;
      }
      const { clickedDay, clickedTime }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)
        this.preventResize(()=>
        {
          this.eventResizeHandler.onEventStartResizeDrop(
              clickedDay,
              clickedTime,
              this.vuelCalendarApi.onEventStartResized,
          )
        })
    },
    onEventEndResizeDrop(event:MouseEvent, day:number){
      if(this.dragEvent){
        return;
      }
      if(!this.eventResizeHandler.endEvent){
        return;
      }
      const { clickedDay, clickedTime }
          = getClickAndDropData(event, day, this.helper, this.startHourConfigurable,this.endHourConfigurable, this.startDateConfigurable,  this.getEventsToContainer)

      this.preventResize(()=>
      {
        this.eventResizeHandler.onEventEndResizeDrop(
            clickedDay,
            clickedTime,
            this.vuelCalendarApi.onEventEndResized,
        )
      })

    },
    setViewMode()
    {
      this.viewMode = this.viewMode === 'days' ?
          'month' : 'days'
    },

    setNewStartDate(date:Date | string):Date
    {
      if(typeof date ===  "string" ){
        date = new Date(date);
      }
      this.preventResize(()=>this.startDateConfigurable = date as Date);
      return new Date(date);
    },
    setDaysForward(days:number){
      if( days < 1){
        this.daysForwardConfigurable = 1;
      }
      this.daysForwardConfigurable = days;
      this.rowHeight = this.height! / days
      if(this.rowHeight < 100){
        this.rowHeight = 100
      }
    },
    setDateRange(startDate:Date|string, endDate:Date|string){
      if(typeof startDate ===  "string" ){
        startDate = new Date(startDate);
      }
      if(typeof endDate ===  "string" ){
        endDate = new Date(endDate);
      }
      const timeDifference = this.helper.getDaysDifference(startDate, endDate);
      this.setDaysForward(timeDifference)
      this.setNewStartDate(startDate);
    },
    setEvents(events:[]):Array<VuelCalendarEvent>
    {
      setTimeout(()=>{
        this.preventResize(()=>
        {
          this.eventsConfigurable = reactive(structuredClone(toRaw(events)))
        })
      })
      return events;
    },

    addEvents(events:[]):Array<VuelCalendarEvent>
    {
      setTimeout(()=>{
        this.preventResize(()=>
        {
          reactive(structuredClone(toRaw(events))).forEach((event) =>
          {
            this.eventsConfigurable.push(event);
          });
        })
      })
      return events;
    },

    removeEventsByParam(param:string, value:any): Array<VuelCalendarEvent>
    {
      return this.preventResize(()=>{
        this.eventsConfigurable = this.eventsConfigurable.filter( (e:any) =>
        {
          return e[param] !== value
        })
        // this.eventsConfigurable.forEach((event:any, index:number) => {
        //   if (event[param] === value) {
        //     this.eventsConfigurable.splice(index, 1); // Usuń element o zadanym parametrze i wartości
        //   }
        // });
      }, []) as Array<VuelCalendarEvent>
    },

    configureEventsByParam(param:string, value:any, params:VuelCalendarEvent):Array<VuelCalendarEvent>
    {
      return this.preventResize(()=>
      {
        const pairedEvents = this.eventsConfigurable.filter((e:any)=>e[param] === value);

        pairedEvents.forEach( (pe:any)=>
        {
          Object.entries(params).forEach( (paramsEntries:any)=>
          {
            pe[paramsEntries[0]] = paramsEntries[1]
          })
        })
      }, [{[param]:value,...params}]) as Array<VuelCalendarEvent>
    },

    setStartHour(hour:number)
    {
      if(hour > this.endHourConfigurable || hour === this.endHourConfigurable){
        this.startHourConfigurable = this.endHourConfigurable -1;
        return;
      }
      if(hour > 23){
        this.startHourConfigurable = 23;
        return;
      }
      if(hour < 0){
        this.startHourConfigurable = 0;
        return;
      }
      this.startHourConfigurable = hour;
    },

    setEndHour(hour:number)
    {
      if(hour < this.startHourConfigurable || hour === this.startHourConfigurable){
        this.endHourConfigurable = this.startHourConfigurable +1;
        return;
      }
      if(hour > 24){
        this.endHourConfigurable = 24;
        return;
      }
      if(hour < 0){
        this.endHourConfigurable = 0;
        return;
      }
      this.endHourConfigurable = hour;
    },
    setTimeRange(startHour:number, endHour:number)
    {
      this.setStartHour(startHour)
      this.setEndHour(endHour)
    },
    getEventsToContainer(day:number)
    {
      const newDate = new Date(this.startDateConfigurable!);
      const targetDate = new Date(newDate.setDate(newDate.getDate() + day - 1));

      const events = this.eventsConfigurable ?? [];
      const divEvents = [];

      for (const event of events)
      {
        if(event.start) {
          if (
              (this.dateUltra.isSameDate(event.start, targetDate))
              ||
              (this.dateUltra.isSameDate(event.end, targetDate))
              ||
              (
                  this.dateUltra.isLowerDate(targetDate, event.end)
                  && this.dateUltra.isBiggerDate(targetDate, event.start)
              )
          )
          {
            divEvents.push(event);
          }
        }
      }
      // console.log(
      //     'divEvents',
      //     divEvents
      // );
      return divEvents;
    },

    setDateFromMonthCalendar( dayToAdd: number )
    {

      this.startDateConfigurable
          = this.helper.getDayFromFirstDayByAdd
      (
          this.startDateConfigurable!,
          dayToAdd - 1
      );
      this.viewMode = 'days'
      // console.log(
      //     'nowa data z month calendar',
      //     date
      // );
    },

    preventResize(method:Function, returnable?:any){
      this.$nextTick( ()=>
      {
        const els:any[] = []
        for(let i = 1; i<this.daysForwardConfigurable+1; i++)
        {
          const el = document.getElementById(`vuelcalendar_day-${i}`)! as HTMLDivElement
          if(el)
          {
            els.push({id:el.id, beforeHeight:el.style.height})
          }
        }

        method()

        this.$nextTick(()=>
        {
          els.forEach( (el:any, index:number)=>
          {
            const elAfter = document.getElementById(el.id)! as HTMLDivElement
            const elLabelAfter = document.getElementById(`day_label-${index+1}`)! as HTMLDivElement
            if(elAfter)
            {
              elAfter.style.height = el.beforeHeight
            }
            if(elLabelAfter)
            {
              elLabelAfter.style.height = el.beforeHeight
            }
          })
        })
      })
      return returnable;
    },
    /* */
  }
})
</script>
