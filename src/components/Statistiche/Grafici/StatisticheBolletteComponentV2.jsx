import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { getBolletteList } from "../../../redux/actions/actions";

const StatisticheBolletteComponentV2 = () => {
    const user = useSelector ( state => state.user.user )
   const bolletteList = useSelector ( state => state.fetch.bollettaList)

    const dispatch = useDispatch ()

    useEffect(() => {
        dispatch(getBolletteList(user.token, user.id))
        console.log (statisticBolletteGenerator(365))
    }, [])

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

    const statisticBolletteGenerator = (temporality) => {
        //oggetto che conterrà tutte le informazioni processate
        // 1 array con 12 oggetti che conterranno le info mese per mese
        let obj = {
            arrOfDayDates: []
        }
        const handleObj = (key, value) => {
            obj = {
                ...obj,
                [key] : value
            }
        }


        const parser = (number) => {
            if ( number < 10 ) return '0' + number
            else return number
        }

        for (let i = 0; i < temporality; i++) {
            if (i === 0) {
                let date = new Date()
                let dateYear = date.getUTCFullYear () + '-'
                let dateMonth = date.getMonth () + 1
                let dateDay = date.getUTCDate ()
                obj.arrOfDayDates.push(dateYear + parser(parseInt(dateMonth)) + '-' + parser(dateDay))
            } else {
                let date = new Date()
                const oneDayInMs = 86400000
                date.setMilliseconds(date.getMilliseconds() - (oneDayInMs * i))
                let dateYear = date.getUTCFullYear () + '-'
                let dateMonth = date.getMonth () + 1
                let dateDay = date.getUTCDate ()

                obj.arrOfDayDates.push(dateYear + parser(parseInt(dateMonth)) + '-' + parser(dateDay))

            }
        }


        return obj
    }

    return (
        <div>

        </div>
    );
};

export default StatisticheBolletteComponentV2;