import { observer } from "mobx-react";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { BLUE } from "../../constants/Colors";

export const NextButton = observer(({ disabled, onPress, screens, title }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.indicatorContainer]}>
                {
                    [1, 2, 3].map((item, i) => {
                        return (
                            <View
                                key={i}
                                style={[styles.indicator, { backgroundColor: screens.includes(item) ? BLUE : '#ebecf0' }]} />
                        )
                    })
                }
            </View>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[styles.buttonContainer, { backgroundColor: disabled ? '#ebecf0' : BLUE }]}>
                <Text style={[styles.buttonText, { color: disabled ? 'lightgrey' : '#fff' }]}>{title ? title : 'Next'}</Text>
            </TouchableOpacity>
        </View>
    )
})

export const SaveButton = observer(({ onPress, disabled }) => {
    return (
        <View style={[styles.container, { height: 70 }]}>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[styles.saveContainer, { backgroundColor: disabled ? '#ebecf0' : BLUE }]}>
                <Text style={[styles.buttonText, { color: disabled ? 'lightgrey' : '#fff' }]}>Save</Text>
            </TouchableOpacity>
        </View>
    )
})


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        height: 40,
        borderRadius: 5,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: '700'
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    indicator: {
        height: 7,
        width: '30%',
        borderRadius: 5,
    },
    saveContainer: {
        height: 40,
        borderRadius: 5,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})