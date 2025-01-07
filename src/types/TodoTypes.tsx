export type Todo = {
    title:string,
    completed:boolean
}

export type DayTodos ={
    date:string,
    todos: Todo[]
}

export type UserTodos={
    daysTodos : DayTodos[]
}

export type TodayYesterdayTodos = {
    today?: DayTodos,
    yesterday?: DayTodos
}