import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { View, Animated, StyleSheet, TextInput, LogBox, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingTitlePlaceholder = ({
    focused,
    onPress,
    onSubmit,
    arrowStyles,
    value,
    title,
    multiline,
    updateMasterState,
    attrName,
    keyboardType,
    containerStyles,
    textInputStyles,
    titleActiveColor,
    titleInactiveColor,
    titleActiveSize,
    titleInActiveSize,
    otherTextInputProps
}) => {

    LogBox.ignoreAllLogs() //for disabling usenativedriver warning

    const [isFieldActive, setIsFieldActive] = useState(false)
    const position = useRef(new Animated.Value(value ? 1 : 0)).current

    const handleFocus = () => {
        if (!isFieldActive) {
            setIsFieldActive(true)
            Animated.timing(position, {
                toValue: 1,
                duration: 150,
            }).start();
        }
    }

    const handleBlur = () => {
        if (isFieldActive && !value) {
            setIsFieldActive(false)
            Animated.timing(position, {
                toValue: 0,
                duration: 150,
            }).start();
        }
    }

    const onChangeText = (updatedValue) => {
        updateMasterState(attrName, updatedValue);
    }

    const returnAnimatedTitleStyles = () => {
        return {
            top: position.interpolate({
                inputRange: [0, 1],
                outputRange: [22, 8],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
        }
    }

    return (
        <TouchableOpacity
            onPress={onPress ? onPress : null}
            style={[styles.container, containerStyles]}>
            <Animated.Text
                style={[styles.titleStyles, returnAnimatedTitleStyles()]}
            >
                {title}
            </Animated.Text>
            <TextInput
                autoFocus={focused}
                editable={focused ? false : true}
                value={value}
                multiline={multiline}
                style={[styles.textInput, textInputStyles]}
                underlineColorAndroid='transparent'
                onFocus={handleFocus}
                onSubmitEditing={onSubmit}
                onBlur={handleBlur}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                {...otherTextInputProps}
            />
            {
                focused && <View style={[styles.arrowDown, arrowStyles]}>
                    <Ionicons name={'ios-arrow-down'} size={28} color="grey" />
                </View>
            }
        </TouchableOpacity>
    )
}

export default observer(FloatingTitlePlaceholder);
const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        marginVertical: 4,
    },
    textInput: {
        fontSize: 15,
        marginTop: 30,
        color: 'black',
    },
    titleStyles: {
        position: 'absolute',
        left: 8,
    },
    arrowDown: {
        position: 'absolute',
        right: 8,
    }
})