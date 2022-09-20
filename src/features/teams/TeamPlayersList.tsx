import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { IPlayer } from './interfaces';

export interface ITeamPlayersListProps {
  items: IPlayer[];
  className?: string;
}

export function TeamPlayersList(props: ITeamPlayersListProps) {
  const { items = [], ...rest } = props;

  return (
    <ListGroup {...rest}>
      {items.map(player => (
        <ListGroup.Item key={player.id}>{player.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
