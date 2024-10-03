import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../helpers/types";
import { handleSearch } from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";

export const Search = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!text.trim()) {
      setUsers([]);
    } else {
      handleSearch(text).then((response) => {
        setUsers(response.payload as IUser[]);
      });
    }
  }, [text]);

  return (
    <div style={{ padding: 5 }}>
      <h3>Search</h3>
      <input
        placeholder="search for a friends..."
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {users.length > 0 && <small>{users.length} users found!</small>}
      <div className="list">
        {users.map((user) => (
          <div key={user.id}>
            <img src={user.picture ? BASE + user.picture : DEF} />
            <p>
              {user.name} {user.surname}
            </p>
            <Link to={"/profile/" + user.id}>account</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
