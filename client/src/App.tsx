import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { LoginPage, BoardPage, NotFound } from './Pages';
import { store } from './state';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme.json';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Switch>
            <Route exact path='/board' component={BoardPage} />
            <Route path='/' component={LoginPage} />
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
