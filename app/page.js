'use client';

import { submitScript } from './actions';
import styles from '../styles/home-style.css';

export default function Home() {
  return (
    <div className="container">
      <h1>Roblox Lua Script Upload</h1>
      <form action={submitScript}>
        <textarea 
          name="luaScript" 
          className="scriptInput" 
          placeholder="Cole seu script Lua do Roblox aqui..." 
          required
        />
        <button type="submit" className="submitButton">Enviar Script</button>
      </form>
    </div>
  );
}
