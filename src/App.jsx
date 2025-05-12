
import { SnackbarProvider } from 'notistack'
import './App.css'
import WalletBalance from './components/WalletBalance'

function App() {


  return (
    <>
    <SnackbarProvider maxSnack={3}>
      <WalletBalance />
      </SnackbarProvider>
    </>
  )
}

export default App
