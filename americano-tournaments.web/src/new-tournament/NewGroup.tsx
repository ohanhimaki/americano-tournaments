import React from "react";

export const NewGroup = () => {
  function asdf() {
    console.log(names);
  }

  function handleChange(event: any) {
    console.log(event.target.value);
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    stringSplit(event.target.Names.value);
  }

  function stringSplit(stringSplit: string, splitwith: string = "\n") {
    var players: Array<string> = stringSplit.split("\n");
    generateMatches(players);
  }

  interface Match {
    t1p1: string;
    t1p2: string;
    t2p1: string;
    t2p2: string;
  }

  function generateMatches(players: Array<string>) {
    console.log(players);

    var Matches: Match[] = [];
  }

  let names = `test1
  test2
  test3
  test4
  test5
  test6
  ptest7
  test8`;
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex-col flex m-8">
        <label htmlFor="">
          Names:
          <textarea
            name="Names"
            defaultValue={names}
            onChange={handleChange}
            rows={8}
          ></textarea>
        </label>
        <label htmlFor="">
          Rounds:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          :<input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <label htmlFor="">
          Names:
          <input type="text" name="name"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <button onClick={asdf}>paina</button>
    </div>
  );
};
