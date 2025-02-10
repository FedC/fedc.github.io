const HomeIcon = ({ className, fill = "#e8eaed", size = 24 }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M12 2L2 9l2 11h3v-7h4v7h4v-7h3L22 9 12 2zm3 15v-6h-2v6h-3l4 4 4-4h-3z" />
    </svg>
  );
}

export default HomeIcon;