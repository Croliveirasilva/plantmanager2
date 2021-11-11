import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Animated,
} from 'react-native';

import {
    RectButton,
    RectButtonProps
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove:()=> void;
}
export const PlantCardSecundary = ({ data, handleRemove, ...rest }: PlantProps) => {
    return (
        <Swipeable
        overshootRight={false}
        renderRightActions={()=>(
            <Animated.View>
                <View>
                    <RectButton
                    style={styles.buttonremove}
                    onPress={handleRemove}
                    >
                        <Feather name="trash" size={32} color={Colors.white} />

                    </RectButton>
                </View>
            </Animated.View>
        )}
        >
            <RectButton
                style={styles.container}
                {...rest}>
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50} />

                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar as
            </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {

        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        backgroundColor: colors.shape,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    details: {
        alignItems: 'flex-end',

    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,


    },
    time: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
        marginTop: 5,

    },
    buttonremove:{
        width:100,
        height:85,
        backgroundColor: colors.red,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:20,
        paddingLeft:15


    }




})