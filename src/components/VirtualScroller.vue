<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import {Helper} from "../utils/Helper.ts";

export default defineComponent({
  name: "VirtualScroller",
  props:{
    rowId:{
      type:String,
      required:true
    },
    defaultRowHeight:{
      type:Number,
      required:true
    },
    items:{
      type:Array<Array<VuelCalendarEvent>>,
      required:true,
    },
    day:{
      type:Number,
      required:true
    }
  },
  setup(props:any){
    let rowHeight = ref(props.defaultRowHeight);
    let sliceCount = ref(2);
    const observer = new  ResizeObserver((t:any)=>{
      rowHeight.value = t[0].contentRect.height;
      sliceCount.value = ( (rowHeight.value/120) < 2 ? 2 : (rowHeight.value/120));
    })
    return{
      helper: new Helper(),
      rowHeight,
      sliceCount,
      observer
    }
  },
  created(){
    this.$nextTick(()=>{
      const rowEl = document.getElementById(this.rowId) as HTMLDivElement
      this.observer.observe(rowEl)
    })
  },

})
</script>

<template>
<div id="container">
  <div v-for="(events, index) in items.slice(0,sliceCount)" :key="`ev-${index}`">
    <slot name="vs" :items="events">

    </slot>
  </div>
</div>
</template>

<style scoped>

</style>