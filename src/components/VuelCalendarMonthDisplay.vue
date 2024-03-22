<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Helper} from "../utils/Helper.ts";
import {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import VuelCalendarResizer from "./VuelCalendarResizer.vue";

export default defineComponent({
  name: "VuelCalendarMonthDisplay",
  components:{VuelCalendarResizer},
  props:{
    viewMode:{
      type:String,
      required:true,
    },
    height:{
      type:Number as PropType<number | any>,
      required:true,
    },
    theme:{
      type:Object as any,
      required:true,
    },
    helper:{
      type:Object as PropType<Helper>,
      required:true,
    },
    setDateFromMonthCalendar:{
      type:Function as PropType<(day:number)=>void>,
      required:true,
    },
    startDateConfigurable:{
      type:Date,
      required:true,
    },
    eventsConfigurable:{
      type:Array as PropType<Array<VuelCalendarEvent>>,
      required:true,
    },
    rowHeight:{
      type:Number,
      required:true,
    },
    daysForwardConfigurable:{
      type:Number,
      required:true,
    },
    setViewMode:{
      type:Function as PropType<() => void>,
      required:true,
    }
  },
  computed:{
    countEventsForDay()
    {
      return (day:number) => this.helper.countEventsForDay(this.startDateConfigurable!, day - 1, this.eventsConfigurable!)
    }
  }
})
</script>

<template>
  <section v-show="viewMode === 'month'"
           :style="{
              width:'100%',
              display:'flex',
              position:'relative'}">
  <div ref="monthContainer"
       class="vuelcalendar-month-container"
           :style="{
              width:'100%',
              boxSizing:'border-box',
              height: height! + 50 +'px',
              borderTopLeftRadius:'12px',
              borderTopRightRadius:'12px',
              borderBottomLeftRadius:'12px',
              borderBottomRightRadius:'12px',
              borderTop:'solid 2px',
              borderRight:'solid 2px',
              borderLeft:'solid 2px',
              borderColor:theme.colors.surface,
              overflow: 'auto',
              position:'relative'}"
      >
      <div :style="{
              display: 'grid',
              boxSizing: 'border-box',
              gridTemplateColumns: 'repeat(7, 1fr)',
              width: '100%',
              height: '100%',
              minWidth: '400px'}"
      >
        <div  class="vuelcalendar-month-day-upper-label-container"
              :style="{
                display: 'grid',
                gridTemplateColumns:'repeat(7, 1fr)',
                width:'100%',
                height:50 +'px',
                background:theme.colors.primary,
                borderBottom:'solid 1px',
                borderColor:theme.colors.surface,
                position:'absolute',
                top:0,
                zIndex:2}"
        >
          <div v-for="day in 7"
               :key="day"
               class="vuelcalendar-month-day-upper-label"
               :style="{
                  display:'flex',
                  justifyContent:'center',
                  borderLeft:'solid 1px',
                  borderColor:theme.colors.surface,
                  fontSize:'0.8em',
                  fontWeight:'bolder',
                  alignItems:'center',
                  color:theme.colors.textPrimary
               }"
          >

            {{helper.daysEnumerableFromMonday[day-1]}}

          </div>
        </div>
        <div class="vuelcalendar-month-box"
             v-for="day in 35"
             :key="day"
             @click="setDateFromMonthCalendar(day)"
             :style="{
                 background: theme.colors.primary,
                 borderLeft: 'solid 1px',
                 borderBottom: 'solid 1px',
                 borderColor:theme.colors.surface,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 cursor: 'pointer',
                 position: 'relative'}"
        >
          <div  :class="`vuelcalendar-month-events${countEventsForDay(day - 1) > 0 ? '-active' :''}`"
                :style="{
                  backgroundColor: countEventsForDay(day - 1) > 0 ? theme.colors.event : theme.colors.surface,
                  padding: '5px',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  color: theme.colors.textPrimary,
                  position: 'relative'
             }"
               v-text="countEventsForDay(day - 1)"
          />

          <div class="vuelcalendar-month-datelabel" :style="{position: 'absolute', bottom: '5px', left: '5px', fontSize:'0.8em', color:theme.colors.textPrimary}">

            {{helper.dateToMonthAndDayContainer(startDateConfigurable!, day - 2)}}

          </div>

        </div>

      </div>

      <VuelCalendarResizer
          :theme="theme"
          :days-forward-configurable="daysForwardConfigurable"
          :view-mode="viewMode"
          :row-height="rowHeight" />

      </div>

  </section>
</template>

<style scoped>

</style>