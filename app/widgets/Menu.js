import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/db';
import { styles } from '../styles/styles';

export class Menu extends React.Component {

    state = {
        days: [],
        loading: true,
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const days = [];  // Variable provisional para los días. Acabará en state
        const coll = collection(db, "data");
        const q = query(coll, orderBy("numero_dia"));
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    days.push({ key: doc.id, value: doc.data() });
                });
            })
            .then(() => {
                this.setState({ days, loading: false });
            })
    }

    renderItem = data => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.dayButton}>
                <TouchableOpacity
                    onPress={() => navigate('Detail', { ...data.item.value })}
                >
                    <Text style={styles.dayButtonText}>
                        {data.item.value.numero_dia} {data.item.value.ciudad}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.days}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.key}
                />
            </View>
        );

    }
}