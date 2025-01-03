import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import BookingSummary from './Components/Confirmations'
import AllBookingTable from './Components/AllBookingTable'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/confirm/:id' element={<BookingSummary/>} />
        <Route path='/all' element={<AllBookingTable/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
