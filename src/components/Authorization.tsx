import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from 'formik';
import './styles.css';
import { useHistory } from "react-router-dom";
export interface FormValues {
    clientId : 1,
    email: string;
    password: string;
    authentication: boolean;
}
interface OtherProps {
    message: string;
}

async function AuthFetch(clientId: number, email: string, password: string){
   
    if(email && password){
       const response = await fetch('https://tager.dev.ozitag.com/api/auth/user', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({clientId ,email, password})

       })      
      
        return await response.json(); 
    }  
}
const AuthorizationForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {touched, errors, message} = props;
    const [auth, setAuth] = useState(false);
    let token = localStorage.getItem('token');
    let history = useHistory();
    useEffect(() => {       
       setTimeout(() => {
        if(token) history.push("/home")
        else setAuth(false)
       }, 500);
    }, [auth])
  
    return (        
        <div className="block">
                <Form className='container'>
                    <h1>
                        {message}
                    </h1>
                    <Field type="email" name="email" className='input'/>
                    {touched.email && errors.email && <div>{errors.email}</div>}
    
                    <Field type="password" name="password" className='input'/>
                    {touched.password && errors.password && <div>{errors.password}</div>}

                    <button type="submit" className="button" onClick={()=>(setAuth(true))}>
                        Submit
                    </button>
                </Form> 
        </div>
                  
    )
}
interface InitialData {
    initialEmail?: string;    
    message:string;
}

const ValidateForm =  withFormik<InitialData, FormValues>({
    
    mapPropsToValues: props => {
        return {
            clientId: 1,
            email: props.initialEmail || '',
            password: '',
            authentication: false,
        };
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email isn't Valid")
            .required("Email is required"),
        password: Yup.string().required(" password is required").min(4, "Min size is 4 charters") 
    }),
    
    handleSubmit: values => {
      
       const result = AuthFetch(values.clientId, values.email,values.password);       
            
       result.then(res=>{
       
           if(res.hasOwnProperty('data')){
             localStorage.setItem('token', "Bearer " + res.data.accessToken)
           }
           else console.log("not ok")         
        })
    }

})(AuthorizationForm)

const Authorization =() => {    
    return(
            <div>        
            <h1>Auth</h1>            
            <ValidateForm message="Sign In"></ValidateForm>
            </div> 
        
    )
}
export default Authorization;



