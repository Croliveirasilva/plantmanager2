import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    FlatList


} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import { PlantProps, loadPlant, removePlant } from '../libs/storage';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';


export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    function handleRemove(plant: PlantProps) {

        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😲',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);

                        setMyPlants((olddData) =>
                            olddData.filter((item) => item.id != plant.id)
                        );

                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😲')

                    }

                }
            }

        ])

    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }

            );
            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
            )
            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    }, [])

    if (loading)
        return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <View style={styles.spotLight}>
                    <Image
                        source={waterdrop}
                        style={styles.spotLightImage} />
                    <Text style={styles.spotLightText}>
                        {nextWaterd}

                    </Text>
                </View>

            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas

        </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecundary
                            data={item}
                            handleRemove={() => { handleRemove(item) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                //contentContainerStyle={{flex:1}}

                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        //alignItems:'center',
        //justifyContent:'space-between',
        //paddingHorizontal:30,
        //paddingTop:50,
    },
    header: {
        paddingHorizontal: 30,
    },


    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,


    },
    spotLightImage: {
        width: 60,
        height: 60,

    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,


    },
    plants: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 30,

    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20


    },


})