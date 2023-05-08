import jsPDF from 'jspdf';
import styles from './styles.module.scss'
import { useEffect } from 'react';

export default function PDFModel() {

    function patientPdfGenerator(pat, insertionCepsi, chartList) {
        
        const doc = new jsPDF("p", "pt", "a4");
        
        doc.setFont('Inter-Regular', 'normal');
        
        doc.html(document.body, {
            callback: function (doc) {
                doc.save('patiente.pdf')
            },
            x: 15,
            y: 15,
            width: 170,
            windowWidth: 100
        })
    }

    useEffect(() => {
        patientPdfGenerator()
    })
    
    return (
        <div>
            <p>teste</p>
        </div>
    )

}