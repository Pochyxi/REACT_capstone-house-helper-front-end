import React , { useEffect , useState } from 'react';
import { Col , Container , Row } from "react-bootstrap";
import { getBolletteList } from "../../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import Card from "@mui/material/Card";
import ChartBolletteComponent from "../ChartComponent/ChartBolletteComponent";

const StatisticheBolletteComponent = (props) => {
    const user = useSelector ( state => state.user.user )

    const dispatch = useDispatch ()

    const bolletteList = useSelector ( state => state.fetch.bollettaList )

    const monthGenerator = (index) => {
        switch (index) {
            case 1:
                return "Gen"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "Mag"
            case 6:
                return "Giu"
            case 7:
                return "Lug"
            case 8:
                return "Ago"
            case 9:
                return "Set"
            case 10:
                return "Ott"
            case 11:
                return "Nov"
            case 12:
                return "Dic"
        }
    }

    const statisticGenerator = (arr) => {
        let obj = {
            arrOfTotal : [] ,
            arrOfObj : [] ,
            arrOfHeightsOfTabs : [] ,
        };

        for (let i = 1; i <= 12; i++) {
            let index = ""

            if ( i <= 9 ) {
                index = '0' + i
            } else {
                index = i
            }

            let monthArr = arr.filter ( el => el.emissione.split ( '-' )[1] === index.toString () )
            let monthTotal = Math.floor ( arr.filter ( el => el.emissione.split ( '-' )[1] ===
                index.toString () ).reduce ( (acc , cval) => acc + cval.totale , 0 ) )


            obj[monthGenerator ( i ) + "Arr"] = monthArr

            obj.arrOfTotal = [ ...obj.arrOfTotal , monthTotal ]

            obj[monthGenerator ( i ) + "Total"] = monthTotal

            obj.arrOfObj = [ ...obj.arrOfObj , ...monthArr ]

        }

        for (let i = 0; i <= 11; i++) {
            let tetto = 500
            let altezzaPercentuale = Math.floor ( (obj.arrOfTotal[i] * 100) /
                obj.arrOfTotal.reduce ( (acc , cval) => acc + cval , 0 ) )
            let altezzaTab = (tetto * altezzaPercentuale) / 100

            obj.arrOfHeightsOfTabs = [ ...obj.arrOfHeightsOfTabs , altezzaTab ]
        }

        return obj;
    }

    useEffect ( () => {
        dispatch ( getBolletteList ( user.token , user.id ) )
    } , [] )

    console.log (statisticGenerator ( bolletteList ))

    return (
        <Row className={'text-center justify-content-center'}>
            <ChartBolletteComponent
                nomeStatistica={"Bollette"}
                arrOfTotal={statisticGenerator ( bolletteList ).arrOfTotal}
                arrOfHeightsOfTabs={statisticGenerator ( bolletteList).arrOfHeightsOfTabs}
                monthGenerator={monthGenerator}
                statisticGeneratorObj={statisticGenerator( bolletteList)}
            />
            <Card>
                    <Row className={'mt-2'}>
                        {
                            statisticGenerator ( bolletteList ).arrOfTotal.map ( (month , i) => {
                                return (
                                    <Col
                                        key={i}
                                        className={'mt-2 p-2'}
                                        xs={4}>
                                        <Row
                                            style={{
                                                borderRight: '3px solid black',
                                                borderBottom:'3px solid black',
                                                fontSize: '1.2em',
                                            }}>
                                            <h6 style={{
                                                color: 'royalblue'
                                            }}>
                                                {monthGenerator(i + 1)}
                                            </h6>
                                            <p>
                                                <b>
                                                    Bollette
                                                </b>: {statisticGenerator ( bolletteList )[monthGenerator(i + 1) + "Arr"].length}
                                            </p>
                                            <p>
                                                <b>Totale</b>: {statisticGenerator ( bolletteList ).arrOfTotal[i]} €
                                            </p>
                                        </Row>
                                    </Col>
                                )
                            })
                        }
                    </Row>
            </Card>
        </Row>

    );
};

export default StatisticheBolletteComponent;