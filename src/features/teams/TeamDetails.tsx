import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTeamDetailsAsync, selectCurrentTeam, selectIsLoading } from "./teamsSlice";
import { ITeamDetails } from "./interfaces";

import { TeamPlayersList } from "./TeamPlayersList";
import { TeamMatchesList } from "./TeamMatchesList";
import { Preloader } from "../../components/Preloader";

export interface ITeamDetailsProps {
  team: ITeamDetails;
}

export function TeamDetails(props: ITeamDetailsProps) {
  const { team } = props;

  return (
    <div>
      <p>{team?.name}</p>
      <img src={team?.crest} alt="Team Logo" />
      <p>Players:</p>
      <TeamPlayersList items={team?.squad} />
      <p>Upcoming matches:</p>
      <TeamMatchesList items={team?.matches} teamId={team?.id} />
    </div>
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
    <TeamDetails team={team} />
  );
}
