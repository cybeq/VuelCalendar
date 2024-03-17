import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {VuelCalendarDay} from "./types/VuelCalendarDay.ts";
import {VuelCalendarDrop} from "./types/VuelCalendarDrop.ts";
import {
  AddEvents,
  ConfigureEventsByParam,
  RemoveEventsByParam, SetDateRange, SetDaysForward, SetEndHour,
  SetEvents,
  SetStartDate, SetStartHour, SetTimeRange, SwitchViewMode
} from "./types/function-types/apiFunctionsTypes.ts";

interface IVuelCalendarOptions {
  onVuelCalendarApiReady?: (api: IVuelCalendarApi) => void;
  onEventClicked?: (event: VuelCalendarEvent) => void;
  onEventDropped?:(day:VuelCalendarDrop) => void;
  onDayClicked?: (day: VuelCalendarDay) => void;
  onDayDblClicked?: (day: VuelCalendarDay) => void;
  api?: IVuelCalendarApi;
  setNewStartDate?: SetStartDate;
  setEvents?: SetEvents;
  addEvents?: AddEvents;
  removeEventsByParam?: RemoveEventsByParam;
  configureEventsByParam?: ConfigureEventsByParam;
  onVuelCalendarReadyResolve?: Function;
  setStartHour?: SetStartHour;
  setEndHour?: SetEndHour;
  setViewMode?: SwitchViewMode;
  startDate?: Date;
  daysForward?: number;
  events?: VuelCalendarEvent[];
  theme?: string;
  height?: number;
  draggableEvents?:boolean;
  lockResize?: boolean;
  startHour?: number;
  endHour?:number;
  renderer?:string;
  setDaysForward?:SetDaysForward;
  setDateRange?:SetDateRange;
  setTimeRange?:SetTimeRange;
}
class VuelCalendarOptions implements IVuelCalendarOptions{
  onVuelCalendarApiReady!: (api:IVuelCalendarApi) => void;
  onEventClicked!: (event:VuelCalendarEvent) => void;
  onDayClicked!: (day:VuelCalendarDay) => void;
  onDayDblClicked!: (day:VuelCalendarDay) => void;
  onEventDropped!:(day:VuelCalendarDrop) => void;
  api!:IVuelCalendarApi;
  setNewStartDate!: SetStartDate;
  setEvents!: SetEvents ;
  addEvents!: AddEvents ;
  setViewMode!: SwitchViewMode;
  removeEventsByParam!:(param:string, value:any) => Array<VuelCalendarEvent>;
  configureEventsByParam!:
      (param:string, value:any, params:VuelCalendarEvent) => Array<VuelCalendarEvent>;

  onVuelCalendarReadyResolve!:Function;
  setStartHour!:SetStartHour;
  setEndHour!:SetEndHour
  setDaysForward!:SetDaysForward;
  setDateRange!:SetDateRange;
  setTimeRange!:SetTimeRange;
  startDate?:Date = new Date()
  daysForward = 7;
  events?:Array<VuelCalendarEvent> = [];
  theme?:string = 'dark';
  height?:number = 600;
  draggableEvents?:boolean = false;
  lockResize?:boolean = false;
  startHour?:number = 0;
  endHour?:number = 24;
  renderer?:string;
  constructor(vuelCalendarOptions:VuelCalendarOptions,
              componentSetNewStartDate: SetStartDate ,
              componentSetEvents: SetEvents,
              componentAddEvents: AddEvents,
              componentRemoveEventsByParam: RemoveEventsByParam,
              componentConfigureEventsByParam: ConfigureEventsByParam,
              componentSetStartHour: SetStartHour,
              componentSetViewMode: SwitchViewMode,
              componentSetDaysForward: SetDaysForward,
              componentSetDateRange: SetDateRange,
              componentSetEndHour: SetEndHour,
              componentSetTimeRange:SetTimeRange
              ){
    this.setNewStartDate = componentSetNewStartDate;
    this.setEvents = componentSetEvents;
    this.addEvents = componentAddEvents;
    this.removeEventsByParam = componentRemoveEventsByParam;
    this.configureEventsByParam = componentConfigureEventsByParam;
    this.setStartHour = componentSetStartHour;
    this.setViewMode = componentSetViewMode;
    this.setDaysForward = componentSetDaysForward
    this.setDateRange = componentSetDateRange
    this.setEndHour = componentSetEndHour
    this.setTimeRange = componentSetTimeRange
    if(vuelCalendarOptions.lockResize){
      this.lockResize = vuelCalendarOptions.lockResize
    }
    if(vuelCalendarOptions.draggableEvents){
      this.draggableEvents = vuelCalendarOptions.draggableEvents
    }
    if(vuelCalendarOptions.renderer){
      this.renderer = vuelCalendarOptions.renderer
    }
    if(vuelCalendarOptions.startHour){
      this.startHour = vuelCalendarOptions.startHour
    }
    if(vuelCalendarOptions.endHour){
      this.endHour = vuelCalendarOptions.endHour
    }
    if(vuelCalendarOptions.height){
      this.height = vuelCalendarOptions.height
    }
    if(vuelCalendarOptions.theme){
      this.theme = vuelCalendarOptions.theme
    }
    if(vuelCalendarOptions.startDate)
    {
      if(!(vuelCalendarOptions.startDate instanceof Date))
      {
        console.error('Provided startDate must be a type of Date')
        return;
      }
      this.startDate = vuelCalendarOptions.startDate
    }
    
    if(vuelCalendarOptions.daysForward)
    {
      if(!( typeof  vuelCalendarOptions.daysForward === 'number'))
      {
          console.error('Provided daysForward must be a type of number')
      }
      if(vuelCalendarOptions.daysForward < 1)
      {
        console.error('daysForward must be greater than 0')
        this.daysForward = 1;
      }
      this.daysForward = vuelCalendarOptions.daysForward
    }
    
    if(vuelCalendarOptions.onVuelCalendarApiReady)
    {
      this.onVuelCalendarApiReady = (api:IVuelCalendarApi)=>
      {
        vuelCalendarOptions.onVuelCalendarApiReady(api)
      }
    }
    
    if(vuelCalendarOptions.onEventClicked)
    {
      this.onEventClicked = (event:VuelCalendarEvent)=>
      {
         vuelCalendarOptions.onEventClicked(event);
      }
    }
    if(vuelCalendarOptions.onEventDropped)
    {
      this.onEventDropped = (dropped:VuelCalendarDrop)=>
      {
        vuelCalendarOptions.onEventDropped(dropped);
      }
    }

    if(vuelCalendarOptions.onDayClicked)
    {
      this.onDayClicked = (day:VuelCalendarDay)=>
      {
         vuelCalendarOptions.onDayClicked(day);
      }
    }
    if(vuelCalendarOptions.onDayDblClicked)
    {
      this.onDayDblClicked = (day:VuelCalendarDay)=>
      {
        vuelCalendarOptions.onDayDblClicked(day);
      }
    }
    this.events =[]

    this.api = new VuelCalendarApi(
      this.setNewStartDate,
      this.setEvents,
      this.addEvents,
      this.removeEventsByParam,
      this.configureEventsByParam,
      this.setStartHour,
      this.setViewMode,
      this.setDaysForward,
      this.setDateRange,
      this.setEndHour,
      this.setTimeRange
    ) as IVuelCalendarApi;

    this.onVuelCalendarReadyResolve = () =>{
      this.onVuelCalendarApiReady(this.api as IVuelCalendarApi)
    }
  }
}
interface IVuelCalendarApi {
  setDate:SetStartDate;
  setEvents:SetEvents;
  addEvents:AddEvents;
  removeEventsByParam:RemoveEventsByParam;
  configureEventsByParam:ConfigureEventsByParam;
  setStartHour:SetStartHour;
  setEndHour:SetEndHour;
  switchViewMode:SwitchViewMode;
  setDaysForward:SetDaysForward;
  setDateRange:SetDateRange;
  setTimeRange:SetTimeRange
}
class VuelCalendarApi implements IVuelCalendarApi{
  setDate!:SetStartDate;
  setEvents!:SetEvents;
  addEvents!:AddEvents;
  removeEventsByParam!:RemoveEventsByParam;
  configureEventsByParam!:ConfigureEventsByParam;
  setStartHour!:SetStartHour;
  setEndHour!:SetEndHour;
  switchViewMode!:SwitchViewMode;
  setDaysForward!:SetDaysForward;
  setDateRange!:SetDateRange;
  setTimeRange!:SetTimeRange;
  constructor(setDate:SetStartDate,
              setEvents:SetEvents,
              addEvents:AddEvents,
              removeEventsByParam:RemoveEventsByParam,
              configureEventsByParam:ConfigureEventsByParam,
              setStartHour:SetStartHour,
              setViewMode:SwitchViewMode,
              setDaysForward:SetDaysForward,
              setDateRange:SetDateRange,
              setEndHour:SetEndHour,
              setTimeRange:SetTimeRange
              )
  {
    this.setDate = setDate
    this.setEvents = setEvents
    this.addEvents = addEvents
    this.removeEventsByParam = removeEventsByParam;
    this.configureEventsByParam = configureEventsByParam;
    this.setStartHour = setStartHour
    this.switchViewMode = setViewMode
    this.setDaysForward = setDaysForward
    this.setDateRange = setDateRange
    this.setEndHour = setEndHour;
    this.setTimeRange = setTimeRange
  }
}

export {VuelCalendarApi, VuelCalendarOptions, type IVuelCalendarApi, type IVuelCalendarOptions}