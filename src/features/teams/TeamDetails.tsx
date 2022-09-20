import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTeamDetailsAsync, selectCurrentTeam, selectIsLoading } from "./teamsSlice";
import { ITeamDetails } from "./interfaces";

import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import { TeamPlayersList } from "./TeamPlayersList";
import { TeamMatchesList } from "./TeamMatchesList";
import { Preloader } from "../../components/Preloader";

export interface ITeamDetailsProps {
  team: ITeamDetails;
}

export function TeamDetails(props: ITeamDetailsProps) {
  const { team } = props;

  return (
    <React.Fragment>
      <h1>{team?.name}</h1>
      <Image src={team?.crest} alt="Team Logo" className="d-block mx-auto mb-3" />
      <h3>Players</h3>
      <TeamPlayersList items={team?.squad} className="mb-3" />
      <h3>Upcoming matches</h3>
      <TeamMatchesList items={team?.matches} teamId={team?.id} />
    </React.Fragment>
  );
}

export default function TeamDetailsContainer() {
  const team = useAppSelector(selectCurrentTeam);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(getTeamDetailsAsync(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Container className="py-3">
      <TeamDetails team={team} />
    </Container>
  );
}
