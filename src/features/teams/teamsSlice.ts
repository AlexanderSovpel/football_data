import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { fetchTeam, fetchTeamMatches, fetchTeams } from "./teamsAPI";

export enum LOADING_STATUS {
  IDLE,
  LOADING,
  FAILED,
};

export interface TeamsState {
  items: any[];
  current: any;
  status: LOADING_STATUS;
}

const initialState: TeamsState = {
  items: [],
  current: null,
  status: LOADING_STATUS.IDLE,
};

export const getTeamsAsync = createAsyncThunk(
  'teams/fetchTeams',
  async () => {
    const { teams } = await fetchTeams();
    return teams;
  },
);
export const getTeamDetailsAsync = createAsyncThunk(
  'teams/fetchTeamDetails',
  async (id: string) => {
    const team = await fetchTeam(id);
    const { matches } = await fetchTeamMatches(id);

    if (team) {
      return { ...team, matches };
    }

    return null;
  },
);

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsAsync.pending, (state) => {
        state.status = LOADING_STATUS.LOADING;
      })
      .addCase(getTeamsAsync.fulfilled, (state, action) => {
        state.status = LOADING_STATUS.IDLE;
        state.items = action.payload;
      })
      .addCase(getTeamsAsync.rejected, (state) => {
        state.status = LOADING_STATUS.FAILED;
      })

      .addCase(getTeamDetailsAsync.pending, (state) => {
        state.status = LOADING_STATUS.LOADING;
      })
      .addCase(getTeamDetailsAsync.fulfilled, (state, action) => {
        state.status = LOADING_STATUS.IDLE;
        state.current = action.payload;
      })
      .addCase(getTeamDetailsAsync.rejected, (state, error) => {
        state.status = LOADING_STATUS.FAILED;
      });
    }
});

export const selectTeams = (state: RootState) => state.teams.items;
export const selectCurrentTeam = (state: RootState) => state.teams.current;
export const selectIsLoading = (state: RootState) => state.teams.status === LOADING_STATUS.LOADING;

export default teamsSlice.reducer;
