import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

import { styles } from '../styles/styles';

export default class TopMenu extends React.Component {

    state = {
        title: '',
    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { title } = this.props;
        this.setState({ title });
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const video_resumen = this.props.video_resumen;

        // Preparamos los dos botones centrales
        const centerButtonVideo = (
            <View style={styles.topMenuItem}>
                <TouchableOpacity
                    onPress={() => navigate('Player', { video_resumen, title: this.state.title })}
                >
                    <Icon name="videocam" color="white" />
                </TouchableOpacity>
            </View>
        );
        const centerButtonDetail = (
            <View style={styles.topMenuItem}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon name="event-note" color="white" />
                </TouchableOpacity>
            </View>
        );

        // Decidimos qué botón central mostrar
        // Tres opciones:
        // 1. Botón del vídeo,
        // 2. botón del detalle o
        // 3. nada (si ya estamos en el detalle y no hay vídeo)
        const centerButton = video_resumen === "GOBACK" ?
            centerButtonDetail :
            video_resumen ?
                centerButtonVideo :
                null;

        return (
            <View>
            <View style={styles.topMenuBox}>
                <View style={styles.topMenuItem}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon name="arrow-back" color="white" />
                    </TouchableOpacity>
                </View>
                {centerButton}
                <View style={styles.topMenuItem}>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Icon name="home" color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.topMenuTitle}>
                <Text style={styles.topMenuTitleText}>{this.state.title}</Text>
            </View>
            </View>
        );
    }
}