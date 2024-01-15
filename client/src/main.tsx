import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {PersistGate} from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import {store} from './app/store'
import {persistStore} from "redux-persist"
let persister = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <PersistGate persistor={persister}>
      <App/>    
  </PersistGate>
  </Provider>
  
)