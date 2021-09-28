import { Provider } from 'react-redux';
import { store } from './state';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.json';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './Pages/LoginPage';
import BoardPage from './Pages/BoardPage';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route exact path='/board' component={BoardPage}></Route>
          <Route exact path='/' component={LoginPage}></Route>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
