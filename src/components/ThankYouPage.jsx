import Reveal from './Reveal';
import logoMark from '../images/home/logo-mark.svg';
import arrowDownCircle from '../images/home/arrow-down-circle.svg';

const NAVY = '#25166B';
const INK = '#1E1E21';

export default function ThankYouPage() {
	return (
		<div className="min-h-screen relative overflow-x-hidden flex flex-col">

			<div className="relative flex-1 flex flex-col w-full max-w-[1311px] mx-auto px-6 sm:px-10 lg:px-0">
				<Reveal className="pt-[28px] sm:pt-[40px] lg:pt-[48px]" duration={700}>
					<a href="/" className="inline-flex items-center gap-[10px]">
						<img src={logoMark} alt="" className="h-[36px] sm:h-[43px] w-auto" />
						<p
							className="font-['JetBrains_Mono'] leading-[1.3] text-[9px] sm:text-[11px] tracking-[1.08px] uppercase"
							style={{ color: NAVY }}
						>
							Token<br />House<br />Token
						</p>
					</a>
				</Reveal>

				<div className="flex-1 flex items-center justify-center py-[60px]">
					<Reveal duration={1000} className="flex flex-col items-center text-center max-w-[620px] gap-[28px]">
						<p
							className="font-['DM_Mono'] uppercase text-[12px] tracking-[1px] opacity-60"
							style={{ color: NAVY }}
						>
							Application received
						</p>
						<h1
							className="font-['Playfair_Display'] font-semibold"
							style={{
								color: NAVY,
								fontSize: 'max(40px, min(8vw, 84px))',
								letterSpacing: '-0.05em',
								lineHeight: 0.97,
							}}
						>
							Thank <span className="font-bold italic">you.</span>
						</h1>
						<p
							className="font-['DM_Sans'] font-medium leading-[1.3] text-[15px] sm:text-[18px]"
							style={{ color: INK, letterSpacing: '-0.03em', fontVariationSettings: '"opsz" 14' }}
						>
							Your whitelist request has been submitted. Applications are reviewed manually. If
							approved, we'll contact you by email with next steps to connect your wallet and access
							the platform.
						</p>
						<a
							href="/"
							className="vault-btn group inline-flex items-center justify-center gap-[10px] h-[47px] px-[28px] sm:px-[36px] py-[10px] rounded-[44px] border-[0.3px] border-solid border-white backdrop-blur-[5.7px]"
							style={{
								backgroundImage:
									'linear-gradient(82.46deg, rgba(0,0,0,0.47) 34.278%, rgba(32,32,32,0.47) 61.279%, rgba(102,102,102,0.47) 92.672%)',
							}}
						>
							<span className="font-['DM_Mono'] font-medium text-[13px] sm:text-[16px] text-white uppercase tracking-wide whitespace-nowrap">
								Back to Home
							</span>
							<img
								src={arrowDownCircle}
								alt=""
								className="size-[13.5px] transition-transform duration-300 group-hover:translate-y-[2px]"
								style={{ transform: 'rotate(-135deg)' }}
							/>
						</a>
					</Reveal>
				</div>
			</div>
		</div>
	);
}
