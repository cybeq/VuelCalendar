<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import type {Helper} from "../utils/Helper.ts";

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
    theme:{
      type:Object as any,
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
          this.helper.getTimeFromDate(event.start),
          this.startHourConfigurable
      )
    },

    getEventWidth( event: VuelCalendarEvent )
    {
      return this.helper.convertTimeDistanceToPercentage(
          this.helper.getTimeFromDate(event.start),
          this.helper.getTimeFromDate(event.end),
          this.startHourConfigurable
      )
    },
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
      height:'20px',
      marginTop:'1rem',
      marginLeft:`${getEventMarginLeft(event)}%`,
      width:`${getEventWidth(event)}%`,
      backgroundColor:theme.colors.event,
      color:theme.colors.textPrimary,
      borderRadius:'5px',
      zIndex:3,
      position:'sticky'}"
  >
                  {{event.label}}

  </div>
</template>

<style scoped>

</style>