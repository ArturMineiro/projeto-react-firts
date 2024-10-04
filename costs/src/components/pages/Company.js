import React from 'react';
import styles from './Company.module.css'




const Company = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Gold Projects</h1>
            </header>
            <section className={styles.section}>
                <h2>Sobre Nós</h2>
                <p>
                    A Empresa Gold Projects é líder no mercado de tecnologia, oferecendo soluções inovadoras para seus clientes.
                </p>
            </section>
            <section className={styles.section}>
                <h2>Serviços</h2>
                <ul>
                    <li>Desenvolvimento de Software</li>
                    <li>Consultoria em TI</li>
                    <li>Suporte Técnico</li>
                </ul>
            </section>
            <section className={styles.section}>
                <h2>Contato</h2>
                <p>Email: contato@empresa.xyz</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Endereço: Rua teste, 123, São Paulo, SP</p>
            </section>
        </div>
    );
};

export default Company;