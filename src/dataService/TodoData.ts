import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayTodos, TodayYesterdayTodos, UserTodos } from "../types/TodoTypes";
import { getDateInYMD } from "../utils/AppUtils";

const KEY_USER_TODOS = "userTodos"

export async function saveUserTodos(userTodo:UserTodos){
    console.log(userTodo);
    const str = JSON.stringify(userTodo);
    console.log(str)
    await AsyncStorage.setItem(KEY_USER_TODOS,JSON.stringify(userTodo));
    console.log("saved",JSON.stringify(userTodo));
    console.log(JSON.stringify(userTodo))
}

export async function saveDummyTodoStartingYesterDay(){
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate()-1);

    const yesterdayTodos : DayTodos = {
        date:getDateInYMD(yesterday),
        todos : [{
            completed:true,
            title:"Prepare meals for the week"
        },
        {
            completed:true,
            title:"Grocery Shopping"
        },
        {
            completed:false,
            title:"Send party invites"
        },
        {
            completed:true,
            title:"Call everyone and inform about party"
        }]
    };

    const yesterday1 = new Date();
    yesterday1.setDate(yesterday.getDate()-1);
    const yesterday1Todos : DayTodos = {
        date:getDateInYMD(yesterday1),
        todos : [{
            completed:true,
            title:"Workout chart for the week"
        },
        {
            completed:true,
            title:"Investment planning"
        },
        {
            completed:true,
            title:"Do laundry"
        }]
    };

    const yesterday2 = new Date();
    yesterday2.setDate(yesterday1.getDate()-1);
    const yesterday2Todos : DayTodos = {
        date:getDateInYMD(yesterday1),
        todos : [{
            completed:false,
            title:"Workout chart for the week"
        },
        {
            completed:true,
            title:"Long run (10k plus)"
        },
        {
            completed:true,
            title:"Car service"
        }]
    };

    const yesterday3 = new Date();
    yesterday3.setDate(yesterday2.getDate()-1);
    const yesterday3Todos : DayTodos = {
        date:getDateInYMD(yesterday1),
        todos : [{
            completed:true,
            title:"Rent transfers"
        },
        {
            completed:false,
            title:"Long run (10k plus)"
        },
        {
            completed:true,
            title:"Bike service"
        }]
    };

    const userTodos: UserTodos = {
        daysTodos : [
            yesterdayTodos,yesterday1Todos,yesterday2Todos, yesterday3Todos
        ]
    };
    await saveUserTodos(userTodos);



}

export async function getUserTodos():Promise<UserTodos> {
    const userTodoString = await AsyncStorage.getItem(KEY_USER_TODOS);
    return userTodoString != null ? JSON.parse(userTodoString) : {daysTodos:[]};
}

export function addTask(title:string, todayTodo:DayTodos){
    todayTodo.todos.push({
        title:title,
        completed:false
    });
}

export function areSameDates(date1:Date, date2:Date){
    return (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear() )
}

export function getTodayAndYesterdayTodos(userTodos:UserTodos ){

    const returnObj : TodayYesterdayTodos = {
       today:undefined,
       yesterday:undefined
    }
    
    if(userTodos!=null && userTodos.daysTodos!=null && userTodos.daysTodos.length > 0){
        const todayDate = new Date();
        const yesterday = new Date();
        yesterday.setDate(todayDate.getDate()-1);   

        if( areSameDates(new Date(userTodos.daysTodos[0].date),todayDate) ){
            returnObj.today = {...userTodos.daysTodos[0]};
            if(userTodos.daysTodos.length > 1 && areSameDates(new Date(userTodos.daysTodos[1].date),yesterday)){
                returnObj.yesterday = {...userTodos.daysTodos[1]};
            }
        }else if( areSameDates(new Date(userTodos.daysTodos[0].date),yesterday) ){
            returnObj.yesterday = {...userTodos.daysTodos[0]};
        }   

    }

    return returnObj;


}