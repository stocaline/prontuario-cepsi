import { useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import styles from './styles.module.scss';
import 'moment/locale/pt-br';

const weekdays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
]

export function Calendar() {

    const [date, setDate] = useState(moment());

    const previousMonth = () => {
      setDate(moment(date).subtract(1, 'month'));
    };
  
    const nextMonth = () => {
      setDate(moment(date).add(1, 'month'));
    };
  
    const renderDays = () => {
      const monthStart = moment(date).startOf('month').locale('pt-br');
      const monthEnd = moment(date).endOf('month');
      const today = moment(date).format("DD")
      const diff = monthEnd.diff(monthStart, 'days') + 1;
      const days = Array.from({ length: diff }, (_, i) =>
        moment(monthStart).add(i, 'days')
      );

    return days.map((day) => (
      <div className="day" key={day.format('D MMMM YYYY')}>
          {day.format("DD") ==  today ?
            <p className={styles.toDay}>{day.format('DD')}</p>
            :
            <p >{day.format('DD')}</p>
          }
      </div>
    ));
  };
  

    return (

        <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            <Moment format="MMMM YYYY">{date}</Moment>
          </h2>
        </div>
        <div className={styles.weekDays}>
            {weekdays.map(day => (
                <p key={day}>{day}</p>
                ))
            }
        </div>
        <div className={styles.mouthDays}>{renderDays()}</div>
      </div>
    )
}