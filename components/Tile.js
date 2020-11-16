import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from "mobx-react";
import RadioButton from "./RadioButton";

const Tile = ({ id, icon, title, desc, selected, handleOnSelectTile, rightArrow }) => {
    return (
        <TouchableOpacity
            onPress={() => handleOnSelectTile(id)}
            style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialIcons name={icon} size={24} color="black" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                {desc ? <Text numberOfLines={title == 'Description' ? 1 : 5} style={[styles.desc]}>{desc}</Text> : null}
            </View>
            <View style={styles.radioButtonContainer}>
                {
                    rightArrow ?
                        <MaterialIcons name="keyboard-arrow-right" size={35} color="grey" /> //as review event tile
                        :
                        <RadioButton
                            selected={id == selected}
                        /> //as location type tile
                }
            </View>
        </TouchableOpacity>
    )
};

export default observer(Tile);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    iconContainer: {
        width: '10%',
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: '#ebecf0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    detailsContainer: {
        marginLeft: 10,
        flex: 1
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    desc: {
        marginTop: 3,
        color: 'grey',
        maxWidth: '90%'
    },
    radioButtonContainer: {
        flex: 0.1
    }
})