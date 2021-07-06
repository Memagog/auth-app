import React, { useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import "./styles.css";
async function getData(token: string | null){    
     const response = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': `${token}`
        },       
    }) 
    return await response.json(); 
}

export const Profile = () => {   

    const token :string | null = localStorage.getItem('token'); 

    const history = useHistory();

    const [auth, setAuth] = useState(true) 
    const [data, setData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {  
        if(!token){
            history.push('/')
        }        
        const result = getData(token);   
        result.then(res=>setData(res.data))        
    }, [])

   useEffect(() => {
       if(!auth){
        localStorage.removeItem('token');
        history.push('/')
       }
   }, [auth]);
  
    return (
        <div>
            <h1>
                Username: {data.name}
            </h1>
            <h2>
                email: {data.email} 
            </h2>
            <button type="submit" className={"button"} onClick={()=>{setAuth(false)}}>Log Out</button>
        </div>
    )
}
