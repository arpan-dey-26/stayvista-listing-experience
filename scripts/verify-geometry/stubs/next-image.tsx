import React from 'react';

export default function Image(
  props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean },
) {
  const { fill, priority, ...rest } = props;
  return <img {...rest} />;
}
