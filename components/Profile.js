import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import { TEST_USER } from "../test";

const Profile = ({ }) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(TEST_USER) //get user details from stored data
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={user.image} style={styles.image} />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.lightText}>Your profile</Text>
            </View>
        </View>
    )
};
export default Profile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    imageContainer: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    nameContainer: {
        marginLeft: 8
    },
    username: {
        fontWeight: '600',
        fontSize: 15
    },
    lightText: {
        color: 'grey',
    }
})