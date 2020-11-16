import { observer } from "mobx-react";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { EventTypeTile } from "../components";

const CreateEvent = ({ }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create event</Text>
            <View style={styles.tilesContainer}>
                <EventTypeTile
                    icon={'ios-globe'}
                    title={'Online'}
                    body={'Video Chat with Messenger Rooms, broadcast with Facebook Live or add an external link.'}
                />
                <EventTypeTile
                    icon={'md-people'}
                    title={'In person'}
                    body={'Get together with people in a specific location.'}
                />
            </View>
        </View>
    )
};
export default observer(CreateEvent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 25
    },
    tilesContainer: {
        marginTop: 10
    }
})