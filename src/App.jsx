import { Provider } from "react-redux";

import store from "./redux/store";
import { GamePage } from "./views";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <GamePage />
        </div>
      </div>
    </Provider>
  );
};

export default App;
