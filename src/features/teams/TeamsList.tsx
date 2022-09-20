import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ITeam } from './interfaces';
import { getTeamsAsync, selectIsLoading, selectTeams } from './teamsSlice';

import { Preloader } from '../../components/Preloader';

export interface ITeamsListProps {
  items: ITeam[];
}

export function TeamsList(props: ITeamsListProps) {
  const { items } = props;

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link to={`/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function TeamsListContainer() {
  const items = useAppSelector(selectTeams);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeamsAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <TeamsList items={items} />
  );
}
