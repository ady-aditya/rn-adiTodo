import { Alert, Platform, StyleSheet, Switch, Text, View } from "react-native";
import { APP_BACKGROUND_COLOR, APP_DARK_COLOR, GREY_1, GREY_3, ORANGE_DARK, TEAL_DARK, TEAL_MEDIUM } from "../../utils/AppConstants";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispath } from "../../redux/store";
import { updateTodo,deleteTodo } from "../../redux/todoSlice";

type EditableTaskItemProps={
    dayIndex:number,
    taskIndex:number,
    taskTitle:string,
    taskCompleted:boolean,
    deleteEnabled?:boolean
}

export default function EditbleTaskItem(taskItem:EditableTaskItemProps){

    const dispath = useAppDispath();

    const [isCompleted, setIsCompleted] = useState(taskItem.taskCompleted);
    const toggleSwitch = () => {

        dispath(updateTodo({
            day:taskItem.dayIndex,
            id:taskItem.taskIndex,
            status :  !isCompleted
        }));
        setIsCompleted(previousState => !previousState);
        }
    
    const deleteTask = (id:number)=>{
        Alert.alert("Delete task", "Are you sure you want to delete this?",
            [
                {
                    text:"No",
                    style: "cancel"
                },
                {
                    text:"Delete",
                    onPress:()=>{
                        console.log("in on press");
                        dispath(deleteTodo({index:id}))
                    }
                },
            ]
        )
    }

        return(
            <View style={styles.taskItemRoot}>
                {/* <Text style={styles.taskNumber}>{taskItem.taskIndex + 1}</Text> */}
                <View>
                <Switch
                    style={styles.switch}
                    trackColor={{false:GREY_3, true:TEAL_MEDIUM}}
                    value={isCompleted}
                    thumbColor={isCompleted ? TEAL_DARK : GREY_1}
                    onValueChange={toggleSwitch}
                />
                </View>
                
                <Text style={[styles.taskText,isCompleted && {color:TEAL_DARK} ]}>{taskItem.taskTitle }</Text>
                {taskItem.deleteEnabled &&<Icon style={styles.delete} name="delete-outline" size={20} color={ORANGE_DARK} onPress={()=>deleteTask(taskItem.taskIndex)} /> }
            </View>
        )
    }

const styles = StyleSheet.create({
    taskItemRoot:{
       flexDirection:"row",
       width:"100%",
       justifyContent:"space-between",
       alignItems:"flex-start",
       marginTop:20,
       padding:5,
       paddingLeft:Platform.OS==="ios"?10:10,

    },
    taskText:{
        fontSize:18,
        color:APP_DARK_COLOR,
        marginLeft:10,
        flex:10
        
    },
    switch:{
        flex:1,
        marginLeft:Platform.OS==="ios"?0:0,
        marginRight:Platform.OS==="ios"?30:0
    },
    delete:{
        
        
    }



})