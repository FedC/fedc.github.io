const CloseIcon = ({ className, fill = "#e8eaed", size = 24 }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -960 960 960"
    fill={fill}
  >
    <path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);

export default CloseIcon;