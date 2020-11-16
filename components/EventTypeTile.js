import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../store/Store";

const EventTypeTile = ({ icon, title, body }) => {
    const navigation = useNavigation()
    const store = useStore()

    const onPressTile = () => {
        navigation.navigate('EventDetails', { "edit": false })
        store.setEventType(title)
    }

    return (
        <TouchableOpacity
            onPress={onPressTile}
            style={styles.container}>
            <View>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color="#000" />
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>
            </View>
            <View style={styles.rightArrow}>
                <MaterialIcons name="keyboard-arrow-right" size={35} color="grey" />
            </View>
        </TouchableOpacity>
    )
};
export default EventTypeTile;

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginBottom: 0,
        padding: 15,
        paddingVertical: 20,
        backgroundColor: '#fff',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: '#ebecf0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    body: {
        marginTop: 5,
        maxWidth: '90%'
    },
    rightArrow: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})