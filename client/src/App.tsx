import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Agendamento from "./pages/Agendamento";
import MinhasConsultas from "./pages/MinhasConsultas";
import Dashboard from "./pages/Dashboard";
import { ROUTES } from "./const";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.INTEGRANTES} component={Integrantes} />
      <Route path={ROUTES.SOBRE} component={Sobre} />
      <Route path={ROUTES.FAQ} component={FAQ} />
      <Route path={ROUTES.CONTATO} component={Contato} />
      <Route path="/agendamento" component={Agendamento} />
      <Route path="/minhas-consultas" component={MinhasConsultas} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path={ROUTES.NOT_FOUND} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
