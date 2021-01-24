/** Получить текушиее время в UTC */
export const getCurentUtcDateTime = () => {
    const now = new Date;
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}

/** Получить строковое представление текушего времени в UTC */
export const getCurentUtcDateTimeString = () => {
    return getCurentUtcDateTime().toLocaleString().replace(',', '')
}

/**
 * Перевод секунд во время(часы:минуты:секунды)
 * @param {number} sec
 */
export const secToTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return `${hours}:${minutes}:${seconds}`;
}