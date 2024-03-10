class VuelCalendarOptions{
  onVuelCalendarApiReady:Function = (params:any) => {
    console.log(params)
  }
  onEventClicked:Function = (params:any)=>{
    console.log(params)
  };
  onDayClicked:Function = (params:any)=>{
    console.log(params)
  };
  api?:VuelCalendarApi;
  setNewStartDate?:Function;
  setEvents?:Function;
  addEvents?:Function;
  removeEventsByParam?:Function;
  configureEventsByParam?:Function;
  onVuelCalendarReadyResolve!:Function;
  setStartHour!:Function;
  startDate?:Date = new Date()
  daysForward = 7;
  events?:Array<any> = [];
  theme?:string = 'dark';
  height?:number = 600;
  lockResize?:boolean = false;
  startHour?:number = 0;
  constructor(vuelCalendarOptions:VuelCalendarOptions,
              componentSetNewStartDate:Function,
              componentSetEvents:Function,
              componentAddEvents:Function,
              componentRemoveEventsByParam:Function,
              componentConfigureEventsByParam:Function,
              componentSetStartHour:Function){
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
      if(!(vuelCalendarOptions.startDate instanceof Date)){
        console.error('Provided startDate must be a type of Date')
        return;
      }
      this.startDate = vuelCalendarOptions.startDate
    }
    
    if(vuelCalendarOptions.daysForward)
    {
      if(!( typeof  vuelCalendarOptions.daysForward === 'number')){
          console.error('Provided daysForward must be a type of number')
      }
      if(vuelCalendarOptions.daysForward < 1){
        console.error('daysForward must be greater than 0')
        this.daysForward = 1;
      }
      this.daysForward = vuelCalendarOptions.daysForward
    }
    
    if(vuelCalendarOptions.onVuelCalendarApiReady)
    {
      this.onVuelCalendarApiReady = (api:VuelCalendarApi)=>
      {
        return vuelCalendarOptions.onVuelCalendarApiReady(api)
      }
    }
    
    if(vuelCalendarOptions.onEventClicked)
    {
      this.onEventClicked = (event:any)=>
      {
        return vuelCalendarOptions.onEventClicked(event);
      }
    }

    if(vuelCalendarOptions.onDayClicked)
    {
      this.onDayClicked = (event:any)=>
      {
        return vuelCalendarOptions.onDayClicked(event);
      }
    }
        
    // if(vuelCalendarOptions.events)
    // {
    //   this.events = [];
    // }else{
    //   this.events = []
    // }
    this.events =[]

    this.api = new VuelCalendarApi(
      this.setNewStartDate,
      this.setEvents,
      this.addEvents,
      this.removeEventsByParam,
      this.configureEventsByParam,
      this.setStartHour
    );
    
    // this.onVuelCalendarApiReady(this.api)
    this.onVuelCalendarReadyResolve = () =>{
      console.log('pawain resolvd')
      this.onVuelCalendarApiReady(this.api)
    }
  }
}
class VuelCalendarApi{
  setDate!:Function;
  setEvents!:Function;
  addEvents!:Function;
  removeEventsByParam!:Function;
  configureEventsByParam!:Function;
  setStartHour!:Function;
  constructor(setDate:Function, setEvents:Function, addEvents:Function, removeEventsByParam:Function, configureEventsByParam:Function, setStartHour:Function){
    this.setDate = setDate
    this.setEvents = setEvents
    this.addEvents = addEvents
    this.removeEventsByParam = removeEventsByParam;
    this.configureEventsByParam = configureEventsByParam;
    this.setStartHour = setStartHour
  }
  setNewStartDate = (date:any) =>{
    if(typeof date === 'string'){
      this.setDate(new Date(date))
    }
    else if(date instanceof Date){
      this.setDate(date)
    }
    else {
      console.warn('Provided date type has not been proper')
    }
  }
  setNewEvents = (events:Array<any>)=>{
    this.setEvents([...events]);
    console.log(events, 'events changed');
  }
  addNewEvents = (events:Array<any>) =>{
    this.addEvents([...events]);
    console.log(events, 'events has been included')
  }
  removeEventsByParamLog = (param:string, value:any) =>{
    this.removeEventsByParam(param,value)
    console.log('events removed by param', param, value)
  }
}

export {VuelCalendarApi, VuelCalendarOptions}