import React from 'react';
import tournamentState from "../services/tournamentState";

export default  class LocalStorageService {
    constructor() {
    }
     GetTournaments() {
         var tournamentJson = localStorage.getItem('tournaments');
        if (tournamentJson){
        var tournaments = JSON.parse(tournamentJson);
        return tournaments;
        }
        

    }
     SetTournaments(tournaments:tournamentState[]) {
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
    }
    UpdateTournament(tournament:tournamentState) {
        let currentTournaments: tournamentState[] = [];
         var currentTournamentsTmp = this.GetTournaments();
        if(currentTournamentsTmp !== undefined){
            currentTournaments = currentTournaments.concat(currentTournamentsTmp)
        }
            
        currentTournaments = currentTournaments.filter(x => x.Name != tournament.Name)
        currentTournaments = currentTournaments.concat([tournament]);
        this.SetTournaments(currentTournaments);
    }

     DeleteTournament(tournament: tournamentState) {
        let currentTournaments: tournamentState[] = [];
        var currentTournamentsTmp = this.GetTournaments();
        if(currentTournamentsTmp !== undefined){
            currentTournaments = currentTournaments.concat(currentTournamentsTmp)
        }

        currentTournaments = currentTournaments.filter(x => x.Name != tournament.Name)
        this.SetTournaments(currentTournaments);

    }
}
