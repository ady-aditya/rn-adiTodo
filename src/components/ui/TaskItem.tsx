import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { APP_BACKGROUND_COLOR, APP_DARK_COLOR, GREY_1, GREY_3, ORANGE_DARK, TEAL_DARK, TEAL_MEDIUM } from "../../utils/AppConstants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

type TaskItemProps={
    taskTitle:string,
    taskCompleted:boolean,
    
}

export default function TaskItem(taskItem:TaskItemProps){

  return(
        <View style={styles.taskItemRoot}>
            {taskItem.taskCompleted && <Icon name="checkbox-marked-circle" size={13} color={TEAL_DARK}/> } 
            {!taskItem.taskCompleted && <IconE name="circle-with-cross" size={13} color="#BF0000"/> } 
            <Text style={[styles.taskText,taskItem.taskCompleted && {color:TEAL_DARK} ]}>{taskItem.taskTitle }</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    taskItemRoot:{
       flexDirection:"row",
       width:"100%",
       justifyContent:"space-between",
       alignItems:"center",
       marginTop:20,
       padding:5,
       paddingLeft:Platform.OS==="ios"?10:10,
    },
    taskText:{
        fontSize:15,
        color:APP_DARK_COLOR,
        marginLeft:10,
        flex:10
        
    },


})