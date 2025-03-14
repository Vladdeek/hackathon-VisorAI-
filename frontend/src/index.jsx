import { createRoot } from 'react-dom/client'
import './style/index.css'
import MainPage from './pages/MainPage'

createRoot(document.getElementById('root')).render(
	<>
		<MainPage />
	</>
)
