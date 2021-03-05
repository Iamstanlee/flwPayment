import React from "react";
import Flw from "./components/flw/flw";

function App() {
  return (
    <div>
      <Flw
        currency="USD"
        amount="15"
        success={(response) => {
          console.log(response);
        }}
        failed={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
}

export default App;
