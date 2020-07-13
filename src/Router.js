import * as React from 'react';
//import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

//import das screens
import Home from './screen/home';
import CadastraPrato from './screen/CadastraPrato';
import CadastraConteudoPrato from './screen/CadastraConteudoPrato';
import CadastraAcompanhamento from './screen/CadastraAcompanhamento';
import SelecaoPratoDia from './screen/SelecaoPratoDia';
import SelecionaAcompanhamento from './screen/SelecionaAcompanhamento';
import MontagemPratoDia from './screen/montagemPratoDia';
import Pratos from './screen/Pratos';
import Login from './screen/Login';
import MenuLef from './components/navBarLeft';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <MenuLef {...props} />}
        drawerType="back"
        initialRouteName="MontagemPratoDia">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="CadastraPrato"
          component={CadastraPrato}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="CadastraConteudoPrato"
          title="Cadastro de Conetúdo"
          component={CadastraConteudoPrato}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="CadastraAcompanhamento"
          title="Cadastro de Conetúdo"
          component={CadastraAcompanhamento}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="SelecaoPratoDia"
          component={SelecaoPratoDia}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="SelecionaAcompanhamento"
          title="Cadastro de Conetúdo"
          component={SelecionaAcompanhamento}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="MontagemPratoDia"
          title="Montagem do Prato"
          component={MontagemPratoDia}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="Pratos"
          title="Pratos"
          component={Pratos}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />

        <Drawer.Screen
          name="Login"
          component={Login}
          options={{headerTransparent: true, title: false, headerLeft: null}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
