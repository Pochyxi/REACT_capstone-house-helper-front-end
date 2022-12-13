import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { Col , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { getBolletteList , getPostitList } from "../../../redux/actions/actions";
import ChartBolletteComponent from "../ChartComponent/ChartBolletteComponent";
import ChartPostitComponent from "../ChartComponent/ChartPostitComponent";

const StatistichePostitComponent = () => {
    const user = useSelector ( state => state.user.user )

    const dispatch = useDispatch ()

    const postitList = useSelector ( state => state.fetch.postitList )

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
            arrOfTotalMonths : [] ,
            arrOfTotalMonthsNotComplete : [] ,
            arrOfTotalMonthsComplete : [] ,
            arrOfHeightsOfTabs : [] ,
            arrOfObj: []
        }

        for (let i = 1; i <= 12; i++) {
            let index = ""

            if ( i <= 9 ) {
                index = '0' + i
            } else {
                index = i
            }

            // PER OGNI MESE CONTROLLO QUANTI POSTIT SCADONO E MEMORIZZO IL NUMERO DI POSTIT TROVATI
            let monthTotal = arr.filter ( el => el.scadenza.split ( '-' )[1] === index.toString () ).length
            let monthTotalObj = arr.filter ( el => el.scadenza.split ( '-' )[1] === index.toString () )
            obj[monthGenerator ( i ) + "TotalExpNumber"] = monthTotal
            // ARRAY CON 12 ELEMENTI OGNI ELEMENTO E' IL NUMERO DI POSTIT PER OGNI MESE
            obj.arrOfTotalMonths = [ ...obj.arrOfTotalMonths , monthTotal ]
            obj.arrOfObj = [...obj.arrOfObj, ...monthTotalObj]

            // PER OGNI MESE CONTROLLO QUANTI POSTIT SCADONO E CONTROLLO SE SONO STATI COMPLETATI
            // NON COMPLETATI
            let monthTotalExpNotCompleted = arr.filter ( el => el.scadenza.split ( '-' )[1] ===
                index.toString () ).filter ( el => !el.stato ).length
            obj[monthGenerator ( i ) + "TotalExpNotComplete"] = monthTotalExpNotCompleted
            // ARRAY CON 12 ELEMENTI
            obj.arrOfTotalMonthsNotComplete = [ ...obj.arrOfTotalMonthsNotComplete , monthTotalExpNotCompleted ]

            // COMPLETATI
            let monthTotalExpCompleted = arr.filter ( el => el.scadenza.split ( '-' )[1] ===
                index.toString () ).filter ( el => el.stato ).length
            obj[monthGenerator ( i ) + "TotalExpComplete"] = monthTotalExpCompleted
            // ARRAY CON 12 ELEMENTI
            obj.arrOfTotalMonthsComplete = [ ...obj.arrOfTotalMonthsComplete , monthTotalExpCompleted ]
        }

        for (let i = 0; i <= 11; i++) {
            let tetto = 500
            let altezzaPercentuale = Math.floor ( (obj.arrOfTotalMonths[i] * 100) /
                obj.arrOfTotalMonths.reduce ( (acc , cval) => acc + cval , 0 ) )
            let altezzaTab = (tetto * altezzaPercentuale) / 100

            obj.arrOfHeightsOfTabs = [ ...obj.arrOfHeightsOfTabs , altezzaTab ]
        }

        return obj
    }

    useEffect ( () => {
        dispatch ( getPostitList ( user.token , user.id ) )
    } , [] )

    console.log ( statisticGenerator ( postitList ) )

    return (
        <Row className={ 'text-center justify-content-center' }>
            <ChartPostitComponent
                nomeStatistica={"Postit"}
                arrOfTotal={ statisticGenerator ( postitList ).arrOfTotalMonths }
                arrOfHeightsOfTabs={ statisticGenerator ( postitList ).arrOfHeightsOfTabs }
                monthGenerator={ monthGenerator }
                statisticGeneratorObj={ statisticGenerator ( postitList ) }
            />
            <Card>
                    <Row className={ 'mt-2' }>
                        {
                            statisticGenerator ( postitList ).arrOfTotalMonths.map ( (month , i) => {
                                return (
                                    <Col
                                        key={ i }
                                        className={ 'mt-2 p-2' }
                                        xs={ 4 }>
                                        <Row
                                            style={ {
                                                borderRight : '3px solid black' ,
                                                borderBottom : '3px solid black'
                                            } }>
                                            <h6 style={ {
                                                color : 'royalblue'
                                            } }>{ monthGenerator ( i + 1 ) }</h6>
                                            <p><b>Postit</b>: { statisticGenerator ( postitList )[monthGenerator ( i +
                                                1 ) + "TotalExpNumber"] }</p>
                                            <p>
                                                <b>Completati</b>: { statisticGenerator ( postitList )[monthGenerator ( i +
                                                1 ) + "TotalExpComplete"] }</p>
                                            <p><b>Non
                                                completati</b>: { statisticGenerator ( postitList )[monthGenerator ( i +
                                                1 ) + "TotalExpNotComplete"] }</p>
                                        </Row>
                                    </Col>
                                )
                            } )
                        }
                    </Row>
            </Card>
        </Row>
    );
};

export default StatistichePostitComponent;