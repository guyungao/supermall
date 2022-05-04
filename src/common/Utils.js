// 防抖函数  函数，延时时间
export function debounce(fanc,dalay = 300){
  //  设置常量为null
   let timer = null
  //  返回一个函数
   return function(...arge){
    // 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fanc.apply(this,arge)
    },dalay)
   }
}


// 时间格式化
export function formatDate(date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  
  // 获取月、日、时、分、秒
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
// 装换为2位数显示
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}