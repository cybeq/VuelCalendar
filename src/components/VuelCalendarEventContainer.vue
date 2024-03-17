<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import type {Helper} from "../utils/Helper.ts";
import {onDragEnd, onDragStart} from "../utils/dragHandlers.ts";

export default defineComponent({
  props:{
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
    loopedDay:{
      type:Number,
      required:true
    },
    startDateConfigurable:{
      type:Date,
      required:true,
    }
  },
  methods:{
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
          this.endHourConfigurable
      )
    },

    getEventWidth( event: VuelCalendarEvent )
    {
      return this.helper.convertTimeDistanceToPercentage(
          event.start,
          event.end,
          this.startHourConfigurable,
          this.endHourConfigurable
      )
    },

    onDragStart,
    onDragEnd,
  }

})
</script>

<template>
  <div
    class="vuelcalendar-event"
    v-for="event in events"
    :key="getEventKey(event.id ?? 0)"
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
    <div :draggable="draggableEvents" style="user-select: none;"
         @dragstart.stop="onDragStart($event, event, clone)"
         @dragend="onDragEnd($event, clone)"
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
  </div>
</template>

<style scoped>

</style>