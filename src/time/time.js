/**
 * [Time 时间构造函数]
 * @param {[type]} date [description]
 */
function Time(date) {
	this.date        = date || new Date();
	this.createTime  = new Date();
}
/**
 * [format 时间格式化]
 * @param  {[type]} formatReg [正则表达式]
 * @return {[type]}           [description]
 */
Time.prototype.format = function(formatReg){
	var 
		date   = this.date,
		fix    = this.fix,
		format = formatReg || 'yyyy-MM-dd hh:mm:ss';
		format = format.replace("yyyy",date.getFullYear());
		format = format.replace("yy",date.getFullYear()%100);
		format = format.replace("MM",fix( date.getMonth() + 1 ) );
		format = format.replace("dd",fix( date.getDate() ) );
		format = format.replace("hh",fix( date.getHours() ) );
		format = format.replace("mm",fix( date.getMinutes() ) );
		format = format.replace("ss",fix( date.getSeconds() ) );
	return format;
}
/**
 * [formatCount 倒计时正则匹配]
 * @param  {[type]} time      [时间戳]
 * @param  {[type]} formatReg [正则表达式]
 * @return {[type]}           [description]
 */
Time.prototype.formatCount = function(time,formatReg){
	var 
		format = formatReg || 'hh:mm:ss',
		fix    = this.fix,
		second = Math.floor(time/1000%60),
		minute = Math.floor(time/1000/60%60),
		hour   = Math.floor(time/1000/60/60%24),
		day    = Math.floor(time/1000/60/60/24);
		format = format.replace('dd', fix(day) );
		format = format.replace('hh', fix(hour) );
		format = format.replace('mm', fix(minute) );
		format = format.replace('ss', fix(second) );
	return format;
}
/**
 * [fix 对应0一下的数字进行修复]
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
Time.prototype.fix = function(number){
	return number < 10 ? '0' + number : number;
}
/**
 * [timeStamp 时间戳]
 * @return {[type]} [description]
 */
Time.prototype.timeStamp = function(){
	return this.date.getTime();
}
/**
 * [syncTime 同步显示时间]
 * @param  {[type]} id [显示元素id]
 * @return {[type]}    [description]
 */
Time.prototype.syncTime = function(id){
	var 
		__self   = this,
		showDate = '';
	function run (){
		__self.date.setSeconds(__self.date.getSeconds()+1);
		showDate = __self.format();
		document.getElementById(id).innerHTML = showDate;
	}
	window.setInterval(run, 1000); 
}
/**
 * [countDown 倒计时]
 * @param  {[type]} id        [显示元素id]
 * @param  {[type]} countTime [倒计时时间 单位秒]
 * @param  {[type]} formatReg [显示正则]
 * @param  {[type]} fixedTime [修正网络时间，需要ajax请求才能获取其误差时间]
 * @return {[type]}           [description]
 */
Time.prototype.countDown = function(id,countTime,formatReg,fixedTime){
	var 
		lastTime   = this.createTime,
		offsetTime = 0,
		__self     = this,
		currentTime,showDate;
	function run () {
		currentTime = new Date().getTime();
		offsetTime  = currentTime - lastTime;
		offsetTime  = fixedTime ? countTime*1000 - offsetTime - fixedTime : countTime*1000 - offsetTime;
		showDate    = __self.formatCount(offsetTime,formatReg);
		document.getElementById(id).innerHTML = showDate;
	}
	window.setInterval(run, 1000);
}