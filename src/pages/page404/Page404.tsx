import { useNavigate } from 'react-router-dom'

import Error from '../../components/error/Error'

import './page404.scss'

const Page404 = () => {
  const navigate = useNavigate()

  return (
    <div className="page404">
      <Error />
      <h1>This page was not found</h1>
      <button className="page404__btn" onClick={() => navigate(-1)}>
        Back to previous page
      </button>
    </div>
  )
}

export default Page404
