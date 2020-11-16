import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
} from "react-native";
import { useStore } from "../store/Store";
import moment from 'moment'
import BottomSheetComponent from "./BottomSheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import FloatingTitlePlaceholder from "./FloatingTitlePlaceholder";
import { BORDERCOLOR } from "../../constants/Colors";
import { observer } from "mobx-react";

const AndroidDateTimePicker = ({ selected, bottomSheetRefHandler }) => {
    const store = useStore()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const formattedStartDate = moment(store.startDate, 'YYY-MM-DD').format('DD MMM');
    const formattedEndDate = moment(store.endDate, 'YYY-MM-DD').format('DD MMM');
    const formattedStartTime = moment(store.startTime).format('h:mm A');
    const formattedEndTime = moment(store.endTime).format('h:mm A');
    const offset = new Date().getTimezoneOffset() * -1

    const Header = (<View style={styles.header}>
        <Text style={styles.headerText}>{selected == 'START' ? 'Start Time' : 'End Time'}</Text>
    </View>)

    const onChange = (event, selectedDate) => {
        if (event.type == "set") {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
            mode == 'date' ? store.onChangeDate(currentDate.toJSON().substring(0, 10))
                :
                store.onChangeTime(date, currentDate.toJSON())
        } else {
            //cancel button clicked 
            setShow(Platform.OS === 'ios');
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        store.setSelected(selected)
    }, [selected])

    useEffect(() => {
        let date = selected == 'START' ? store.startDate : store.endDate
        let time = selected == 'START' ? store.startTime : store.endTime
        mode == 'date' ? setDate(new Date(date)) : setDate(new Date(time))
    }, [mode, selected, store.startDate, store.endDate]) //for changing initial date and time

    return (
        <BottomSheetComponent
            header={Header}
            bottomSheetRefHandler={bottomSheetRefHandler}
            containerStyle={styles.bottomSheetContainer}
        >
            {
                selected == 'START' ?
                    (<View style={{}}>
                        <FloatingTitlePlaceholder
                            focused
                            onPress={showDatepicker}
                            attrName='startDate'
                            title='Start date'
                            titleInActiveSize={14}
                            titleActiveSize={12}
                            value={`${formattedStartDate}`}
                            updateMasterState={() => { }}
                            containerStyles={styles.placeholderContainer}
                            arrowStyles={styles.arrowStyles}
                            textInputStyles={styles.placeholderFont}
                            titleInactiveColor={'grey'}
                            titleActiveColor={'grey'}
                        />
                        <FloatingTitlePlaceholder
                            focused
                            onPress={showTimepicker}
                            attrName='startTime'
                            title='Start Time'
                            titleInActiveSize={14}
                            titleActiveSize={12}
                            value={`${formattedStartTime}`}
                            updateMasterState={() => { }}
                            containerStyles={styles.placeholderContainer}
                            arrowStyles={styles.arrowStyles}
                            textInputStyles={styles.placeholderFont}
                            titleInactiveColor={'grey'}
                            titleActiveColor={'grey'}
                        />
                    </View>)
                    :
                    (<View style={{}}>
                        <FloatingTitlePlaceholder
                            focused
                            onPress={showDatepicker}
                            attrName='endDate'
                            title='End date'
                            titleInActiveSize={14}
                            titleActiveSize={12}
                            value={`${formattedEndDate}`}
                            updateMasterState={() => { }}
                            containerStyles={styles.placeholderContainer}
                            arrowStyles={styles.arrowStyles}
                            textInputStyles={styles.placeholderFont}
                            titleInactiveColor={'grey'}
                            titleActiveColor={'grey'}
                        />
                        <FloatingTitlePlaceholder
                            focused
                            onPress={showTimepicker}
                            attrName='endTime'
                            title='End Time'
                            titleInActiveSize={14}
                            titleActiveSize={12}
                            value={`${formattedEndTime}`}
                            updateMasterState={() => { }}
                            containerStyles={styles.placeholderContainer}
                            arrowStyles={styles.arrowStyles}
                            textInputStyles={styles.placeholderFont}
                            titleInactiveColor={'grey'}
                            titleActiveColor={'grey'}
                        />
                    </View>)
            }
            {show && (
                <DateTimePicker
                    timeZoneOffsetInMinutes={offset}
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}
        </BottomSheetComponent>
    )
};
export default observer(AndroidDateTimePicker);

const styles = StyleSheet.create({
    bottomSheetContainer: {
        padding: 15
    },
    header: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700'
    },
    placeholderContainer: {
        marginTop: 15,
        height: 60,
        borderColor: BORDERCOLOR
    },
    placeholderFont: {
        fontSize: 16,
        paddingHorizontal: 8
    },
    arrowStyles: {
        top: 15
    }
})