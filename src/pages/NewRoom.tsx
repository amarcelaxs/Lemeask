import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import ilustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { database } from '../services/firebase';



import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useState } from 'react';
//import userEvent from '@testing-library/user-event';

//import { TestContext } from '../App'


export function NewRoom() {
  const history = useHistory()
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();


    if (newRoom.trim() === '') {

      return

    }


    const roomRef = database.ref('room');
    //push jpgandp informando para a variavel roomRef
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,

    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }


  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationsImg} alt="simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&A a vivo</strong>
        <p>Tire as duvisas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{newRoom}</h1>
          <h2>Criar um nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>

    </div>
  )

}