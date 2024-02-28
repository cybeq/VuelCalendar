<template>
  <div class="w-full h-full overflow-y-hidden overflow-x-auto">
  <nav id="timeline" class="h-[50px] border-b-2 border-t-2 w-full rounded-t-lg overflow-hidden min-w-[1200px]" 
       :style="{backgroundColor: theme.colors.primary, borderColor:theme.colors.surface, display:'grid', gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`}">
        <div v-for="hour in helper.getHours(startHourConfigurable)" :key="hour" class="col-span-1 text-primary-300" 
          :style="{borderLeft: 'solid 1px',borderColor:theme.colors.surface, display:'flex',justifyContent: 'center',alignItems:'center', color:theme.colors.textPrimary}">
          <span >{{ hour }}</span>
          <span style="font-size:0.8em;margin-top:-3px"> 00</span>
        </div>
  </nav> 
  <!-- <nav :style="{position:'absolute', height:height +'px', width:'30px', background:'red', zIndex:'32'}">
    
  </nav> -->
  <main :class="['w-full h-full  border-box rounded-b-lg min-w-[1200px] overflow-auto']" :style="{backgroundColor:'#ffffff', minHeight: height + 'px', maxHeight:theme.lockResize ? height +'px' : 'unset'}"  ref="container"> 
      <div :id="`vuelcalendar_day-${day}`" v-for="day in daysForwardConfigurable" :key="day" @click="onDayClick" 
      :class="[' w-full relative overflow-y-hidden overflow-x-hidden border-box']" :style="{height:`${rowHeight}px`, backgroundColor:theme.colors.primary, color:theme.colors.textPrimary}">
        <div class="text-sm" 
          :style="{cursor:'pointer',backgroundColor:helper.isCurrentDay(startDateConfigurable!, day) ? theme.colors.highlight : theme.colors.menuBg, position:'absolute', zIndex:'2', fontWeight:'bold', width:'200px', paddingInline:'5px', borderBottomRightRadius:'5px', display:'grid', gridTemplateColumns:'1fr 1fr'}">  
          <div style="text-align:left"> {{ helper.daysEnumerable[pairDateToContainer(startDateConfigurable!, day).getDay()] }} </div>
          <div style="text-align:right"> {{pairDateToContainer(startDateConfigurable!, day).toLocaleDateString() }} </div>
        </div>  
    
        <div class="w-[100px] h-[20px] mt-2"
         v-for="event in getEventsToContainer(day)" 
         :key="event" 
         @click.stop="vuelCalendarApi.onEventClicked(event)"
         :style="{marginLeft:`${getEventMarginLeft(event)}%`, width:`${getEventWidth(event)}%`, backgroundColor:theme.colors.event, color:theme.colors.textPrimary, borderRadius:'5px', zIndex:'22', position:'sticky'}">
         {{event.label}}
        </div>
        <div  class="w-full  absolute top-0 h-full cursor-ns-resize" 
        :style="{display:'grid', gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`, pointerEvents:'none'}"><div v-for="r in 24" :key="r" :style="{borderLeft:'solid 1px', borderColor:theme.colors.surface}"/></div>
        <div  @mousedown.stop.prevent="onResizerMouseDown"   class="w-full h-[3px] absolute bottom-0 cursor-ns-resize" :style="{backgroundColor: theme.colors.surface}"/>
      </div>
  </main>
</div>
  {{ eventsConfigurable }}
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Helper } from '../utils/Helper';
import { VuelCalendarOptions } from '../utils/VuelCalendarOptions';
import type { PropType } from 'vue';
export default defineComponent({
  setup(){
    const helper = new Helper();
    return {
      helper
    }
  },
  props:{
    vuelCalendarOptions:{
      type:Object as PropType<VuelCalendarOptions>,
      required:true,  
    }
  },
  computed:{
    theme(){
      return{
        colors:{
        surface:this.vuelCalendarApi.theme === 'light' ? '#fff' : (this.vuelCalendarApi.theme === 'dark' ? '#36373a' : '#fff'),
        primary:this.vuelCalendarApi.theme === 'light' ? '#f1f1f1' : (this.vuelCalendarApi.theme === 'dark' ? '#242528' : '#f1f1f1'),
        event:this.vuelCalendarApi.theme === 'light' ? '#039be5' : (this.vuelCalendarApi.theme === 'dark' ? '#039be5' : '#039be5'),
        highlight:this.vuelCalendarApi.theme === 'light' ? '#fd1b1b' : (this.vuelCalendarApi.theme === 'dark' ? 'red' : '#fd1b1b'),
        textPrimary:this.vuelCalendarApi.theme === 'light' ? '#000000' : (this.vuelCalendarApi.theme === 'dark' ? '#f5f4f5' : '#000000'),
        menuBg:'#5b5c5c'
        },
        lockResize:this.vuelCalendarApi.lockResize
      }
    },
    height(){
      return this.vuelCalendarApi.height
    }
  },
  data(){
    return{
      vuelCalendarApi:new VuelCalendarOptions(
        this.vuelCalendarOptions,
        this.setNewStartDate,
        this.setEvents
      ),
      rowHeight:0,
      resizer:{
        isResizing:false,
        resizedElBottom:null as Number | null,
        resizedEl:null as HTMLDivElement | null,
      },
      startDateConfigurable:this.vuelCalendarOptions.startDate,
      eventsConfigurable:this.vuelCalendarOptions.events,
      daysForwardConfigurable:this.vuelCalendarOptions.daysForward,
      startHourConfigurable:this.vuelCalendarOptions.startHour ?? 0
    }
  },
  created(){
    this.$nextTick(()=>{
      var containerHeight = (this.$refs.container as HTMLDivElement).offsetHeight;
      this.rowHeight = (containerHeight / (this.vuelCalendarOptions.daysForward));
      console.log(this.rowHeight);
    })
  },
  methods:{
    onDayClick(event:MouseEvent){
      const el = (event.currentTarget! as HTMLElement);
      const clickedWidthFromLeft = event.clientX - el.getBoundingClientRect().left
      const percentClicked = (clickedWidthFromLeft / el.offsetWidth) * 100;
      
      console.log('click', event.target, el.offsetWidth, clickedWidthFromLeft, percentClicked, this.helper.convertPercentageToTime(percentClicked, this.startHourConfigurable));
    },
    onResizerMouseDown(event:MouseEvent) {
        this.resizer.isResizing = true;
        const parentEl = (event.target! as HTMLDivElement).parentElement! as HTMLDivElement;
        this.resizer.resizedElBottom = parentEl.getBoundingClientRect().bottom;
        this.resizer.resizedEl = parentEl;
        document.addEventListener('mousemove', this.onResizerMouseMove)
        document.addEventListener('mouseup', this.onResizerMouseUp)
    },
    onResizerMouseUp() {
        this.resizer.isResizing = false;
        this.resizer.resizedElBottom = null;
        this.resizer.resizedEl = null;
        document.removeEventListener('mousemove', this.onResizerMouseMove)
        document.removeEventListener('mouseup', this.onResizerMouseUp)
    },
    onResizerMouseMove(event:MouseEvent) {
      if (!this.resizer.isResizing) return;
      const el = (this.resizer.resizedEl! as HTMLDivElement);
      const deltaY = event.clientY;
      const newHeight = (deltaY - el.getBoundingClientRect().top)
      if(newHeight <20){
        el.style.height = 20 + 'px';
        return;
      }
      el.style.height = newHeight + 'px';
    },
    pairDateToContainer(startDate:Date, day:number){
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + day - 1);
      return newDate;
    },
    setNewStartDate(date:Date){
      this.startDateConfigurable = date;
    },
    setEvents(events:[]){
        this.eventsConfigurable = events;
    },
    getEventsToContainer(day:number){
      const newDate = new Date(this.startDateConfigurable!);
      const targetDate = new Date(newDate.setDate(newDate.getDate() + day - 1));

      const events = this.eventsConfigurable ?? [];
      const divEvents = [];

      for (const event of events) {
        const eventDate = new Date(event.start);
        if (
          eventDate.getDate() === targetDate.getDate() &&
          eventDate.getMonth() === targetDate.getMonth() &&
          eventDate.getFullYear() === targetDate.getFullYear()
        ) {
          divEvents.push(event);
        }
      }

      console.log('divEvents', divEvents);
      return divEvents;
    },
    // szerokosci oraz marginy
    getEventMarginLeft(event:any){
      return this.helper.convertTimeToPercentage(this.helper.getTimeFromDate(event.start), this.startHourConfigurable)
    },
    getEventWidth(event:any){
      return this.helper.convertTimeDistanceToPercentage(this.helper.getTimeFromDate(event.start), this.helper.getTimeFromDate(event.end), this.startHourConfigurable)
    }
    /* */
  }
}) 
</script>
<style>

</style>