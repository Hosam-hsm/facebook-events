import React, { useState, useEffect } from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import { useStore } from '../store/Store';
import { observer } from 'mobx-react';
import { BLUE } from '../../constants/Colors';

const Calendar = () => {
    const [selected, setSelected] = useState();
    const [markedDates, setMarkedDates] = useState({})
    const store = useStore()

    const onDayPress = (day) => {
        store.onChangeDate(day.dateString)
    };

    useEffect(() => {
        let date = store.selected == 'START' ? store.startDate : store.endDate
        setSelected(date)
    }, [store.selected, store.startDate, store.endDate]) //for changing selection marker 

    useEffect(() => {
        let marked = store.getMarkedDates()
        store.addEndDate ? setMarkedDates(marked) : setMarkedDates({})
    }, [store.addEndDate, store.startDate, store.endDate]) //for getting dates in between start and end date

    return (
        <CalendarList
            hideExtraDays
            pastScrollRange={0}
            minDate={moment().format("YYYY-MM-DD")} //disable previous dates
            futureScrollRange={12}
            scrollEnabled={true}
            showScrollIndicator={false}
            disabledDaysIndexes={[0, 6]}
            onDayPress={onDayPress}
            markedDates={{ ...markedDates, [selected]: { selected: true, marked: true, selectedColor: BLUE } }}
        />
    );
};

export default observer(Calendar);
