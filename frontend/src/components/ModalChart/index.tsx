import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { ChartProps } from '../../pages/viewPac'

interface ModalChartProps{
    isOpen: boolean,
    onRequestClose: () => void;
    chart: ChartProps[];
}

export function ModalChart({ isOpen, onRequestClose, chart}:ModalChartProps){
    
    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff'
        }
    }
    
    function dateConvertChart(date: string) {
        var data = new Date(date);
        var dataFormatadaChart = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return dataFormatadaChart;
    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        >

        <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border:0 }}
        >
            <FiX size={45} color="#f34748"/>
        </button>

        <div className={styles.container}>

            <h2>Detalhes do prontuario</h2>
            <p>{dateConvertChart(chart[0].date)}</p>
            <span className={styles.title}>
                Titulo: <strong>{chart[0].title}</strong>
            </span>
            <div>
                <span className={styles.descrição}>
                    Descrição: <strong>{chart[0].description}</strong>
                </span>
            </div>

        </div>

        </Modal>
    )
}