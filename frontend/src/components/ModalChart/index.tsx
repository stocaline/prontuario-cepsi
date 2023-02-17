import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { ChartProps } from '../../pages/viewPat'

interface ModalChartProps{
    isOpen: boolean,
    onRequestClose: () => void;
    chart: ChartProps | undefined;
}

export function ModalChart({ isOpen, onRequestClose, chart}:ModalChartProps){
    console.log(chart)
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
    
    function dateConvertChart(created_at: any) {
        var data = new Date(created_at);
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
            <p>{dateConvertChart(chart?.created_at)}</p>
            <span className={styles.title}>
                Titulo: <strong>{chart?.title}</strong>
            </span>
            <div>
                <span className={styles.descrição}>
                    Descrição: <strong>{chart?.description}</strong>
                </span>
            </div>

        </div>

        </Modal>
    )
}