import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chat/ChatPage';
import LoginLoadingPage from './pages/loginLoading/LoginLoadingPage';

const AuthStack = createStackNavigator({ LoginPage });

const AppStack = createStackNavigator({
    ChatPage
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#DA552F"
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },
        }
    });

const AppContainer = createAppContainer(createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: LoginLoadingPage
}, {
    initialRouteName: 'AuthLoading'
    }));
export default AppContainer;