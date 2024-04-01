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
<div :style="`min-height:50px; background:${event.data.color}; display:flex; padding-inline:3px; align-items:center`">
 <div>
   <img :src="event.data.img" style="width:25px; border-radius:30px; margin-right:20px;"/>
 </div>
 <p>
   {{event.label}}
 </p>
</div>
</template>

<style scoped>

</style>