import './hello.css'
import oliver from './assets/oliver.jpg'
//function component

 function Profile({image, name, desc}) {
    return(
        <div>
            <div className="main-wrapper">

                <div className="profile">
                    <img src={image} className="profile-pic" />
                </div>

                <div className="info">
                    <p className="name">{name}</p>
                    <p className="desc">{desc}</p>
                </div>

                <div className="follow">
                    <button className="btn">Follow</button>
                </div>
            </div>
        </div>
    )
}

export default function Hello(){
    return (
        <div>
            <Profile 
                image= {oliver}
                name= 'Oliver'
                desc= 'Very popular cat'
            />
        </div>
    )
}
