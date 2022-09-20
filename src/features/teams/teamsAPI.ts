import { Axios } from 'axios';

import { ITeam } from './interfaces';
import { MATCHES_LIMIT, MATCH_STATUS } from './constants';

const FootballAPI = new Axios({
  headers: {
    'Content-Type': 'application/json',
  },
});
// For some reason axios does not parse JSON automatically.
FootballAPI.interceptors.response
  .use(response => JSON.parse(response.data));

export function fetchTeams(): Promise<any> {
  return FootballAPI.get('/teams');
}

export function fetchTeam(id: string): Promise<ITeam|undefined> {
  return FootballAPI.get(`/teams/${id}`);
}

export function fetchTeamMatches(id: string): Promise<any> {
  return FootballAPI.get(`/teams/${id}/matches`, {
    // Get up to 10 last scheduled or timed matches.
    params: { limit: MATCHES_LIMIT, status: MATCH_STATUS },
  });
}
