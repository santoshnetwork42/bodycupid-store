import Link from "next/link";

import { parseContent } from "~/utils";

export default function ALink({
  children,
  className,
  content,
  style,
  target,
  ...props
}) {
  const preventDefault = (e) => {
    if (props.href === "#") {
      e.preventDefault();
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  const anchorProps = {
    ...props,
    ...(target && { target: "_blank" })
  };

  return content ? (
    <Link {...props}>
      <a
        className={className}
        style={style}
        onClick={preventDefault}
        dangerouslySetInnerHTML={parseContent(content)}
        {...anchorProps}
      >
        {children}
      </a>
    </Link>
  ) : (
    <Link {...props}>
      <a className={className} style={style} onClick={preventDefault} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
}
