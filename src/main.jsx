import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Bank from './Bank'
import Game from './TicTacToe'
// import TicTacToe from './GPT/TicTacToe'
// import Products from './Products'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>
)
