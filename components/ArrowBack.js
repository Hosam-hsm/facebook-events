import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ArrowBack = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Ionicons name={'ios-arrow-back'} size={28} color="#000" />
        </TouchableOpacity>
    )
};
export default ArrowBack;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    }
})