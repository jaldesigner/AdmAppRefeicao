import 'react-native-gesture-handler';
import {Root} from "native-base";
import React, {useState} from 'react';
import AppRouter from './src/Router';
import {CTX_SelecaoPrato, CTX_SelecaoAcompanhamento} from './src/context';

export default function App() {
  const ctx_SP = useState([]);
  const ctx_SA = useState([]);
  return (
    <Root>
      <CTX_SelecaoPrato.Provider value={ctx_SP}>
        <CTX_SelecaoAcompanhamento.Provider value={ctx_SA}>
          <AppRouter/>
        </CTX_SelecaoAcompanhamento.Provider>
      </CTX_SelecaoPrato.Provider>
    </Root>
  );
}
