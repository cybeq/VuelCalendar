<template>
  <input type="date" @change="onDateChange"  v-model="date"/>
  <button @click="setEvents">Set events</button>
  <section class="w-[600px] h-[400px]">
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
        startDate:new Date(),
        daysForward:7,
        onVuelCalendarApiReady:(api:any)=>{
          this.calendarApi = api;
        },
      },
      events:[
        {
          id:1,
          label:'Event #1',
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
    }
  }
})
</script>

