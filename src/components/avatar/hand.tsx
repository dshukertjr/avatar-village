export default function Hand({
  color,
  onClick,
}: {
  color: string;
  onClick: any;
}) {
  return (
    <svg
      width="167"
      height="44"
      viewBox="0 0 167 44"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        onClick={() => onClick()}
        className="cursor-pointer pointer-events-auto"
        d="M165.5 21.8121C165.5 32.7904 156.584 41.6946 145.58 41.6946C134.577 41.6946 125.661 32.7904 125.661 21.8121C125.661 10.8337 134.577 1.9295 145.58 1.9295C156.584 1.9295 165.5 10.8337 165.5 21.8121Z"
        stroke="black"
        strokeWidth="3"
      />
      <path
        onClick={() => onClick()}
        className="cursor-pointer pointer-events-auto"
        d="M41.3391 21.8121C41.3391 32.7904 32.4233 41.6946 21.4196 41.6946C10.4158 41.6946 1.5 32.7904 1.5 21.8121C1.5 10.8337 10.4158 1.9295 21.4196 1.9295C32.4233 1.9295 41.3391 10.8337 41.3391 21.8121Z"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
}
