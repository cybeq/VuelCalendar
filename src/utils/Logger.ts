export class Logger{
    throwErr = false;
    constructor(throwErr:boolean = false) {
        this.throwErr = throwErr;
    }
    private bodyEventUndefined = (name:string) =>
                '/* ------------------- */\n'
                +'!+VuelCalendar WARNING+!\n'
                +`EVENT: ${name}\n`
                +'has not been defined !!!\n'
                +'/* --------------------*\n'
    private bodyCustomWarn = (warn:string, title:string, content:string, content2?:string) =>
        '/* ------------------- */\n'
        +'!+VuelCalendar WARNING+!\n'
        +`${warn.toUpperCase()}: ${title}\n`
        +`${content}!\n`
        +`${content2 ? content2 +'!\n' : ''}`
        +'/* --------------------*\n'
    undefinedEvent(name:string){
        return ()=>{
            console.warn(
                this.bodyEventUndefined(name)
            )
        }
    }
    customWarn(warn:string, title:string, content:string, content2?:string){
        console.warn(this.bodyCustomWarn(warn, title, content, content2))
        if(this.throwErr) {
            throw new Error(warn)
        }
    }
}