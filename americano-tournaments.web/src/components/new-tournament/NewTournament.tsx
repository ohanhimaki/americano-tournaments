import React from "react";
import {NewTournamentForm} from "./NewTournamentForm";
import {ImportTournamentForm} from "./ImportTournamentForm";


interface Props {
    selectTournament: Function;
}

export const NewTournament = ({selectTournament}:Props) => {
    return (
        <div className="bg-gray-700">
            <div className="m-auto">
                <NewTournamentForm
                    selectTournament={selectTournament}
                ></NewTournamentForm>
                <ImportTournamentForm
                    selectTournament={selectTournament}
                ></ImportTournamentForm>
      </div>
    </div>
  );
};
