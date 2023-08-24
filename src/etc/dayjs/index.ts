import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

// always add 9 hours
dayjs.prototype.tz = function () {
	return this.add(9, 'hour');
};

export default dayjs;
