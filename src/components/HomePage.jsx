import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import useInView from '../hooks/useInView';
import logoMark from '../images/home/logo-mark.svg';
import logoMarkFooter from '../images/home/logo-mark-footer.svg';
import arrowDownCircle from '../images/home/arrow-down-circle.svg';
import ellipse from '../images/home/ellipse.svg';
import lineDivider from '../images/home/line-divider.svg';
import iconIssuer from '../images/home/icon-issuer.svg';
import iconRealasset from '../images/home/icon-realasset.svg';
import iconCoupon from '../images/home/icon-coupon.svg';
import iconEntry from '../images/home/icon-entry.svg';
import iconDistribution from '../images/home/icon-distribution.svg';
import iconExit from '../images/home/icon-exit.svg';
import iconPlus from '../images/home/icon-plus.svg';
import iconRadarLarge from '../images/home/icon-radar-large.svg';

const VAULT_URL = 'https://tkt-vault.com/';
const RESEARCH_URL = 'https://research.tokenhousetoken.com/';
const WHITELIST_PATH = '/request-whitelist';

const NAVY = '#25166B';
const INK = '#1E1E21';
const GREY = '#8F8F8F';

function heroClamp(minPx, maxPx, vw) {
	return `max(${minPx}px, min(${vw}vw, ${maxPx}px))`;
}

function Container({ children, className = '' }) {
	return (
		<div className={`w-full max-w-[1311px] mx-auto px-6 sm:px-10 lg:px-0 ${className}`}>
			{children}
		</div>
	);
}

function VaultButton({ children, className = '', delay = 0, href = VAULT_URL, external = true, compact = false }) {
	return (
		<Reveal delay={delay} y={14} duration={700}>
			<a
				href={href}
				{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				className={`vault-btn group inline-flex items-center justify-center ${compact ? 'gap-[6px] h-[40px] px-[14px] sm:gap-[10px] sm:h-[47px] sm:px-[36px]' : 'gap-[10px] h-[47px] px-[28px] sm:px-[36px]'} py-[10px] rounded-[44px] border-[0.3px] border-solid border-white backdrop-blur-[5.7px] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`}
				style={{
					backgroundImage:
						'linear-gradient(82.46deg, rgba(0,0,0,0.47) 34.278%, rgba(32,32,32,0.47) 61.279%, rgba(102,102,102,0.47) 92.672%)',
				}}
			>
				<span className="font-['DM_Mono'] font-medium text-[13px] sm:text-[16px] text-white uppercase tracking-wide whitespace-nowrap">
					{children}
				</span>
				<span className="flex items-center justify-center size-[19px] shrink-0">
					<img
						src={arrowDownCircle}
						alt=""
						className="size-[13.5px] transition-transform duration-300 group-hover:translate-y-[2px]"
						style={{ transform: 'rotate(-135deg)' }}
					/>
				</span>
			</a>
		</Reveal>
	);
}

function NavMenu() {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) return;
		const onDown = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => e.key === 'Escape' && setOpen(false);
		document.addEventListener('mousedown', onDown);
		document.addEventListener('touchstart', onDown);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDown);
			document.removeEventListener('touchstart', onDown);
			document.removeEventListener('keydown', onKey);
		};
	}, [open]);

	const bar = 'block h-[1.5px] w-[20px] rounded-full transition-all duration-300';

	return (
		<div ref={ref} className="relative sm:hidden">
			<button
				type="button"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}
				className="flex flex-col items-center justify-center gap-[5px] size-[40px]"
			>
				<span className={bar} style={{ backgroundColor: NAVY, transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
				<span className={bar} style={{ backgroundColor: NAVY, opacity: open ? 0 : 1 }} />
				<span className={bar} style={{ backgroundColor: NAVY, transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
			</button>
			<div
				className="absolute right-0 top-[52px] min-w-[240px] rounded-[20px] border border-solid bg-white/95 backdrop-blur-md p-[10px] shadow-[0_12px_32px_rgba(37,22,107,0.14)] transition-all duration-300 origin-top-right"
				style={{
					borderColor: 'rgba(37,22,107,0.18)',
					opacity: open ? 1 : 0,
					transform: open ? 'scale(1)' : 'scale(0.95)',
					pointerEvents: open ? 'auto' : 'none',
				}}
			>
				<a
					href={RESEARCH_URL}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => setOpen(false)}
					className="vault-btn research-btn flex items-center justify-between h-[56px] px-[20px] rounded-[14px] font-['DM_Mono'] font-medium text-[15px] uppercase tracking-wide"
				>
					Research
				</a>
			</div>
		</div>
	);
}

function SectionHeading({ children, size = [40, 91, 8], className = '' }) {
	const [min, max, vw] = size;
	return (
		<p
			className={`font-['Playfair_Display'] font-semibold ${className}`}
			style={{ color: NAVY, fontSize: heroClamp(min, max, vw), letterSpacing: '-0.05em', lineHeight: 0.97 }}
		>
			{children}
		</p>
	);
}

function DividerRow({ index, title, description, icon, indentClass = '', delay = 0, slide = false }) {
	const revealProps = slide
		? { x: -72, y: 0, scaleFrom: 0.94, origin: 'left center', duration: 1100 }
		: {};
	return (
		<Reveal delay={delay} className={`w-full ${indentClass}`} {...revealProps}>
			<div
				className={`group/row flex items-start gap-[18px] sm:gap-[27px] py-[26px] sm:py-[32px] border-t border-solid lg:opacity-50 lg:hover:opacity-100 transition-[opacity,transform] duration-500 ease-out ${slide ? 'lg:hover:translate-x-[28px]' : ''}`}
				style={{ borderColor: 'rgba(0,0,0,0.5)' }}
			>
				{index && (
					<p
						className="font-['DM_Mono'] leading-none opacity-60 shrink-0 text-[11px] sm:text-[12px] tracking-[1px] uppercase"
						style={{ color: NAVY }}
					>
						{index}
					</p>
				)}
				<div className="flex-1 min-w-0 flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[39px] items-start">
					<p
						className="font-['DM_Mono'] leading-none uppercase text-[18px] sm:text-[22px] lg:text-[28px] tracking-[1px]"
						style={{ color: NAVY }}
					>
						{title}
					</p>
					{icon && <img src={icon} alt="" className="sm:hidden size-[96px] -ml-[8px] -my-[6px] opacity-100" />}
					<p
						className={`font-['DM_Sans'] font-medium leading-[1.14] text-[15px] sm:text-[18px] lg:text-[20px] max-w-[525px] transition-transform duration-500 ease-out ${slide ? '' : 'lg:-translate-y-[14px] lg:group-hover/row:translate-y-0'}`}
						style={{ color: INK, letterSpacing: '-0.05em', fontVariationSettings: '"opsz" 14' }}
					>
						{description}
					</p>
				</div>
				{icon && (
					<img
						src={icon}
						alt=""
						className="hidden sm:block size-[64px] lg:size-[102px] shrink-0 opacity-90"
					/>
				)}
			</div>
		</Reveal>
	);
}

export default function HomePage() {
	const [radarRef, radarInView] = useInView({ threshold: 0.35, rootMargin: '0px' });

	useEffect(() => {
		document.title = 'Token House Token';
	}, []);

	return (
		<div className="min-h-screen relative overflow-x-hidden">

			<div className="relative">
				{/* NAV */}
				<Container className="relative z-40 pt-[28px] sm:pt-[40px] lg:pt-[48px]">
					<Reveal className="flex items-center justify-between gap-4 w-full" duration={700}>
						<div className="flex items-center gap-[10px]">
							<img src={logoMark} alt="" className="h-[36px] sm:h-[43px] w-auto" />
							<p
								className="font-['JetBrains_Mono'] leading-[1.3] text-[9px] sm:text-[11px] tracking-[1.08px] uppercase"
								style={{ color: NAVY }}
							>
								Token<br />House<br />Token
							</p>
						</div>
						<div className="flex items-center gap-[6px] sm:gap-[12px]">
							<a
								href={RESEARCH_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="vault-btn research-btn hidden sm:inline-flex items-center justify-center h-[47px] px-[32px] rounded-[44px] border border-solid bg-transparent font-['DM_Mono'] font-medium text-[16px] uppercase tracking-wide whitespace-nowrap"
							>
								Research
							</a>
							<VaultButton compact>Access the Vault</VaultButton>
							<NavMenu />
						</div>
					</Reveal>
				</Container>

				{/* HERO */}
				<Container className="pt-[80px] sm:pt-[140px] lg:pt-[188px] pb-[60px] sm:pb-[90px] lg:pb-[110px]">
					<Reveal delay={120} duration={1000}>
						<h1
							className="font-['Playfair_Display'] font-bold italic text-center mx-auto max-w-[1100px]"
							style={{ color: NAVY, fontSize: heroClamp(36, 91, 8.5), letterSpacing: '-0.05em', lineHeight: 0.97 }}
						>
							A Structured Yield Note for Professional Investors.
						</h1>
					</Reveal>

					<Reveal
						delay={260}
						className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-[32px] sm:gap-[16px] w-full mt-[60px] sm:mt-[100px] lg:mt-[188px]"
					>
						<div className="flex flex-col gap-[15px] items-start max-w-[386px]">
							<img src={ellipse} alt="" className="size-[10px]" style={{ mixBlendMode: 'multiply' }} />
							<p
								className="font-['DM_Sans'] font-medium leading-none text-[16px] sm:text-[18px] lg:text-[20px]"
								style={{ color: INK, letterSpacing: '-0.05em', fontVariationSettings: '"opsz" 14' }}
							>
								Issued by an ADGM-incorporated SPV operating under FSRA exempt offer guidelines. Backed by
								real infrastructure. Capped monthly coupons in USDT.
							</p>
						</div>
						<div className="flex flex-col gap-[8px] items-start sm:items-end w-full sm:w-[574px]">
							<img src={lineDivider} alt="" className="h-0 w-full sm:w-[422px] border-t border-solid" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />
							<p
								className="font-['DM_Sans'] leading-none text-[12px] sm:text-[13px] lg:text-[14px] text-left sm:text-right"
								style={{ color: GREY, letterSpacing: '-0.02em', fontVariationSettings: '"opsz" 14' }}
							>
								Token House Capital Limited · ADGM Reg. 18444 · FSRA Exempt Offer
							</p>
						</div>
					</Reveal>
				</Container>

				{/* NOT A FUND */}
				<Container className="py-[70px] sm:py-[120px] lg:py-[180px] flex flex-col items-center gap-[48px] sm:gap-[64px] lg:gap-[76px]">
					<Reveal className="w-full max-w-[816px]">
						<SectionHeading className="text-left">
							<span className="block">Not a fund.</span>
							<span className="block">Not equity.</span>
							<span className="font-bold italic block ml-[28%] sm:ml-[36%] lg:ml-[39%]">A debenture.</span>
						</SectionHeading>
					</Reveal>

					<div className="flex flex-col gap-[8px] w-full max-w-[732px]">
						<DividerRow
							index="01"
							title="Regulated issuer"
							description="Token House Capital Limited is incorporated in the Abu Dhabi Global Market and operates under FSRA exempt offer guidelines. Reg. 18444."
							icon={iconIssuer}
							delay={0}
						/>
						<DividerRow
							index="02"
							title="Real asset backing"
							description="Capital is deployed across real-world assets — including real estate, compute infrastructure, energy, and AI — with a minimum 50% hard-floor allocation. Up to 45% is deployed in digital yield strategies."
							icon={iconRealasset}
							delay={120}
						/>
						<DividerRow
							index="03"
							title="Structured coupon"
							description="Variable monthly distributions in USDT, hard-capped at 5% per 30-day cycle. No guaranteed minimum."
							icon={iconCoupon}
							delay={240}
						/>
					</div>
				</Container>

				{/* SIMPLE TO ENTER / STRUCTURED TO EXIT */}
				<Container className="py-[70px] sm:py-[120px] lg:py-[180px] flex flex-col gap-[48px] sm:gap-[60px] lg:gap-[72px]">
					<Reveal className="w-full">
						<div className="flex flex-col sm:flex-row flex-wrap gap-x-[40px]">
							<SectionHeading className="text-left">
								Simple <br className="hidden sm:block" />
								to <span className="font-bold italic">enter.</span>
							</SectionHeading>
							<SectionHeading className="text-left">
								Structured <br className="hidden sm:block" />
								to <span className="font-bold italic">exit.</span>
							</SectionHeading>
						</div>
					</Reveal>

					<div className="flex flex-col gap-[8px] w-full">
						<DividerRow
							index={null}
							title="Entry"
							slide
							description="Minimum subscription $50,000 USDT. Professional Client status required. KYC-verified access via the Vault. US persons excluded."
							icon={iconEntry}
							indentClass="max-w-[685px]"
							delay={0}
						/>
						<DividerRow
							index={null}
							title="Distribution"
							slide
							description="Monthly coupons distributed automatically via smart contract. Variable, performance-driven, hard-capped at 5% per 30-day cycle. A 7.5% reserve is maintained against coupon obligations — smoothing real yield, never sourced from new subscriptions."
							icon={iconDistribution}
							indentClass="max-w-[685px] lg:ml-[20.6%]"
							delay={120}
						/>
						<DividerRow
							index={null}
							title="Exit"
							slide
							description="TKT is a perpetual instrument with no individual redemption right. Holders exit by selling on the internal marketplace, or through structured exit options available inside the Vault."
							icon={iconExit}
							indentClass="max-w-[685px] lg:ml-[33.3%]"
							delay={240}
						/>
					</div>
				</Container>

				{/* VERIFIABLE FROM DAY ONE */}
				<Container className="py-[70px] sm:py-[120px] lg:py-[180px] flex flex-col lg:flex-row gap-[40px] lg:gap-[50px] items-start">
					<Reveal className="shrink-0 w-full lg:w-[440px]">
						<SectionHeading className="text-left">
							<span className="font-bold italic">Verifiable</span> <br />
							from <br />
							day one.
						</SectionHeading>
					</Reveal>

					<div className="flex flex-col gap-[16px] sm:gap-[24px] lg:gap-[48px] w-full flex-1">
						{[
							{
								n: '01',
								text: 'The first investors joined in December 2025, with the first returns tracked on-chain in January 2026.',
							},
							{
								n: '02',
								text: 'The yield engine runs on active proprietary digital trading strategies with a documented multi-year track record. Full performance data is available to verified members inside the Vault.',
							},
							{
								n: '03',
								text: 'The track record is the product. Audited performance is what drives secondary-market note appreciation and institutional confidence at scale.',
							},
						].map((item, i) => (
							<Reveal key={item.n} delay={i * 120}>
								<div
									className="flex flex-col gap-[24px] sm:gap-[36px] lg:gap-[60px] py-[24px] sm:py-[32px] border-t border-solid"
									style={{ borderColor: 'rgba(0,0,0,0.5)' }}
								>
									<div className="flex gap-[11px] items-center w-full">
										<img src={iconPlus} alt="" className="size-[28px] sm:size-[37px] shrink-0 opacity-70" />
										<p
											className="font-['DM_Mono'] leading-none opacity-60 text-[11px] sm:text-[12px] tracking-[1px] uppercase"
											style={{ color: NAVY }}
										>
											{item.n}
										</p>
									</div>
									<p
										className="font-['DM_Sans'] font-medium leading-[1.14] text-[15px] sm:text-[18px] lg:text-[20px] max-w-[566px]"
										style={{ color: INK, letterSpacing: '-0.05em', fontVariationSettings: '"opsz" 14' }}
									>
										{item.text}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</Container>

				{/* CTA */}
				<Container className="py-[40px] sm:py-[70px] lg:py-[100px]">
					<Reveal duration={1000}>
						<div
							className="relative overflow-hidden rounded-[24px] border-[0.4px] border-solid flex flex-col lg:flex-row items-center justify-center gap-[32px] lg:gap-[10px] px-[24px] sm:px-[48px] lg:px-[37px] py-[48px] sm:py-[64px] lg:py-[31px]"
							style={{
								borderColor: 'rgba(37,22,107,0.18)',
								backgroundImage:
									'linear-gradient(206.39deg, rgba(37,22,107,0.05) 19.321%, rgba(37,22,107,0) 68.212%)',
								backdropFilter: 'blur(1.05px)',
							}}
						>
							<div className="flex flex-col gap-[32px] sm:gap-[42px] items-center max-w-[695px] text-center">
								<div className="flex flex-col gap-[24px] sm:gap-[36px] lg:gap-[50px] items-center w-full">
									<p
										className="font-['Playfair_Display'] text-center max-w-[585px]"
										style={{ color: NAVY, fontSize: heroClamp(30, 72, 6.5), letterSpacing: '-0.05em', lineHeight: 0.91 }}
									>
										<span className="font-semibold">Access is by </span>
										<span className="font-bold italic">application only.</span>
									</p>
									<p
										className="font-['DM_Sans'] font-medium leading-[1.14] text-[14px] sm:text-[15px] lg:text-[16px] max-w-[397px]"
										style={{ color: NAVY, letterSpacing: '-0.05em', fontVariationSettings: '"opsz" 14' }}
									>
										Token House accepts Professional Investors through a KYC-verified process. Applications
										are reviewed manually. Not all applicants will be accepted.
									</p>
								</div>

								<VaultButton href={WHITELIST_PATH} external={false}>Apply for Access</VaultButton>

								<p
									className="font-['DM_Sans'] leading-[1.5] text-[10px] sm:text-[11px] lg:text-[12px] text-center max-w-[610px]"
									style={{ color: GREY, letterSpacing: '-0.02em', fontVariationSettings: '"opsz" 14' }}
								>
									Token House Capital Limited (Reg. 18444) is incorporated in the Abu Dhabi Global Market.
									TKT is a debenture instrument offered to Professional Clients only under an FSRA Exempt
									Offer. US persons are excluded. This page does not constitute an offer or solicitation in
									any jurisdiction where such offer would be unlawful.
								</p>
							</div>

							<div
								ref={radarRef}
								className="hidden lg:block shrink-0 size-[300px] xl:size-[477px]"
								style={{
									transform: radarInView ? 'scale(1.2)' : 'scale(0.6)',
									transition: 'transform 1600ms cubic-bezier(0.16,1,0.3,1) 150ms',
									willChange: 'transform',
								}}
							>
								<img
									src={iconRadarLarge}
									alt=""
									className="size-full opacity-70"
									style={{ animation: 'spin-slow 70s linear infinite' }}
								/>
							</div>
						</div>
					</Reveal>
				</Container>

				{/* FOOTER */}
				<Container className="pt-[24px] sm:pt-[32px] pb-[36px] sm:pb-[48px] flex flex-col gap-[15px] items-center">
					<div className="h-0 w-full border-t border-solid" style={{ borderColor: 'rgba(37,22,107,0.2)' }} />
					<div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-[12px] w-full">
						<div className="flex items-center gap-[10px]">
							<img src={logoMarkFooter} alt="" className="h-[28px] sm:h-[32px] w-auto opacity-90" />
							<p
								className="font-['DM_Sans'] leading-none text-[11px] sm:text-[12px] tracking-[0.36px]"
								style={{ color: NAVY }}
							>
								TOKEN HOUSE TOKEN
							</p>
						</div>
						<p
							className="font-['DM_Sans'] leading-none text-[11px] sm:text-[12px]"
							style={{ color: NAVY, opacity: 0.81, letterSpacing: '-0.24px' }}
						>
							Copyright 2026. Token House Token
						</p>
					</div>
				</Container>
			</div>
		</div>
	);
}
