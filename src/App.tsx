import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import "./App.css";
import EnterMobile from "./pages/EnterMobile";
import EnterOtp from "./pages/EnterOtp";
import Home from "./pages/Home";
import Illustrations from "./pages/Illustrations";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Illustrations />} />
				<Route path="/enter-mobile" element={<EnterMobile />} />
				<Route path="/enter-otp" element={<EnterOtp />} />
				<Route path="/home" element={<Home />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
