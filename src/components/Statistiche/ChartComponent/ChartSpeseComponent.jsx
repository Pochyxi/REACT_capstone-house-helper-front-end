import React from 'react';
import Card from "@mui/material/Card";
import { Row } from "react-bootstrap";

const ChartSpeseComponent = ({
                                 arrOfTotal ,
                                 arrOfHeightsOfTabs ,
                                 monthGenerator ,
                                 statisticGeneratorObj ,
                                 nomeStatistica
                             }) => {
    return (
        <Card id="my-chart">

            {
                statisticGeneratorObj.arrOfObj.length > 0 ? (
                    <table className="charts-css column data-spacing-10 show-heading">
                        <caption> Statistiche { 'Spese' } mese per mese</caption>

                        <tbody>
                        {
                            arrOfTotal.map ( (month , i) => {
                                return (
                                    <tr key={ i }>
                                        <td style={ {
                                            "--size" :
                                                (((arrOfHeightsOfTabs[i] * 100) / 500) / 100) === 0 ? 0.01 :
                                                    (((arrOfHeightsOfTabs[i] * 100) / 500) / 100)
                                        } }> { monthGenerator ( i + 1 ) }
                                            <span className="tooltip">
                                        Spese { statisticGeneratorObj[monthGenerator ( i + 1 ) +
                                            "Arr"].length }
                                                <br/>
                                        Totale {Math.floor(statisticGeneratorObj.arrOfTotal[i])} €
                                    </span>
                                        </td>
                                    </tr>
                                )
                            } )
                        }
                        </tbody>
                    </table>
                ) : (<Row><h4>Nessuna statistica disponibile</h4></Row>)
            }

        </Card>
    );
};

export default ChartSpeseComponent;