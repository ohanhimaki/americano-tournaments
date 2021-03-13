import React from "react";

interface Props {
    selectTournament: Function;
}
export const ExistingTournaments = ({selectTournament}:Props) => {
    return (
    <div className="bg-gray-700">
        <div className="m-auto">
            <div className="m-auto w-full flex flex-row flex-wrap justify-center items-start">
                <div className=" m-auto bg-gray-800 text-gray-300 rounded-lg py-8 my-8 xl:w-6/12 md:w-8/12 w-10/12">
                    TOIMIIKO TÄTÄ
                    </div>
            </div>
        </div>
    </div>
            )
};