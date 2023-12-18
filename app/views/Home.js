import React from 'react';
import { Text, View } from 'react-native';
import { Menu } from '../widgets/Menu';
import { styles } from '../styles/styles';

export class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pageTitle}>
                    <Text style={styles.pagesubtitleText}>Code 067</Text>
                    <Text style={styles.pageTitleText}>MI VIAJE</Text>
                </View>
                <Menu navigation={this.props.navigation} />
            </View>
        );
    }
}