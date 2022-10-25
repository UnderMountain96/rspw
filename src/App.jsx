import { Config, Arena, Game } from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Config />
        <Arena />
        <Game />
      </div>
    </div>
  );
};

export default App;
