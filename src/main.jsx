import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Bank from './Bank'
// import Game from './TicTacToe'
// import TicTacToe from './GPT/TicTacToe'
// import Products from './Products'
// import MovingBall from './Ball'
import Page from './Nike';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>
)
