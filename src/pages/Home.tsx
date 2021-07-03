import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
//import { auth, firebase } from '../services/firebase';

import ilustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss';
export function Home() {
  //todo component que começa com use e chamada de hook, e importante e esteja dentro do componente(function)
  //se nao nao funcionara

  const [roomCode, setRoomCode] = useState("")
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {

    if (!user) {
      await signInWithGoogle()
      //o restando do codigo so vai executar se o awaite obtiver sucesso
    }



    history.push(`/rooms/new`);

  }


  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    console.log("roomRef: ", roomRef)
    console.log("roomCode: ", roomCode)
    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }
    if (!roomRef.exists()) {
      alert('Room does not exists.')
    }

    if (roomRef.val().endedAt) {
      alert('Room alredy closed');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }





  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationsImg} alt="simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&A ao vivo</strong>
        <p>Tire as duvisas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo do google" />
            Crie uma sala com o google
          </button>
          <div className="separator"> ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o codigo da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>

    </div>
  )
}