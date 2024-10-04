import React, { useState } from 'react';
import styles from './FormContact.module.css';


function FormContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });

            setMessage('Mensagem enviada com sucesso!');
            setType('success');
        } catch (error) {
            console.error('Erro:', error);
            setError(error.message);
            setMessage('Erro ao enviar a mensagem, tente novamente.');
            setType('error');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
                setType('');
            }, 5000);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Número de Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Digite seu número de telefone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="message">Mensagem</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Digite sua mensagem"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {message && (
                <p className={type === 'error' ? styles.error : styles.success}>
                    {message}
                </p>
            )}
            {error && <p className={styles.error}>Erro: {error}</p>}
        </div>
    );
}

export default FormContact;