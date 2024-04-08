<script  lang="ts">
import {defineComponent, PropType} from "vue";
import {VuelCalendarEvent} from "./utils/types/VuelCalendarEvent.ts";


export default defineComponent({
  name:"ExampleRenderer",
  props:{
    event:{
      type:Object as PropType<VuelCalendarEvent>,
    } /* this the full Event<VuelCalendarEvent> object passed to your rendering component */
  }
})
</script>

<template>
<div :style="`min-height:50px; color:#fff; background:${event.data.color}; display:flex; padding-inline:3px; align-items:center`">
 <div style="display:flex; padding-inline:3px; align-items:center">
   <img :src="event.data.img" style="width:50px; border-radius:8px; margin-right:20px;"/>
 </div>
  <div>
    <p style="padding:0;margin:0">
      {{event.label}}
    </p>
    <p style="padding:0;margin:0; font-size:0.9em">{{ event.data.title }}</p>
  </div>

</div>
</template>

<style scoped>

</style>