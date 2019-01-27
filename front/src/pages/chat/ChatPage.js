import React, { Component } from 'react';
import {
    View,
    Text,
    YellowBox,
    AsyncStorage,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    Keyboard,
    FlatList,
    Image
} from 'react-native';
import io from 'socket.io-client';
import moment from 'moment'
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import styles from './styles';

export default class ChatPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Chat Room',
        headerTitleStyle: {

        },
        headerRight: (
            <TouchableWithoutFeedback onPress={navigation.getParam('onLogout')}>
                <View style={styles.headerLogoutContainer}>
                    <Text style={styles.headerLogoutText}>Logout</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    });

    flatListRef;

    constructor(props) {
        super(props);

        this.state = {
            typing: '',
            usersCount: 0,
            messages: [],
            username: {}
        }
    };

    async componentDidMount() {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
            const username = { name, userId, image } = JSON.parse(userJson);
            this.setState({ username });
            this.socket = io('http://192.168.1.5:3000');
            await this.initializeHandlers();

            this.socket.emit('join', {
                username
            });
            this.props.navigation.setParams({ onLogout: this.onLogout })
        }
    }

    componentWillUnmount() {
        this.socket.off('newMessage');
        this.socket.off('userCountChange');
        this.socket.off('userJoinLeft');
        this.socket.disconnect();
    }

    initializeHandlers = () => {
        this.socket.on('newMessage', this.onNewMessage);
        this.socket.on('userCountChange', this.onUserCountChange);
        this.socket.on('userJoinLeft', this.onUserJoinOrLeft)
    }

    onLogout = async () => {
        await AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Auth');
    }

    onNewMessage = ({ sender, message, sendedAt }) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, {
                sender,
                message,
                sendedAt
            }]
        }), () => setTimeout(() => this.flatListRef.scrollToEnd({ animated: false }), 100));
    }

    onUserCountChange = (usersCount) => {
        this.setState({ usersCount });
    }

    onUserJoinOrLeft = ({ username, action }) => {
        const { name } = username;
        this.setState(prevState => ({
            messages: [...prevState.messages, {
                name,
                action,
                isJoinOrLeft: true
            }]
        }), () => setTimeout(() => this.flatListRef.scrollToEnd({ animated: false }), 100));
    }

    sendMessage = async () => {
        Keyboard.dismiss();
        if (this.state.typing.length > 0) {
            const sender = { userId, name, image } = this.state.username;
            const payload = {
                sender,
                message: this.state.typing,
            };
            await this.socket.emit('sendMessage', { payload });
            this.setState({ typing: '' });
        }
    }

    renderChatMessage = ({ item }) => {
        const isFromMe = this.isFromMe(item);
        return (
            <View>
                <View style={styles.messageContainer}>
                    {item.isJoinOrLeft && (
                        <Text style={{ alignSelf: 'center' }}>{item.name} {item.action === 'join' ? 'Joined' : 'Left'} </Text>
                    )}
                    {!item.isJoinOrLeft && (
                        <View style={
                            isFromMe
                                ? [styles.alignItemsEnd, styles.messageBoxContainer]
                                : [styles.alignItemsStart, styles.messageBoxContainer]

                        }>
                            <View style={isFromMe ? styles.avatarAndTextInline : styles.avatarAndTextInlineReverse}>
                                <View style={
                                    isFromMe ? styles.ownMessageContainer : styles.foreignMessageContainer
                                }>
                                    <Text
                                        style={isFromMe ? styles.ownMessageText : styles.foreignMessageText}
                                    >
                                        {item.message}
                                    </Text>
                                </View>
                                <Image style={styles.avatarImg} source={item.sender.image} />
                            </View>
                            <Text style={styles.userText}>{isFromMe ? (
                                `${moment(item.sendedAt, 'YYYYMMDDHHmmss').format('HH:mm')} - You`
                            ) : (
                                    `${item.sender.name} - ${moment(item.sendedAt, 'YYYYMMDDHHmmss').format('HH:mm')}`
                                )}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    isFromMe = ({ sender }) => {
        return sender && sender.userId === this.state.username.userId;
    }

    render() {
        return (
            <View style={styles.chatContainer}>
                <View style={styles.userHeadCointainer}>
                    <Text style={styles.userHeadText}>There are {this.state.usersCount} {this.state.usersCount > 1 ? 'users' : 'user'} in this room</Text>
                </View>
                <FlatList
                    ref={ref => this.flatListRef = ref}
                    alwaysBounceVertical={false}
                    data={this.state.messages}
                    renderItem={this.renderChatMessage}
                    keyExtractor={(_, i) => i.toString()}
                />
                <View style={{ marginBottom: 10 }}></View>
                <KeyboardAvoidingView behavior="height">
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.typing}
                            style={styles.inputMessage}
                            underlineColorAndroid="transparent"
                            returnKeyType="send"
                            placeholder="Type something nice"
                            onSubmitEditing={this.sendMessage}
                            onChangeText={text => this.setState({ typing: text })}
                        />
                        <TouchableOpacity onPress={this.sendMessage}>
                            <Text style={styles.sendButton}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}