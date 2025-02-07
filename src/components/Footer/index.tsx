import React from "react";
import styles from './index.module.css'

const Footer:React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoTitle}>
                    <p>Chat with any PDF: ask questions, get summaries, find
                        information, and more.</p>
                    <div className={styles.logoList}>
                        <span className={styles.tiktok}/>
                        <span className={styles.instagram} />
                        <span className={styles.twitter} />
                        <span className={styles.youtube} />
                    </div>
                </div>
                <div className={styles.aside}>
                    <div>
                        <h3 className={styles.title}>Products</h3>
                        <ul className={styles.list}>
                            <li><a href="#">Use cases</a></li>
                            <li><a href="#">Chrome extension</a></li>
                            <li><a href="#">APl docs</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Video tutorials</a></li>
                            <li><a href="#">Resources</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.title}>We also built</h3>
                        <ul className={styles.list}>
                            <li><a href="#">Resume Al Scanner</a></li>
                            <li><a href="#">Invoice Al Scanner</a></li>
                            <li><a href="#">Al Quiz Generator</a></li>
                            <li><a href="#">QuickyAl</a></li>
                            <li><a href="#">Docsium</a></li>
                            <li><a href="#">PDF GPTS</a></li>
                            <li><a href="#">PDF Al generator</a></li>
                            <li><a href="#">Other PDF tools</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.title}>Company</h3>
                        <ul className={styles.list}>
                            <li><a href="#">PDF.ai vs ChatPDF</a></li>
                            <li><a href="#">PDF.ai vs Acrobat Reader</a></li>
                            <li><a href="#">Legal</a></li>
                            <li><a href="#">Affiliate program</a></li>
                            <li><a href="#">Investor</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer