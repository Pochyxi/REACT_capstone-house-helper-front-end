import React from 'react';
import 'charts.css';
import { Row } from "react-bootstrap";
// import '../css/ChartComponent.css'

const ChartBolletteComponentV2 = (props) => {
    return (
        <Row style={ {
            maxWidth : '100%' ,
            overflow : 'auto' ,
            maxHeight : '50vh'
        } }>
            <table className="charts-css column data-spacing-5 show-heading"
                   style={{
                       maxHeight: '40vh',
                   }}
            >
                <caption> Statistiche bollette dell'ultimo anno giorno per giorno</caption>

                <tbody>

                { props.arrayOfTabsDayDates.map ( (total , i) => {
                    return (<
                            tr key={ i }>
                            <td style={ {
                                width: '50px',
                                fontSize: '.8rem',
                                fontWeight: 'bold',
                                paddingTop: '5px',
                                color: props.arrayOfObjDayDates[i].length === 0 ? 'black':"white",
                                backgroundColor: props.arrOfDayDates[i].split ( '-' )[0] % 2 === 0 ?'green':'blue',
                                "--size" : (((props.arrayOfTabsDayDates[i] * 100) / 500) / 100) === 0 ? 0.01 :
                                    (((props.arrayOfTabsDayDates[i] * 100) / 500) / 100) + 0.02
                            } }>
                                <span>{props.arrOfDayDates[i].split ( '-' )[2]}/{ props.arrOfDayDates[i].split ( '-' )[1] }</span>
                                <span className="tooltip">
                                    Data { props.arrOfDayDates[i] }
                                    <br/>
                                    Bollette { props.arrayOfObjDayDates[i].length }
                                    <br/>
                                    Totale { total } €
                            </span>
                            </td>
                        </tr>
                    )
                } ) }
                </tbody>
            </table>
        </Row>

    );
};

export default ChartBolletteComponentV2;