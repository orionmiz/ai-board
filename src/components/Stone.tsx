import { PlayerColor } from "~/lib/game";
import useTheme from "~/hooks/useTheme";

export default function Stone({
  size = 16,
  color,
}: {
  size?: number;
  color: PlayerColor;
}) {
  const theme = useTheme();

  return (
    <>
      <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(theme === 'dark' && color === PlayerColor.White) ? '25%' : "50%"}
          fill={PlayerColor[color]}
          style={(theme === 'dark' && color === PlayerColor.White) ? {
            stroke: "gray",
            strokeWidth: '50%',
          } : {}}
        />
      </svg>
      <style jsx>{`
        svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
