import useInView from '../hooks/useInView';

export default function Reveal({
	children,
	as: Tag = 'div',
	delay = 0,
	y = 28,
	x = 0,
	scaleFrom = 1,
	origin = 'center',
	duration = 900,
	className = '',
	style = {},
	...props
}) {
	const [ref, inView] = useInView();

	return (
		<Tag
			ref={ref}
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translate(0, 0) scale(1)' : `translate(${x}px, ${y}px) scale(${scaleFrom})`,
				transformOrigin: origin,
				transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
				willChange: 'opacity, transform',
				...style,
			}}
			{...props}
		>
			{children}
		</Tag>
	);
}
