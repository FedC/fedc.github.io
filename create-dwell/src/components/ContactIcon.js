const ContactIcon = ({ stroke = "#1B1B1B", fill = "none" }) => (
  <svg
    width="32"
    viewBox="0 0 82 58"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="81" y1="1" x2="41" y2="27" />
    <line x1="1" y1="1" x2="41" y2="27" />
    <line x1="1" y1="56.5" x2="81" y2="56.5" />
    <line x1="81" y1="1.5" x2="81" y2="56.5" />
    <line x1="1" y1="56.5" x2="1" y2="1.5" />
    <line x1="1" y1="1" x2="81" y2="1" />
  </svg>
);

export default ContactIcon;