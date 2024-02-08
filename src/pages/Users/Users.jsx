import UserItem from "../../components/UserItem/UserItem";
import { GET_USERS_API } from "../../constants";
import useFetch from "../../hooks/useFetch";
import "./User.css";

const Users = () => {
  const { isLoading, isError, data: users } = useFetch(GET_USERS_API);

  if (isLoading) return <h1>Loading ...</h1>;

  return (
    <div>
      <h1>List of users:</h1>
      {isError && <p>Failed to fetch data</p>}
      {!!users &&
        users.map((user) => (
          <div className="user-container" key={user.id}>
            <UserItem user={user} />
          </div>
        ))}
    </div>
  );
};

export default Users;
