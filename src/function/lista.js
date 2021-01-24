/* eslint-disable prettier/prettier */
import React ,{useEffect,useState} from 'react';
import DadosApp from '../cfg';

const INF = DadosApp();
const URL_SERVER = INF.url_server;
const ID_APP = INF.ID_APP;

export default function listaPratos(doc){
    const [rJson, setRJson] = useState('');
    //Lista os pratos do dia
    useEffect(() => {
        async function listaAcompanhamentoPiker() {
            const response = await fetch(URL_SERVER + doc, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    ID_APP: ID_APP,
                }),
            });
            const json = await response.json();
            setRJson(() => json);
        }
        listaAcompanhamentoPiker();
    },[doc]);

    return rJson;
}
