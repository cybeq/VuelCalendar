<template>
  <input type="date" @change="onDateChange"  v-model="date"/>
  <button @click="setEvents">Set events</button>
  <section class="w-[800px]" >
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
    return{
      date:new Date(),
      calendarApi:{} as VuelCalendarApi,
      vuelCalendarOptions:{
        height:600,
        lockResize:false,
        theme:'dark',
        startDate:new Date(),
        daysForward:5,
        startHour:6,
        onVuelCalendarApiReady:(api:any)=>{
          this.calendarApi = api;
        },
        onEventClicked:this.onEventClicked,
        events:[
        {
          id:1,
          label:'Event #1',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),  
        }
      ]
      },
      events:[
        {
          id:1,
          label:'Event #2',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),  
        },
        {
          id:1,
          label:'Event #3',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),  
        },
        {
          id:1,
          label:'Event #3',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),  
        },
            {
          id:1,
          label:'Event #3',
          data:{},
          start:new Date(new Date().setHours(8, 0)),
          end:new Date(new Date().setHours(23, 0)),  
        }
      ]
    }
  },
  methods:{
    onDateChange(){
        this.calendarApi.setNewStartDate(this.date)
        console.log(this.events);
        
    },
    setEvents(){
      this.calendarApi.setNewEvents(this.events)
    },
    onEventClicked(event:any){
      console.log(event, 'event clicked');
      
    }
  }
})
</script>

