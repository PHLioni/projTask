import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native'

//Importa imagem para o topo
import todayImage from '../../assets/imgs/today.jpg'

import commonStyles from '../commonStyles'
import Task from '../components/Task'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro',
            estimateAt: new Date(),
            doneAt: new Date()

        },
        {
            id: Math.random(),
            desc: 'Ler Livro',
            estimateAt: new Date(),
            doneAt: null

        }]
    }

    render() {
        /**Obtem a data atual e formata como ex: segunda, 3 de Janeiro */
        const today = moment().local('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item}/>}
                    />

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
        flex: 7,
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }



})