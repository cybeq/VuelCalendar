import {VuelCalendarEvent} from "../VuelCalendarEvent.ts";

type SetStartDate = (date: Date) => Date;
type SetEvents = (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
type AddEvents = (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
type RemoveEventsByParam = (param: string, value: any) => VuelCalendarEvent[];
type ConfigureEventsByParam = (param: string, value: any, params: VuelCalendarEvent) => VuelCalendarEvent[];
type SetStartHour = (hour: number) => void;
type SwitchViewMode = ()=>void;
type SetDaysForward = (days:number) => void;
type SetDateRange = (startDate:Date|string, endDate:Date|string) => void;

export type {
    SetStartDate,
    SetEvents,
    AddEvents,
    RemoveEventsByParam,
    ConfigureEventsByParam,
    SetStartHour,
    SwitchViewMode,
    SetDaysForward,
    SetDateRange
}