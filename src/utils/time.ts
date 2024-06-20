import dayjs from 'dayjs';

export enum TIME_FORMAT {
  DAY = 'YYYY-MM-DD',
  DATE = 'YYYY-MM-DD HH:mm:ss',
  HOUR = 'HH',
  MINUTE = 'mm',
  SECOND = 'ss',
  YEAR = 'YYYY',
  MONTH = 'MM',
  SINGLE_DAY = 'DD',
}

export default class TimeClass {
  private dayjs: dayjs.Dayjs;

  constructor(time: string | number | dayjs.Dayjs | Date = undefined) {
    this.dayjs = dayjs(time);
  }

  getDay() {
    return this.dayjs.format(TIME_FORMAT.DAY);
  }

  getTime() {
    return this.dayjs.format(TIME_FORMAT.DATE);
  }

  getTimestamp() {
    return this.dayjs.valueOf();
  }

  add(add: number, format: TIME_FORMAT = TIME_FORMAT.DAY, addUnit: dayjs.ManipulateType = 'days') {
    return this.dayjs.add(add, addUnit).format(format);
  }

  subtract(subtract: number, format: TIME_FORMAT = TIME_FORMAT.DAY, subUnit: dayjs.ManipulateType = 'days') {
    return this.dayjs.subtract(subtract, subUnit).format(format);
  }

  subtractStartOf(subtract: number, startUnit: dayjs.OpUnitType, format: TIME_FORMAT = TIME_FORMAT.DATE, subUnit: dayjs.ManipulateType = 'days') {
    return this.dayjs.subtract(subtract, subUnit).startOf(startUnit).format(format);
  }

  subtractEndOf(subtract: number, endUnit: dayjs.OpUnitType, format: TIME_FORMAT = TIME_FORMAT.DATE, subUnit: dayjs.ManipulateType = 'days') {
    return this.dayjs.subtract(subtract, subUnit).endOf(endUnit).format(format);
  }

  isAfter(time: string | number | dayjs.Dayjs | Date = undefined) {
    return this.dayjs.isAfter(time);
  }

  isBefore(time: string | number | dayjs.Dayjs | Date = undefined) {
    return this.dayjs.isBefore(time);
  }
}

export function getDaysArray(startTime: string, endTime?: string, unit: dayjs.ManipulateType = 'days', format: TIME_FORMAT = TIME_FORMAT.DAY) {
  if (!startTime) {
    return [];
  }
  const startDay = dayjs(startTime).format(format);
  const endDay = dayjs(endTime).format(format);
  if (!dayjs(startDay).isBefore(dayjs(endDay))) {
    return [];
  }
  const times = [];
  let i = 0;
  while (true) {
    const day = dayjs(startDay).add(i, unit).format(format);
    times.push(day);
    const addDay = dayjs(startDay)
      .add(i + 1, unit)
      .format(format);
    if (!dayjs(addDay).isBefore(dayjs(endDay))) {
      times.push(addDay);
      break;
    }
    i++;
  }
  return times;
}
