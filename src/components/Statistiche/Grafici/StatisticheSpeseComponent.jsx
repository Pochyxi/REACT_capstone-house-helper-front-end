import React , { useEffect } from 'react';
import { Col , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { useDispatch , useSelector } from "react-redux";
import { getBolletteList , getSpeseList } from "../../../redux/actions/actions";
import ChartSpeseComponent from "../ChartComponent/ChartSpeseComponent";

const StatisticheSpeseComponent = () => {
    const user = useSelector ( state => state.user.user )

    const dispatch = useDispatch ()

    const speseList = useSelector ( state => state.fetch.spesaList )

    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
    } , [] )

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

            let monthArr = arr.filter ( el => el.dataCreazione?.split ( '-' )[1] === index.toString () )
            let monthTotal = []

            if (monthArr.length > 0) {
                for( let i = 0 ; i < monthArr.length ; i++ ) {
                    monthTotal = [...monthTotal, monthArr[i].prodotti.reduce((acc,acval) => acc + acval.prezzo, 0)]
                }
            }


            obj[monthGenerator ( i ) + "Arr"] = monthArr

            obj.arrOfTotal = [ ...obj.arrOfTotal , monthTotal.reduce((acc, acval) => acc + acval, 0) ]

            obj[monthGenerator ( i ) + "Total"] = monthTotal

            obj.arrOfObj = [ ...obj.arrOfObj , ...monthArr ]

        }

        for (let i = 0; i <= 11; i++) {
            let tetto = 300
            let altezzaPercentuale = Math.floor ( (obj.arrOfTotal[i] * 100) /
                obj.arrOfTotal.reduce ( (acc , cval) => acc + cval , 0 ) )
            let altezzaTab = (tetto * altezzaPercentuale) / 100

            obj.arrOfHeightsOfTabs = [ ...obj.arrOfHeightsOfTabs , altezzaTab ]
        }

        return obj
    }

    console.log (statisticGenerator(speseList))


    return (
        <Row className={'text-center justify-content-center'}>
            <ChartSpeseComponent
                nomeStatistica={"Spese"}
                arrOfTotal={statisticGenerator ( speseList ).arrOfTotal}
                arrOfHeightsOfTabs={statisticGenerator ( speseList).arrOfHeightsOfTabs}
                monthGenerator={monthGenerator}
                statisticGeneratorObj={statisticGenerator(speseList)}
            />
            <Card>
                    <Row className={'mt-2'}>
                        {
                            statisticGenerator ( speseList ).arrOfTotal.map ( (month , i) => {
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
                                                    Spese
                                                </b>: {statisticGenerator ( speseList )[monthGenerator(i + 1) + "Arr"].length}
                                            </p>
                                            <p>
                                                <b>Totale</b>: {Math.floor(statisticGenerator ( speseList ).arrOfTotal[i])} €
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

export default StatisticheSpeseComponent;