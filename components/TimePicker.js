import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { observer } from "mobx-react";
import { useStore } from "../store/Store";

const TimePicker = ({ }) => {
    const store = useStore()
    const [time, setTime] = useState(new Date());
    const offset = new Date().getTimezoneOffset() * -1

    const onChange = (event, selectedTime) => {
        store.onChangeTime(time, selectedTime)
    };

    useEffect(() => {
        store.selected == 'START' ? setTime(store.startTime) : setTime(store.endTime)
    }, [store.selected, store.startTime, store.endTime])

    return (
        <DateTimePicker
            timeZoneOffsetInMinutes={offset}
            value={time}
            mode={'time'}
            is24Hour={true}
            display='default'
            onChange={onChange}
        />
    )
};
export default observer(TimePicker);
