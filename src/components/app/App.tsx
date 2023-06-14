import Header from '../header/Header'
import SchedulePage from '../../pages/schedule/SchedulePage'

// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";

import { AppointmentContextProvider } from '../../context/appointments/AppointmentContext'
import './app.scss'

function App() {
  return (
    <AppointmentContextProvider>
      <main className="board">
        <Header />
        <SchedulePage />
        {/* <HistoryPage /> */}
        {/* <CancelModal /> */}
      </main>
    </AppointmentContextProvider>
  )
}

export default App
