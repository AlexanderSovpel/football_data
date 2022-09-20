import React from 'react';

import { IMatch } from './interfaces';

import ListGroup from 'react-bootstrap/ListGroup';

export interface ITeamMatchesListProps {
  items: IMatch[];
  teamId?: number;
  className?: string;
}

export function TeamMatchesList(props: ITeamMatchesListProps) {
  const { items = [], teamId, ...rest } = props;

  return (
    <ListGroup {...rest}>
      {items.map(match => {
        const rivalTeam = match.homeTeam.id === teamId ? match.awayTeam : match.homeTeam;
        const matchDate = new Date(match.utcDate).toLocaleString();

        return (
          <ListGroup.Item key={match.id}>
            {matchDate} - {match.competition.name} - {rivalTeam.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
