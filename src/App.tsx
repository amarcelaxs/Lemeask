import userEvent from '@testing-library/user-event';
import { promises } from 'dns';
import { useState } from 'react';
import { createContext, useEffect } from 'react';
//useEffect disparode efeitos colaterais
//quando eu quero disparar uma função sempre quando algo acnotecer

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
//import { auth, firebase } from './services/firebase'; 

import { AuthContextProvider } from './context/AuthContext'


function App() {


  //{} primeiro chave vc quer inserir um code javascript  a segunda chave  {{}} vc quer criar um objeto  novo ou array tb 
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter >
  );
}

export default App;
