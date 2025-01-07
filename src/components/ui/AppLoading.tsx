import { ActivityIndicator, StyleSheet, View } from "react-native";
import { APP_BACKGROUND_COLOR, TEAL_DARK } from "../../utils/AppConstants";

export default function AppLoading(){
    return (
        <View style={styles.root}>
            <ActivityIndicator size={"large"} color={TEAL_DARK} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:APP_BACKGROUND_COLOR,
        alignItems:"center",
        justifyContent:"center"
    }
})