function Arrow({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.168 10h11.667M10 4.167L15.833 10 10 15.834"
      ></path>
    </svg>
  );
}

export default Arrow;
