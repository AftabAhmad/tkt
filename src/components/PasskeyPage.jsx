import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../images/tokenhousetoken-logo.webp';
import cloudLg from '../images/clouds.webp';
import cloudXs from '../images/cloud-xs.webp';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000/api/v1' : '/api/v1';

export default function PasskeyPage() {
	const [passkey, setPasskey] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [verified, setVerified] = useState(false);
	const [submitHovered, setSubmitHovered] = useState(false);
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 640);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handlePasskeyChange = (e) => {
		setPasskey(e.target.value);
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!passkey.trim()) {
			setError('Please enter your passkey');
			return;
		}

		setLoading(true);
		setError('');

		try {
			const response = await axios.post(`${API_BASE_URL}/verify-passkey`, { passkey });

			if (response.data?.success) {
				setVerified(true);
			} else {
				setError(response.data?.message || 'Invalid passkey');
			}
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid passkey. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (verified) {
		return (
			<iframe
				src="https://classy-cdkbd7wm.peachweb.site/"
				style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', border: 'none', zIndex: 9999 }}
				title="TokenHouseToken"
			/>
		);
	}

	return (
		<div className="min-h-screen relative" style={{ backgroundColor: '#25166B' }}>
			{/* Cloud background layer */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundImage: `url(${isDesktop ? cloudLg : cloudXs})`,
					backgroundPosition: isDesktop ? '-397.145px -690.044px' : 'center',
					backgroundSize: isDesktop ? '156.57% 221.563%' : 'cover',
					backgroundRepeat: 'no-repeat',
					opacity: 0.5,
					mixBlendMode: 'color-burn',
					filter: 'blur(10px)',
					pointerEvents: 'none',
				}}
			/>
			{/* Page content */}
			<div
				className="min-h-screen flex items-center justify-center py-16 px-4 relative"
			>
				{/* Card */}
				<div className="w-full" style={{ maxWidth: '32rem' }}>
					<div
						className="overflow-hidden"
						style={{
							borderRadius: '22px',
							border: '0.3px solid rgba(231, 240, 255, 0.52)',
							background: 'rgba(0, 0, 0, 0.08)',
							backdropFilter: 'blur(2px)',
						}}
					>
						{/* Card body - centered content */}
						<div
							className="px-6 sm:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center"
						>
							{/* Logo placeholder */}
							<div className="mb-8">
								<div
									className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto"
								>
									<img
										src={logo}
										alt="Logo"
										className="h-10 sm:h-12 object-contain"
										onError={(e) => {
											e.target.style.display = 'none';
											const fallback = document.createElement('span');
											fallback.textContent = 'TKT';
											fallback.style.color = '#FFFFFF';
											fallback.style.fontSize = '32px';
											fallback.style.fontWeight = 'bold';
											e.target.parentElement.appendChild(fallback);
										}}
									/>
								</div>
							</div>

							{/* Heading */}
							<h1
								className="mb-8 text-center"
								style={{
									color: '#FFFFFF',
									fontFamily: '"DM Sans", sans-serif',
									fontSize: 'max(34px, min(5vw, 42px))',
									fontWeight: 400,
									lineHeight: '114%',
									letterSpacing: 'max(-1.02px, min(-0.76vw, -1.26px))',
								}}
							>
								This area is restricted to<br />invited guests
							</h1>

							{/* Form */}
							<form onSubmit={handleSubmit} className="w-full space-y-6">

								{/* Passkey Input */}
								<div>
									<input
										type="password"
										value={passkey}
										onChange={handlePasskeyChange}
										placeholder="Enter passkey"
										className="w-full px-4 py-4 text-center border-2 rounded-full bg-transparent focus:outline-none focus:ring-0 transition-colors"
										style={{
											borderColor: 'rgba(255, 255, 255, 0.3)',
											color: '#FFFFFF',
											fontFamily: '"DM Sans", sans-serif',
											fontSize: '16px',
											fontWeight: 700,
											lineHeight: '100%',
											letterSpacing: '-0.32px',
										}}
										onFocus={(e) => {
											e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
										}}
										disabled={loading}
									/>
								</div>

								{/* Error message */}
								{error && (
									<p className="text-sm text-red-400 text-center">{error}</p>
								)}

								{/* Submit button */}
								<div className="pt-4">
									<button
										type="submit"
										disabled={loading || !passkey.trim()}
										className="w-full py-4 px-6 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
										style={{
											backgroundColor: submitHovered && !loading && passkey.trim() ? '#000000' : '#FFFFFF',
											color: submitHovered && !loading && passkey.trim() ? '#FFFFFF' : '#25166B',
											fontFamily: '"DM Sans", sans-serif',
											fontSize: '16px',
											fontWeight: 700,
											lineHeight: '100%',
											letterSpacing: '-0.32px',
										}}
										onMouseEnter={() => setSubmitHovered(true)}
										onMouseLeave={() => setSubmitHovered(false)}
									>
										{loading ? 'Verifying...' : 'Enter Passkey'}
									</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
