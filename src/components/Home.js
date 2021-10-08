import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";

// Importing the Login & Register Componet
import Login from "./Login";
import Register from "./Register";

function Home() {
  const { rootState, logoutUser, changePassword } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const [togglePas, setTogglepas] = useState(false);

  const initialState = {
    user: {
      id: "",
      password: "",
    },
  };
  const [state, setState] = useState(initialState);

  const chngPas = () => {
    setTogglepas(!togglePas);
  };
  const onChangeValue = (e) => {
    setState({
      user: {
        ...state.user,
        id: theUser.id,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await changePassword(state.user);
    if (data.success) {
      console.log(data);
      setState({
        ...initialState,
      });
    } else {
      console.log(data);
    }
  };
  // If user Logged in
  if (isAuth) {
    return (
      <div className="userInfo">
        <div className="_img">
          <span role="img" aria-label="User Image">
            👦
          </span>
        </div>
        <h1>
          Name: {theUser.firstName} {theUser.lastName}
        </h1>
        <h2>Address: {theUser.address}</h2>
        <h2>Phone: {theUser.phone}</h2>
        <h2>BirthDate: {theUser.bday}</h2>
        <div className="_email">
          <h3> Email: {theUser.email}</h3>
        </div>
        <button onClick={logoutUser}>Logout</button>
        <button
          onClick={() => {
            chngPas();
          }}
        >
          Change Password
        </button>
        {togglePas ? (
          <form style={{ marginTop: "10px" }} onSubmit={submitForm} noValidate>
            <div className="form-control">
              <label>PassWord: </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={state.user.password}
                onChange={onChangeValue}
              />
            </div>
            <div className="form-control">
              <button type="submit">Change</button>
            </div>
          </form>
        ) : null}
      </div>
    );
  }
  // Showing Login Or Register Page According to the condition
  else if (showLogin) {
    return <Login />;
  } else {
    return <Register />;
  }
}

export default Home;
