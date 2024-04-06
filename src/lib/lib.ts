// @ts-ignore
import VuelCalendar from "../components/VuelCalendar.vue";
import type {IVuelCalendarApi} from "../utils/VuelCalendarOptions.ts";
import type {VuelCalendarDay} from "../utils/types/VuelCalendarDay.ts";
import type {VuelCalendarEvent} from "../utils/types/VuelCalendarEvent.ts";
import type {VuelCalendarOptions} from "../utils/VuelCalendarOptions.ts";
import type {Colors} from "../utils/types/Colors.ts";
import type {IVuelCalendarOptions} from "../utils/VuelCalendarOptions.ts";
import type {VuelCalendarDrop} from "../utils/types/VuelCalendarDrop.ts";
import type {VuelCalendarEventConfigure} from "../utils/types/VuelCalendarEventConfigure.ts";
import type {VuelCalendarResize} from "../utils/types/VuelCalendarResize.ts";
import type {EventTemplate} from "../utils/types/function-types/innerFunctionsTypes.ts";
import type {SetEventTemplate} from "../utils/types/function-types/apiFunctionsTypes.ts";
import '../index.css';
import type {
    SetStartDate,
    SetEvents,
    AddEvents,
    RemoveEventsByParam,
    ConfigureEventsByParam,
    SetStartHour,
    SetEndHour,
    SwitchViewMode,
    SetDaysForward,
    SetDateRange,
    SetTimeRange
} from '../utils/types/function-types/apiFunctionsTypes.ts'


export type {
    IVuelCalendarApi,
    IVuelCalendarOptions,
    VuelCalendarDay,
    VuelCalendarEvent,
    VuelCalendarEventConfigure,
    VuelCalendarOptions,
    Colors,
    VuelCalendarDrop,
    VuelCalendarResize
}
export type {
    SetStartDate,
    SetEvents,
    AddEvents,
    RemoveEventsByParam,
    ConfigureEventsByParam,
    SetStartHour,
    SetEndHour,
    SwitchViewMode,
    SetDaysForward,
    SetDateRange,
    SetTimeRange,
    EventTemplate,
    SetEventTemplate
}

export default VuelCalendar
