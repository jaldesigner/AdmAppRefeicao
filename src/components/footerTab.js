import React from 'react';
import { useNavigation } from '@react-navigation/native';
import db from '@react-native-firebase/firestore';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Badge,
  Text,
} from 'native-base';

const RodaPe = () => {
  const navigation = useNavigation();
  return (
    <Footer>
      <FooterTab>
        <Button onPress={() => navigation.navigate('Home')}>
          <Icon type="FontAwesome5" name="home" />
          <Text>Home</Text>
        </Button>
        <Button onPress={() => navigation.navigate('SelecaoPratoDia')}>
          <Icon type="FontAwesome5" name="concierge-bell" />
          <Text>Cardápio</Text>
        </Button>
        <Button onPress={() => navigation.navigate('ListaPedidos')} badge vertical>
          <Badge><Text>20</Text></Badge>
          <Icon type="FontAwesome5" name="list" />
          <Text>Pedidos</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Configuracao')}>
          <Icon type="FontAwesome5" name="wrench" />
          <Text>Config</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default RodaPe;

