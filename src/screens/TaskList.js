import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

//Importa imagem para o topo
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

    render() {
        /**Obtem a data atual e formata como ex: segunda, 3 de Janeiro */
        const today = moment().local('pt-br').format('ddd,D [de] MMMM')

        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text>Hoje</Text>
                        <Text>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <Text>TaskList</Text>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background: {
        flex: 3
    },

    taskContainer: {
        flex: 7
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    


})