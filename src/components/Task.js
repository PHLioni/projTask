// Caso o componente não tenha estado, utilizar um componente funcional 
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {
    //Se a tarefa estive concluida mostra o texto com uma linha
    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}

    const dateAgendado =  props.estimateAt
    const dateFim = props.doneAt

    const formattedDateAgendado = moment(dateAgendado).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const formattedDateFinalizado = props.doneAt ? moment(dateFim).locale('pt-br')
        .format('ddd, D [de] MMMM') : ""

    return (
        //O Componente Texto recebe uma propriedade vinda do TaskList
        <View style={styles.container}>
            <TouchableWithoutFeedback
                //Funcao callback passando como parametro para o TaskList(Pai) o id da task recebida
                onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>Estimado: {formattedDateAgendado}</Text>
                {props.doneAt ? <Text style={styles.date}>Finalizado: {formattedDateFinalizado}</Text> : <Text></Text>}
            </View>
        </View>
    )
}

//Funcao que vai criar o icone de concluido ou não da tarefa
function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    }

})