<template>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
  <input type="date" @change="onDateChange" v-model="date" />
  <button @click="setEvents">Set events</button>
  <button @click="addEvents">Add events</button>
  <button @click="addEvents2">Add XXSE</button>
  <button @click="calendarApi!.switchViewMode()">MOTNHVIEW</button>
  <input type="number" v-model="num" />
  <button @click="removeEventsByParam('id', num)">REMOVE BY PARAM</button>
  <button @click="configureEventsByParam">Configure Events By param</button>
  <button @click="setStartHour(num)">Set start hour</button>
  <button @click="calendarApi?.setEndHour(num)">Set end hour</button>
  <button @click="calendarApi?.setDaysForward(num)">Set days forward</button>
  <br/><br/>
  <input type="date" v-model="dateRangeStart"/>
  <input type="date" v-model="dateRangeEnd"/>
  <button @click="calendarApi?.setDateRange(dateRangeStart, dateRangeEnd)">Set date range</button>
  <br/>
  <input type="number" v-model="timeStart" />
  <input type="number" v-model="timeEnd" />
  <button @click="calendarApi?.setTimeRange(timeStart, timeEnd)">Set time range</button>
  <br/><br/>
  <section >
    <VuelCalendar :vuelCalendarOptions="vuelCalendarOptions" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VuelCalendar from './components/VuelCalendar.vue';
import {IVuelCalendarApi, IVuelCalendarOptions} from "./utils/VuelCalendarOptions.ts";
import w1 from './test-files/w1.png';
import m1 from './test-files/m1.png';
import m2 from './test-files/m2.png';
import m3 from './test-files/m3.png';
import {Colors} from "./utils/types/Colors.ts";
import {VuelCalendarDrop} from "./utils/types/VuelCalendarDrop.ts";

const num = ref(1);

const timeStart = ref(1);
const timeEnd = ref(23);

const date = ref(new Date());

const dateRangeStart = ref(new Date());
const dateRangeEnd = ref(new Date());

const dateX = new Date();
dateX.setDate(dateX.getDate() + 1);
dateX.setHours(9, 0, 0, 0);
const dateY = new Date();
dateY.setDate(dateY.getDate() + 1);
dateY.setHours(19, 0, 0, 0);

const calendarApi = ref<IVuelCalendarApi | undefined>(undefined);

const vuelCalendarOptions = ref<IVuelCalendarOptions>({
  height: 600,
  lockResize: false,
  startDate: new Date(),
  daysForward: 5,
  startHour: 0,
  endHour:29,
  renderer:'ExampleRenderer',
  draggableEvents:true,
  onVuelCalendarApiReady: (api: IVuelCalendarApi) => {
    calendarApi.value = api;
    api.setEvents([
      {
        id: 1,
        label: 'Event #1',
        data: {},
        start: new Date(new Date(new Date().setHours(8, 0)).setDate(20)),
        end: new Date(new Date(new Date().setHours(18, 2)).setDate(22)),
      },
    ]);
    console.log('ready api', api);
  },
  onDayClicked: onDayClicked,
  onEventClicked: onEventClicked,
  onEventDropped:onEventDropped,
  onDayDblClicked:onDayDblClicked
});

const events = [
  {
    id: 2,
    label: 'Marianna Kovalsky',
    data: {
      img:w1,
      color:'#89457f'
    },
    start: new Date(new Date().setHours(8, 0)),
    end: new Date(new Date().setHours(23, 0)),
  },
  {
    id: 3,
    label: 'Alan Fabric',
    data: {
      img:m1,
      color:'#454a89'
    },
    start: new Date(new Date().setHours(8, 0)),
    end: new Date(new Date().setHours(23, 0)),
  },
  {
    id: 4,
    label: 'Chris Cock',
    data: {
      img:m2,
      color:'#56a36b'
    },
    start: new Date(new Date().setHours(8, 0)),
    end: new Date(new Date().setHours(23, 0)),
  },
  {
    id: 5,
    label: 'Krzysiek Jerzyna ze Szczecina',
    data: {
      img:m3,
      color:'#438789'
    },
    start: new Date(new Date().setHours(8, 0)),
    end: new Date(new Date().setHours(23, 0)),
  },
];
const calendarColors:Colors = {
      surface: '#334155',
      primary: '#1e293b',
      highlight:'#4d3ce3',
      menuBg:'#45546e'
}
function onDateChange() {
  calendarApi.value!.setDate(date.value);
  console.log(calendarApi.value!.setDate(date.value), 'dateChange');
}

function setEvents() {
  console.log(calendarApi.value!.setEvents(events), 'setEvents');
}

function addEvents() {
  calendarApi.value!.addEvents(events);
}

function addEvents2() {
  const es = [];
  for (let i = 0; i < 5000; i++) {
    es.push({
      id: 123,
      label: 'Event #123',
      data: {},
      start: new Date(new Date().setHours(8, 0)),
      end: new Date(new Date().setHours(23, 0)),
    });
  }
  calendarApi.value!.addEvents(es);
}

function removeEventsByParam(param: string, value: any) {
  console.log(calendarApi.value!.removeEventsByParam(param, value), `remove ${param}:${value}`);
}

function onEventClicked(event: any) {
  console.log(event, 'event clicked');
}

function onDayClicked(day: any) {
  console.log(day, 'day clicked api');
}
function onDayDblClicked(day: any) {
  console.log(day, 'day dbl clicked api');
}
function onEventDropped(dropped: VuelCalendarDrop) {

  calendarApi.value.configureEventsByParam('id', dropped.event.id!, {
    start: dropped.date,
    end: dropped.endDateCorrection
  });
}

function configureEventsByParam() {
  console.log(
      calendarApi.value!.configureEventsByParam('id', num.value, {
        end: dateY,
        start: dateX,
      }),
      'edit',
      'id',
      num.value,
      { end: dateY, start: dateX, data: { id: 'xxx' } }
  );
}

function setStartHour(num: number) {
  calendarApi.value!.setStartHour(num);
}
</script>
<style>
*{
  font-family: "Mulish", sans-serif;
}
body{
  background:#3b444b
}
</style>