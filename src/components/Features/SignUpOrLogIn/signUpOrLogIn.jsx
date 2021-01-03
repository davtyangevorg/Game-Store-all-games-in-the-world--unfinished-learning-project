import React from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm, Field, reset } from 'redux-form'
import style from './signUpOrLogIn.module.scss'



import { required, email, password } from '../validate.js'

import { FaFacebook } from 'react-icons/fa'

const firebase = require('firebase/app');
require('firebase/auth');

const SignUpOrLogIn = props => {
    const dispatch = useDispatch()
    const onSubmit = (formData) => {
        if (formData.name) {
            console.log('sign in')
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)

                .then((response) => {
                    //dispatch(authenticationActionCreator(formData.name))
                    dispatch(reset('signup'))
                    return response.user.updateProfile({
                        displayName: formData.name
                    })
                })
                .catch((error) => { console.log(error) })
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then((response) => {
                    //dispatch(authenticationActionCreator(response.user.displayName))
                })
                .catch((error) => { console.log(error, 'error') })
        }

    }
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const socialClick = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then((res) => {
                console.log(res, 'true')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    return (
        <div className={style.signUp}>
            <div className={style.formParent} style={{ height: '320px' }}>
                <div className={style.title}>{props.title}</div>
                <SignUpOrLogInReduxForm title={props.title} onSubmit={onSubmit} />
            </div>
            <div style={{ height: '320px' }} className={style.socialAccounts}>
                <div className={style.title}>{`You can use social accounts to ${props.title}`}</div>
                <div onClick={socialClick} className={style.btnParent}>
                    <button className={style.socialBtn}>Continue with Facebook</button>
                    <FaFacebook className={style.btnIcon} size='1.5rem' />
                </div>
            </div>
        </div>
    )
}
const renderFiled = ({ input, name, blo, label, meta }) => {
    return (
        <div className={style.parent}>
            <input {...input} name={blo} placeholder={label} className={style.input}></input>
            {meta.touched && meta.error && <div className={style.valid}>{meta.error}</div>}
        </div>
    )
}
const SignUpOrLogInForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.form}>
            <Field validate={[required, email]} label={'Email'} blo={'email'} name={'email'} component={renderFiled} />
            {props.title === 'Sign up' && <Field validate={[required]} label={'User Name'} blo={'name'} name={'name'} component={renderFiled} />}
            <Field validate={[required, password]} label={'Create a password'} blo={'password'} name={'password'} component={renderFiled} />
            <button>{props.title}</button>
        </form>
    )
}

const SignUpOrLogInReduxForm = reduxForm({ form: 'signup' })(SignUpOrLogInForm)

//--------------------------------------------------------------------------------------



export default SignUpOrLogIn
