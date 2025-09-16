
import { Outlet } from 'react-router'
import CommonLayout from './components/ui/layout/CommonLayout'


function App() {


  return (
    <div>
      <CommonLayout>
        <Outlet/>
      </CommonLayout>
    </div>
  )
}

export default App
