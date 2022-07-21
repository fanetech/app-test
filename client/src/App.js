import React, { useEffect, useState } from "react";
import Routes from "./routers";
import { UidContext } from "./components/appContext";
import API_BASIC from "./components/utility/api.service";

function App(props) {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      API_BASIC.get("/jwtid")
        .then((res) => {
          setUid(res.data);
          console.log(uid);
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
  }, []);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
