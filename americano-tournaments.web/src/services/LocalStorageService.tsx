import React from 'react';
import tournamentState from "../services/tournamentState";

export default  class LocalStorageService {
    constructor() {
        console.log('Tulee tänne')
        localStorage.setItem('testi', 'toimii');
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
        let currentTournaments: tournamentState[] = this.GetTournaments();
        currentTournaments = currentTournaments.filter(x => x.name != tournament.name)
        currentTournaments = currentTournaments.concat([tournament]);
        console.log(currentTournaments);
        this.SetTournaments(currentTournaments);
    }

    // static SetTournaments(tournaments: tournamentState[]) {
    //     SetTournaments(tournaments);
    // }
    // static GetTournaments() {
    //     var tournaments = GetTournaments();
    //     console.log(tournaments);
    // }
}
// export function GetTournaments() {
//     localStorage.getItem('tournaments')
// }
//
// export function SetTournaments(tournaments:tournamentState[]) {
//     localStorage.setItem('tournaments', tournaments.toString());
// }
