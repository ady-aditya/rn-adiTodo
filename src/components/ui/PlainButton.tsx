import { Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import {  GREY_1, GREY_4 } from "../../utils/AppConstants";

type PlainButtonProps = {
    text: string,
    onPress? : ()=>void,
    buttonStyle?: StyleProp<ViewStyle>;
}


export default function PlainButton({text, onPress,buttonStyle}:PlainButtonProps){

    return(
        <TouchableOpacity style={[styles.button,buttonStyle]} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    button:{
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:GREY_4,
        padding:15,
        alignSelf:"stretch",
        borderRadius:40,
        marginHorizontal:20
       
    },
    text:{
        alignContent:"center",
        color:GREY_1
    }
});