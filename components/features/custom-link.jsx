import Link from "next/link";

import { parseContent } from "~/utils";

export default function ALink({
  children,
  className,
  content,
  style,
  target,
  prefetch,
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

  return content ? (
    <Link {...props} prefetch={!!prefetch}>
      <a
        className={className}
        style={style}
        onClick={preventDefault}
        dangerouslySetInnerHTML={parseContent(content)}
        target={target}
        {...props}
      >
        {children}
      </a>
    </Link>
  ) : (
    <Link {...props} prefetch={!!prefetch}>
      <a
        className={className}
        style={style}
        onClick={preventDefault}
        target={target}
      >
        {children}
      </a>
    </Link>
  );
}
