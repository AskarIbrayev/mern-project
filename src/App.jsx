import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import About from './pages/About';
import TextsPage from './pages/TextsPage';


function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route 
					path="/about"
					element={<About />}
				/>
				<Route 
					path="/texts"
					element={<TextsPage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}


export default App;
