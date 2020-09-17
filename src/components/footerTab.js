import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
        </Button>
        <Button onPress={() => navigation.navigate('Pratos')}>
          <Icon type="FontAwesome5" name="concierge-bell" />
        </Button>
        <Button onPress={()=>navigation.navigate('ListaPedidos')} badge vertical>
          <Badge><Text>2</Text></Badge>
          <Icon type="FontAwesome5" name="list" />
          <Text>Lista</Text>
        </Button>
        <Button onPress={()=>navigation.navigate('Configuracao')}>
          <Icon type="FontAwesome5" name="wrench" />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default RodaPe;

