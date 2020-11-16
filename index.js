import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateEvent, DateTimePickerScreen, EventDescription, EventDetails, EventLocation, ReviewEvent } from './screens';
import Store, { StoreProvider } from './store/Store';
import { ArrowBack, TextButton } from './components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { BLUE } from '../constants/Colors';
import { Alert } from 'react-native';

const store = new Store()
const Stack = createStackNavigator();

const CancelAlert = (navigation) => {
    return (Alert.alert(
        "Exit without finishing?",
        "If you leave now, your event won't be created and your progress won't be saved.",
        [
            { text: "Continue Editing", onPress: () => null, style: "cancel" },
            {
                text: "Exit",
                onPress: () => {
                    store.resetAll()
                    navigation.dispatch(StackActions.popToTop());
                },
            }
        ],
        { cancelable: false }
    ))
}

const EventsNavigator = () => {
    const navigation = useNavigation()
    return (
        <StoreProvider store={store}>
            <Stack.Navigator>
                <Stack.Screen name="EventType"
                    options={{
                        headerTitle: '',
                        headerLeft: (props) => { },
                        headerRight: () => <TextButton color={'#000'} text={'Cancel'} onPress={() => { }} />
                    }}
                    component={CreateEvent} />
                <Stack.Screen name="EventDetails"
                    options={({ route }) => ({
                        headerTitle: '',
                        headerLeft: (props) => <ArrowBack {...props} />,
                        headerRight: () => route.params.edit ? null : <TextButton color={'#000'} text={'Cancel'} onPress={() => CancelAlert(navigation)} />
                    })}
                    component={EventDetails} />
                <Stack.Screen name="DateTimePicker"
                    options={{
                        headerTitle: 'Date and Time',
                        headerLeft: () => { },
                        headerRight: () => <TextButton color={BLUE} text={'OK'} onPress={() => navigation.navigate('EventDetails')} />
                    }}
                    component={DateTimePickerScreen} />
                <Stack.Screen name="EventLocation"
                    options={({ route }) => ({
                        headerTitle: '',
                        headerLeft: (props) => <ArrowBack {...props} />,
                        headerRight: () => route.params.edit ? null : <TextButton color={'#000'} text={'Cancel'} onPress={() => CancelAlert(navigation)} />
                    })}
                    component={EventLocation} />
                <Stack.Screen name="ReviewEvent"
                    options={{
                        headerTitle: 'Review Event',
                        headerLeft: (props) => <ArrowBack {...props} />,
                        headerRight: () => <TextButton color={'#000'} text={'Cancel'} onPress={() => CancelAlert(navigation)} />
                    }}
                    component={ReviewEvent} />
                <Stack.Screen name="EventDescription"
                    options={{
                        headerTitle: '',
                        headerLeft: (props) => <ArrowBack {...props} />,
                    }}
                    component={EventDescription} />
            </Stack.Navigator>
        </StoreProvider>
    );
}

export default EventsNavigator;