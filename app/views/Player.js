import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Video, ResizeMode } from 'expo-av';
import { Icon } from '@rneui/themed';

import TopMenu from '../widgets/TopMenu';
import { styles } from '../styles/styles';

export class Player extends React.Component {

    state = {
        video_resumen: '',
        videoPath: '',
        status: 'loading',
        title: '',
    };
    playbackObject = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { video_resumen, title } = this.props.route.params;
        this.setState({ video_resumen, title });

        if (video_resumen && video_resumen !== 'GOBACK') {
            // Obtenemos de firebase la URL completa del vídeo
            const storage = getStorage();
            const storageRef = ref(storage, video_resumen);
            getDownloadURL(storageRef)
                .then(url => {
                    this.setState({ videoPath: url });
                })
                .then(() => {
                    this.setState({ status: 'ready' });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ status: 'no-video' });
                });

        } else {
            this.setState({ status: 'no-video' });
        }
    }

    handleVideoRef = component => {
        this.playbackObject = component;
    }

    handleVideo = status => {
        if (this.playbackObject) {
            this.playbackObject.setStatusAsync(status);
        }
    }

    handleFullScreen = () => {
        if (this.playbackObject) {
            this.playbackObject.presentFullscreenPlayer();
        }
    }

    render() {

        if (this.state.status === 'loading') {
            return (
                <View style={styles.container}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" />
                    </View>

                </View>
            );
        }

        if (this.state.status === 'no-video') {
            return (
                <View style={styles.container}>
                    <TopMenu navigation={this.props.navigation}
                        video_resumen='GOBACK'
                        title={this.state.title}
                    />
                    <View style={styles.loader}>
                        <Text style={styles.notFoundText}>
                            No se ha encontrado el vídeo.
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <TopMenu navigation={this.props.navigation}
                    video_resumen='GOBACK'
                    title={this.state.title}
                />
                <View style={styles.videoBox}>
                    <Video
                        ref={this.handleVideoRef}
                        style={styles.video}
                        source={{ uri: this.state.videoPath }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                    />
                </View>
                <View style={styles.playerButtonsBox}>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleVideo({shouldPlay: true})}>
                            <Icon name="play-circle-fill" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleVideo({shouldPlay: false})}>
                            <Icon name="pause-circle-filled" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleVideo({isMuted: true})}>
                            <Icon name="volume-off" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleVideo({isMuted: false})}>
                            <Icon name="volume-up" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleVideo({positionMillis: 0})}>
                            <Icon name="loop" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButton}>
                        <TouchableOpacity onPress={() => this.handleFullScreen()}>
                            <Icon name="fullscreen" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}