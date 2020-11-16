import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { observer } from "mobx-react";
import { Calendar, SelectedDateTime, TimePicker } from "../components";

const DateTimePickerScreen = ({ }) => {
    return (
        <View style={styles.container}>
            <SelectedDateTime />
            <View style={{ flex: 1 }}>
                <Calendar />
            </View>
            <View style={{ flex: 1 }}>
                <TimePicker />
            </View>
        </View>
    )
};
export default observer(DateTimePickerScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})