import { StyleSheet, Text, View } from "react-native";
import { DayTodos } from "../../types/TodoTypes";
import { getFormattedDate } from "../../utils/AppUtils";
import TaskItem from "./TaskItem";
import { APP_DARK_COLOR, APP_RED_ERROR, TEAL_LIGHT } from "../../utils/AppConstants";

type EarlierDayTodosProps={
    dayTodos: DayTodos,
}

export default function EarlierDayTodos({dayTodos}:EarlierDayTodosProps){
    const allDone = dayTodos.todos.every((todo)=>todo.completed);
    return(
        <View style={styles.dayRoot}>
            <Text style={[styles.day, allDone && {color:TEAL_LIGHT}, !allDone &&{color:APP_RED_ERROR}]} >{getFormattedDate(new Date(dayTodos.date))}</Text>
            {dayTodos.todos.map((todo)=>
                <TaskItem key={dayTodos.date+todo.title+Math.random()} taskCompleted={todo.completed} taskTitle={todo.title}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    dayRoot:{
        alignItems:"center",
        backgroundColor:"white",
        marginHorizontal:10,
        marginTop:10,
        borderRadius:8,
        paddingVertical:10
    },
    day:{
        fontSize:16,
        
    }
})