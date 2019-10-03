import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { RED, GREEN, YELLOW } from '../../constants/colors';
import statusByColor from '../../constants/statusByColor';

import Card from '../../components/UI/Card/Card';
import Header from '../../components/UI/Header/Header';
import Spinner from '../../components/UI/Spinner/Spinner';
import ColorizedErrorText from '../../components/UI/ColorizedErrorText/ColorizedErrorText';

import rocketImg from '../../images/rocket.png';
import './Launch.css';
import Button from '../../components/UI/Button/Button';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      details
      flight_number
      launch_success
      launch_date_unix
      launch_date_utc
      mission_name
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function Launch(props) {
  const { match, history } = props;
  const id = match.params.id;
  const { loading, data } = useQuery(LAUNCH_QUERY, {
    variables: {
      flight_number: Number(id)
    }
  });

  const header = <Header title={`Launch - Flight number ${id}`} />

  if (loading || !data) {
    return (
      <Fragment>
        {header}
        <Spinner />
      </Fragment>
    )
  }

  const click = (e) => {
    e.preventDefault();
    history.goBack();
  }

  const {
    details,
    launch_date_unix,
    launch_date_utc,
    launch_success,
    mission_name,
    rocket,
  } = data.launch;

  const {
    rocket_id,
    rocket_name,
    rocket_type,
  } = rocket;

  const formattedLaunchDate = moment(launch_date_utc).format('LLLL');
  const currentDate = moment().endOf('day').unix();

  let color = launch_success ? GREEN : RED;
  color = launch_date_unix >= currentDate ? YELLOW : color;

  return (
    <Fragment>
      {header}
      <h1>Mission Name: {' '}
        <ColorizedErrorText color={color}>
          {mission_name}
        </ColorizedErrorText>
      </h1>

      <p className="details">{details}</p>

      <Card
        content={
          <div className="rocket-container">
            <img src={rocketImg} alt="rocket-icon" />
            <div className="rocket-info">
              <h3>Name: {rocket_name}</h3>
              <div className="rocket-footer">
                <p>ID: {rocket_id}</p>
                <p>Type: {rocket_type}</p>
              </div>
            </div>
          </div>
        }
      />

      <div className="footer">
        <p>{formattedLaunchDate}</p>
        <p>
          Status: {' '}
          <ColorizedErrorText color={color}>
            {statusByColor[color]}
          </ColorizedErrorText>
        </p>
      </div>

      <div className="options-container">
        <Button content="Go back" click={click} />
      </div>
    </Fragment>
  )
}