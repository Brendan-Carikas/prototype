import React from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import Themeroutes from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthBackgroundProvider } from "./contexts/AuthBackgroundContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AIAssistantsProvider } from "./contexts/AIAssistantsContext";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
  const routing = useRoutes(Themeroutes);

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <AuthProvider>
          <AuthBackgroundProvider>
            <NotificationProvider>
              <AIAssistantsProvider>
                <CssBaseline />
                {routing}
              </AIAssistantsProvider>
            </NotificationProvider>
          </AuthBackgroundProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
