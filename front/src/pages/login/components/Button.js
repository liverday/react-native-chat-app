import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => this.props.onSubmit();

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    disabled={this.props.disabled}
                    style={styles.button}
                    onPress={this.onPress}
                >

                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CC4924',
        height: 50,
        borderRadius: 20,
        zIndex: 100,
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    spinner: {
        width: 24,
        height: 24,
    },
})