<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props:{
    targetOnSidebar:{
      type:Boolean,
      default:false
    },
    targetOnMonthSidebar:{
      type:Boolean,
      default:false
    },
    theme:{
      type:Object as  any,
      required:true,
    },
    viewMode:{
      type:String,
      required:true,
    },
    daysForwardConfigurable:{
      type:Number as PropType<number>,
      required:true,
    },
    rowHeight:{
      type:Number,
      required:true,
    },
    monthContainer:{
      type:Object as PropType <unknown>
    }
  },
  data(){
    return{
      resizer: {
        isResizing: false,
        resizedElBottom: null as Number | null,
        resizedEl: null as HTMLDivElement | null,
      },
    }
  },
  methods:{
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
        parentEl = this.monthContainer as HTMLDivElement
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
  }
})
</script>

<template>
  <div  @mousedown.stop.prevent="onResizerMouseDown($event, targetOnSidebar, targetOnMonthSidebar)"
        class="vuelcalendar-resizer"
        :style="{
                  width:'100%',
                  height:'3px',
                  position:'absolute',
                  bottom:0,
                  cursor:'ns-resize',
                  backgroundColor: theme.colors.surface}
        "/>
</template>

<style scoped>

</style>