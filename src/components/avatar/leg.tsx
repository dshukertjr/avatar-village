export default function Leg({
  color,
  onClick,
}: {
  color: string;
  onClick: any;
}) {
  return (
    <svg
      width="83"
      height="52"
      viewBox="0 0 83 52"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        onClick={() => onClick()}
        className="cursor-pointer pointer-events-auto"
        x="53.8912"
        y="2.03693"
        width="26.7696"
        height="48.4631"
        rx="10.5"
        stroke="black"
        strokeWidth="3"
      />
      <rect
        onClick={() => onClick()}
        className="cursor-pointer pointer-events-auto"
        x="2.33911"
        y="2.03693"
        width="26.7696"
        height="48.4631"
        rx="10.5"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
}
