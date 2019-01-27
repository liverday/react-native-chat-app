import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import styles from './styles';
import UserInput from './components/UserInput';

import logo from '../../assets/chat.png';
import userLogo from '../../assets/user.png';
import keyLogo from '../../assets/key.png';
import Button from './components/Button';
import uuid from 'uuid/v1';
import AvatarPicker from './components/AvatarPicker';


export default class LoginPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            image: null,
            password: ''
        }
    }

    render() {
        return (
            <View style={styles.appContainer}>
                <View style={styles.loginBox}>
                    <View style={styles.loginBoxHeader}>
                        <Image source={logo} style={styles.logoImg}></Image>
                        <Text style={styles.loginBoxHeaderText}>WELCOME</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <UserInput
                            placeholder="Username"
                            source={userLogo}
                            onChange={this.onUsernameChange}
                            onSubmitEditing={this.onSubmit}
                        />
                        <AvatarPicker
                            onAvatarChange={this.onAvatarChange}
                        />
                        <Button
                            disabled={this.state.username.length === 0 || !this.state.image}
                            onSubmit={this.onSubmit}
                            text="LOGIN" />
                    </View>
                </View>
            </View>
        );
    }

    onSubmit = async () => {
        const user = {
            userId: uuid(),
            name: this.state.username,
            image: this.state.image
        }
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.props.navigation.navigate('ChatPage', { ...user });
    }

    onAvatarChange = ({ image }) => this.setState({ image });

    onUsernameChange = (username) => this.setState({ username });
}