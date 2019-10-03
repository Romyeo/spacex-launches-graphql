import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { GREEN, RED, YELLOW } from '../../constants/colors';

import Card from '../UI/Card/Card';
import Indicator from '../UI/Indicator/Indicator';
import ColorizedErrorText from '../UI/ColorizedErrorText/ColorizedErrorText';

import './LaunchItem.css';

export default function LaunchItem(props) {
  const {
    details,
    flight_number,
    launch_date_unix,
    launch_date_utc,
    launch_success,
    mission_name,
  } = props;

  const formattedLaunchDate = moment(launch_date_utc).format('LLLL');
  const currentDate = moment().endOf('day').unix();

  let color = launch_success ? GREEN : RED;
  color = launch_date_unix >= currentDate ? YELLOW : color;

  const mission = (
    <Fragment>
      Mission: {' '}
      <ColorizedErrorText style={{ color }}>
        {mission_name}
      </ColorizedErrorText>
    </Fragment>
  );

  const indicator = (
    <Indicator
      size={10}
      color={color}
    />
  );

  return (
    <li>
      <Link to={`/launches/${flight_number}`}>
        <Card
          header={mission}
          option={indicator}
          content={details}
          footerLeft={formattedLaunchDate}
          footerRight={flight_number}
        />
      </Link>
    </li>
  )
}