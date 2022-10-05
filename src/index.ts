import Handler from "./core/handler.js";
import Schedule, { RecurrenceRule } from "node-schedule";
import Locals from "./misc/locals.js";

class Index {


    private static _setup (){

        process.on('SIGINT', function () { 
            Schedule.gracefulShutdown()
            .then(() => process.exit(0))
            })
     
    }

    private static async _task(){

        await (await new Handler()
            .load()
            .check())
            .notify()

    }

    static async  run () {
        console.log(`Monitoring every ${Locals.config().PeriodCheckInMinutes} minutes...`)
        Index._setup()
        Schedule.scheduleJob(`* */${Locals.config().PeriodCheckInMinutes} * * * *`, Index._task)
    }

}

await Index.run()

    