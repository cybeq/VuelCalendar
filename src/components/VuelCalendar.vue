<template>
  <div :style="`display:flex;width:100%; height:${height! + 50} +'px'; border-radius:12px`">
    <nav :style="{overflow:'hidden', background:theme.colors.primary, width:'40px', borderTopLeftRadius:'12px', borderBottomLeftRadius:'12px', paddingTop:'50px'}">
      <div 
        v-for="day in daysForwardConfigurable" :key="day"
        :id="`day_label-${day}`"
        :style="{overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr', color:theme.colors.textPrimary, whiteSpace: 'nowrap', fontSize:'0.9em',  boxSizing:'border-box', background:theme.colors.primary, width:'100%', height:rowHeight +'px',borderBottom:'solid 3px', borderColor:theme.colors.surface } ">
        <div :style="{fontWeight:'bold',display:'flex', justifyContent:'center', alignItems:'center',maxWidth:'20px',  writingMode:'sideways-lr',  boxSizing:'border-box'}">
          {{ helper.daysEnumerable[pairDateToContainer(startDateConfigurable!, day).getDay()] }}
        </div>
        <div :style="{display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:helper.isCurrentDay(startDateConfigurable!, day) ? theme.colors.highlight : theme.colors.menuBg, writingMode:'sideways-lr', maxWidth:'20px'}">
          {{pairDateToContainer(startDateConfigurable!, day).toLocaleDateString() }}
        </div>
       </div>
    </nav>
    <div :style="{width:'100%', height:'100%', overflowY:'hidden', overflowX:'auto'}">
    <nav id="timeline" 
        :style="{height:'50px', borderBottom:'solid 2px', borderTop:'solid 2px', width:'100%', borderTopRightRadius:'12px', overflow:'hidden', minWidth:'1200px',backgroundColor: theme.colors.primary, borderColor:theme.colors.surface, display:'grid', gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`}">
          <div 
            v-for="hour in helper.getHours(startHourConfigurable)" 
            :key="hour"
            :style="{borderLeft: 'solid 1px',borderColor:theme.colors.surface, display:'flex',justifyContent: 'center',alignItems:'center', color:theme.colors.textPrimary}">
            <span >{{ hour }}</span>
            <span style="font-size:0.8em;margin-top:-3px"> 00</span>
          </div>
    </nav> 

    <main 
          :style="{minHeight: height + 'px', maxHeight:theme.lockResize ? height +'px' : 'unset',
                  width:'100%', height:'100%', boxSizing:'border-box', borderBottomRightRadius:'12px',
                  minWidth:'1200px', overflow:'auto'  }"  

          ref="container"> 
        <div :id="`vuelcalendar_day-${day}`" v-for="day in daysForwardConfigurable" :key="day" @click="onDayClick" 
            :style="{height:`${rowHeight}px`, backgroundColor:theme.colors.primary, color:theme.colors.textPrimary,
                      width:'100%', position:'relative', overflow:'hidden', boxSizing:'border-box' }">  
          <div style="margin-top:15px">
            <div 
              v-for="event in getEventsToContainer(day)" 
              :key="event" 
              @click.stop="vuelCalendarApi.onEventClicked(event)"
              :style="{ height:'20px', marginTop:'1rem', marginLeft:`${getEventMarginLeft(event)}%`, width:`${getEventWidth(event)}%`, backgroundColor:theme.colors.event, color:theme.colors.textPrimary, borderRadius:'5px', zIndex:'22', position:'sticky'}">
              {{event.label}}
            </div>
          </div>
            <div 
                :style="{position:'absolute', width:'100%', top:'0', display:'grid', gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`, pointerEvents:'none',height:'100%'}">
                <div v-for="r in 24-startHourConfigurable" :key="r" :style="{borderLeft:'solid 1px', borderColor:theme.colors.surface, height:'100%'}"/>
            </div>
            <div  @mousedown.stop.prevent="onResizerMouseDown"   class="w-full h-[3px] absolute bottom-0 cursor-ns-resize" :style="{backgroundColor: theme.colors.surface}"/>
          </div>
    </main>
  </div>
</div>
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
      const dayNumber = el.id.split('-')[1];
      const dayLabelElement = document.getElementById(`day_label-${dayNumber}`);
      const deltaY = event.clientY;
      const newHeight = (deltaY - el.getBoundingClientRect().top)
      if(newHeight < this.rowHeight){
        el.style.height = this.rowHeight + 'px';
        if(dayLabelElement && !this.theme.lockResize)
        {
          dayLabelElement!.style.height = this.rowHeight +'px'
        }
        return;
      }
      el.style.height = newHeight + 'px';
      if(dayLabelElement && !this.theme.lockResize)
      {
        dayLabelElement!.style.height = newHeight +'px'
      }
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