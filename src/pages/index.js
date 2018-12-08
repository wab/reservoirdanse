import React from 'react'
// import { Link } from 'gatsby';
import moment from 'moment';

// import Layout from '../components/layout'
// import Image from '../components/image'

const IndexPage = ({data}) => {
  const events = data.allWordpressWpEvent.edges.filter(({node : {acf}}) => moment(acf.event_start_date).isSameOrAfter(moment()));
  return (
    <div>
      <h1>Agenda</h1>
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
    }
  }
`;
