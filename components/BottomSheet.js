import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    Dimensions,
} from "react-native";
import BottomSheet from 'react-native-bottomsheet-reanimated';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
const snapPoints = [0, Screen.height / 2, '70%', '100%'];

const BottomSheetComponent = ({ children, bottomSheetRefHandler, containerStyle, header }) => {
    const sheetRef = useRef()

    useEffect(() => {
        bottomSheetRefHandler(sheetRef)
    }, [])

    return (
        <BottomSheet
            bottomSheerColor="#FFFFFF"
            ref={sheetRef}
            initialPosition={0}
            snapPoints={snapPoints}
            isBackDrop={true}
            isBackDropDismissByPress={true}
            isRoundBorderWithTipHeader={true}
            // isModal
            containerStyle={[{ backgroundColor: "#fff" }, containerStyle]}
            header={header}
            body={children}
        />
    )
};
export default observer(BottomSheetComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})