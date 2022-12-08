import { ImgHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  bordeless?: boolean;
}

export function Avatar({ bordeless = false, ...props }: AvatarProps) {
  return <img className={bordeless ? styles.avatarBordeless : styles.avatar} {...props} />;
}
