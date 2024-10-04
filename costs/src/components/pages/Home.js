
import savings from '../../img/savings.svg'
import LinkButton from '../layont/LinkButton'
import styles from './Home.module.css'


function Home() {
  return( 
     <section className={styles.home_container}>
         <h1>Bem-vindo ao <span>Cost</span></h1>
         <p>Comece a gerenciar os seus projetos agora mesmo!!</p>
         <LinkButton to="/newproject" text="Criar projeto"/>
         <img src={savings} alt="Costs"/>
     </section>
  );
}

export default Home;

