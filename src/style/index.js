import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    backgroundColor: '#2D3043',
    color: '#fff'
  },
  conteudo: {
    padding: 10
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    margin: 5,
    padding: 5
  },
  btn1: {
    padding: 5,
    color: '#fff',
    backgroundColor: '#9940e2',
    marginBottom: 10,
    marginTop: 10
  },
  txtTitulo: {
    color: '#9940e2',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
    marginBottom: 10
  },
  listaCadastroPrato: {
    marginTop: 5,
    fontSize: 18,
    color: '#f3d6ff',
    backgroundColor: '#20272F',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10
  },
  inpText: {
    color: '#5351F9',
    width: '100%',
    fontSize: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#214478',
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#fff'
  },
  lista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 5
  },
  sqrLista: {
    backgroundColor: '#F6B900',
    width: 10,
    height: 10,
    marginRight: 10
  },
  txtLista: {
    color: '#fff',
    fontSize: 16
  },
  icLista: {
    color: '#fff'
  },
  boxTextLista: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxBtn: {
    flexDirection: 'column',
    marginTop: 30
  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#02CD98',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#5351F9',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10
  },
  btn3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F64000',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  /* -------------------------------------------------------------------------- */
  /*                        Configuração da tela de login                       */
  /* -------------------------------------------------------------------------- */
  loginBody: {
    margin: 25
  },
  loginHeader: {
    backgroundColor: '#3E4168',
    elevation: 7,
    padding: 20,
    height: 200,
    borderBottomEndRadius: 300,
    borderBottomStartRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#51557D'
  },
  loginTextHeader: {
    color: '#00D1FF',
    fontSize: 36,
    fontWeight: 'bold',
    elevation: 7
  },
  // Input text
  loginBoxTextInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 36,

  },
  loginBoxIconTextInput: {
    backgroundColor: '#00D1FF',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    elevation: 5
  },
  loginTextInput: {
    backgroundColor: '#3E4168',
    paddingLeft: 10,
    color: '#fff',
    width: '89%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#51557D',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  // Botões
  loginBoxBtn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#00D1FF',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 40
  },
  loginTextBtn: {
    color: '#fff',
    fontSize: 18
  },
  loginTextBtnNaoEntrar: {
    color: '#00D1FF'
  }
  //===============================================
  //Estilo da página de seleção de cardápio
  //===============================================
  

});

export default estilo;
