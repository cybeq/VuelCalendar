import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {VuelCalendarDay} from "./types/VuelCalendarDay.ts";
import {VuelCalendarDrop} from "./types/VuelCalendarDrop.ts";

interface IVuelCalendarOptions {
  onVuelCalendarApiReady?: (api: IVuelCalendarApi) => void;
  onEventClicked?: (event: VuelCalendarEvent) => void;
  onEventDropped?:(day:VuelCalendarDrop) => void;
  onDayClicked?: (day: VuelCalendarDay) => void;
  api?: IVuelCalendarApi;
  setNewStartDate?: (date: Date) => Date;
  setEvents?: (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  addEvents?: (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  removeEventsByParam?: (param: string, value: any) => VuelCalendarEvent[];
  configureEventsByParam?: (param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[];
  onVuelCalendarReadyResolve?: Function;
  setStartHour?: (hour: number) => void;
  setViewMode?: () => void;
  startDate?: Date;
  daysForward?: number;
  events?: VuelCalendarEvent[];
  theme?: string;
  height?: number;
  draggableEvents?:boolean;
  lockResize?: boolean;
  startHour?: number;
  renderer?:string;
  setDaysForward?:(days:number) => void;
  setDateRange?:(startDate:Date|string, endDate:Date|string) => void;
}
class VuelCalendarOptions implements IVuelCalendarOptions{
  onVuelCalendarApiReady!: (api:IVuelCalendarApi) => void;
  onEventClicked!: (event:VuelCalendarEvent) => void;
  onDayClicked!: (day:VuelCalendarDay) => void;
  onEventDropped!:(day:VuelCalendarDrop) => void;
  api!:IVuelCalendarApi;
  setNewStartDate!: (date:Date)=> Date;
  setEvents!: (events:Array<VuelCalendarEvent>)  => Array<VuelCalendarEvent> ;
  addEvents!: (events:Array<VuelCalendarEvent>)  => Array<VuelCalendarEvent> ;
  setViewMode!: () => void;
  removeEventsByParam!:(param:string, value:any) => Array<VuelCalendarEvent>;
  configureEventsByParam!:
      (param:string, value:any, params:VuelCalendarEvent) => Array<VuelCalendarEvent>;

  onVuelCalendarReadyResolve!:Function;
  setStartHour!:(hour:number)=>void;
  setDaysForward!:(days:number) => void;
  setDateRange!:(startDate:Date|string, endDate:Date|string) => void;
  startDate?:Date = new Date()
  daysForward = 7;
  events?:Array<VuelCalendarEvent> = [];
  theme?:string = 'dark';
  height?:number = 600;
  draggableEvents?:boolean = false;
  lockResize?:boolean = false;
  startHour?:number = 0;
  renderer?:string;
  constructor(vuelCalendarOptions:VuelCalendarOptions,
              componentSetNewStartDate:       (date:Date)=> Date ,
              componentSetEvents:             (events:Array<VuelCalendarEvent>)=> Array<VuelCalendarEvent>,
              componentAddEvents:             (events:Array<VuelCalendarEvent>) => Array<VuelCalendarEvent>,
              componentRemoveEventsByParam:   (param:string, value:any)=> Array<VuelCalendarEvent>,
              componentConfigureEventsByParam:(param:string, value:any, params:VuelCalendarEvent) => Array<VuelCalendarEvent>,
              componentSetStartHour:          (hour:number)=> void,
              componentSetViewMode:           ()          => void,
              componentSetDaysForward:        (days:number)=> void,
              componentSetDateRange:          (startDate:Date|string, endDate:Date|string) => void
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
      this.setDateRange
    ) as IVuelCalendarApi;

    this.onVuelCalendarReadyResolve = () =>{
      this.onVuelCalendarApiReady(this.api as IVuelCalendarApi)
    }
  }
}
interface IVuelCalendarApi {
  setDate:(date: Date) => Date;
  setEvents:(events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  addEvents:(events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  removeEventsByParam:(param: string, value: any) => VuelCalendarEvent[];
  configureEventsByParam:(param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[];
  setStartHour:(hour: number) => void;
  switchViewMode:() => void;
  setDaysForward:(days:number) => void;
  setDateRange:(startDate:Date|string, endDate:Date|string) => void;
}
class VuelCalendarApi implements IVuelCalendarApi{
  setDate!:(date: Date) => Date;
  setEvents!:(events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  addEvents!:(events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  removeEventsByParam!:(param: string, value: any) => VuelCalendarEvent[];
  configureEventsByParam!:(param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[];
  setStartHour!:(hour: number) => void;
  switchViewMode!:() => void;
  setDaysForward!:(days:number) => void;
  setDateRange!:(startDate:Date|string, endDate:Date|string) => void;
  constructor(setDate:(date: Date) => Date,
              setEvents:(events: VuelCalendarEvent[]) => VuelCalendarEvent[],
              addEvents:(events: VuelCalendarEvent[]) => VuelCalendarEvent[],
              removeEventsByParam:(param: string, value: any) => VuelCalendarEvent[],
              configureEventsByParam:(param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[],
              setStartHour:(hour: number) => void,
              setViewMode:() => void,
              setDaysForward:(days:number) => void,
              setDateRange:(startDate:Date|string, endDate:Date|string) => void
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
  }
}

export {VuelCalendarApi, VuelCalendarOptions, type IVuelCalendarApi, type IVuelCalendarOptions}