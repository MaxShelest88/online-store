import { useContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import { Context } from './components/Providers';
import { check } from './http/userAPI';
import Spinner from 'react-bootstrap/Spinner';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  return <AppRouter />;
});

export default App;
