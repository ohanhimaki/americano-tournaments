import React from "react";
import {NewTournamentForm} from "./NewTournamentForm";


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
      </div>
    </div>
  );
};
