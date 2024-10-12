// Dashboard.tsx
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth_store);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
};

export default Dashboard;
