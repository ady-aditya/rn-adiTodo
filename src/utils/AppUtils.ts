import { DayTodos } from "../types/TodoTypes";

function getDayName(date: Date): string {
    const options = { weekday: 'long' } as const; 
    return date.toLocaleDateString('en-US', options); 
}

function getDayWithSuffix(date: Date): string { 
    const day = date.getDate(); 
    if (day > 3 && day < 21) 
        return `${day}th`;  
    switch (day % 10) { 
        case 1: 
        return `${day}st`; 
        case 2: 
        return `${day}nd`; 
        case 3: 
        return `${day}rd`; 
        default: 
        return `${day}th`;
    }
}

function getMonthName(date: Date): string { 
    const options = { month: 'short' } as const; 
    return date.toLocaleDateString('en-US', options); 
}

export function getFormattedDate(date:Date): string{
   return `${getDayName(date)}, ${getDayWithSuffix(date)} ${getMonthName(date)}`; 
}

export function getDateInYMD(date:Date){
  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function dummyDaysTodo():DayTodos[]{
    const dayTodosArray: DayTodos[] = [
        {
          date: getDateInYMD(new Date("2025-01-06")),
          todos: [
            { title: "Finish RN app with async storage", completed: false },
            { title: "Rent aggreement", completed: false },
            { title: "Rent Reciepts", completed: false },
            { title: "Rent and other transfers", completed: false },
            { title: "MPC ISL -> start update api", completed: false },
          ],
        },
        {
          date: getDateInYMD(new Date("2025-01-05")),
          todos: [
            { title: "Study redux toolkit", completed: false },
            { title: "Workout plan for next month", completed: false },
            { title: "Finish app 90%", completed: false },
          ],
        },

        {
          date: getDateInYMD(new Date("2025-01-04")),
          todos: [
            { title: "Buy groceries", completed: true },
            { title: "Walk the dog", completed: true },
          ],
        },
        {
          date: getDateInYMD(new Date("2025-01-03")),
          todos: [
            { title: "Do laundry", completed: true },
            { title: "Read a book", completed: true },
          ],
        },
        {
          date: getDateInYMD(new Date("2025-01-02")),
          todos: [
            { title: "Complete project", completed: false },
            { title: "Exercise", completed: false },
          ],
        },
        {
          date: getDateInYMD(new Date("2024-12-31")),
          todos: [
            { title: "Prepare meals", completed: true },
            { title: "Call parents", completed: false },
          ],
        },
      ];
    return dayTodosArray;      
}

