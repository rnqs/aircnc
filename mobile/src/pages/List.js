import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, View, Text, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://localhost:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    async function LogOut() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
                <View style={styles.space} />
                <TouchableOpacity onPress={LogOut} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cancelButton: {
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    space: {
        width: 20,
        height: 20,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});