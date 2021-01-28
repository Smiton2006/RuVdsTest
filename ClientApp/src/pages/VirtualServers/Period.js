export class Period {

    /**
     * 
     * @param {number} start - начало периода
     * @param {number} end - конец периода
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    /**
    * Начало периода
    * @type {number}
    */
    start;

    /**
    * Конец периода
    * @type {number}
    */
    end;
}
