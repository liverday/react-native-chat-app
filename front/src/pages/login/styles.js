import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginBoxHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },  

    loginBoxHeaderText: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 6,
        color: '#FAFAFA'
    },
    
    formContainer: {
        flex: 3,
        paddingHorizontal: 30,
    },  

    logoImg: {
        width: 75, 
        height: 75
    },

    loginBox: {
        flex: 1,
        width: '100%',
        backgroundColor: '#DA552F', 
    }
});

export default styles;