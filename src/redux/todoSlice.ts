import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTask, areSameDates, getUserTodos, saveUserTodos } from "../dataService/TodoData"
import { UserTodos } from "../types/TodoTypes"
import { getDateInYMD } from "../utils/AppUtils";


const initialState : TodoState = {
    userTodos : {
        daysTodos : []
    },
    status:"idle"
}

type TodoState = {
    userTodos : UserTodos,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

type AddTodoActionPayload = {
    title:string
}

type UpdateTodoActionPayload = {
    id:number,
    status:boolean,
    day:number
}

type DeleteTodoActionPayload = {
    index:number
}

export const loadTodos = createAsyncThunk("loadTodos", async()=>{
    //one time initlaize
    // saveUserTodos({
    //     daysTodos:dummyDaysTodo()
    // }); 
    const usertodos = await getUserTodos();
    return usertodos;
})

const todoSlice = createSlice({
    name:"todo",
    initialState:initialState,
    extraReducers: (builder) =>{
        builder.addCase(loadTodos.pending, (state)=>{
            state.status = "loading";
        })
        .addCase(loadTodos.fulfilled, (state,action)=>{
            state.status = "succeeded";
            state.userTodos = action.payload;
        })
        .addCase(loadTodos.rejected, (state)=>{
            state.status = "failed";
        })
    },
    reducers : {
        addTodo : (state,action:PayloadAction<AddTodoActionPayload>)=>{
            
            //initialize today if reqd
            if(state.userTodos.daysTodos.length == 0 || 
                (state.userTodos.daysTodos.length > 0 && !areSameDates(new Date(state.userTodos.daysTodos[0].date), new Date()) )
            ){
                state.userTodos.daysTodos.unshift({
                    date:getDateInYMD(new Date()),
                    todos: []
                });
            }

            //add task to today
            state.userTodos.daysTodos[0].todos.push({
                title:action.payload.title,
                completed:false
            });

            saveUserTodos(state.userTodos);    
        },

        updateTodo: (state,action:PayloadAction<UpdateTodoActionPayload>)=>{
            state.userTodos.daysTodos[action.payload.day].todos[action.payload.id].completed=action.payload.status;
            saveUserTodos(state.userTodos);  
        },

        deleteTodo : (state,action:PayloadAction<DeleteTodoActionPayload>)=>{
            console.log("in slice delete")
            state.userTodos.daysTodos[0].todos = state.userTodos.daysTodos[0].todos.filter((todo,index)=>index!=action.payload.index);
            saveUserTodos(state.userTodos);  
        }

    }
})

export const {addTodo,updateTodo,deleteTodo} = todoSlice.actions;
export const todoSliceReducers = todoSlice.reducer;