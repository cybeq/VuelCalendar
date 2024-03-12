import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {VuelCalendarDay} from "./types/VuelCalendarDay.ts";

interface IVuelCalendarOptions {
  onVuelCalendarApiReady: (api: IVuelCalendarApi) => IVuelCalendarApi;
  onEventClicked: (event: VuelCalendarEvent) => VuelCalendarEvent;
  onDayClicked: (day: VuelCalendarDay) => VuelCalendarDay;
  api: IVuelCalendarApi;
  setNewStartDate: (date: Date) => Date;
  setEvents: (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  addEvents: (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
  removeEventsByParam: (param: string, value: any) => VuelCalendarEvent[];
  configureEventsByParam: (param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[];
  onVuelCalendarReadyResolve: Function;
  setStartHour: (hour: number) => void;
  startDate?: Date;
  daysForward: number;
  events?: VuelCalendarEvent[];
  theme?: string;
  height?: number;
  lockResize?: boolean;
  startHour?: number;
}
class VuelCalendarOptions implements IVuelCalendarOptions{
  onVuelCalendarApiReady!: (api:IVuelCalendarApi) => IVuelCalendarApi;
  onEventClicked!: (event:VuelCalendarEvent) => VuelCalendarEvent;
  onDayClicked!: (day:VuelCalendarDay) => VuelCalendarDay;
  api!:IVuelCalendarApi;
  setNewStartDate!: (date:Date)=> Date;
  setEvents!: (events:Array<VuelCalendarEvent>)  => Array<VuelCalendarEvent> ;
  addEvents!: (events:Array<VuelCalendarEvent>)  => Array<VuelCalendarEvent> ;
  removeEventsByParam!:(param:string, value:any) => Array<VuelCalendarEvent>;
  configureEventsByParam!:
      (param:string, value:any, params:VuelCalendarEvent) => Array<VuelCalendarEvent>;

  onVuelCalendarReadyResolve!:Function;
  setStartHour!:(hour:number)=>void;
  startDate?:Date = new Date()
  daysForward = 7;
  events?:Array<VuelCalendarEvent> = [];
  theme?:string = 'dark';
  height?:number = 600;
  lockResize?:boolean = false;
  startHour?:number = 0;
  constructor(vuelCalendarOptions:VuelCalendarOptions,
              componentSetNewStartDate:       (date:Date)=> Date ,
              componentSetEvents:             (events:Array<VuelCalendarEvent>)=> Array<VuelCalendarEvent>,
              componentAddEvents:             (events:Array<VuelCalendarEvent>) => Array<VuelCalendarEvent>,
              componentRemoveEventsByParam:   (param:string, value:any)=> Array<VuelCalendarEvent>,
              componentConfigureEventsByParam:(param:string, value:any, params:VuelCalendarEvent) => Array<VuelCalendarEvent>,
              componentSetStartHour:          (hour:number)=> void){
    this.setNewStartDate = componentSetNewStartDate;
    this.setEvents = componentSetEvents;
    this.addEvents = componentAddEvents;
    this.removeEventsByParam = componentRemoveEventsByParam;
    this.configureEventsByParam = componentConfigureEventsByParam;
    this.setStartHour = componentSetStartHour;
    if(vuelCalendarOptions.lockResize){
      this.lockResize = vuelCalendarOptions.lockResize
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
        return (vuelCalendarOptions.onVuelCalendarApiReady(api) as IVuelCalendarApi)
      }
    }
    
    if(vuelCalendarOptions.onEventClicked)
    {
      this.onEventClicked = (event:VuelCalendarEvent)=>
      {
        return vuelCalendarOptions.onEventClicked(event);
      }
    }

    if(vuelCalendarOptions.onDayClicked)
    {
      this.onDayClicked = (day:VuelCalendarDay)=>
      {
        return vuelCalendarOptions.onDayClicked(day);
      }
    }

    this.events =[]

    this.api = new VuelCalendarApi(
      this.setNewStartDate,
      this.setEvents,
      this.addEvents,
      this.removeEventsByParam,
      this.configureEventsByParam,
      this.setStartHour
    ) as IVuelCalendarApi;

    this.onVuelCalendarReadyResolve = () =>{
      this.onVuelCalendarApiReady(this.api as IVuelCalendarApi)
    }
  }
}
interface IVuelCalendarApi {
  setDate:Function;
  setEvents:Function;
  addEvents:Function;
  removeEventsByParam:Function;
  configureEventsByParam:Function;
  setStartHour:Function;
}
class VuelCalendarApi implements IVuelCalendarApi{
  setDate!:Function;
  setEvents!:Function;
  addEvents!:Function;
  removeEventsByParam!:Function;
  configureEventsByParam!:Function;
  setStartHour!:Function;
  constructor(setDate:Function,
              setEvents:Function,
              addEvents:Function,
              removeEventsByParam:Function,
              configureEventsByParam:Function,
              setStartHour:Function)
  {
    this.setDate = setDate
    this.setEvents = setEvents
    this.addEvents = addEvents
    this.removeEventsByParam = removeEventsByParam;
    this.configureEventsByParam = configureEventsByParam;
    this.setStartHour = setStartHour
  }
}

export {VuelCalendarApi, VuelCalendarOptions, type IVuelCalendarApi}