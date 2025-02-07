import React, {PropsWithChildren} from "react";
import styles from './index.module.css'
import StyledButton from "@/components/StyledButton";

const PdfWrapper:React.FC<PropsWithChildren<{
    order: number
    onClick?: () => void
    angle: number
}>> = ({children, order, onClick, angle = 0}) => {
    return (
        <div className={styles.wrapper} onClick={onClick}>
            <div className={styles.content} style={{transform: `rotate(${angle}deg)`}}>
                {children}
            </div>
            <StyledButton className={styles.rotate} type="primary" size="small" shape="circle">
                <span className={styles.icon} />
            </StyledButton>
            <div className={styles.order}>{order}</div>
        </div>
    )
}

export default PdfWrapper