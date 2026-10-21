import SpecularButton from './SpecularButton';

export function SpecularAction({
  children,
  className = '',
  variant = 'default',
  size = 'sm',
  ...props
}) {
  return (
    <SpecularButton
      size={size}
      radius={2}
      tint="#f1efe9"
      tintOpacity={0.035}
      textColor="#f1efe9"
      lineColor="#d9ecc0"
      baseColor="#343b31"
      intensity={1.2}
      idleIntensity={0.27}
      shineSize={14}
      shineFade={38}
      thickness={1.2}
      glow={0.9}
      followMouse
      proximity={220}
      className={`specular-action specular-action--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </SpecularButton>
  );
}
