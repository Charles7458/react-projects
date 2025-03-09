import {HashRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Bank from './Bank';
import Game from './TicTacToe';
import Page from './Nike';
import Home from './Home';
import Menu from './Menu';

export default function () {
    return ( 
        <BrowserRouter basename='/react-projects'>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/amazony" element={<Page />} />
                    <Route path="/banky" element={<Bank />} />
                    <Route path="/tictactoe" element={<Game />} />
                </Route>
            </Routes>

        </BrowserRouter>
     );
}

