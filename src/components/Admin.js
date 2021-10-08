import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost/bitmaskot_test/",
});
function Admin() {
  const [users, setUsers] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(async () => {
    const list = await Axios.get("user-list.php");

    setUsers(list.data);
    console.log(users);
  }, []);
  return (
    <div className="userInfo">
      <table>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>BirthDate</th>
        </tr>
        {users.map((user, i) => (
          <tr key={i}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.bday}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Admin;
