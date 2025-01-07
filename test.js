const d1 = new Date("2025-01-01");
const d2 = new Date("2024-12-31")
const d3 = new Date("2024-12-31")
console.log(d1)
console.log(d2)
console.log(d2.getTime() == d3.getTime())

const todayDate = new Date();
const yesterday = new Date();
yesterday.setDate(d1.getDate()-1);

console.log(todayDate);
console.log(yesterday);

const todayDate2 = new Date("2025-01-03")
console.log(todayDate2)
console.log(todayDate.getDate() == todayDate2.getDate() && todayDate.getMonth() == todayDate2.getMonth() && todayDate.getFullYear() == todayDate2.getFullYear() )

const date = new Date();
console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
console.log(d2.toDateString())

console.log("----------")
const dd1 = new Date("2025-01-01");
const dd2 = new Date();
dd2.setDate(dd1.getDate()-1);  

console.log(dd1);
console.log(dd2)
