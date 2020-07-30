/* eslint-disable prettier/prettier */

const  VALORINICIAL = {
    data : [
        'Teste de Lista',
        'Testando mais uma',
    ],
}

function pratos(state = VALORINICIAL, action) {
    console.log(state);
    switch(action.type){
        case 'ADDPRATO':
            return {...state, data:[...state.data]};
        default:
            return state;
    }
}
export default pratos;
