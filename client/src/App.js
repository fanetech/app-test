import React, { useEffect, useState } from "react";
import Routes from "./routers";
import { UidContext } from "./components/appContext";
import API_BASIC from "./components/utility/api.service";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";

function App(props) {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = async () => {
      await API_BASIC.get("/jwtid")
        .then((res) => {
          setUid(res.data.userId);
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid));
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
