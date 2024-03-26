<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {EventResizeHandler} from "../utils/EventResizeHandler.ts";
import {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import {EventDragHandler} from "../utils/EventDragHandler.ts";
import {DateUltra} from "../utils/DateUltra.ts";
import {PreventResize, PushToSplit} from "../utils/types/function-types/innerFunctionsTypes.ts";

export default defineComponent({
  name: "VuelCalendarEventSingle",
  setup(){
    return {
      dateUltra:new DateUltra(),
    }
  },
  props:{
    pushToEventSplit:{
      type:Function as PropType<PushToSplit>,
      required:true
    },
    resizableEvents:{
      type:Boolean,
      default:false
    },
    eventResizeHandler:{
      type:Object as PropType<EventResizeHandler>,
      required:true,
    },
    event:{
      type:Object as PropType<VuelCalendarEvent>,
      required:true,
    },
    draggableEvents:{
      type:Boolean,
      default:false
    },
    eventDragHandler:{
      type:Object as PropType<EventDragHandler>,
      required:true
    },
    renderer:{
      type:String as PropType<string | undefined>,
      default:undefined
    },
    clone:{
      type:Function,
      required:true
    },
    loopedDay:{
      type:Number,
      required:true
    },
    startDateConfigurable:{
      type:Date,
      required:true,
    },
    preventResize:{
      type:Function as PropType<PreventResize>,
      required:true,
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
})
</script>

<template>
  <div :style="{
        position:'absolute',
        left:0,
        width:'5px',
        height:'100%',
        backgroundColor:'transparent',
        cursor:resizableEvents ? 'ew-resize' :'inherit',
        }"
       :draggable="resizableEvents"
       @dragstart.stop="eventResizeHandler.onEventStartResizeStart(event, pushToEventSplit)"
       @dragend="eventResizeHandler.onEventStartResizeEnd"
       v-if="isSameDay(event.start)"
  />
  <div :style="{
        position:'absolute',
        right:0,
        width:'5px',
        height:'100%',
        backgroundColor:'transparent',
        cursor:resizableEvents ? 'ew-resize' :'inherit',
        }"
       :draggable="resizableEvents"
       @dragstart.stop="eventResizeHandler.onEventEndResizeStart(event, pushToEventSplit)"
       @dragend="eventResizeHandler.onEventEndResizeEnd"
       v-if="isSameDay(event.end)"
  />
  <div :draggable="draggableEvents" style="user-select: none;"
       @dragstart.stop="eventDragHandler.onDragStart($event, event, clone, pushToEventSplit, preventResize, loopedDay)"
       @dragend="eventDragHandler.onDragEnd(clone, preventResize)"
       :key="event.id"
  >
    <div v-if="!renderer"> {{event.label}}</div>
    <div v-if="renderer"
         style="width:100%;height:100%"
    >
      <component
          :is="renderer"
          :event="event"/>

    </div>
  </div>
</template>

<style scoped>

</style>