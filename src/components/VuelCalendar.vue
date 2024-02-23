<template>
  <nav id="timeline" class="border-primary-200 border-b-2 border-t-2 w-full bg-surface-100 grid grid-cols-24">
        <div v-for="hour in helper.hours" :key="hour" class="col-span-1 text-primary-300">{{ hour }}</div>
  </nav> 
  <main :class="['w-full h-full  bg-surface-400 border-box overflow-auto']"  ref="container"> 
      <div id="vuecal-day_1" v-for="day in daysForwardConfigurable" :key="day" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        {{ pairDateToContainer(startDateConfigurable, day) }}
        <div class="w-[30px] h-[20px] bg-surface-200" v-for="event in eventsConfigurable" :key="event">dasd</div>
        <div  @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <!-- <div id="vuecal-day_1" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        <div   @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <div id="vuecal-day_2" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        <div   @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <div id="vuecal-day_3" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        <div   @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <div id="vuecal-day_4" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        <div   @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <div id="vuecal-day_5" @click="onDayClick" :class="['w-full relative overflow-y-auto']" :style="{height:`${rowHeight}px`}">
        <div   @mousedown.stop="onResizerMouseDown"   class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div> -->
      <!-- <div id="vuecal-day_6" @click="onDayClick" class="border-primary-200 w-full relative overflow-y-auto" v-show="showWeekends">
        <div class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div>
      <div id="vuecal-day_7" @click="onDayClick" class="border-primary-200 w-full relative overflow-y-auto" v-show="showWeekends">
        <div class="w-full h-[3px] bg-surface-200 absolute bottom-0 cursor-ns-resize"/>
      </div> -->
  </main>
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
    }
  },
  created(){
    this.$nextTick(()=>{
      var containerHeight = (this.$refs.container as HTMLDivElement).offsetHeight;
      this.rowHeight = (containerHeight / this.vuelCalendarOptions.daysForward);
      console.log(this.rowHeight);
      
    })
  },
  methods:{
    onDayClick(event:MouseEvent){
      const el = (event.currentTarget! as HTMLElement);
      const clickedWidthFromLeft = event.clientX - el.getBoundingClientRect().left
      const percentClicked = (clickedWidthFromLeft / el.offsetWidth) * 100;
      
      console.log('click', event.target, el.offsetWidth, clickedWidthFromLeft, percentClicked, this.helper.convertPercentageToTime(percentClicked));
    },
    onResizerMouseDown(event:MouseEvent) {
        this.resizer.isResizing = true;
        const parentEl = (event.target! as HTMLDivElement).parentElement! as HTMLDivElement;
        this.resizer.resizedElBottom = parentEl.getBoundingClientRect().bottom;
        this.resizer.resizedEl = parentEl;
        document.body.addEventListener('mousemove', this.onResizerMouseMove)
        document.body.addEventListener('mouseup', this.onResizerMouseUp)
    },
    onResizerMouseUp() {
        this.resizer.isResizing = false;
        this.resizer.resizedElBottom = null;
        this.resizer.resizedEl = null;
        document.body.removeEventListener('mousemove', this.onResizerMouseMove)
        document.body.removeEventListener('mouseup', this.onResizerMouseUp)
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
    }
  }
}) 
</script>
<style>
  
</style>