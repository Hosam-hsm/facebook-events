import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    View,
} from "react-native";
import moment from "moment";
import { BLUE, BORDERCOLOR } from "../../constants/Colors";
import { AndroidDateTimePicker, FloatingTitlePlaceholder, NextButton, Profile, SaveButton, TextButton } from "../components";
import { useStore } from "../store/Store";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";

const EventDetails = ({ route }) => {
    const { edit } = route.params
    const store = useStore()
    const [selected, setSelected] = useState('START')
    const [bottomSheetRef, setBottomSheetRef] = useState(null)
    const [eventName, setEventName] = useState(store.eventDetails?.title ? store.eventDetails.title : null)
    const navigation = useNavigation()
    const formattedStartDate = moment(store.startDate, 'YYY-MM-DD').format('DD MMM');
    const formattedEndDate = moment(store.endDate, 'YYY-MM-DD').format('DD MMM');
    const formattedStartTime = moment(store.startTime).format('h:mm A');
    const formattedEndTime = moment(store.endTime).format('h:mm A');

    const updateMasterState = (attrName, value) => {
        setEventName(value)
    }

    const onPressNext = () => {
        let eventDetails = store.addEndDate ? {
            "title": eventName,
            "startDate": moment(store.startDate, 'YYY-MM-DD').format('DD MMM YY'),
            "startTime": formattedStartTime,
            "endDate": moment(store.endDate, 'YYY-MM-DD').format('DD MMM YY'),
            "endTime": formattedEndTime
        } : {
                "title": eventName,
                "startDate": moment(store.startDate, 'YYY-MM-DD').format('DD MMM YY'),
                "startTime": formattedStartTime,
            }
        store.setEventDetails(eventDetails)
        edit ? navigation.goBack() : navigation.navigate('EventLocation', { "edit": false })
    }

    const onPressStart = () => {
        setSelected('START')
        Platform.OS == 'ios' ? navigation.navigate('DateTimePicker') : openAndroidPicker()
    }

    const onPressEnd = () => {
        setSelected('END')
        Platform.OS == 'ios' ? navigation.navigate('DateTimePicker') : openAndroidPicker()
    }

    const openAndroidPicker = () => {
        bottomSheetRef.current.snapTo(1)
    }

    const bottomSheetRefHandler = (sheetRef) => {
        setBottomSheetRef(sheetRef)
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Event details</Text>
                <Profile />
                <FloatingTitlePlaceholder
                    attrName='eventName'
                    title='Event Name'
                    titleInActiveSize={14}
                    titleActiveSize={12}
                    value={eventName}
                    updateMasterState={updateMasterState}
                    containerStyles={styles.placeholderContainer}
                    textInputStyles={styles.placeholderFont}
                    titleInactiveColor={'grey'}
                    titleActiveColor={'grey'}
                />
                <FloatingTitlePlaceholder
                    focused
                    onPress={onPressStart}
                    attrName='start'
                    title='Start Date and Time'
                    titleInActiveSize={14}
                    titleActiveSize={12}
                    value={`${formattedStartDate} at ${formattedStartTime}`}
                    updateMasterState={() => { }}
                    containerStyles={styles.placeholderContainer}
                    arrowStyles={styles.arrowStyles}
                    textInputStyles={styles.placeholderFont}
                    titleInactiveColor={'grey'}
                    titleActiveColor={'grey'}
                />
                {
                    store.addEndDate ? (
                        <View>
                            <FloatingTitlePlaceholder
                                focused
                                onPress={onPressEnd}
                                attrName='end'
                                title='End Date and Time'
                                titleInActiveSize={14}
                                titleActiveSize={12}
                                value={`${formattedEndDate} at ${formattedEndTime}`}
                                updateMasterState={() => { }}
                                containerStyles={styles.placeholderContainer}
                                arrowStyles={styles.arrowStyles}
                                textInputStyles={styles.placeholderFont}
                                titleInactiveColor={'grey'}
                                titleActiveColor={'grey'}
                            />
                            <TextButton
                                onPress={() => store.toggleAddLastDate()}
                                text={'- End Date and Time'}
                                color={BLUE} />
                        </View>
                    ) :
                        Platform.OS == 'android' ? (
                            <TextButton
                                onPress={() => store.toggleAddLastDate()}
                                text={'+ End Date and Time'}
                                color={BLUE} />
                        )
                            : null
                }
            </ScrollView>
            {
                edit ?
                    <SaveButton
                        onPress={onPressNext}
                        disabled={eventName ? false : true}
                    />
                    :
                    <NextButton
                        disabled={eventName ? false : true}
                        onPress={onPressNext}
                        screens={[1]}
                    />
            }
            <AndroidDateTimePicker
                selected={selected}
                bottomSheetRefHandler={bottomSheetRefHandler}
            />
        </>
    )
};
export default observer(EventDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    placeholderContainer: {
        marginTop: 15,
        height: 65,
        borderColor: BORDERCOLOR
    },
    placeholderFont: {
        fontSize: 16,
        paddingHorizontal: 8
    },
    arrowStyles: {
        top: 18
    }
})