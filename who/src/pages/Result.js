import {React, useState, useEffect} from 'react';
import { useSearchParams, Link } from "react-router-dom";
import css from './Result.css';

function Result(){

    const [searchParams, setSearchParams] = useSearchParams();
    const [author, setAuthor] = useState("");
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://who.thomasdli.repl.co/find_post?msg=${searchParams.get("search")}`)
            var info = await data.json();
            console.log(info);
            setAuthor(info[2]);
            setLink(info[1]);
            setTitle(info[0]);
            setLoading(false);
            console.log(info[2]);
        }

        fetchData()
            .catch(console.error);;


    }, [setAuthor, setLink, setTitle, setLoading, searchParams]);

    return (
        <div>

            {Content(author, link, title, loading, searchParams.get("search"))}

        </div>
    );

}

function Content(author, link, title, loading, search){

    if(loading === true){

        return (
            <div>

                <h1>Loading... (shouldn't take more than 30 seconds)</h1>

            </div>
        );

    }

    if(loading === false){

        return (
            <div style={css} className="center">

                <center>
    
                    <h1>{author} asked.</h1>
                    <h1>"<a target="_blank" href={link} rel="noopener noreferrer">{title}</a>" ~{author}</h1>
                    <h1><Link to={"/"}>Back To Main Page</Link></h1>

                </center>
    
            </div>
        );

    }

}

export default Result;