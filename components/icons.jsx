const defaultIconSize = 28;
const defaultIconColor = "rgb(34, 34, 34)";

export const Phone = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M21.97 18.33c0 .36-.08.73-.25 1.09-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.6.25-1.25.38-1.95.38-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98a28.75 28.75 0 01-3.28-2.8 28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.54.53 1.06 1.02 1.59 1.47.52.44.95.74 1.29.92.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"
      ></path>
    </svg>
  );
};

export const Heart = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 192 192"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        strokeWidth="12"
        d="M60.732 29.7C41.107 29.7 22 39.7 22 67.41c0 27.29 45.274 67.29 74 94.89 28.744-27.6 74-67.6 74-94.89 0-27.71-19.092-37.71-38.695-37.71C116 29.7 104.325 41.575 96 54.066 87.638 41.516 76 29.7 60.732 29.7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const HeartFilled = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M.256 12.16q.544 2.08 2.08 3.616L16 29.92l13.664-14.144q1.536-1.536 2.08-3.616t0-4.128-2.08-3.584-3.584-2.08-4.16 0-3.584 2.08L16 7.264l-2.336-2.816q-1.536-1.536-3.584-2.08t-4.128 0-3.616 2.08-2.08 3.584 0 4.128z"
      ></path>
    </svg>
  );
};

export const User = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.5 21h-11A2.5 2.5 0 014 18.5c0-4.08 6-4 8-4s8-.08 8 4a2.5 2.5 0 01-2.5 2.5zM12 11a4 4 0 100-8 4 4 0 000 8z"
      ></path>
    </svg>
  );
};

export const Bag = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M3 22h18a1 1 0 001-1.077l-1-13A1 1 0 0020 7h-3A5 5 0 007 7H4a1 1 0 00-1 .923l-1 13A1 1 0 003 22zm9-18a3 3 0 013 3H9a3 3 0 013-3zM4.926 9H7v2a1 1 0 002 0V9h6v2a1 1 0 002 0V9h2.074l.846 11H4.08z"
      ></path>
    </svg>
  );
};

export const Shipping = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M0 6v2h19v15h-6.156c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3H4v-5H2v7h3.156c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3h8.312c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3H32v-8.156l-.063-.157-2-6L29.72 10H21V6zm1 4v2h9v-2zm20 2h7.281L30 17.125V23h-1.156c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3H21zM2 14v2h6v-2zm7 8c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm16 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z"
      ></path>
    </svg>
  );
};

export const Customer = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M256 1.349c-141.397.01-256 114.603-256 256-.038 62.382 22.775 118.201 60 161.636 37.206 43.474 88.708 74.804 146.536 89.388l.01.01c6.182 1.55 12.593 2.268 19.082 2.268 17.301-.057 35.215-5.014 49.962-15.482 7.34-5.254 13.857-12.001 18.554-20.307 4.708-8.287 7.445-18.124 7.427-28.68 0-10.43-2.584-21.454-7.809-32.803-1.78-3.867-3.982-7.809-6.374-11.771 5.531-4.259 8.996-8.096 9.934-9.034 2.946-2.966 10.344-17.378 1.837-26.765-8.546-9.378-36.651-29.282-43.886-32.23-7.234-2.938-17.492 2.881-21.435 11.503-3.961 8.612-8.526 7.014-8.526 7.014s-17.034-9.56-44.851-47.808c-27.828-38.288-31.627-57.417-31.627-57.417s-.124-4.833 9.292-5.952c9.416-1.092 18.105-9.044 17.54-16.843-.555-7.789-10.832-40.679-17.119-51.684-6.297-11.004-22.278-8.402-26.01-6.508-3.752 1.895-42.623 18.67-38.613 61.675 4.02 43.005 21.522 79.694 42.575 108.669 21.071 28.977 50.574 56.948 90.238 74.029 12.632 5.435 24.067 5.895 33.895 3.933 2.602 4.048 4.785 7.895 6.421 11.454 3.761 8.201 5.12 14.986 5.12 20.536-.02 5.636-1.34 10.124-3.618 14.21-3.416 6.076-9.464 11.359-17.283 15.11-7.751 3.742-17.081 5.77-25.645 5.751-4.278 0-8.345-.488-11.923-1.388h.018c-52.172-13.138-98.392-41.407-131.387-79.99-33.014-38.631-52.919-87.339-52.938-142.526 0-62.622 25.339-119.187 66.363-160.239C136.813 56.087 193.377 30.756 256 30.747c62.622.01 119.177 25.34 160.229 66.364 41.034 41.052 66.364 97.617 66.374 160.239 0 38.67-9.666 74.966-26.698 106.785a226.875 226.875 0 01-35.168 48.813c-5.579 5.895-5.321 15.206.584 20.776 5.894 5.578 15.195 5.32 20.775-.584a255.723 255.723 0 0039.732-55.139C501.071 342.067 512 300.938 512 257.349c-.01-141.397-114.612-255.99-256-256z"
      ></path>
      <path
        fill={color}
        d="M253.196 251.522c5.943-6.775 9.532-13.819 9.532-22.794 0-15.196-10.919-26.804-28.871-26.804-18.106 0-28.603 11.321-29.57 24.316-.143.823.277 1.512 1.1 1.656l15.206 2.488c.966.133 1.512-.278 1.512-1.11.832-7.186 4.699-11.052 11.052-11.052 6.498 0 10.23 4.564 10.23 10.775 0 4.842-1.933 8.842-5.532 12.994l-33.014 39.236c-.556.689-.699 1.1-.699 1.932v12.843c0 .832.554 1.388 1.388 1.388h55.818c.822 0 1.378-.556 1.378-1.388v-13.674c0-.823-.556-1.379-1.378-1.379h-32.89v-.277l24.738-29.15zM342.325 266.995h-6.22c-.556 0-.833-.277-.833-.833v-20.306c0-.833-.546-1.378-1.378-1.378h-16.03c-.822 0-1.378.545-1.378 1.378v20.306c0 .556-.277.833-.832.833H298.39v-.412l28.182-61.76c.278-.833 0-1.378-.966-1.378h-17.55c-.967 0-1.522.268-1.934 1.1l-28.182 62.038c-.277.546-.277 1.1-.277 1.656v14.086c0 .832.555 1.387 1.378 1.387h36.613c.555 0 .832.268.832.822v11.465c0 .832.556 1.388 1.378 1.388h16.03c.832 0 1.378-.556 1.378-1.388v-11.465c0-.555.277-.822.833-.822h6.22c.823 0 1.379-.556 1.379-1.387v-13.953c0-.831-.556-1.377-1.379-1.377zM417.081 253.867c0-14.642-8.009-24.871-22.794-24.871-8.566 0-14.23 3.464-17.273 7.598h-.134v-31.77c0-.833-.554-1.378-1.388-1.378h-16.574c-.833 0-1.378.545-1.378 1.378v91.177c0 .832.545 1.388 1.378 1.388h16.574c.833 0 1.388-.556 1.388-1.388v-38.402c0-7.321 3.866-12.163 10.498-12.163 6.909 0 10.363 4.842 10.363 12.163v38.402c0 .832.556 1.388 1.378 1.388h16.584c.823 0 1.378-.556 1.378-1.388v-42.134z"
      ></path>
    </svg>
  );
};

export const Payment = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 10.5V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h7"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 16.429c0-.474.384-.858.857-.858h4.286c.473 0 .857.384.857.858v2.714a.857.857 0 01-.857.857h-4.286a.857.857 0 01-.857-.857v-2.714z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.714 14.286a1.286 1.286 0 112.572 0v1.285h-2.572v-1.285zM3 10h17.5M7 15h2"
      ></path>
    </svg>
  );
};

export const RightArrow = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      className="icon flat-color"
      data-name="Flat Color"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M21.71 11.29l-3-3a1 1 0 00-1.42 1.42l1.3 1.29H3a1 1 0 000 2h15.59l-1.3 1.29a1 1 0 000 1.42 1 1 0 001.42 0l3-3a1 1 0 000-1.42z"
      ></path>
    </svg>
  );
};

export const Facebook = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"
      ></path>
    </svg>
  );
};

export const Twitter = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M11.919 24.94c-2.548 0-4.921-.747-6.919-2.032a9.049 9.049 0 006.681-1.867 4.512 4.512 0 01-4.215-3.137c.276.054.559.082.848.082.412 0 .812-.056 1.193-.156a4.519 4.519 0 01-3.622-4.425v-.059a4.478 4.478 0 002.042.564 4.507 4.507 0 01-2.008-3.758c0-.824.225-1.602.612-2.268a12.811 12.811 0 009.303 4.715 4.517 4.517 0 017.692-4.115 9.107 9.107 0 002.866-1.094 4.542 4.542 0 01-1.983 2.498 9.08 9.08 0 002.592-.71 9.283 9.283 0 01-2.252 2.337c.008.193.014.388.014.583-.001 5.962-4.542 12.843-12.844 12.842"
      ></path>
    </svg>
  );
};

export const LinkedIn = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 552.77 552.77"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M17.95 528.854h71.861c9.914 0 17.95-8.037 17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95C8.035 178.85 0 186.885 0 196.8v314.103c0 9.913 8.035 17.951 17.95 17.951zM17.95 123.629h71.861c9.914 0 17.95-8.036 17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95C8.035 23.916 0 31.952 0 41.866v63.813c0 9.914 8.035 17.95 17.95 17.95zM525.732 215.282c-10.098-13.292-24.988-24.223-44.676-32.791-19.688-8.562-41.42-12.846-65.197-12.846-48.268 0-89.168 18.421-122.699 55.27-6.672 7.332-11.523 5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192c-9.915 0-17.95 8.035-17.95 17.95v314.103c0 9.914 8.036 17.951 17.95 17.951h71.861c9.915 0 17.95-8.037 17.95-17.951V401.666c0-45.508 2.748-76.701 8.244-93.574 5.494-16.873 15.66-30.422 30.488-40.649 14.83-10.227 31.574-15.343 50.24-15.343 14.572 0 27.037 3.58 37.393 10.741 10.355 7.16 17.834 17.19 22.436 30.104 4.604 12.912 6.904 41.354 6.904 85.33v132.627c0 9.914 8.035 17.951 17.949 17.951h71.861c9.914 0 17.949-8.037 17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48s-10.992-31.959-21.096-45.258z"
      ></path>
    </svg>
  );
};

export const Youtube = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -3 20 20"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill={color} transform="translate(-300 -7442)">
          <g transform="translate(56 160)">
            <path d="M251.988 7291.586v-5.612c1.993.938 3.536 1.843 5.36 2.82-1.505.834-3.367 1.77-5.36 2.792m11.103-8.403c-.344-.453-.93-.805-1.553-.922-1.833-.348-13.267-.349-15.099 0-.5.094-.945.32-1.328.673-1.611 1.495-1.106 9.518-.718 10.817.164.562.375.968.64 1.235.343.352.812.594 1.351.703 1.51.312 9.284.486 15.122.047a2.62 2.62 0 001.39-.712c1.49-1.49 1.388-9.962.195-11.841"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Instagram = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zM12 15.88c-2.14 0-3.88-1.74-3.88-3.88 0-2.14 1.74-3.88 3.88-3.88 2.14 0 3.88 1.74 3.88 3.88 0 2.14-1.74 3.88-3.88 3.88zm5.92-9c-.05.12-.12.23-.21.33-.1.09-.21.16-.33.21a.995.995 0 01-1.09-.21c-.09-.1-.16-.21-.21-.33A.995.995 0 0116 6.5c0-.13.03-.26.08-.38.05-.13.12-.23.21-.33.23-.23.58-.34.9-.27.07.01.13.03.19.06.06.02.12.05.18.09.05.03.1.08.15.12.09.1.16.2.21.33.05.12.08.25.08.38s-.03.26-.08.38z"
      ></path>
    </svg>
  );
};

export const UpArrow = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="icon flat-line"
      data-name="Flat Line"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 21L12 3"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 6L12 3 9 6"
        data-name="primary"
      ></path>
    </svg>
  );
};

export const DownAngle = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 30.727 30.727"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M29.994 10.183L15.363 24.812.733 10.184a2.5 2.5 0 113.536-3.536l11.095 11.093L26.461 6.647a2.5 2.5 0 113.533 3.536z"
      ></path>
    </svg>
  );
};

export const Star = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M21.12 9.88a.74.74 0 00-.6-.51l-5.42-.79-2.43-4.91a.78.78 0 00-1.34 0L8.9 8.58l-5.42.79a.74.74 0 00-.6.51.75.75 0 00.18.77L7 14.47l-.93 5.4a.76.76 0 00.3.74.751.751 0 00.79.05L12 18.11l4.85 2.55a.73.73 0 00.35.09.791.791 0 00.44-.14.76.76 0 00.3-.74l-.94-5.4 3.93-3.82a.75.75 0 00.19-.77z"
      ></path>
    </svg>
  );
};

export const House = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M12.614 1.21a1 1 0 00-1.228 0l-9 7A1 1 0 002 9v11a2 2 0 002 2h16a2 2 0 002-2V9a1 1 0 00-.386-.79l-9-7zM16 20h4V9.49l-8-6.223-8 6.222V20h4v-8a1 1 0 011-1h6a1 1 0 011 1v8zm-6 0v-7h4v7h-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const RightAngle = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-12 0 32 32"
    >
      <path
        fill={color}
        d="M.88 23.28c-.2 0-.44-.08-.6-.24-.32-.32-.32-.84 0-1.2L6.04 16l-5.8-5.84c-.32-.32-.32-.84 0-1.2.32-.32.84-.32 1.2 0l6.44 6.44c.16.16.24.36.24.6s-.08.44-.24.6l-6.4 6.44c-.2.16-.4.24-.6.24z"
      ></path>
    </svg>
  );
};

export const LeftAngle = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-12 0 32 32"
    >
      <path
        fill={color}
        d="M7.28 23.28c-.2 0-.44-.08-.6-.24L.24 16.6c-.32-.32-.32-.84 0-1.2l6.44-6.44c.32-.32.84-.32 1.2 0 .32.32.32.84 0 1.2L2.08 16l5.84 5.84c.32.32.32.84 0 1.2-.16.16-.44.24-.64.24z"
      ></path>
    </svg>
  );
};

export const UpAngle = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-8.5 0 32 32"
    >
      <path
        fill={color}
        d="M.84 20.04c-.2 0-.44-.08-.6-.24-.32-.32-.32-.84 0-1.2l6.44-6.44a.87.87 0 011.2 0l6.44 6.44c.32.32.32.84 0 1.2-.32.32-.84.32-1.2 0l-5.84-5.84-5.84 5.84c-.16.16-.4.24-.6.24z"
      ></path>
    </svg>
  );
};

export const FullSreen = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={color}
        d="M160 96.064l192 .192a32 32 0 010 64l-192-.192V352a32 32 0 01-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1164 0v191.936l192-.192a32 32 0 110 64l-192 .192zM864 96.064V96h64v256a32 32 0 11-64 0V160.064l-192 .192a32 32 0 110-64l192-.192zm0 831.872l-192-.192a32 32 0 010-64l192 .192V672a32 32 0 1164 0v256h-64v-.064z"
      ></path>
    </svg>
  );
};

export const Lock = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill={color} d="M13 14a1 1 0 10-2 0v2a1 1 0 102 0v-2z"></path>
      <path
        fill={color}
        fillRule="evenodd"
        d="M7 8.12c-1.684.412-3 1.84-3 3.65v5.538C4 19.973 6.315 22 9 22h6c2.685 0 5-2.027 5-4.692v-5.539c0-1.81-1.316-3.237-3-3.649V7A5 5 0 007 7v1.12zM15 7v1H9V7a2.995 2.995 0 013-3 3.001 3.001 0 013 3zm-9 4.77c0-.904.819-1.77 2-1.77h8c1.181 0 2 .866 2 1.77v5.538C18 18.72 16.734 20 15 20H9c-1.734 0-3-1.28-3-2.692v-5.539z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const Cash = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 30 30"
    >
      <path
        fill={color}
        d="M5.5 5c-.655 0-.66 1.01 0 1h22c.286 0 .5.214.5.5v13c0 .66 1 .66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2c-.654 0-.654 1 0 1h22c.286 0 .5.214.5.5v13c0 .665 1.01.66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2C.678 9 0 9.678 0 10.5v12c0 .822.678 1.5 1.5 1.5h22c.822 0 1.5-.678 1.5-1.5v-12c0-.822-.678-1.5-1.5-1.5h-22zm0 1h22c.286 0 .5.214.5.5v12c0 .286-.214.5-.5.5h-22a.488.488 0 01-.5-.5v-12c0-.286.214-.5.5-.5zm1 1a.5.5 0 00-.5.5v2c0 .672 1 .656 1 0V12h1.5c.672 0 .656-1 0-1h-2zm10 0C9.468 11 7 13.468 7 16.5S9.468 22 12.5 22s5.5-2.468 5.5-5.5-2.468-5.5-5.5-5.5zm8 0c-.656 0-.672 1 0 1H22v1.5c0 .656 1 .672 1 0v-2a.5.5 0 00-.5-.5h-2zm-8 1c2.49 0 4.5 2.01 4.5 4.5S14.99 21 12.5 21 8 18.99 8 16.5s2.01-4.5 4.5-4.5zm0 1c-.277 0-.5.223-.5.5v.594c-.578.21-1 .76-1 1.406 0 .82.68 1.5 1.5 1.5.28 0 .5.212.5.5 0 .288-.22.5-.5.5h-1c-.338-.005-.5.248-.5.5s.162.505.5.5h.5v.5a.499.499 0 101 0v-.594c.578-.21 1-.76 1-1.406 0-.82-.68-1.5-1.5-1.5a.49.49 0 01-.5-.5c0-.288.22-.5.5-.5h1c.338.005.5-.248.5-.5s-.162-.505-.5-.5H13v-.5c0-.277-.223-.5-.5-.5zm-10 6.002c-.25-.002-.5.162-.5.498v2a.5.5 0 00.5.5h2c.656 0 .672-1 0-1H3v-1.5c0-.328-.25-.496-.5-.498zm20 0c-.25.002-.5.17-.5.498V21h-1.5c-.672 0-.656 1 0 1h2a.5.5 0 00.5-.5v-2c0-.336-.25-.5-.5-.498z"
      ></path>
    </svg>
  );
};

export const Return = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="3"
      viewBox="0 0 64 64"
    >
      <path
        strokeLinecap="round"
        d="M54.89 26.73A23.52 23.52 0 0115.6 49M9 37.17a23.75 23.75 0 01-.53-5A23.51 23.51 0 0148.3 15.2"
      ></path>
      <path
        strokeLinecap="round"
        d="M37.73 16.24L48.62 15.44 47.77 5.24"
      ></path>
      <path
        strokeLinecap="round"
        d="M25.91 47.76L15.03 48.56 15.88 58.76"
      ></path>
    </svg>
  );
};

export const MagnifyingGlass = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="cf-icon-svg"
      viewBox="-2 0 19 19"
    >
      <path
        fill={color}
        d="M14.147 15.488a1.112 1.112 0 01-1.567 0l-3.395-3.395a5.575 5.575 0 111.568-1.568l3.394 3.395a1.112 1.112 0 010 1.568zm-6.361-3.903a4.488 4.488 0 10-1.681.327 4.443 4.443 0 001.68-.327z"
      ></path>
    </svg>
  );
};

export const Minus = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z"
      ></path>
    </svg>
  );
};

export const Plus = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
      ></path>
    </svg>
  );
};