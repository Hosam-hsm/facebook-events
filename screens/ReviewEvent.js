import { observer } from "mobx-react";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons';
import { BottomSheetComponent, CoverImage, NextButton, Tile } from "../components";
import { useStore } from "../store/Store";
import { TEST_USER } from '../test'
import { useNavigation } from "@react-navigation/native";

const ReviewEvent = ({ }) => {
    const store = useStore()
    const navigation = useNavigation()
    const [bottomSheetRef, setBottomSheetRef] = useState(null)
    const [changePhoto, setChangePhoto] = useState(false)
    const [removePhoto, setRemovePhoto] = useState(false)
    const formattedStartDate = moment(store.startDate, 'YYY-MM-DD').format('DD MMM');
    const formattedEndDate = moment(store.endDate, 'YYY-MM-DD').format('DD MMM');
    const formattedStartTime = moment(store.startTime).format('h:mm A');

    const TILES = store.eventType == "Online" ? [
        {
            "id": "0",
            "title": "Description",
            "desc": store.eventDetails?.desc ? store.eventDetails.desc : "Add a description.",
            "icon": "edit",
        },
        {
            "id": "1",
            "title": "Location",
            "desc": `${store.eventType} · ${store.getLocationType()}`,
            "icon": "link"
        },
    ] : [
            {
                "id": "0",
                "title": "Description",
                "desc": store.eventDetails?.desc ? store.eventDetails.desc : "Add a description.",
                "icon": "edit"
            },
            {
                "id": "1",
                "title": "Location",
                "desc": store.location ? store.location.address : null,
                "icon": "location-on"
            },
        ]

    const getDateAndTime = () => {
        if (store.addEndDate) {
            return `${formattedStartDate} - ${formattedEndDate}`
        }
        else {
            return `${formattedStartDate} at ${formattedStartTime}`
        }
    }

    const handleOnSelectTile = (id) => {
        switch (id) {
            case '0':
                navigation.navigate('EventDescription', { "edit": false });
                break;
            case '1':
                navigation.push('EventLocation', { "edit": true });
                break;
            default:
                break;
        }
    }

    const onClickEdit = () => {
        bottomSheetRef.current.snapTo(1)
    }

    const bottomSheetRefHandler = (sheetRef) => {
        setBottomSheetRef(sheetRef)
    }

    const changePhotoHandler = () => {
        setChangePhoto(true)
    }

    const removePhotoHandler = () => {
        store.clearCoverPhoto()
        setRemovePhoto(true)
    }

    const onPressCreate = () => {
        store.createEvent()
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                style={styles.container}>

                <CoverImage
                    changePhoto={changePhoto}
                    setChangePhoto={setChangePhoto}
                    removePhoto={removePhoto}
                    setRemovePhoto={setRemovePhoto}
                    onClickEdit={onClickEdit} />

                <View style={styles.eventDetailsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.push('EventDetails', { "edit": true })}
                    >
                        <Text style={styles.dateAndTime}>{getDateAndTime()}</Text>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <Text style={styles.title}>{store.eventDetails?.title}</Text>
                            <FontAwesome5 name="chevron-right" size={20} color="grey" />
                        </View>
                        <View style={styles.row}>
                            <Text>Hosted by </Text>
                            <Text style={styles.username} numberOfLines={1}>{TEST_USER.name}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        TILES.map(tile => {
                            const { title, id, icon, desc } = tile
                            return (
                                <Tile
                                    rightArrow
                                    key={id}
                                    id={id}
                                    title={title}
                                    icon={icon}
                                    desc={desc}
                                    handleOnSelectTile={handleOnSelectTile}
                                />)
                        })
                    }
                </View>
            </ScrollView>
            <NextButton
                title={'Create Event'}
                disabled={false}
                onPress={onPressCreate}
                screens={[1, 2, 3]}
            />
            <BottomSheetComponent
                bottomSheetRefHandler={bottomSheetRefHandler}
                containerStyle={styles.bottomSheetContainer}
            >
                <TouchableOpacity
                    onPress={changePhotoHandler}
                    style={styles.row}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="file-upload" size={24} color="black" />
                    </View>
                    <Text style={styles.bottomSheetText}>Upload photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={removePhotoHandler}
                    style={[styles.row, { marginTop: 15 }]}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </View>
                    <Text style={styles.bottomSheetText}>Remove photo</Text>
                </TouchableOpacity>
            </BottomSheetComponent>
        </>
    )
};
export default observer(ReviewEvent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventDetailsContainer: {
        padding: 15
    },
    dateAndTime: {
        color: 'red',
        textTransform: 'uppercase'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '75%'
    },
    username: {
        fontWeight: '600'
    },
    bottomSheetContainer: {
        padding: 15
    },
    iconContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#ebecf0'
    },
    bottomSheetText: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8
    }
})