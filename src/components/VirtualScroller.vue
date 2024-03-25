<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import {EventConfigurableByDay} from "../utils/types/EventConfigurableByDay.ts";
import {Helper} from "../utils/Helper.ts";

export default defineComponent({
  name: "VirtualScroller",
  updated(){
    // const container = document.getElementById('container');
    // const children = Array.from(container.children);
    // if (children.length > Math.floor(this.rowHeight/60)) {
    //   children.slice(Math.floor(this.rowHeight/60)).forEach(child => container.removeChild(child));
    // }
    // console.log('pazdan',
    //     document.getElementById('container').children.length,
    //     document.getElementById('container').getBoundingClientRect().height)
  },
  props:{
    setMinSliceCount:{
      type:Function as PropType<(min:number)=>void>,
      required:true
    },
    getMinSliceCount:{
      type:Function as PropType<()=>number>,
      required:true
    },
    rowId:{
      type:String,
      required:true
    },
    dragEvent:{
      type:Object as PropType<VuelCalendarEvent | undefined>,

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
  setup(){
    return{
      helper: new Helper()
    }
  },
  data(){
    return{
      eventsByDay:{} as EventConfigurableByDay,
      rowHeight: this.defaultRowHeight,
      childrenBackup: [],
      sliceCount:5,
      observer: new ResizeObserver((t:any)=>{
        this.rowHeight = t[0].contentRect.height
        const count = ( (this.rowHeight/60) < 2 ? 2 : (this.rowHeight/60)) as number
        const min = this.getMinSliceCount();
        if(count > min){
          this.sliceCount = count;
          this.setMinSliceCount(this.sliceCount);
        }

      })
    }
  },
  created(){
    this.$nextTick(()=>{
      const rowEl = document.getElementById(this.rowId)
      this.observer.observe(rowEl)
    })
  },
  updated(){
    console.log('marcinkierwicz')
  }

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