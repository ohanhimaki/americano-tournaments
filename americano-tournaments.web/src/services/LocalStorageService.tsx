import React from 'react';
import tournamentState from "../services/tournamentState";

export default  class LocalStorageService {
    constructor() {
        console.log('Tulee tänne')
        localStorage.setItem('testi', 'toimii');
    }
     GetTournaments() {
        localStorage.getItem('tournaments')
    }
     SetTournaments(tournaments:tournamentState[]) {
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
    }

    static SetTournaments(tournaments: tournamentState[]) {
        SetTournaments(tournaments);
    }
}
export function GetTournaments() {
    localStorage.getItem('tournaments')
}

export function SetTournaments(tournaments:tournamentState[]) {
    localStorage.setItem('tournaments', tournaments.toString());
}
