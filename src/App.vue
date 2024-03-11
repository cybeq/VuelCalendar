<template>
  <input type="date" @change="onDateChange"  v-model="date"/>
  <button @click="setEvents">Set events</button>
  <button @click="addEvents">Add events</button>
  <button @click="addEvents2">Add XXSE</button>
  <input type="number" v-model="num"/>
  <button @click="removeEventsByParam('id', num)">REMOVE BY PARAM</button>
  <button @click="configureEventsByParam">Configure Events By param</button>
  <button @click="setStartHour(num)">Change days froward</button>
  <section class="w-[800px]"  >
    <VuelCalendar :vuelCalendarOptions="vuelCalendarOptions" ></VuelCalendar>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import VuelCalendar from './components/VuelCalendar.vue';
import type {VuelCalendarApi} from './utils/VuelCalendarOptions'
export default defineComponent({
  components:{VuelCalendar},
  data(){
    let dateX = new Date();
    let dateY = new Date();
    dateX.setDate(dateX.getDate() + 1);
    dateX.setHours(9, 0, 0, 0);
    dateY.setDate(dateY.getDate() + 1);
    dateY.setHours(19, 0, 0, 0);
    return{
      num:1,
      dateX:new Date(dateX),
      dateY:new Date(dateY),
      date:new Date(),
      calendarApi:{} as VuelCalendarApi,
      vuelCalendarOptions:{
        height:600,
        lockResize:false,
        // theme:'light',
        startDate:new Date(),
        daysForward:5,
        startHour:17,
        onVuelCalendarApiReady:(api:any)=>{
          this.calendarApi = api;
          api.setEvents( [
            {
              id:1,
              label:'Event #1',
              data:{},
              start:new Date(new Date().setHours(8, 0)),
              end:new Date(new Date().setHours(23, 0)),
            }
          ])
          console.log('ready api', api)
        },
        onDayClicked:this.onDayClicked,
        onEventClicked:this.onEventClicked,
      },
      events:[
        {
          id:2,
          label:'Event #2',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),
        },
        {
          id:3,
          label:'Event #3',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),
        },
        {
          id:4,
          label:'Event #4',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),
        },
            {
          id:5,
          label:'Event #5',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),
        }
      ]
    }
  },
  methods:{
    onDateChange()
    {
        this.calendarApi.setDate(this.date)
        console.log(this.calendarApi.setDate(this.date), 'dateChange');
    },
    setEvents()
    {
      console.log(this.calendarApi.setEvents(this.events),'setEvents')
    },
    addEvents()
    {
      this.calendarApi.addEvents(this.events)
    },
    addEvents2(){
      const es = [];
      for(let i =0 ; i<5000; i++){
        es.push(
          {
            id:123,
            label:'Event #123',
            data:{},
            start:new Date(new Date().setHours(8, 0)),
            end:new Date(new Date().setHours(23, 0)),
          }
        )
      }
      this.calendarApi.addEvents(es )
    },
    removeEventsByParam(param:string, value:any)
    {
      console.log(this.calendarApi.removeEventsByParam(param, value),`remove ${param}:${value}`)
    },
    onEventClicked(event:any)
    {
      console.log(event, 'event clicked');
    },
    onDayClicked(day:any){
      console.log(day,'day clicked api')
    },
    configureEventsByParam()
    {
      console.log(this.calendarApi.configureEventsByParam('id', this.num, {'end':this.dateY, 'start':this.dateX, data:{id:'xxx'}}),'edit','id', this.num, {'end':this.dateY, 'start':this.dateX, data:{id:'xxx'}})
    },
    setStartHour(num:number)
    {
      this.calendarApi.setStartHour(num)
    }
  }
})
</script>

