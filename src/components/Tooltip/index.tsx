import React, {PropsWithChildren} from 'react';
import styles from './index.module.css'
import { useState } from 'react';

const Tooltip:React.FC<PropsWithChildren<{
    content: string
}>> = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className={styles.tooltip}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={styles.content}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;



