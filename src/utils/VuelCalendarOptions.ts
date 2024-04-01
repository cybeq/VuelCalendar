import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";
import {VuelCalendarDay} from "./types/VuelCalendarDay.ts";
import {VuelCalendarDrop} from "./types/VuelCalendarDrop.ts";
import {
  AddEvents,
  ConfigureEventsByParam,
  RemoveEventsByParam, SetDateRange, SetDaysForward, SetEndHour,
  SetEvents, SetRenderer,
  SetStartDate, SetStartHour, SetTimeRange, SetTresHold, SwitchViewMode
} from "./types/function-types/apiFunctionsTypes.ts";
import {VuelCalendarResize} from "./types/VuelCalendarResize.ts";
import {Logger} from "./Logger.ts";

interface IVuelCalendarOptions {
  onVuelCalendarApiReady?: (api: IVuelCalendarApi) => void;
  onEventClicked?: (event: VuelCalendarEvent) => void;
  onEventDropped?:(day:VuelCalendarDrop) => void;
  onDayClicked?: (day: VuelCalendarDay) => void;
  onDayDblClicked?: (day: VuelCalendarDay) => void;
  onEventStartResized?: (event:VuelCalendarResize) => void;
  onEventEndResized?: (event:VuelCalendarResize) => void;
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
  endDate?:Date;
  daysForward?: number;
  events?: VuelCalendarEvent[];
  theme?: string;
  height?: number;
  draggableEvents?:boolean;
  resizableEvents?:boolean;
  lockResize?: boolean;
  startHour?: number;
  endHour?:number;
  renderer?:string;
  setDaysForward?:SetDaysForward;
  setDateRange?:SetDateRange;
  setTimeRange?:SetTimeRange;
  showCursorTime?:boolean;
  throwErrors?:boolean;
  tresHold?:number;
  plugins?:[];
  setRenderer?:SetRenderer;
  setTresHold?:SetTresHold;
  ignoreSafety?:boolean;
}
class VuelCalendarOptions implements IVuelCalendarOptions{
  logger:Logger = new Logger();
  onVuelCalendarApiReady: (api:IVuelCalendarApi) => void = this.logger.undefinedEvent('onVuelCalendarApiReady');
  onEventClicked: (event:VuelCalendarEvent) => void = this.logger.undefinedEvent('onEventClicked');
  onDayClicked: (day:VuelCalendarDay) => void = this.logger.undefinedEvent('onDayClicked');
  onDayDblClicked: (day:VuelCalendarDay) => void = this.logger.undefinedEvent('onDayDblClicked');
  onEventDropped:(day:VuelCalendarDrop) => void = this.logger.undefinedEvent('onEventDropped');
  onEventStartResized: (event:VuelCalendarResize) => void = this.logger.undefinedEvent('onEventStartResized');
  onEventEndResized: (event:VuelCalendarResize) => void = this.logger.undefinedEvent('onEventEndResized');
  api!:IVuelCalendarApi;
  setNewStartDate!: SetStartDate;
  setEvents!: SetEvents ;
  addEvents!: AddEvents ;
  setViewMode!: SwitchViewMode;
  removeEventsByParam!:(param:string, value:any) => Array<VuelCalendarEvent>;
  configureEventsByParam!:ConfigureEventsByParam;
  onVuelCalendarReadyResolve!:Function;
  setStartHour!:SetStartHour;
  setEndHour!:SetEndHour
  setDaysForward!:SetDaysForward;
  setDateRange!:SetDateRange;
  setTimeRange!:SetTimeRange;
  setRenderer!:SetRenderer;
  setTresHold!:SetTresHold;
  startDate?:Date = new Date()
  endDate?:Date = new Date();
  daysForward = 7;
  events?:Array<VuelCalendarEvent> = [];
  theme?:string = 'dark';
  height?:number = 600;
  draggableEvents?:boolean = false;
  resizableEvents?:boolean = false;
  lockResize?:boolean = false;
  startHour?:number = 0;
  endHour?:number = 24;
  renderer?:string;
  showCursorTime?: boolean = false;
  throwErrors?:boolean = false;
  tresHold?:number;
  plugins?:[] = [];
  ignoreSafety?:boolean = false;
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
              componentSetTimeRange:SetTimeRange,
              componentSetRenderer:SetRenderer,
              componentSetTresHold:SetTresHold
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
    this.setRenderer = componentSetRenderer;
    this.setTresHold = componentSetTresHold;
    if(vuelCalendarOptions.lockResize){
      this.lockResize = vuelCalendarOptions.lockResize
    }
    if(vuelCalendarOptions.draggableEvents){
      this.draggableEvents = vuelCalendarOptions.draggableEvents
    }
    if(vuelCalendarOptions.tresHold){
      this.tresHold = vuelCalendarOptions.tresHold
    }
    if(vuelCalendarOptions.resizableEvents){
      this.resizableEvents = vuelCalendarOptions.resizableEvents
    }
    if(vuelCalendarOptions.ignoreSafety){
      this.ignoreSafety = vuelCalendarOptions.ignoreSafety
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
    if(vuelCalendarOptions.plugins){
      this.plugins = vuelCalendarOptions.plugins
    }
    if(vuelCalendarOptions.showCursorTime){
      this.showCursorTime = vuelCalendarOptions.showCursorTime
    }
    if(vuelCalendarOptions.throwErrors){
      this.throwErrors = vuelCalendarOptions.throwErrors
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
    if(vuelCalendarOptions.endDate)
    {
      if(!(vuelCalendarOptions.endDate instanceof Date))
      {
        console.error('Provided endDate must be a type of Date')
        return;
      }
      this.endDate = vuelCalendarOptions.endDate
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
    if(vuelCalendarOptions.onEventStartResized)
    {
      this.onEventStartResized = (resized:VuelCalendarResize)=>
      {
        vuelCalendarOptions.onEventStartResized(resized);
      }
    }
    if(vuelCalendarOptions.onEventEndResized)
    {
      this.onEventEndResized = (resized:VuelCalendarResize)=>
      {
        vuelCalendarOptions.onEventEndResized(resized);
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
      this.setTimeRange,
      this.setRenderer,
      this.setTresHold
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
  setTimeRange:SetTimeRange;
  setRenderer:SetRenderer
  setTresHold:SetTresHold;
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
  setRenderer!:SetRenderer;
  setTresHold!:SetTresHold;
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
              setTimeRange:SetTimeRange,
              setRenderer:SetRenderer,
              setTresHold:SetTresHold
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
    this.setRenderer = setRenderer;
    this.setTresHold = setTresHold;
  }
}

export {VuelCalendarApi, VuelCalendarOptions, type IVuelCalendarApi, type IVuelCalendarOptions}