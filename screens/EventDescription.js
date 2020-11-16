import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { BORDERCOLOR } from "../../constants/Colors";
import { FloatingTitlePlaceholder, SaveButton } from "../components";
import { useStore } from "../store/Store";

const EventDescription = ({ route }) => {
    const store = useStore()
    const navigation = useNavigation()
    const [description, setDescription] = useState(store.eventDetails?.desc ? store.eventDetails.desc : null)

    const updateMasterState = (attrName, value) => {
        setDescription(value)
    }

    const onPressSave = () => {
        store.setDescription(description)
        navigation.goBack()
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.lightText}>Provide more infromation about your event so that guests know what to expect.</Text>
                <FloatingTitlePlaceholder
                    multiline
                    attrName='eventDescription'
                    title='Description'
                    titleInActiveSize={14}
                    titleActiveSize={14}
                    value={description}
                    updateMasterState={updateMasterState}
                    containerStyles={styles.placeholderContainer}
                    textInputStyles={styles.placeholder}
                    titleInactiveColor={'grey'}
                    titleActiveColor={'grey'}
                />
            </ScrollView>
            <SaveButton
                onPress={onPressSave}
            />
        </>
    )
};
export default observer(EventDescription);

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
    lightText: {
        color: 'grey',
        fontSize: 16,
        marginTop: 8
    },
    placeholderContainer: {
        marginTop: 15,
        height: 150,
        borderColor: BORDERCOLOR
    },
    placeholder: {
        fontSize: 16,
        paddingHorizontal: 8,
        height: 100,
    }
})