import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default function NavBarTop({navigation}) {
  return (
    <View>
      <TouchableOpacity>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
