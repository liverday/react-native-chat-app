import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Image } from 'react-native';

export default class UserInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                {this.props.source && (
                    <Image source={this.props.source} style={styles.inlineImg} />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChange}
                    onSubmitEditing={this.props.onSubmitEditing}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#FFF',
        paddingLeft: 50,
        borderRadius: 20,
        fontSize: 18,
        marginBottom: 20,
    },

    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 25,
        height: 25,
        left: 15,
        top: 11,
    }
})