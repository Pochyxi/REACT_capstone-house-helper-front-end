import React from 'react';
import 'charts.css';
import './css/ChartComponent.css'
import Card from "@mui/material/Card";
import { Row } from "react-bootstrap";

const ChartBolletteComponent = ({
                                    arrOfTotal ,
                                    arrOfHeightsOfTabs ,
                                    monthGenerator ,
                                    statisticGeneratorObj ,
                                    nomeStatistica
                                }) => {
    return (<Card id="my-chart">

            {/*<ul className="charts-css legend">*/ }
            {/*</ul>*/ }
            { statisticGeneratorObj.arrOfObj.length > 0 ? (
                    <table className="charts-css column data-spacing-10 show-heading">
                        <caption> Statistiche { nomeStatistica } mese per mese</caption>

                        <tbody>

                        { arrOfTotal.map ( (month , i) => {
                            return (<tr key={ i }>
                                    <td style={ {
                                        "--size" : (((arrOfHeightsOfTabs[i] * 100) / 500) / 100) === 0 ? 0.01 :
                                            (((arrOfHeightsOfTabs[i] * 100) / 500) / 100) + 0.2
                                    } }> { monthGenerator ( i + 1 ) }
                                        <span className="tooltip">
                                        Bollette { statisticGeneratorObj[monthGenerator ( i + 1 ) + "Arr"].length }
                                            <br/>
                                        Totale { statisticGeneratorObj.arrOfTotal[i] } €
                                    </span>
                                    </td>
                                </tr>)
                        } ) }
                        </tbody>
                    </table>
                ) : (
                    <Row>
                        <h4>Nessuna statistica disponibile</h4>
                    </Row>
            )
            }
        </Card>);
};

export default ChartBolletteComponent;