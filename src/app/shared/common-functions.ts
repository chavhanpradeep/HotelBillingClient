export class CommonFunctions {
    d = new Date();
    weekday = new Array(7);
    /**
     *
     */
    constructor() {
        this.weekday[0] = "Sunday";
        this.weekday[1] = "Monday";
        this.weekday[2] = "Tuesday";
        this.weekday[3] = "Wednesday";
        this.weekday[4] = "Thursday";
        this.weekday[5] = "Friday";
        this.weekday[6] = "Saturday";
    }

    getDayOfWeek() {
        return this.weekday[this.d.getDay()];
    }
}