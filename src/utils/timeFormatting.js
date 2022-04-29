const ms = require("pretty-ms")

module.exports.getReadableTime = (ms) => {
	if (!ms || ms && !isFinite(ms)) {throw new TypeError('You need to pass a total number of milliseconds! (That number cannot be greater than Number limits)');}
	if (typeof ms !== 'number') {throw new TypeError(`You need to pass a number! Instead received: ${typeof ms}`);}
	const t = this.getTimeObject(ms);
	const reply = [];
	if (t.years) reply.push(`${t.years} yrs`);
	if (t.months) reply.push(`${t.months} mo`);
	if (t.days) reply.push(`${t.days} d`);
	if (t.hours) reply.push(`${t.hours} hrs`);
	if (t.minutes) reply.push(`${t.minutes} min`);
	if (t.seconds) reply.push(`${t.seconds} sec`);
	return reply.length > 0 ? reply.join(', ') : '0sec';
};