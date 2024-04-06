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
    handleMobileDown(event:MouseEvent, condition:'up'|'down' ){
      let el = (event.target! as HTMLDivElement).parentElement! as HTMLDivElement;
      const dayNumber = el.id.split('-')[1];
      console.log('elxx', el)
      const dayLabelElement = document.getElementById(`day_label-${dayNumber}`);
      let newHeight = (dayLabelElement as HTMLDivElement).getBoundingClientRect().height + 100
      switch (condition){
        case "up":
          newHeight = (dayLabelElement as HTMLDivElement).getBoundingClientRect().height - 100
          break;
      }


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
  <div v-if="viewMode==='days' && !targetOnSidebar && !targetOnMonthSidebar && !monthContainer"
       @click.stop="handleMobileDown($event, 'down')"
       :style="{position:'absolute',zIndex:3, bottom:'5px', left:'5px', width:'20px', height:'20px',cursor:'pointer' }">
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        :style="{pointerEvents:'none'}"
        :fill="theme.colors.menuBg"
        :stroke="theme.colors.surface"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 12 16 16 12" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  </div>
  <div v-if="viewMode==='days' && !targetOnSidebar && !targetOnMonthSidebar && !monthContainer"
       @click="handleMobileDown($event, 'up')"
       :style="{position:'absolute',zIndex:3, bottom:'5px', left:'40px', width:'20px', height:'20px',cursor:'pointer' }">
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        :style="{pointerEvents:'none'}"
        :fill="theme.colors.menuBg"
        :stroke="theme.colors.surface"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 12 12 8 8 12" />
      <line x1="12" y1="16" x2="12" y2="8" />
    </svg>
  </div>
  <div
      @mousedown.stop.prevent="onResizerMouseDown($event, targetOnSidebar, targetOnMonthSidebar)"
      :style="{
                  width:'100%',
                  height: targetOnSidebar ? '6px' : '6px',
                  position:'absolute',
                  bottom:0,
                  zIndex:5,
                  cursor:'ns-resize'}
        ">

  </div>
  <div
        class="vuelcalendar-resizer"
        :style="{
                  width:'100%',
                  height: targetOnSidebar ? '6px' : '1px',
                  position:'absolute',
                  bottom:0,
                  zIndex:5,
                  cursor:'ns-resize',
                  backgroundColor: targetOnSidebar ? 'transparent' : theme.colors.surface}
        "/>
</template>

<style scoped>

</style>