import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import css from './Home.css';

function Home(){

    const [name, setName] = useState("");

    return (
        <div style={css} className='main'>

            <center>

                <h1 style={css} className='title'>Who?</h1>
                <h3>The Free Online Tool To Find Someone Who Asked</h3>
                <form>
                    <label>
                        <input
                        type="text" 
                        value={name}
                        style={css}
                        className='search'
                        onChange={(e) => setName(e.target.value)}/>
                    </label>
                </form>

                <Link to={`/result?search=${name}`}>Search</Link>

            </center>
            
        </div>
    );

}

export default Home;