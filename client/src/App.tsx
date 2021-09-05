import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.json';

import LoginPage from './Pages/LoginPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LoginPage />
    </ThemeProvider>
  );
};

export default App;
