import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Bank from './Bank';
import Game from './TicTacToe';
import Page from './Nike';
import Home from './Home';
import Menu from './Menu';

export default function () {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/react-projects/" element={<Menu />}>
                    <Route path="/react-projects/" element={<Home />} />
                    <Route path="/react-projects/amazony" element={<Page />} />
                    <Route path="/react-projects/banky" element={<Bank />} />
                    <Route path="/react-projects/tictactoe" element={<Game />} />
                </Route>
            </Routes>

        </BrowserRouter>
     );
}

