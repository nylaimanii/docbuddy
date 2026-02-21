import { useState, useEffect } from "react";
import PopScreen from "./components/popScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <PopScreen />}

      {!showSplash && (
        <div className="min-h-screen flex items-center justify-center">
          <h1>Main App</h1>
        </div>
      )}
    </>
  );
}

export default App;