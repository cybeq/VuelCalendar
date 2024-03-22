<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import type {Helper} from "../utils/Helper.ts";
import {DateUltra} from "../utils/DateUltra.ts";
import {EventResizeHandler} from "../utils/EventResizeHandler.ts";
import {EventDragHandler} from "../utils/EventDragHandler.ts";
import VuelCalendarEventSingle from "./VuelCalendarEventSingle.vue";

export default defineComponent({
  components: {VuelCalendarEventSingle},
  setup(){
    return {
      dateUltra:new DateUltra(),
    }
  },
  computed:{
    isSameDay(){
      return (date:Date)  =>
          this.dateUltra.isSameDate(
              this.dateUltra.addDays(this.startDateConfigurable, this.loopedDay-1),
              date
          );
    },
  },
  props:{
    eventResizeHandler:{
      type:Object as PropType<EventResizeHandler>,
      required:true,
    },
    onEventClicked:{
      type:Function,
      required:true,
    },
    events:{
      type:Array as PropType<Array<VuelCalendarEvent>>,
      required:true,
    },
    helper:{
      type:Object as PropType<Helper>,
      required:true,
    },
    startHourConfigurable:{
      type:Number,
      required:true,
    },
    endHourConfigurable:{
      type:Number,
      required:true,
    },
    theme:{
      type:Object as any,
      required:true,
    },
    renderer:{
      type:String as PropType<string | undefined>,
      default:undefined
    },
    clone:{
      type:Function,
      required:true
    },
    draggableEvents:{
      type:Boolean,
      default:false
    },
    resizableEvents:{
      type:Boolean,
      default:false
    },
    loopedDay:{
      type:Number,
      required:true
    },
    startDateConfigurable:{
      type:Date,
      required:true,
    },
    eventDragHandler:{
      type:Object as PropType<EventDragHandler>,
      required:true
    },
  },
  methods:{
    getEventsToContainer(day:number)
    {
      const newDate = new Date(this.startDateConfigurable!);
      const targetDate = new Date(newDate.setDate(newDate.getDate() + day - 1));

      const events = this.events ?? [];
      const divEvents = [];

      for (const event of events)
      {
        if(event.start < event.end) {
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
    getEventKey(id:number|string):string
    {
      let randomId = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      const array = new Uint32Array(8);
      crypto.getRandomValues(array);

      for (let i = 0; i < 10; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return id + '-' + randomId;
    },

    getEventMarginLeft( event: VuelCalendarEvent )
    {
      return this.helper.convertTimeToPercentage(
          this.helper.getTimeFromDate(event.start!),
          this.startHourConfigurable,
          this.endHourConfigurable,
          event.start,
          this.startDateConfigurable,
          this.loopedDay
      )
    },

    getEventWidth( event: VuelCalendarEvent )
    {
      return this.helper.convertTimeDistanceToPercentage(
          event.start,
          event.end,
          this.startHourConfigurable,
          this.endHourConfigurable,
          this.startDateConfigurable,
          this.loopedDay
      )
    },
  }
})
</script>

<template>
  <div
    class="vuelcalendar-event"
    v-for="event in getEventsToContainer(loopedDay)"
    @click.stop="onEventClicked(event)"
    :style="{
      height: renderer ?'unset':'20px',
      minHeight:'20px',
      marginTop:'1rem',
      marginLeft:`${getEventMarginLeft(event)}%`,
      width:`${getEventWidth(event)}%`,
      maxWidth:`${getEventWidth(event)}%`,
      backgroundColor:theme.colors.event,
      color:theme.colors.textPrimary,
      overflow:'hidden',
      borderRadius:'5px',
      zIndex:3,
      transition:'opacity 0.2s ease',
      position:'sticky'}"
  >
    <VuelCalendarEventSingle :start-date-configurable="startDateConfigurable"
                       :looped-day="loopedDay"
                       :clone="clone"
                       :key="event.id"
                       :renderer="renderer"
                       :draggable-events="draggableEvents"
                       :resizable-events="resizableEvents"
                       :event-drag-handler="eventDragHandler"
                       :event="event"
                       :event-resize-handler="eventResizeHandler" />
  </div>
</template>

<style scoped>

</style>