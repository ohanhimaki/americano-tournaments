import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

export default function connectToWs() {
  fetch(process.env.REACT_APP_apiurl + "/weatherforecast").then(x =>
    console.log(x)
  );

  fetch(process.env.REACT_APP_apiurl + "/tournament/gettest").then(x =>
    console.log(x)
  );

  const hubConnection = new HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_apiurl + "/ws")
    .build();
  hubConnection
    .start()
    .then(() => console.log("Connection started!"))
    .catch(err => console.log(err));

  hubConnection.on("sendToAll", (type: string, payload: string) => {
    console.log({ severity: type, summary: payload });
  });
  setTimeout(() => {
    hubConnection.invoke("SendMessage", "Olli", "moi");
  }, 3000);
}
