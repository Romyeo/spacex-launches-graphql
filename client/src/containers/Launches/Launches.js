import React, { Fragment } from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Header from '../../components/UI/Header/Header';
import LaunchItem from '../../components/LaunchItem/LaunchItem';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Launches.css';

const LAUNCHES = gql`
  query LaunchesQuery($sortBy: String, $sort: String) {
    launches(sortBy: $sortBy, sort: $sort) {
      details
      flight_number
      mission_name
      launch_date_unix
      launch_date_utc
      launch_success
    }
  }
`;

export default function Launches() {
  const { loading, data } = useQuery(LAUNCHES, {
    variables: {
      sortBy: 'launch_date_unix',
      sort: 'desc',
    }
  });

  return (
    <Fragment>
      <Header title="Launches" />
      <ul>
        {
          loading ?
            <Spinner /> :
            data.launches.map(launch => <LaunchItem key={launch.flight_number} {...launch} />)
        }
      </ul>
    </Fragment>
  )
}
