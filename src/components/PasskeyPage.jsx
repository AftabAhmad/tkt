import { useState } from 'react';
import axios from 'axios';
import logoMark from '../images/logo-mark-white.svg';
import cloudLg from '../images/clouds.webp';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000/api/v1' : '/api/v1';

const NAVY = '#25166B';

// Decorative placeholder shapes only. No real homepage content lives here, so nothing
// readable can be extracted from the DOM or a screenshot of this page.
const GHOST_BLOCKS = [
	{ top: '4%', left: '5%', w: '7%', h: '4%', r: 8 },
	{ top: '4%', right: '5%', w: '18%', h: '4%', r: 44 },
	{ top: '16%', left: '12%', w: '76%', h: '9%', r: 12 },
	{ top: '28%', left: '20%', w: '60%', h: '9%', r: 12 },
	{ top: '44%', left: '5%', w: '24%', h: '3%', r: 6 },
	{ top: '44%', right: '5%', w: '30%', h: '3%', r: 6 },
	{ top: '52%', left: '18%', w: '64%', h: '14%', r: 16 },
	{ top: '72%', left: '5%', w: '20%', h: '10%', r: 12 },
	{ top: '72%', left: '36%', w: '34%', h: '2.5%', r: 6 },
	{ top: '78%', left: '36%', w: '28%', h: '2.5%', r: 6 },
	{ top: '90%', left: '5%', w: '90%', h: '6%', r: 20 },
];

export default function PasskeyPage({ onVerified }) {
	const [passkey, setPasskey] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [submitHovered, setSubmitHovered] = useState(false);

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
			const response = await axios.post(`${API_BASE_URL}/verify-passkey`, { passkey }, { withCredentials: true });

			if (response.data?.success) {
				onVerified();
			} else {
				setError(response.data?.message || 'Invalid passkey');
			}
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid passkey. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Blurred decorative backdrop (placeholder shapes, no real content) */}
			<div aria-hidden className="pointer-events-none absolute inset-0 select-none" style={{ filter: 'blur(16px)', transform: 'scale(1.08)' }}>
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url(${cloudLg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center top',
						opacity: 0.35,
						mixBlendMode: 'soft-light',
					}}
				/>
				{GHOST_BLOCKS.map((b, i) => (
					<div
						key={i}
						className="absolute"
						style={{
							top: b.top,
							left: b.left,
							right: b.right,
							width: b.w,
							height: b.h,
							borderRadius: b.r,
							backgroundColor: NAVY,
							opacity: i % 3 === 0 ? 0.32 : 0.16,
						}}
					/>
				))}
			</div>

			{/* Card */}
			<div className="min-h-screen flex items-center justify-center py-16 px-4 relative">
				<div
					className="w-full flex flex-col items-center justify-between gap-[48px] px-[24px] sm:px-[35px] py-[40px] sm:py-[49px]"
					style={{
						maxWidth: '518px',
						borderRadius: '22px',
						border: '0.3px solid #FFFFFF',
						background: 'rgba(37, 22, 107, 0.9)',
						backdropFilter: 'blur(2px)',
						boxShadow: '16px 18px 32.4px rgba(0, 0, 0, 0.33)',
					}}
				>
					<div className="flex flex-col items-center gap-[37px] w-full">
						<div className="flex items-center gap-[10px]">
							<img src={logoMark} alt="" className="h-[43px] w-auto" />
							<p
								className="font-['JetBrains_Mono'] text-white text-[12px] leading-none tracking-[1.08px] uppercase"
								style={{ lineHeight: 1.1 }}
							>
								Token<br />House<br />Token
							</p>
						</div>
						<h1
							className="text-center text-white"
							style={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: 'max(30px, min(8vw, 42px))',
								fontWeight: 400,
								lineHeight: 1.14,
								letterSpacing: '-0.03em',
								fontVariationSettings: '"opsz" 14',
							}}
						>
							This area is restricted to invited guests.
						</h1>
					</div>

					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-[15px]">
						<input
							type="password"
							value={passkey}
							onChange={handlePasskeyChange}
							placeholder="0 0 0 0"
							autoComplete="off"
							disabled={loading}
							className="w-full h-[61px] px-4 text-center bg-transparent outline-none placeholder:text-white placeholder:opacity-100"
							style={{
								border: '0.4px solid #FFFFFF',
								borderRadius: '61px',
								backgroundColor: 'rgba(51, 51, 56, 0.14)',
								backdropFilter: 'blur(1.5px)',
								color: '#FFFFFF',
								fontFamily: '"DM Sans", sans-serif',
								fontSize: '16px',
								fontWeight: 700,
								letterSpacing: '-0.32px',
							}}
						/>

						{error && <p className="text-sm text-red-300 text-center">{error}</p>}

						<button
							type="submit"
							disabled={loading || !passkey.trim()}
							onMouseEnter={() => setSubmitHovered(true)}
							onMouseLeave={() => setSubmitHovered(false)}
							className="w-full h-[60px] rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								backgroundColor: submitHovered && !loading && passkey.trim() ? '#000000' : '#FFFFFF',
								color: submitHovered && !loading && passkey.trim() ? '#FFFFFF' : NAVY,
								fontFamily: '"DM Sans", sans-serif',
								fontSize: '16px',
								fontWeight: 700,
								letterSpacing: '-0.32px',
							}}
						>
							{loading ? 'Verifying...' : 'Enter Passkey'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
