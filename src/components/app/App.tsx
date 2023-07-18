import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { AppointmentContextProvider } from '../../context/appointments/AppointmentContext'

import Header from '../header/Header'
import SchedulePage from '../../pages/schedule/SchedulePage'
import HistoryPage from '../../pages/history/HistoryPage'
import Page404 from '../../pages/page404/Page404'

import './app.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <SchedulePage />,
      },
      {
        path: 'schedule',
        element: <SchedulePage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

function Root() {
  return (
    <main className="board">
      <Header />
      <AppointmentContextProvider>
        <Outlet />
      </AppointmentContextProvider>
    </main>
  )
}

export default App
