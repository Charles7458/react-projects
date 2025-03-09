import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Bank from './Bank'
// import Game from './TicTacToe'
// import TicTacToe from './GPT/TicTacToe'
// import Products from './Products'
// import MovingBall from './Ball'
// import Page from './Nike';
// import Trial from './Trials';
import Router from './Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
