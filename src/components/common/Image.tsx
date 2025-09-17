interface LogoProps {
  width?: number;
  height?: number;
  alt?: string;
  src: string;
  className?: string;
  style?: any
}

export function Image({
  width = 64,
  height = 64,
  alt = "logo",
  src,
  className,
    style
}: LogoProps) {
  return <img src={src} alt={alt} width={width} height={height} className={className} style={style} />;
}
