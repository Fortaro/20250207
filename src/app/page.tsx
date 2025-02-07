import styles from "./page.module.css"
import NavBar from "@/components/NavBar";
import React from "react";
import Footer from "@/components/Footer";
import PdfHandler from "@/components/PdfHandler";

export default function Home() {
    return (
        <div className={styles.page}>
            <NavBar />
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Rotate PDF Pages</h1>
                    <p className={styles.describe}>Simply click on a page to rotate it. You can then download your modified PDF.</p>
                </div>
                <div className={styles.content}>
                    <PdfHandler />
                </div>
            </main>
            <Footer />
        </div>
    )
}
