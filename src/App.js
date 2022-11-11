import { Switch, Route, Link, Redirect, useParams } from 'react-router-dom';

const users = [
  { id: 1, name: 'user 1' },
  { id: 2, name: 'user 2' },
  { id: 3, name: 'user 3' },
  { id: 4, name: 'user 4' },
  { id: 5, name: 'user 5' },
];

const Main = () => {
  return (
    <>
      <h2>Home page</h2>
      <Link to="users">User list page</Link>
    </>
  );
};

const UsersLayout = () => {
  return (
    <>
      <h2>Users Layout</h2>
      <Switch>
        <Route path="/users/:userId/edit" component={EditUserPage} />
        <Route path="/users/:userId/profile" component={UserPage} />
        <Redirect from="/users/:userId" to="/users/:userId/profile" />
        <Route path="/" component={UserListPage} />
      </Switch>
    </>
  );
};

const UserListPage = () => {
  return (
    <>
      <h2>User list page</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/">Home page</Link>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>User Page</h2>
      <ul>
        <li>
          <Link to="/users">User list page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>UserId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  const nextUser = (Number(userId) + 1).toString();
  return (
    <>
      <h2>Edit user page</h2>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${nextUser}/profile`}>Another user</Link>
        </li>
        <li>
          <Link to="/users">User List Page</Link>
        </li>
      </ul>
    </>
  );
};

function App() {
  return (
    <>
      <h1>App</h1>
      <Switch>
        <Route path="/users" component={UsersLayout} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
