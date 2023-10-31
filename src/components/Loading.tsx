 
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={40}
        height={40}
        viewBox="0 0 50 50"
        style={{fill:"pink"}}
      >
        <path d="M43.935 25.145c0-10.318-8.364-18.683-18.683-18.683-10.318 0-18.683 8.365-18.683 18.683h4.068c0-8.071 6.543-14.615 14.615-14.615s14.615 6.543 14.615 14.615h4.068z">
          <animateTransform
            attributeName="transform"
            attributeType="xml"
            dur="0.6s"
            from="0 25 25"
            repeatCount="indefinite"
            to="360 25 25"
            type="rotate"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
