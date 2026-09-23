import Reveal from './Reveal';
import logoMark from '../images/home/logo-mark.svg';
import logoMarkFooter from '../images/home/logo-mark-footer.svg';
import arrowDownCircle from '../images/home/arrow-down-circle.svg';

const NAVY = '#25166B';
const INK = '#1E1E21';
const GREY = '#8F8F8F';

const FIELDS = [
	{ id: 'fullname', label: 'Name', type: 'text', placeholder: 'Your Full Name' },
	{ id: 'email', label: 'Email', type: 'email', placeholder: 'email@domain.com' },
	{ id: 'ercToken', label: 'ERC-20 Wallet Address', type: 'text', placeholder: '0x12ab...98ff' },
];

const inputClass =
	"w-full px-[16px] py-[14px] rounded-[12px] border border-solid bg-white/70 backdrop-blur-sm font-['DM_Sans'] text-[15px] placeholder:text-[#8F8F8F] placeholder:opacity-100 outline-none transition-shadow duration-200 focus:shadow-[0_0_0_3px_rgba(37,22,107,0.15)]";

function Label({ htmlFor, children }) {
	return (
		<label
			htmlFor={htmlFor}
			className="block mb-[8px] font-['DM_Mono'] uppercase text-[12px] tracking-[1px]"
			style={{ color: NAVY }}
		>
			{children}
		</label>
	);
}

export default function WhitelistPage() {
	return (
		<div className="min-h-screen relative overflow-x-hidden">

			<div className="relative w-full max-w-[1311px] mx-auto px-6 sm:px-10 lg:px-0">
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

				<div className="w-full max-w-[640px] mx-auto pt-[60px] sm:pt-[90px] lg:pt-[110px] pb-[70px] sm:pb-[110px]">
					<Reveal duration={1000}>
						<p
							className="font-['DM_Mono'] uppercase text-[12px] tracking-[1px] opacity-60 mb-[20px]"
							style={{ color: NAVY }}
						>
							Whitelist
						</p>
						<h1
							className="font-['Playfair_Display'] font-semibold"
							style={{
								color: NAVY,
								fontSize: 'max(36px, min(7vw, 72px))',
								letterSpacing: '-0.05em',
								lineHeight: 0.97,
							}}
						>
							Private <span className="font-bold italic">Access</span>
						</h1>
						<p
							className="font-['DM_Mono'] uppercase text-[16px] sm:text-[20px] tracking-[1px] mt-[24px]"
							style={{ color: NAVY }}
						>
							You need to be whitelisted to invest
						</p>
						<p
							className="font-['DM_Sans'] font-medium leading-[1.3] text-[15px] sm:text-[18px] mt-[24px]"
							style={{ color: INK, letterSpacing: '-0.03em', fontVariationSettings: '"opsz" 14' }}
						>
							This is not open to everyone. Tokenhousetoken (TKT) is private project, selecting only
							verified participants for its first vault phase. To apply for whitelist access, submit
							your details below. If approved, you'll be able to connect your wallet and access the
							platform.
						</p>
					</Reveal>

					<Reveal delay={200} duration={900}>
						<form
							action="https://api.web3forms.com/submit"
							method="POST"
							className="mt-[40px] sm:mt-[56px] flex flex-col gap-[22px] rounded-[24px] border-[0.4px] border-solid p-[24px] sm:p-[36px]"
							style={{
								borderColor: 'rgba(37,22,107,0.18)',
								backgroundImage:
									'linear-gradient(206.39deg, rgba(37,22,107,0.05) 19.321%, rgba(37,22,107,0) 68.212%)',
							}}
						>
							<input type="hidden" name="access_key" value="6bf479be-2a4d-4227-a259-99066a3c4c54" />
							<input type="hidden" name="redirect" value={`${window.location.origin}/thank-you`} />

							{FIELDS.map((f) => (
								<div key={f.id}>
									<Label htmlFor={f.id}>{f.label}</Label>
									<input
										id={f.id}
										name={f.id}
										type={f.type}
										placeholder={f.placeholder}
										required
										className={inputClass}
										style={{ borderColor: 'rgba(37,22,107,0.25)', color: INK }}
									/>
								</div>
							))}

							<div>
								<Label htmlFor="message">Why Do You Want To Join?</Label>
								<textarea
									id="message"
									name="message"
									required
									rows={4}
									placeholder="Tell us briefly why you want access (50–100 words max)."
									className={`${inputClass} resize-y min-h-[110px]`}
									style={{ borderColor: 'rgba(37,22,107,0.25)', color: INK }}
								/>
							</div>

							<button
								type="submit"
								className="vault-btn group self-start inline-flex items-center justify-center gap-[10px] h-[47px] px-[28px] sm:px-[36px] py-[10px] rounded-[44px] border-[0.3px] border-solid border-white backdrop-blur-[5.7px] cursor-pointer"
								style={{
									backgroundImage:
										'linear-gradient(82.46deg, rgba(0,0,0,0.47) 34.278%, rgba(32,32,32,0.47) 61.279%, rgba(102,102,102,0.47) 92.672%)',
								}}
							>
								<span className="font-['DM_Mono'] font-medium text-[13px] sm:text-[16px] text-white uppercase tracking-wide whitespace-nowrap">
									Submit
								</span>
								<img
									src={arrowDownCircle}
									alt=""
									className="size-[13.5px] transition-transform duration-300 group-hover:translate-y-[2px]"
									style={{ transform: 'rotate(-135deg)' }}
								/>
							</button>
						</form>
					</Reveal>

					<p
						className="mt-[20px] font-['DM_Sans'] leading-[1.5] text-[10px] sm:text-[11px] lg:text-[12px]"
						style={{ color: GREY, letterSpacing: '-0.02em', fontVariationSettings: '"opsz" 14' }}
					>
						*We review every submission manually. Approved applicants will be notified by email with
						further instructions.
					</p>

					<p className="mt-[28px] text-center">
						<a
							href="/"
							className="font-['DM_Sans'] text-[13px] underline"
							style={{ color: GREY }}
						>
							← Back to home
						</a>
					</p>
				</div>

				<div className="pt-[24px] pb-[36px] flex flex-col gap-[15px] items-center">
					<div className="h-0 w-full border-t border-solid" style={{ borderColor: 'rgba(37,22,107,0.2)' }} />
					<div className="flex flex-col sm:flex-row items-center justify-between gap-[12px] w-full">
						<div className="flex items-center gap-[10px]">
							<img src={logoMarkFooter} alt="" className="h-[28px] sm:h-[32px] w-auto opacity-90" />
							<p className="font-['DM_Sans'] leading-none text-[11px] sm:text-[12px] tracking-[0.36px]" style={{ color: NAVY }}>
								TOKEN HOUSE TOKEN
							</p>
						</div>
						<p className="font-['DM_Sans'] leading-none text-[11px] sm:text-[12px]" style={{ color: NAVY, opacity: 0.81 }}>
							Copyright 2026. Token House Token
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
