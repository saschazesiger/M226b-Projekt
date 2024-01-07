import styles from './ButtonPrimary.module.css'
import Link from 'next/link'

export default function ButtonPrimary(props) {
    console.log(props)
    let buttonStyle
    if(!props.buttonStyle) {
        buttonStyle = styles.btnPrimary
    }else{
        buttonStyle = styles.btnSecondary
    
    }

    console.log(buttonStyle)
    return (
        <Link href={props.href} className={`${styles.btn} ${buttonStyle}`}>{props.children}</Link>
    );
}