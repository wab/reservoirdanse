import React from 'react'
import { Link } from 'gatsby';
import moment from 'moment';

// import Layout from '../components/layout'
// import Image from '../components/image'

const PAGES_ID = {
  'projet' : 20,
  'residences' : 1062
}

const IndexPage = ({data}) => {
  const events = data.allWordpressWpEvent.edges.filter(({node : {acf}}) => moment(acf.event_start_date).isSameOrAfter(moment()));

  const projet = data.allWordpressPage.edges.filter(({node}) => node.wordpress_id === PAGES_ID['projet'])[0].node;

  const residences = data.allWordpressPage.edges.filter(({node}) => node.wordpress_id === PAGES_ID['residences'])[0].node;
  return (
    <div>
      <ul>
        <li>
          <Link to={projet.slug}>
            <article>
              <h2>{projet.title}</h2>
              <div dangerouslySetInnerHTML={{__html: projet.excerpt }}></div>
            </article>
          </Link>
        </li>
        <li>
          <Link to={residences.slug}>
            <article>
              <h2>{residences.title}</h2>
              <div dangerouslySetInnerHTML={{__html: residences.excerpt }}></div>
            </article>
          </Link>
        </li>
        <li>Les résidences (page + événements de la catégorie En résidence et Ouverture Publique)</li>
        <li>Le Monstre (page + événements de la catégorie Le Monstre)</li>
        <li>L’espace ressource (page)</li>
        <li>Actualité (page + défilement des actualités de la semaine ou de 3 événements)</li>
      </ul>
      <p>Création des catégories d’événements pour les actualités : En résidence • Ouverture publique • Le Monstre • Stage / Atelier • Ressource • Divers</p>
      <ol>
        {events.map(({node}, index) => {
          return (
            <li key={index}>
              <h2>{node.title}</h2>
              <p>{moment(node.acf.event_start_date).format('D/MM/YYYY')}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default IndexPage

export const query = graphql`
  query {
    allWordpressWpEvent {
      edges {
        node {
          id
          title
          acf {
            event_start_date
            event_end_date
          }
        }
      }
    },
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
          wordpress_id
        }
      }
    }
  }
`;
