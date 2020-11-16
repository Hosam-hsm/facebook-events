import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { BORDERCOLOR } from "../../constants/Colors";
import { FloatingTitlePlaceholder, Tile, NextButton, SaveButton } from "../components";
import { useStore } from "../store/Store";

const GOOGLEAPIKEY = 'AIzaSyChumujpZ48KsRwA2R3ZEsTpsX1n7LzrN0' //should be an environment variable

const TILES = [
    {
        "id": "0",
        "title": "Messenger Rooms",
        "desc": "Get together in a video chat. People can join the room directly from the events page.",
        "icon": "video-call"
    },
    {
        "id": "1",
        "title": "Facebook Live",
        "desc": "Shedule a Facebook Live for your event so that people can watch.",
        "icon": "videocam"
    },
    {
        "id": "2",
        "title": "External link",
        "desc": "Add a link so that people know where to go when your event starts.",
        "icon": "link"
    },
    {
        "id": "3",
        "title": "Other",
        "desc": "Include clear instructions in your event details on how to participate.",
        "icon": "more-horiz"
    },
]

const EventLocation = ({ route }) => {
    const { edit } = route.params
    const store = useStore()
    const [selectedTile, setSelectedTile] = useState(store.locationType ? store.locationType : "0")
    const [getLink, setGetLink] = useState(false)
    const [link, setLink] = useState(null)
    const [valid, setValid] = useState(true)
    const [location, setLocation] = useState(null)
    const navigation = useNavigation()

    const updateMasterState = (attrName, value) => {
        setValid(true)
        setLink(value)
    }

    const onSubmit = () => {
        let valid = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(link);
        if (valid) {
            setValid(true)
        }
        else {
            setValid(false)
        }
    }

    const handleOnSelectTile = (id) => {
        if (id == '2') {
            setGetLink(true)
            setSelectedTile(id)
        }
        else {
            setLink(null)
            setGetLink(false)
            setValid(true)
            setSelectedTile(id)
        }
    }

    const onPressNext = () => {
        if (link) store.setLink(link)
        if (location) store.setLocation(location)
        store.setLocationType(selectedTile)
        if (valid) navigation.navigate('ReviewEvent')
    }

    return (
        <>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={{ paddingBottom: 120 }}
                style={styles.container}>
                <Text style={styles.title}>Location</Text>
                <Text style={styles.lightText}>{store.eventType == 'Online' ?
                    'Choose a way for people to join your event online.'
                    :
                    'Add a physical location for people to join your event.'
                }</Text>
                {
                    store.eventType == 'Online' ?
                        (
                            <View style={styles.tilesContainer}>
                                {
                                    TILES.map(tile => {
                                        const { title, id, icon, desc } = tile
                                        let condition = id == '2' && getLink
                                        return (
                                            <View key={id}>
                                                <Tile
                                                    id={id}
                                                    title={title}
                                                    icon={icon}
                                                    desc={desc}
                                                    selected={selectedTile}
                                                    handleOnSelectTile={handleOnSelectTile}
                                                />
                                                { //for entering link
                                                    condition &&
                                                    <View style={{}}>
                                                        <FloatingTitlePlaceholder
                                                            attrName='link'
                                                            title='Link URL'
                                                            titleInActiveSize={14}
                                                            titleActiveSize={12}
                                                            value={link}
                                                            onSubmit={onSubmit}
                                                            updateMasterState={updateMasterState}
                                                            containerStyles={[styles.placeholderContainer, { borderColor: !valid ? 'red' : BORDERCOLOR }]}
                                                            textInputStyles={styles.placeholderFont}
                                                            titleInactiveColor={'grey'}
                                                            titleActiveColor={'grey'}
                                                        />
                                                        {!valid && <Text style={{ color: 'red' }}>Invalid URL</Text>}
                                                    </View>
                                                }
                                            </View>
                                        )
                                    })}
                            </View>
                        ) :
                        (
                            <View>
                                <GooglePlacesAutocomplete
                                    fetchDetails
                                    placeholder={store.location ? store.location.address : 'Location'}
                                    onPress={(data, details = null) => {
                                        let location = {
                                            address: details.formatted_address,
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        }
                                        setLocation(location)
                                    }}
                                    query={{
                                        key: GOOGLEAPIKEY,
                                        language: 'en',
                                    }}
                                    styles={{
                                        textInput: styles.locationPlaceholder,
                                        listView: { marginHorizontal: 10 }
                                    }}
                                />
                                <Text style={styles.lightText}>Optional</Text>
                            </View>
                        )
                }
            </KeyboardAwareScrollView>
            {
                edit ?
                    <SaveButton
                        disabled={(selectedTile == '2') ? !link ? true : false : false}
                        onPress={onPressNext} />
                    :
                    <NextButton
                        disabled={(selectedTile == '2') ? !link ? true : false : false}
                        onPress={onPressNext}
                        screens={[1, 2]} />
            }
        </>
    )
};
export default EventLocation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    lightText: {
        color: 'grey',
        marginTop: 8,
        fontSize: 16
    },
    tilesContainer: {
        marginTop: 15
    },
    getLinkContainer: {
        padding: 15
    },
    placeholderContainer: {
        marginTop: 15,
        height: 65,
    },
    placeholderFont: {
        fontSize: 16,
        paddingHorizontal: 8
    },
    locationPlaceholder: {
        padding: 10,
        borderWidth: 1,
        borderColor: BORDERCOLOR,
        borderRadius: 10,
        marginTop: 15
    }
})