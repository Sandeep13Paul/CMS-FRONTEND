// src/App.jsx
import { ThemeProvider } from './Context/ThemeContext.jsx';
import AppRoutes from './AppRoutes.jsx';
import { UserProvider } from './Context/userContext.jsx';

function App() {

// Now you can use axios throughout your application

  return (
    <ThemeProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
