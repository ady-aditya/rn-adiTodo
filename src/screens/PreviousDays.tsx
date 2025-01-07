import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { APP_BACKGROUND_COLOR, TEAL_DARK } from "../utils/AppConstants";
import EarlierDayTodos from "../components/ui/EarlierDayTodos";
import { useAppDispath, useAppSelector } from "../redux/store";
import AppLoading from "../components/ui/AppLoading";
import Failed from "../components/ui/Failed";
import { DayTodos } from "../types/TodoTypes";
import { areSameDates } from "../dataService/TodoData";

export default function PreviousDays(){

    const {status,userTodos}= useAppSelector((state)=>state.todo);
    const dispath = useAppDispath();

    if(status === "idle" || status==="loading" ){
        return <AppLoading/>
    }
    if(status === "failed"){
        return <Failed/>
    }
    const todayDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(todayDate.getDate()-1); 

    let todoArr : DayTodos[] = [];
    if(userTodos.daysTodos && userTodos.daysTodos.length>0){
        todoArr = userTodos.daysTodos.filter((todo)=>  ( !(areSameDates(new Date(todo.date),todayDate) || areSameDates(new Date(todo.date),yesterday))  )  )
    }
    
    return(
        <SafeAreaView style={styles.root}>
            {
                todoArr.length === 0 && 
                <Text style={styles.messageText}>
                    Your previous day's tasks will appear here.
                </Text>
            }
            { todoArr.length > 0 && 
                <FlatList
                data={todoArr}
                renderItem={({item})=><EarlierDayTodos dayTodos={item} />}
                keyExtractor={(item,index)=>item.date+index+Math.random}
            />}
            
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    root:{
        backgroundColor:APP_BACKGROUND_COLOR,
        
        alignItems:"center",
        flex:1
    },
    messageText:{
        fontSize:18,
        alignSelf:"center",
        color:TEAL_DARK,
        marginTop:50
        
    }
})