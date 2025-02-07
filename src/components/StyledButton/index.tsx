import React, {ButtonHTMLAttributes} from "react";
import classNames from "classnames";
import styles from './index.module.css'

interface Props extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick' | 'disabled' | 'hidden'> {
    type?: 'default' | 'primary' | 'cancel',
    size?: 'large' | 'middle' | 'small'
    shape?: 'default' | 'circle'
    block?: boolean,
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    children: React.ReactNode,
}

const styledButton: React.FC<Props> = (props) => {
    const {
        size = 'middle', type = 'default', shape = 'default', htmlType = 'button',
        className, block, children, ...others
    } = props

    return (
        <button
            className={classNames(styles.button, styles[type], styles[size], styles[shape], {[styles.block]: block}, className)}
            type={htmlType} {...others}
        >
            {children}
        </button>
    )
}

export default styledButton