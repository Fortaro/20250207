'use client'
import React, {useState} from "react";
import styles from "./index.module.css";
import { Document, Page, pdfjs } from 'react-pdf';
import {PDFDocument, RotationTypes} from 'pdf-lib';
import StyledButton from "@/components/StyledButton";
import PdfWrapper from "@/components/PdfWrapper";
import {download} from "@/common";
import Tooltip from "@/components/Tooltip";

const fileInputId = `fileInputId`
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const PdfHandler:React.FC = () => {
    const [pdfPages, setPdfPages] = useState<{order: number, angle: number}[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState('')
    const [zoomIndex, setZoomIndex] = useState(3)
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if(!selectedFile) return
        setFile(selectedFile)
        setFileUrl(URL.createObjectURL(selectedFile))
    }

    const onDownloadPDF = async () => {
        if (!file) return
        const fileName = file.name.split(".").shift() + '(pdf.ai-rotated).pdf'
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        pdfDoc.getPages().forEach((item, index) => {
            item.setRotation({type: RotationTypes.Degrees, angle: pdfPages[index]?.angle || 0 })
        })
        const modifiedPdfBytes = await pdfDoc.save()
        download(modifiedPdfBytes, 'application/pdf', fileName)
    }

    const rotateAll = async () => {
        setPdfPages(pdfPages.map(page => {
            return {...page, angle: (page.angle + 90) % 360}
        }))
    }

    const reset = () => {
        setFileUrl("")
        setFile(null)
        setPdfPages([])
    }

    const rotateItem = (order: number) => {
        setPdfPages(pdfPages.map(page => {
            return page.order === order ? {...page, angle: (page.angle + 90) % 360} : page
        }))
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setPdfPages(Array.from({ length: numPages }).map((_, index) => {
            return {order: index + 1, angle: 0}
        }))
    }

    return (
        <div className={styles.layout}>
            {!Boolean(fileUrl) &&
                <div className={styles.inputView}>
                    <input className={styles.fileInput} type="file" id={fileInputId} accept=".pdf"
                           onChange={onFileChange}/>
                    <label className={styles.label} htmlFor={fileInputId}>
                    <span className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                    </svg>
                    </span>
                        <p className={styles.tips}>Click to upload or drag and drop</p>
                    </label>
                </div>
            }
            {Boolean(fileUrl) && <>
                <div className={styles.controlBar}>
                    <StyledButton type="primary" onClick={rotateAll}>Rotate all</StyledButton>
                    <Tooltip content={"Remove this PDF and select a new one"}>
                        <StyledButton type="cancel" onClick={reset}>Remove PDF</StyledButton>
                    </Tooltip>
                    <Tooltip content={"Zoom In"}>
                        <StyledButton
                            shape="circle" disabled={zoomIndex >= 8}
                            onClick={() => setZoomIndex(Math.min(zoomIndex + 1, 8))}>
                            <span className={styles.zoomIn} />
                        </StyledButton>
                    </Tooltip>
                    <Tooltip content={"Zoom Out"}>
                        <StyledButton
                            shape="circle" disabled={zoomIndex <= 0}
                            onClick={() => setZoomIndex(Math.max(zoomIndex - 1, 0))}>
                            <span className={styles.zoomOut}/>
                        </StyledButton>
                    </Tooltip>
                </div>
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <div className={styles.pdfViews}>
                        {
                            pdfPages.map(({order, angle}) => (
                                <PdfWrapper order={order} angle={angle} onClick={() => rotateItem(order)} key={order}>
                                    <Page
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        key={`page_${order}`}
                                        pageNumber={order}
                                        width={76 + zoomIndex * 50}
                                    />
                                </PdfWrapper>
                            ))
                        }
                    </div>
                </Document>
                <div className={styles.footer} onClick={onDownloadPDF}>
                    <Tooltip content={"Split and download PDF"}>
                        <StyledButton type="primary">Download</StyledButton>
                    </Tooltip>
                </div>
            </>}
        </div>
    )
}

export default PdfHandler

