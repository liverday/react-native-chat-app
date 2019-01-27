import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';

import businessWoman from '../../../assets/business-woman.png';
import geekWoman from '../../../assets/geek-woman.png';
import modernWoman from '../../../assets/modern-woman.png';
import geekMan from '../../../assets/geek-man.png';
import modernLumberjack from '../../../assets/modern-lumberjack.png';
import ordinaryMan from '../../../assets/ordinary-man.png';

export default class AvatarPicker extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const avatarOptions = this.getAvatarOptions();

        return (
            <CustomPicker
                style={styles.avatarPickerContainer}
                placeholder={'Pick an Avatar'}
                getLabel={item => item.label}
                options={avatarOptions}
                modalAnimationType={'fade'}
                modalStyle={styles.modalContainer}
                onValueChange={this.props.onAvatarChange}
                fieldTemplate={this.renderField}
                optionTemplate={this.renderOption}
            />
        );
    }

    getAvatarOptions = () => ([
        { label: 'Business Woman', image: businessWoman, value: businessWoman },
        { label: 'Geek Woman', image: geekWoman, value: geekWoman },
        { label: 'Modern Woman', image: modernWoman, value: modernWoman },
        { label: 'Geek Man', image: geekMan, value: geekMan },
        { label: 'Modern Lumberjack', image: modernLumberjack, value: modernLumberjack },
        { label: 'Ordinary Man', image: ordinaryMan, value: ordinaryMan }
    ]);

    renderField = (settings) => {
        const { selectedItem, defaultText, getLabel } = settings;
        return (
            <View style={styles.rowContainer}>
                <View>
                    {!selectedItem && <Text style={styles.text}>{defaultText}</Text>}
                    {selectedItem && (
                        <View style={styles.innerContainer}>
                            <Image style={styles.avatarImg} source={selectedItem.image}/>
                            <Text style={styles.text}>{getLabel(selectedItem)}</Text>
                        </View>
                    )}
                </View>

            </View>
        )
    }

    renderOption = (settings) => {
        const { item, getLabel } = settings
        return (
            <View style={styles.optionContainer}>
                <View style={styles.innerContainer}>
                    <Image style={styles.avatarImg} source={item.image}/>
                    <Text style={styles.text}>{getLabel(item)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    avatarPickerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 20,
        borderRadius: 20
    },

    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    optionContainer: {
        padding: 10,
        backgroundColor: '#E5886E',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255, 0.1)'
    },

    avatarImg: {
        height: 30,
        width: 30,
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginRight: 10,
    },

    rowContainer: {
        padding: 15,
    },
    text: {
        color: '#FFF',
        fontSize: 16
    }
})