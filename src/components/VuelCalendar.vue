<template>
  <div :style="`
            display:flex;
            width:100%;
            height:${height! + 50} +'px';
            border-radius:12px`"
       v-if="viewMode === 'days'"
  >
    <nav :style="{
       position:'relative',
       overflow:'hidden',
       background:theme.colors.primary,
       width:'40px',
       borderTopLeftRadius:'12px',
       borderBottomLeftRadius:'12px',
       paddingTop:'50px'
    }">
      <div 
        v-for="day in daysForwardConfigurable"
        :key="day"
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
        <div :style="{
                  fontWeight:'bold',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  maxWidth:'20px',
                   writingMode:'sideways-lr',
                   boxSizing:'border-box'}">

          {{ helper.daysEnumerable[pairDateToContainer(startDateConfigurable!, day).getDay()] }}

        </div>
        <div :style="{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:helper.isCurrentDay(pairDateToContainer(startDateConfigurable!, day)) ? theme.colors.highlight : theme.colors.menuBg,
          writingMode:'sideways-lr',
          maxWidth:'20px'}
        ">

          {{pairDateToContainer(startDateConfigurable!, day).toLocaleDateString() }}

        </div>
       </div>

       <div  @mousedown.stop.prevent="onResizerMouseDown($event, true)"
             :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}
        "/>
    </nav>
    <div :style="{
            width:'100%',
            height:'100%',
            overflowY:'hidden',
            overflowX:'auto'
    }">
    <nav id="timeline" 
        :style="{
            height:'50px',
            borderBottom:'solid 2px',
            borderTop:'solid 2px',
            width:'100%',
            overflow:'hidden',
            minWidth:'1200px',
            backgroundColor: theme.colors.primary,
            borderColor:theme.colors.surface,
            display:'grid',
            gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`}
    ">
          <div 
            v-for="hour in helper.getHours(startHourConfigurable)" 
            :key="hour"
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
              height:'100%',
              boxSizing:'border-box',
              minWidth:'1200px',
              overflow:'auto'  }"

    >
        <div :id="`vuelcalendar_day-${day}`"
             v-for="day in daysForwardConfigurable"
             :key="day"
             @click="onDayClick"
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
            <div 
              v-for="event in getEventsToContainer(day)" 
              :key="event" 
              @click.stop="vuelCalendarApi.onEventClicked(event)"
              :style="{
                height:'20px',
                marginTop:'1rem',
                marginLeft:`${getEventMarginLeft(event)}%`,
                width:`${getEventWidth(event)}%`,
                backgroundColor:theme.colors.event,
                color:theme.colors.textPrimary,
                borderRadius:'5px',
                zIndex:'22',
                position:'sticky'}"
            >

              {{event.label}}

            </div>
          </div>
            <div 
                :style="{
                    position:'absolute',
                    width:'100%',
                    top:'0',
                    display:'grid',
                    gridTemplateColumns:`repeat(${24-startHourConfigurable},1fr)`,
                    pointerEvents:'none',
                    height:'100%'}"
            >
                <div v-for="r in 24-startHourConfigurable"
                     :key="r"
                     :style="{
                       borderLeft:'solid 1px',
                       borderColor:theme.colors.surface,
                       height:'100%'}"
                />
            </div>
            <div  @mousedown.stop.prevent="onResizerMouseDown"
                  :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}"
            />
          </div>
    </main>
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
      <div 
        :style="{
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
        <div  @click="setViewMode"  style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>calendar-month</title><path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" /></svg>
        </div>
        <div style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>calendar-edit</title><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H10V19H5V8H19V9H21V5A2,2 0 0,0 19,3M21.7,13.35L20.7,14.35L18.65,12.35L19.65,11.35C19.85,11.14 20.19,11.13 20.42,11.35L21.7,12.63C21.89,12.83 21.89,13.15 21.7,13.35M12,18.94L18.07,12.88L20.12,14.88L14.06,21H12V18.94Z" /></svg>
        </div>
        <div style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>arrange-send-to-back</title><path d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" /></svg>
        </div>
      </div>
       <div  @mousedown.stop.prevent="onResizerMouseDown($event, true)"
             :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}"
       />
    </nav>
</div>

<!-- month view -->

<section v-show="viewMode === 'month'"
         :style="{
            width:'100%',
            display:'flex',
            position:'relative'}"
>
  <div ref="monthContainer"
       :style="{
          width:'100%',
          boxSizing:'border-box',
          height: height! + 50 +'px',
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
    <div :style="{
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
           :style="{
              display:'flex',
              justifyContent:'center',
              alignItems:'center'}"
      >

        {{helper.daysEnumerableFromMonday[day-1]}}

      </div>
    </div>
    <div v-for="day in 35"
         :key="day"
         @click="setDateFromMonthCalendar(day)"
         :style="{
           background: theme.colors.primary,
           borderColor:theme.colors.surface,
           borderLeftWidth:'1px',
           borderBottomWidth:'1px',
           display:'flex',
           justifyContent:'center',
           alignItems:'center',
           cursor:'pointer'
         }"
    >
       <div :style="{
              backgroundColor:helper.countEventsForDay(startDateConfigurable!, day - 1, eventsConfigurable!) > 0 ? theme.colors.event : theme.colors.surface,
              padding:'5px',
              fontWeight:'bold',
              borderRadius:'12px',
              color:theme.colors.textPrimary
             }"
             v-text="helper.countEventsForDay(startDateConfigurable!, day - 1, eventsConfigurable!)"
       />
    </div>
  </div>
  <div  @mousedown.stop.prevent="onResizerMouseDown"
        :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}"
  />
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
        <div style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>calendar-edit</title><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H10V19H5V8H19V9H21V5A2,2 0 0,0 19,3M21.7,13.35L20.7,14.35L18.65,12.35L19.65,11.35C19.85,11.14 20.19,11.13 20.42,11.35L21.7,12.63C21.89,12.83 21.89,13.15 21.7,13.35M12,18.94L18.07,12.88L20.12,14.88L14.06,21H12V18.94Z" /></svg>
        </div>
        <div style="display:flex;justify-content: center;align-items: center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" :fill="theme.colors.textPrimary" width="25" height="25" viewBox="0 0 24 24"><title>arrange-send-to-back</title><path d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" /></svg>
        </div>
      </div>
       <div  @mousedown.stop.prevent="onResizerMouseDown($event, false, true)"
             :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}"/>
    </nav>
</section>
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
      type: Object as PropType<VuelCalendarOptions>,
      required: true,
    }
  },
  computed:{
    theme(){
      return{
        colors:{
        surface: this.vuelCalendarApi.theme === 'light' ?
            '#fff' : (this.vuelCalendarApi.theme === 'dark' ? '#36373a' : '#fff'),
        primary:this.vuelCalendarApi.theme === 'light' ?
            '#f1f1f1' : (this.vuelCalendarApi.theme === 'dark' ? '#242528' : '#f1f1f1'),
        event:this.vuelCalendarApi.theme === 'light' ?
            '#7469b6' : (this.vuelCalendarApi.theme === 'dark' ? '#039be5' : '#7469b6'),
        highlight:this.vuelCalendarApi.theme === 'light' ?
            '#ad88c6' : (this.vuelCalendarApi.theme === 'dark' ? 'red' : '#ad88c6'),
        textPrimary:this.vuelCalendarApi.theme === 'light' ?
            '#000000' : (this.vuelCalendarApi.theme === 'dark' ? '#f5f4f5' : '#000000'),
        menuBg:this.vuelCalendarApi.theme === 'light' ?
            '#ffe6e6' : (this.vuelCalendarApi.theme === 'dark' ? '#5b5c5c' : '#ffe6e6'),
        },
        lockResize:this.vuelCalendarApi.lockResize
      }
    },
    height(){
      return this.vuelCalendarApi.height! < 200 ? 200 : this.vuelCalendarApi.height
    }
  },
  data(){
    return{
      vuelCalendarApi:new VuelCalendarOptions(
        this.vuelCalendarOptions,
        this.setNewStartDate,
        this.setEvents
      ),
      rowHeight: 0,
      resizer: {
        isResizing: false,
        resizedElBottom: null as Number | null,
        resizedEl: null as HTMLDivElement | null,
      },
      startDateConfigurable:   this.vuelCalendarOptions.startDate,
      eventsConfigurable:      this.vuelCalendarOptions.events,
      daysForwardConfigurable: this.vuelCalendarOptions.daysForward <1 ? 1 : this.vuelCalendarOptions.daysForward,
      startHourConfigurable:   this.vuelCalendarOptions.startHour ?? 0,
      viewMode:                'days'
    }
  },
  created(){
    this.$nextTick( () =>
    {
      var containerHeight = (this.$refs.container as HTMLDivElement).offsetHeight;
      this.rowHeight = (containerHeight / (this.daysForwardConfigurable));
    })
  },
  methods:{
    onDayClick(event:MouseEvent)
    {
      const el = (event.currentTarget! as HTMLElement);
      const clickedWidthFromLeft = event.clientX - el.getBoundingClientRect().left
      const percentClicked = (clickedWidthFromLeft / el.offsetWidth) * 100;
      
      console.log(
          'click',
          event.target,
          el.offsetWidth,
          clickedWidthFromLeft,
          percentClicked,
          this.helper.convertPercentageToTime(percentClicked, this.startHourConfigurable)
      );
    },

    setViewMode()
    {
      this.viewMode = this.viewMode === 'days' ?
          'month' : 'days'
    },

    onResizerMouseDown( event:MouseEvent,
                        targetOnSidebar:boolean = false,
                        targetOnMonthSideBar = false )
    {
        this.resizer.isResizing = true;
        let parentEl = (event.target! as HTMLDivElement).parentElement! as HTMLDivElement;
        if(targetOnSidebar)
        {
          parentEl = document.getElementById(`vuelcalendar_day-${this.daysForwardConfigurable}`)! as HTMLDivElement;
        }
        if(targetOnMonthSideBar)
        {
          parentEl = this.$refs.monthContainer as HTMLDivElement
        }
        this.resizer.resizedElBottom = parentEl.getBoundingClientRect().bottom;
        this.resizer.resizedEl = parentEl;
        document.addEventListener(
            'mousemove',
            this.onResizerMouseMove
        )
        document.addEventListener(
            'mouseup',
            this.onResizerMouseUp
        )
    },

    onResizerMouseUp()
    {
        this.resizer.isResizing      = false;
        this.resizer.resizedElBottom = null;
        this.resizer.resizedEl       = null;
        document.removeEventListener(
            'mousemove',
            this.onResizerMouseMove
        )
        document.removeEventListener(
            'mouseup',
            this.onResizerMouseUp
        )
    },
    onResizerMouseMove( event: MouseEvent )
    {
      if (!this.resizer.isResizing)
      {
        return;
      }
      const el = (this.resizer.resizedEl! as HTMLDivElement);
      const dayNumber = el.id.split('-')[1];
      const dayLabelElement = document.getElementById(`day_label-${dayNumber}`);
      const deltaY = event.clientY;
      const newHeight = (deltaY - el.getBoundingClientRect().top)

      if(this.viewMode === 'month' && newHeight < this.rowHeight*this.daysForwardConfigurable)
      {
        el.style.height = this.rowHeight*this.daysForwardConfigurable + 30 +'px'
        return;
      }

      if(newHeight < this.rowHeight)
      {
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
    pairDateToContainer( startDate: Date, day: number)
    {
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + day - 1);
      return newDate;
    },
    setNewStartDate(date:Date)
    {
      this.startDateConfigurable = date;
    },
    setEvents(events:[])
    {
        this.eventsConfigurable = events;
    },
    getEventsToContainer(day:number)
    {
      const newDate = new Date(this.startDateConfigurable!);
      const targetDate = new Date(newDate.setDate(newDate.getDate() + day - 1));

      const events = this.eventsConfigurable ?? [];
      const divEvents = [];

      for (const event of events)
      {
        const eventDate = new Date(event.start);
        if (
          eventDate.getDate() === targetDate.getDate() &&
          eventDate.getMonth() === targetDate.getMonth() &&
          eventDate.getFullYear() === targetDate.getFullYear()
        ) {
          divEvents.push(event);
        }
      }

      console.log(
          'divEvents',
          divEvents
      );
      return divEvents;
    },

    getEventMarginLeft( event: any )
    {
      return this.helper.convertTimeToPercentage(
          this.helper.getTimeFromDate(event.start),
          this.startHourConfigurable
      )
    },

    getEventWidth( event:any )
    {
      return this.helper.convertTimeDistanceToPercentage(
          this.helper.getTimeFromDate(event.start),
          this.helper.getTimeFromDate(event.end),
          this.startHourConfigurable
      )
    },
    setDateFromMonthCalendar( dayToAdd: number )
    {
      const date = this.helper.getDayFromFirstDayByAdd(
          this.startDateConfigurable!,
          dayToAdd - 1
      );
      this.startDateConfigurable = date;
      this.viewMode = 'days'
      console.log(
          'nowa data z month calendar',
          date
      );
      
    }
    /* */
  }
}) 
</script>
<style>

</style>