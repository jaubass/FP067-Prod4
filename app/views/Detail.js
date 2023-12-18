import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import TopMenu from '../widgets/TopMenu';

export class Detail extends React.Component {

    constructor(props) {
        super(props);
    }

    renderActivity = data => {
        return (
            <View style={styles.activity}>
                <Text style={styles.activityText}>• {data.item}</Text>
            </View>
        );
    }

    render() {

        const day = this.props.route.params;

        return (
            <View style={styles.container}>
                <TopMenu navigation={this.props.navigation}
                    video_resumen={day.video_resumen}
                    title={`Día ${day.numero_dia}. ${day.ciudad}`}
                />
                <View style={styles.bodyDetail}>
                    <View style={styles.detailLine}>
                        <Text style={styles.lineKey}>Alojamiento</Text>
                        <Text style={styles.lineValue}>{day.alojamiento}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.lineKey}>Descripcion</Text>
                        <Text style={styles.lineValue}>{day.descripcion}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.lineKey}>Valoracion</Text>
                        <Text style={styles.lineValue}>{day.valoracion}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                        <Text style={styles.detailBlockKey}>Actividades</Text>
                        <FlatList
                            data={day.actividades}
                            renderItem={this.renderActivity}
                            keyExtractor={item => item}
                        />
                    </View>
                </View>
            </View>
        );
    }
}