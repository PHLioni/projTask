import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'

//Importa imagem para o topo
import todayImage from '../../assets/imgs/today.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from './AddTask'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        showAddTask: true,
        //Quando o showDone estiver True todas as tasks são inseridas no visible task
        //Quando false mostra apenas as pendentes
        visibleTasks: [],
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

    //chama a funcao assim que o componente for montado
    componentDidMount = () => {
        this.filterTasks()
    }

    //Alterna a visualização do icone eye, negando o estado atual.
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    //Alterna a visulização das tasks
    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            // Verifica se uma task esta pendente, sem a data de conclusao(doneAt)
            const pending = task => task.doneAt === null
            // pega apenas as tasks que não estão concluidas
            visibleTasks = this.state.tasks.filter(pending)

        }
        this.setState({ visibleTasks })
    }

    //Alterna o icone da taks para concluida ou não 
    toggleTask = taskId => {
        // Cria um array com todos os elementos das tasks, copia do array tasks
        const tasks = [...this.state.tasks]
        //Percorre cada elemento
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        /**Obtem a data atual e formata como ex: segunda, 3 de Janeiro */
        const today = moment().local('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                style={styles.eyeFilter}
                                size={20}
                                color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 45 : 10
    },




})