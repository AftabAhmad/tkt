import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import PasskeyPage from './components/PasskeyPage';
import WhitelistPage from './components/WhitelistPage';
import ThankYouPage from './components/ThankYouPage';

// Lazy so the homepage copy ships in its own chunk, which the server only serves to verified visitors.
const HomePage = lazy(() => import('./components/HomePage'));

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000/api/v1' : '/api/v1';

export default function App() {
	const [verified, setVerified] = useState(false);
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/session`, { withCredentials: true })
			.then((res) => setVerified(Boolean(res.data?.success)))
			.catch(() => setVerified(false))
			.finally(() => setChecking(false));
	}, []);

	const path = window.location.pathname.replace(/\/+$/, '');
	if (path === '/request-whitelist') return <WhitelistPage />;
	if (path === '/thank-you') return <ThankYouPage />;

	if (checking) return <div className="min-h-screen" />;

	if (verified) {
		return (
			<Suspense fallback={<div className="min-h-screen" />}>
				<HomePage />
			</Suspense>
		);
	}

	return <PasskeyPage onVerified={() => setVerified(true)} />;
}
