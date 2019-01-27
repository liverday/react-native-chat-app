import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alignItemsStart: {
        alignItems: 'flex-start'
    },

    alignItemsEnd: {
        alignItems: 'flex-end'
    },

    headerLogoutContainer: {
        marginRight: 20,
    },

    headerLogoutText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF'
    },
    
    chatContainer: {
        flex: 1,
        backgroundColor: '#fff',
        
    },

    messageBoxContainer: {
        paddingHorizontal: 20,
    },

    messageContainer: {
        marginTop: 20,
    },

    warningContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    ownMessageContainer: {
        padding: 15,
        flex: 1,
        marginLeft: '20%',
        marginRight: 10,
        alignItems: 'flex-end',
        backgroundColor: '#DA552F',
        borderRadius: 20
    },

    avatarAndTextInlineReverse: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },

    avatarAndTextInline: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    foreignMessageContainer: {
        flex: 1,
        marginRight: '20%',
        marginLeft: 10,
        backgroundColor: '#DADADA',
        padding: 15,
        borderRadius: 20
    },

    avatarImg: {
        width: 50,
        height: 50,
        backgroundColor: '#E6E7E2',
        borderRadius: 50
    },  

    ownMessageText: {
        fontSize: 16,
        color: '#FFF'
    },

    foreignMessageText: {
        fontSize: 16,
        color: '#000'
    },
    
    userText: {
        marginTop: 3,
        marginHorizontal: 5
    },

    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#eee',
    },

    inputMessage: {
        paddingHorizontal: 20,
        fontSize: 18,
        flex: 1  
    },

    sendButton: {
        alignSelf: 'center',
        color: '#DA552F',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20
    },

    userHeadCointainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },

    userHeadText: {
        fontSize: 14,
        color : '#757575',
        marginVertical: 10 
    }
});

export default styles;