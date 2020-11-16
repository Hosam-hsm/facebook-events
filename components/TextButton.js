import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { BLUE } from "../../constants/Colors";

const TextButton = ({ text, onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </TouchableOpacity>
    )
};
export default TextButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    text: {
        color: BLUE,
        fontWeight: '600',
        fontSize: 16
    }
})