import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layont/Loading';
import Container from '../layont/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layont/Message';
import ServiceForm from '../service/ServiceForm';
import {parse, v4 as uuidv4} from 'uuid'
import ServiceCard from '../service/ServiceCard';


function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Erro ao carregar o projeto');
                }
                return resp.json();
            })
            .then(data => {
                setProject(data);
                setServices(data.services)
                setLoading(false);
                setShowProjectForm(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
        }, 30);

        return () => clearTimeout(timer);
    }, [id]);

    function editPost(updatedProject) {
        setMessage('')
        if (updatedProject.budget < updatedProject.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!!');
            setType('error');
            return;
        }

        setLoading(true);
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro ao atualizar o projeto');
            }
            return resp.json();
        })
        .then(data => {
            setProject(data);
            setShowProjectForm(false);
            setLoading(false);
            setMessage('Projeto atualizado');
            setType('success');
         
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
            setMessage('Erro ao atualizar o projeto');
            setType('error');
            setLoading(false);
        });
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Ocorreu um erro ao carregar o projeto: {error}</p>;
    }
  function createService(){
const lastService = project.services[project.services.length -1]

lastService.id = uuidv4()

const lastServiceCost = lastService.cost

const newCost =parseFloat(project.cost) + parseFloat(lastServiceCost)

if(newCost > parseFloat(project.budget)){
setMessage('Orçamento ultrapassado,verifique o valor do serviço')
setType('error')
project.services.pop()
return false

}
//aadd service cost
project.cost =newCost
//update
fetch(`http://localhost:5000/projects/${project.id}`,{
    method: 'PATCH',
    headers : {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(project),
})
.then((resp) => resp.json())
.then((data) => {
    setShowServiceForm(false)
}).catch((err) => console.log(err))

  }
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }
function removeService(id,cost){
const servicesUpdate = project.services.filter(
    (service) => service.id !== id
)
const projectUpdated = project
projectUpdated.services = servicesUpdate
projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
    method: 'PATCH',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(projectUpdated)
}).then((resp)=>resp.json())
.then((data) => {
    setProject(projectUpdated)
    setServices(servicesUpdate)
    setMessage('Serviço removido com sucesso!!')
})
.catch(err =>console.log(err))
}

    return (
        <div className={styles.project_details}>
            {project ? (
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Total orçamento:</span> R${project.budget}</p>
                                <p><span>Total utilizado:</span> R${project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>
                            Adicione um serviço:
                        </h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adiciona serviço': 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm handleSubmit={createService} 
                                btnText="Adicionar serviço"
                                projectData={project}/>
                            ) }
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                      {services.length > 0 && services.map((service) =>(
                        <ServiceCard 
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}
                        />
                      
               
                      ))
                      }
                      {services.length === 0 && <p>Não há serviços cadastrados</p>}
                        </Container>
                </Container>
            ) : (
                <p>Projeto não encontrado!</p>
            )}
        </div>
    );
}

export default Project;