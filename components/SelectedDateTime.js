import { observer } from "mobx-react";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';
import { useStore } from "../store/Store";
import { BLUE, BORDERCOLOR } from '../../constants/Colors'

const SelectedDateTime = ({ }) => {
    const store = useStore()
    const formattedStartDate = moment(store.startDate, 'YYY-MM-DD').format('DD MMM');
    const formattedEndDate = moment(store.endDate, 'YYY-MM-DD').format('DD MMM');
    const formattedStartTime = moment(store.startTime).format('h:mm A');
    const formattedEndTime = moment(store.endTime).format('h:mm A');

    const onPress = (i) => {
        store.setSelected(i)
    } //to select start date or end date.

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onPress('START')}
                style={styles.row}>
                <Text style={{ color: store.selected == 'START' ? BLUE : 'grey', fontWeight: 'bold' }}>{formattedStartDate} at {formattedStartTime}</Text>
                <TouchableOpacity
                    style={styles.addEndDateButton}
                    activeOpacity={0.8}
                    onPress={() => store.toggleAddLastDate()}
                >
                    {
                        !store.addEndDate && <Text style={{ color: 'grey' }}>+ End Time</Text>
                    }
                </TouchableOpacity>
            </TouchableOpacity>

            {
                store.addEndDate && (
                    <TouchableOpacity
                        onPress={() => onPress('END')}
                        style={styles.row}>
                        <Text style={{ color: store.selected == 'END' ? BLUE : 'grey', fontWeight: 'bold' }}>Ends {formattedEndDate} at {formattedEndTime}</Text>
                        <TouchableOpacity
                            style={styles.addEndDateButton}
                            activeOpacity={0.8}
                            onPress={() => store.toggleAddLastDate()}
                        >
                            <Ionicons name="ios-close" size={30} color="grey" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            }
        </View>
    )
};
export default observer(SelectedDateTime);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: BORDERCOLOR
    },
    addEndDateButton: {
        padding: 8,

    }
})