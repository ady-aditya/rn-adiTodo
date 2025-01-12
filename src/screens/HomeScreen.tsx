import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { APP_BACKGROUND_COLOR, APP_DARK_COLOR, ORANGE_DARK, ORANGE_MEDIUM, TEAL_DARK, TEAL_LIGHT } from "../utils/AppConstants";
import EditbleTaskItem from "../components/ui/EditbleTaskItem";
import PlainButton from "../components/ui/PlainButton";
import { RootState, useAppDispath, useAppSelector } from "../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import {addTodo,deleteTodo,updateTodo} from "../redux/todoSlice.ts"
import AppLoading from "../components/ui/AppLoading.tsx";
import Failed from "../components/ui/Failed.tsx";
import { getTodayAndYesterdayTodos } from "../dataService/TodoData.ts";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function HomeScreen(){

    const [textTodo, setTextTodo] = useState<string>("");
    const {status,userTodos}= useAppSelector((state)=>state.todo);
    const dispath = useAppDispath();

    if(status === "idle" || status==="loading" ){
        return <AppLoading/>
    }
    if(status === "failed"){
        return <Failed/>
    }
    const todayYesterdayTodos = getTodayAndYesterdayTodos(userTodos);
    console.log(todayYesterdayTodos);
    let yesterdayDone = false;
    if(todayYesterdayTodos.yesterday && todayYesterdayTodos.yesterday.todos && todayYesterdayTodos.yesterday.todos.length > 0 && todayYesterdayTodos.yesterday.todos.every((todo)=>todo.completed) ){
        yesterdayDone = true;
    }

    const yesterdayIndex = todayYesterdayTodos.today === undefined ? 0 : 1
    
    function saveTextTodo(){
        if(textTodo === ""){
            Alert.alert("Invalid","Please enter a value");
            return;
        }
        dispath(addTodo({title:textTodo}));
        setTextTodo("");
    
    }

    return(
        <ScrollView >
            <SafeAreaView style={styles.root}>
                <Text style={styles.pageTitle}>Today's tasks</Text>

                {todayYesterdayTodos.today && todayYesterdayTodos.today.todos.length>0 && 
                    <View style={styles.tasksHolder}>
                    {todayYesterdayTodos.today.todos.map((todo,index)=>
                        <EditbleTaskItem key={todo.title+index} dayIndex={0} taskIndex={index} taskTitle={todo.title} taskCompleted={todo.completed} deleteEnabled={true}/>
                    )}
                    </View>
                }
                { (todayYesterdayTodos.today === undefined || todayYesterdayTodos.today.todos.length==0) && 
                    <View style={styles.tasksHolder}>
                    <Text style={styles.messageText}>Start Adding tasks for todays</Text>
                    </View>
                }

                <View style={styles.addHolder}>
                    <TextInput style={styles.inputAddTask} placeholder="Add the task's name" value={textTodo} onChangeText={setTextTodo} />
                    <PlainButton text="Add Task" buttonStyle={{marginTop:25, marginHorizontal:10}} onPress={saveTextTodo} />
                </View>

                <View style={styles.yesterday}>
                    <View style={{flexDirection : "row", alignItems:"center"}}>
                    {yesterdayDone && <Icon style={{marginRight:5}} name="checkbox-marked-circle" size={20} color={TEAL_DARK}/> }
                    <Text style={[styles.pageTitleYesterday, yesterdayDone && {color:TEAL_DARK}]}>Yesterday's tasks</Text> 
                    </View>
                    
                    <View style={styles.tasksHolder}>
                        {(todayYesterdayTodos.yesterday === undefined || todayYesterdayTodos.yesterday.todos.length === 0) && 
                            <Text style={styles.messageText}>No tasks were added yesterday</Text>
                        }
                        {todayYesterdayTodos.yesterday != undefined && todayYesterdayTodos.yesterday.todos.length > 0 && 
                            todayYesterdayTodos.yesterday.todos.map((todo,index)=>
                                <EditbleTaskItem dayIndex={yesterdayIndex} key={index+Math.random()} taskIndex={index} taskTitle={todo.title} taskCompleted={todo.completed}/>
                            )
                        }
                    </View>
                </View>

            </SafeAreaView>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:APP_BACKGROUND_COLOR,
        marginHorizontal:10,
        alignItems:"center",   
    },
    pageTitle:{
        fontSize:25,
        fontWeight:"bold",
        color:ORANGE_DARK,
        alignContent:"center",
        marginTop:10
    },
    pageTitleYesterday:{
        fontSize:25,
        fontWeight:"bold",
        color:ORANGE_DARK,
        alignContent:"center"
    },
    tasksHolder:{
        marginVertical:15,
        width:"100%",
        backgroundColor:"white",
        padding:5,
        paddingBottom:25,
        borderRadius:8
    },
    addHolder:{
        backgroundColor:"white",
        padding:15,
        borderRadius:8,
        width:"100%"
    },
    inputAddTask:{
        padding:10,
        color:TEAL_DARK,
        borderColor:APP_DARK_COLOR,
        borderRadius:5,
        borderWidth:1
    },
    yesterday:{
        scaleX:0.5,
        transform: [{ scale: 0.8 }],
        alignItems:"center",
        width:"100%"
    },
    messageText:{
        fontSize:18,
        alignSelf:"center",
        color:TEAL_DARK,
        paddingTop:15,
        
    }
})