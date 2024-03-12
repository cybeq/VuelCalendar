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
              borderBottomLeftRadius:'12px',
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
                height:30 +'px',
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
                 borderColor: theme.colors.surface,
                 borderLeftWidth: '1px',
                 borderBottomWidth: '1px',
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

          <div class="vuelcalendar-month-datelabel" :style="{position: 'absolute', bottom: 0, left: 0, fontSize:'0.8em', color:theme.colors.textPrimary}">

            {{helper.dateToMonthAndDayContainer(startDateConfigurable!, day - 1,)}}

          </div>

        </div>

      </div>

      <VuelCalendarResizer
          :theme="theme"
          :days-forward-configurable="daysForwardConfigurable"
          :view-mode="viewMode"
          :row-height="rowHeight" />

      </div>
      <nav :style="{
            overflow:'hidden',
            position:'relative',
            backgroundColor:theme.colors.primary,
            borderLeft:'solid 1px',
            borderColor: theme.colors.textPrimary+15,
            width:'40px',
            borderTopRightRadius:'12px',
            borderBottomRightRadius:'12px'}"
      >
          <div :style="{
                  overflow:'hidden',
                  color:theme.colors.textPrimary,
                  boxSizing:'border-box',
                  width:'100%',
                  height:'125px',
                  marginTop:'20px',
                  gridGap:'20px',
                  display:'grid',
                  borderBottom:'solid 3px',
                  borderColor:theme.colors.surface } "
          >
            <div  @click="setViewMode"
                  style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>calendar-month</title><path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" /></svg>
            </div>
          </div>
          <VuelCalendarResizer
              :theme="theme"
              target-on-month-sidebar
              :month-container="$refs.monthContainer"
              :days-forward-configurable="daysForwardConfigurable"
              :view-mode="viewMode"
              :row-height="rowHeight" />
        </nav>
  </section>
</template>

<style scoped>

</style>