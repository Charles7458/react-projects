//Links for the pages
import {Link, Outlet} from 'react-router-dom';

export default function () {
    return (
        <div style={{width:"100vw",overflowX:"hidden"}}>

                <div style={{position:"relative",top:"0", padding:"10px 0px", marginBottom:"5px",width:'100%',backgroundColor:"green", color:"white", textOverflow:"e",fontSize:"clamp(9px,3vw,16px)"}}>
                    <ul style={{listStyleType:"none", display:"flex", width:"90%", justifyContent:"space-between", alignItems:"center", textOverflow:"ellipsis"}}>
                        <Link to="/"><li style={{color:"white", width:"20%", textOverflow:"ellipsis", whiteSpace:"nowrap"}}title='Home'>Home</li></Link> |
                        <Link to="/amazony"><li style={{color:"white", width:"20%", textOverflow:"ellipsis", whiteSpace:"nowrap"}} title='Amazon(Not the real one)'>Amazon(Not the real one)</li></Link> |
                        <Link to="/banky"><li style={{color:"white", width:"20%", textOverflow:"ellipsis", whiteSpace:"nowrap"}} title='Bank'>Bank</li></Link> |
                        <Link to="/tictactoe"><li style={{color:"white", width:"20%", textOverflow:"ellipsis", whiteSpace:"nowrap"}} title='TicTacToe'>TicTacToe(from React docs)</li></Link>
                    </ul>
                </div>

            <Outlet/>
        </div>
    );
}

