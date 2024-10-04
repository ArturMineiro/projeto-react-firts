import Container from '../layont/Container'
import styles from './Contact.module.css'
import FormContact from '../form/FormContact'
import React from 'react'
function Contact(){
    return(
        <div className={styles.container_contact}>

            <h1>Contato</h1>
            <FormContact /> 

    </div>
    )
}

export default Contact