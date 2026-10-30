import Hero from "./components/Hero";
import SmoothScrollProvider from "./context/SmoothScrollProvider";

function App() {
  return (
    <SmoothScrollProvider>
      <div className="main-container overflow-x-hidden">
        <Hero />
        <section className="h-screen "></section>
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
