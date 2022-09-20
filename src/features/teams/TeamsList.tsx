import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ITeam } from './interfaces';
import { getTeamsAsync, selectIsLoading, selectTeams } from './teamsSlice';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Preloader } from '../../components/Preloader';

export interface ITeamsListProps {
  items: ITeam[];
}

export function TeamsList(props: ITeamsListProps) {
  const { items = [] } = props;

  return (
    <ListGroup>
      {items.map(item => (
        <Link key={item.id} to={`/${item.id}`}>
          <ListGroup.Item>
            {item.name}
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
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
    <Container className="py-3">
      <h1>Teams</h1>
      <TeamsList items={items} />
    </Container>
  );
}
