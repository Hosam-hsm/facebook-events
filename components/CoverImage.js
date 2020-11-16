import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { observer } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/Store';

const CoverImage = ({ onClickEdit, changePhoto, setChangePhoto, removePhoto, setRemovePhoto }) => {
    const store = useStore()
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [addButtonCondition, setAddButtonCondition] = useState(true)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        setLoading(true)
        setRemovePhoto(false)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (!result.cancelled) {
            store.setCoverPhoto(result.base64)
            setImage(result.uri);
            setChangePhoto(false)
        }
        if (result.cancelled) {
            setLoading(false)
            setChangePhoto(false)
        }
    };

    useEffect(() => {
        if (changePhoto) pickImage()
    }, [changePhoto]) //changle photo using bottomsheet from parent

    useEffect(() => {
        removePhoto ? setImage(null) : null
    }, [removePhoto]) //remove photo using bottomsheet from parent

    useEffect(() => {
        if (!image && !loading) setAddButtonCondition(true)
        else setAddButtonCondition(false)
    }, [loading, image])

    useEffect(() => {

    }, [image])

    const editImage = () => {
        onClickEdit()
    }

    return (
        <View style={styles.container}>
            { addButtonCondition && <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={pickImage} >
                <MaterialIcons name="add-a-photo" size={24} color="black" />
                <Text style={styles.text}>Add Cover Photo</Text>
            </TouchableOpacity>}
            {
                (!changePhoto && loading) && <ActivityIndicator size={'large'} animating={true} color={'grey'} />
            }
            {image &&
                <View>
                    <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: 200 }}
                        onLoad={() => setLoading(false)}
                    />
                    <TouchableOpacity
                        style={styles.editButtonContainer}
                        onPress={editImage}>
                        <Ionicons name="ios-images" size={24} color="#fff" />
                        <Text style={[styles.text, { color: '#fff' }]}>Edit</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

export default observer(CoverImage);

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        backgroundColor: 'lightgrey',
        justifyContent: 'center'
    },
    addButtonContainer: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        marginHorizontal: '25%',
        backgroundColor: '#ebecf0',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        fontWeight: '600',
        marginLeft: 3
    },
    editButtonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1000,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
        paddingHorizontal: 8,
        justifyContent: 'space-evenly'
    }
})