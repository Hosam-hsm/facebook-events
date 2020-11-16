import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { BLUE } from "../../constants/Colors";

const RadioButton = ({ selected, style }) => {
    return (
        <View style={[styles.outer, { borderColor: selected ? BLUE : 'grey' }]}>
            {
                selected ? <View style={styles.inner} /> : null
            }
        </View>
    );
}

export default RadioButton;

const styles = StyleSheet.create({
    outer: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: BLUE,
    }
})