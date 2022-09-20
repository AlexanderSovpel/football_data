import React from 'react';

import { IPlayer } from './interfaces';

export interface ITeamPlayersListProps {
  items: IPlayer[];
}

export function TeamPlayersList(props: ITeamPlayersListProps) {
  const { items = [] } = props;

  return (
    <ul>
      {items.map(player => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
}
