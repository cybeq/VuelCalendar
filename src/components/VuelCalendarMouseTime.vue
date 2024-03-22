<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {MouseTimeHandler} from "../utils/MouseTimeHandler.ts";

export default defineComponent({
  name: "VuelCalendarMouseTime",
  props:{
    showCursorTime:{
      type:Boolean,
      default:false
    },
    mouseTimeHandler:{
      type:Object as PropType<MouseTimeHandler>,
      required:true
    },
    theme:{
      type:Object,
      required:true
    }
  },
  // setup(){
  //     const mouseTimeHandler = reactive(new MouseTimeHandler(helper));
  //     return {
  //       mouseTimeHandler
  //     }
  // }
})
</script>

<template>
  <div v-show="mouseTimeHandler.show && showCursorTime" ref="timeOnMouse"
       :style="{
                display:'flex', justifyContent:'flex-end', alignItems:'center',
                position:'fixed', height:'35px', width:'100px', left:0, zIndex:6,

       }">
    <div
        :style="{
              backgroundColor:theme.colors.primary, paddingInline:'10px', paddingBlock:'4px',
              color:theme.colors.textPrimary, borderRadius:'4px',  border:'solid 1px', borderColor:theme.colors.surface,
      }"
    >
      {{mouseTimeHandler.time}}
    </div>
  </div>
</template>