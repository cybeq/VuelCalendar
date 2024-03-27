import {VuelCalendarEvent} from "./types/VuelCalendarEvent.ts";

export const genId = (events:Array<VuelCalendarEvent>) => {
    for(const event of events){
        if(event.id){
            continue;
        }

        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

        const randomString = (length:number) => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            return result;
        };

        const microtime = new Date().getTime().toString();

        const hashTime = () => {
            let hash = 0;
            for (let i = 0; i < microtime.length; i++) {
                const char = microtime.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash |= 0;
            }
            return hash;
        };

        const randomLetters = randomString(15);
        event.id = microtime + hashTime() + randomLetters;

    }
    return events;
};
