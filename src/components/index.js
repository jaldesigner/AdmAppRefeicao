import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Icon, Button} from 'native-base';
//import estilo from '../style';

/*
 
    ____              _                         _   ___         _       
   / ___|__ _ _ __ __| |   ___ ___  _ __ ___   | |_/_/ |_ _   _| | ___  
  | |   / _` | '__/ _` |  / __/ _ \| '_ ` _ \  | __| | __| | | | |/ _ \ 
  | |__| (_| | | | (_| | | (_| (_) | | | | | | | |_| | |_| |_| | | (_) |
   \____\__,_|_|  \__,_|  \___\___/|_| |_| |_|  \__|_|\__|\__,_|_|\___/ 
                                                                        
 
*/

export const CardTpl = ({titulo, ...props}) => {
  return (
    <View style={style.boxCard}>
      <View style={style.boxTituloCard}>
        <View style={style.cicle} />
        <Text style={style.txtTituloCard}>{titulo}</Text>
      </View>
      <View style={style.boxContentCard}>{props.children}</View>
    </View>
  );
};

/*
 
    ____              _       _         ____          _ _     _       
   / ___|__ _ _ __ __| |   __| | ___   |  _ \ ___  __| (_) __| | ___  
  | |   / _` | '__/ _` |  / _` |/ _ \  | |_) / _ \/ _` | |/ _` |/ _ \ 
  | |__| (_| | | | (_| | | (_| | (_) | |  __/  __/ (_| | | (_| | (_) |
   \____\__,_|_|  \__,_|  \__,_|\___/  |_|   \___|\__,_|_|\__,_|\___/ 
                                                                      
 
*/

export const CardPedido = ({nome, ...props}) => {
  return (
    <View style={style.boxCard}>
      <View style={style.boxTituloCard}>
        <View style={style.circlePedidos}>
          <Text style={style.txtCirclePedidos}>{nome.substr(0,1)}</Text>
        </View>
        <Text style={style.txtTituloCard}>{nome}</Text>
      </View>
      <View style={style.boxContentCard}>{props.children}</View>
    </View>
  );
};


/*
 
 __________________________       _______________________________________________________________
 7     77  _  77  _  77    \      7        77     77     77      77  _  77     77     77        7
 |  ___!|  _  ||    _||  7  |     |  _  _  ||  7  ||  _  |!__  __!|  _  ||   __!|  ___!|  _  _  |
 |  7___|  7  ||  _ \ |  |  |     |  7  7  ||  |  ||  7  |  7  7  |  7  ||  !  7|  __|_|  7  7  |
 |     7|  |  ||  7  ||  !  |     |  |  |  ||  !  ||  |  |  |  |  |  |  ||     ||     7|  |  |  |
 !_____!!__!__!!__!__!!_____!     !__!__!__!!_____!!__!__!  !__!  !__!__!!_____!!_____!!__!__!__!
                                                                                                 
 
*/

export const CardMontagem = ({titulo, ...props}) => {
  return (
    <View style={style.boxCard}>
      <View style={style.boxTituloCard}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            style={{color: '#F6B900', fontSize: 12}}
            type="FontAwesome5"
            name="check"
          />
          <Text style={{fontSize: 14, color: '#fff'}}>{titulo}</Text>
        </View>
        <View>
          {props.InPut}
        </View>
      </View>
      <View style={style.boxContentCard}>{props.children}</View>
    </View>
  );
};

/*
 
 >=>>=>                 >=>                    >=>                                >=>   
 >>   >=>               >=>                    >=>        >>           >=>        >=>   
 >>    >=>    >=>     >=>>==>    >=>           >=>              >=>    >=>      >=>>==> 
 >==>>=>    >=>  >=>    >=>    >=>  >=>        >=>       >=>  >=>  >=> >=>>=>     >=>   
 >>    >=> >=>    >=>   >=>   >=>    >=>       >=>       >=> >=>   >=> >=>  >=>   >=>   
 >>     >>  >=>  >=>    >=>    >=>  >=>        >=>       >=>  >=>  >=> >>   >=>   >=>   
 >===>>=>     >=>        >=>     >=>           >=======> >=>      >=>  >=>  >=>    >=>  
                                                               >=>                      
 
*/
export const BtnLight = ({...props}) => {
  return (
    <TouchableOpacity style={style.btnLight} onPress={props.onPress}>
      <Text style={style.btnLightTxt}>{props.value}</Text>
      {props.children}
    </TouchableOpacity>
  );
};

/*
 
   ____        _   /\/|                                                 
  | __ )  ___ | |_|/\/_  ___    _ __   ___  __ _ _   _  ___ _ __   ___  
  |  _ \ / _ \| __/ _` |/ _ \  | '_ \ / _ \/ _` | | | |/ _ \ '_ \ / _ \ 
  | |_) | (_) | || (_| | (_) | | |_) |  __/ (_| | |_| |  __/ | | | (_) |
  |____/ \___/ \__\__,_|\___/  | .__/ \___|\__, |\__,_|\___|_| |_|\___/ 
                               |_|            |_|                       
 
*/

export const BtnSmallRight = ({...props}) => {
  return (
    <TouchableOpacity style={style.BtnSmallRight} onPress={props.onPress}>
      <Text style={style.BtnSmallText}>{props.value}</Text>
      <Icon
        style={{color: '#02CD98', fontSize: 18}}
        type="FontAwesome5"
        name="arrow-right"
      />
    </TouchableOpacity>
  );
};

export const BtnSmallLeft = ({...props}) => {
  return (
    <TouchableOpacity style={style.BtnSmallRight} onPress={props.onPress}>
      <Icon
        style={{color: '#02CD98', fontSize: 18}}
        type="FontAwesome5"
        name="arrow-left"
      />
      <Text style={style.BtnSmallText}>{props.value}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  /*
 
   _,  _, _, _ __, _  _, _,_ __,  _,  _,    _,  _, __, __,
  / ` / \ |\ | |_  | / _ | | |_) /_\ / \   / ` /_\ |_) | \
  \ , \ / | \| |   | \ / | | | \ | | \ /   \ , | | | \ |_/
   ~   ~  ~  ~ ~   ~  ~  `~' ~ ~ ~ ~  ~     ~  ~ ~ ~ ~ ~  
                                                          
 
*/


  circlePedidos: {
    backgroundColor: '#FF6B00',
    width:40,
    height: 40,
    padding: 5,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCirclePedidos: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
  },
//Card comum
  boxCard: {
    margin: 15,
    marginBottom: 5,
    elevation: 6,
    backgroundColor: '#353857',
    borderColor: '#32465d',
    borderWidth: 0.9,
    borderStyle: 'solid',
    borderRadius: 10,
    padding:5,
  },
  boxTituloCard: {
    borderBottomColor: '#32465d',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cicle: {
    backgroundColor: '#FF6B00',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  txtTituloCard: {
    color: '#7EE8FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxContentCard: {
    margin: 10,
  },
  /**
   * Botão light da aplicação
   */
  btnLight: {
    backgroundColor: '#fff',
    padding: 5,
    borderColor: '#5351F9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
    marginTop: 10,
    elevation: 5,
  },
  btnLightTxt: {
    color: '#5351F9',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  /**
   * Botão small
   */
  BtnSmallRight: {
    backgroundColor: '#fff',
    borderColor: '#5351F9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 15,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  BtnSmallLeft: {
    backgroundColor: '#fff',
    borderColor: '#5351F9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 15,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  BtnSmallText: {
    color: '#5351F9',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 15,
    marginRight: 10,
    fontSize: 14,
  },
});
