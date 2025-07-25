import { Game } from "./components/game/Game";
import { ToastProvider } from "./components/ui/toast/toast-context/ToastProvider";

export const App = () => {
  return (
    <ToastProvider>
      <main className="page">
        <Game />
      </main>
    </ToastProvider>
  );
};
