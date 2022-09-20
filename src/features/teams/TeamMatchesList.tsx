import React from 'react';

import { IMatch } from './interfaces';

export interface ITeamMatchesListProps {
  items: IMatch[];
  teamId?: number;
}

export function TeamMatchesList(props: ITeamMatchesListProps) {
  const { items = [], teamId } = props;

  return (
    <ul>
      {items.map(match => {
        const rivalTeam = match.homeTeam.id === teamId ? match.awayTeam : match.homeTeam;
        const matchDate = new Date(match.utcDate).toLocaleString();

        return (
          <li key={match.id}>
            {matchDate} - {match.competition.name} - {rivalTeam.name}
          </li>
        );
      })}
    </ul>
  );
}
