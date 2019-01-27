import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';


export default class LoginLoading extends Component {

    constructor(props) {
        super(props);

        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');
        
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }
}