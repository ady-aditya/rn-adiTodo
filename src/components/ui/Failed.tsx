import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { APP_BACKGROUND_COLOR, APP_RED_ERROR, ORANGE_DARK, TEAL_DARK } from "../../utils/AppConstants";

export default function Failed(){
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Something went wrong..</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:APP_BACKGROUND_COLOR,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:20,
        color:ORANGE_DARK
    }
})