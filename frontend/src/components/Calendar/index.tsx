import dayjs from 'dayjs';
import styles from './styles.module.scss';

const weekdays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
]

const mouths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]

export function Calendar() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>{mouths.at(dayjs().month().valueOf())}</p>
            </div>
            <div className={styles.weekDays}>
                {weekdays.map(day => (
                        <p key={day}>{day}</p>
                    ))
                }
            </div>
            <div className={styles.mouthDays}>
                <p>01</p>
                <p>02</p>
                <p>03</p>
                <p>04</p>
                <p>05</p>
                <p>06</p>
                <p>07</p>
                <p>08</p>
                <p>09</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>
                <p>18</p>
                <p>19</p>
                <p>20</p>
                <p>21</p>
                <p>22</p>
                <p>23</p>
                <p>24</p>
                <p>25</p>
                <p>26</p>
                <p>27</p>
                <p>28</p>
                <p>29</p>
                <p>30</p>
                
            </div>
        </div>


    )
}