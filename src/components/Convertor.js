import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Typography, TextField, Card, CardContent } from '@mui/material';
import CurrencyAPI from '@everapi/currencyapi-js';
import { CgArrowsExchangeV } from 'react-icons/cg'
import "./Convertor.css";

const Convertor = () => {
    const apiKey = "cur_live_kMYjrmqpclaTMGhHX2xp2bEmIslODg3P2xj7kYRD";
    const currencyApi = new CurrencyAPI(apiKey);
    const [currencyVal, setCurrencyVal] = useState({
        base_currency: "EUR",
        currencies: "INR"
    })
    const [result, setResult] = useState(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        console.log(currencyVal, "valss")
    }, [currencyVal])

    const currencyData = () => {
        currencyApi.latest(currencyVal).then((response) => {
            setResult(response.data)
            console.log(currencyVal, "cuuu")
        })
    }


    const currencyResult = () => {
        if (result !== null && result[currencyVal.currencies]) {
            const rate = result[currencyVal.currencies].value;
            return `1 ${currencyVal.base_currency} = ${rate.toFixed(2)} ${currencyVal.currencies}`
        }

    }
    useEffect(() => {
        totalAmount()
    }, [result])


    const totalAmount = () => {
        const base_amount = currencyVal.amount;
        if (result !== null && result[currencyVal.currencies]) {
            const rate = result[currencyVal.currencies].value;
            console.log(base_amount * rate, "baseeee");
            setAmount(base_amount * rate)
        }

    }

    return (
        <div>
            <Card className="card" elevation={7}>
                <CardContent>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h3>Amount</h3>
                        <FormControl style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <Select
                                style={{ width: "260px" }}
                                value={currencyVal.base_currency}
                                onChange={e => setCurrencyVal({ ...currencyVal, base_currency: e.target.value })} >
                                <MenuItem value="EUR" >EUR</MenuItem>
                                <MenuItem value="AED">AED</MenuItem>
                                <MenuItem value="INR">INR</MenuItem>
                                <MenuItem value="CAD">CAD</MenuItem>
                            </Select>
                            <TextField
                                className='text'
                                type="number"
                                label="number"
                                onChange={e => setCurrencyVal({ ...currencyVal, amount: e.target.value })}
                            ></TextField>
                        </FormControl>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px" }}>
                            <button className='exchange' onClick={currencyData}><CgArrowsExchangeV size={30} /></button>
                        </div>
                        <h3>Converted Amount</h3>
                        <FormControl style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <Select
                                style={{ width: "260px" }}
                                value={currencyVal.currencies}
                                onChange={e => setCurrencyVal({ ...currencyVal, currencies: e.target.value })} >
                                <MenuItem value="EUR" >EUR</MenuItem>
                                <MenuItem value="AED">AED</MenuItem>
                                <MenuItem value="INR">INR</MenuItem>
                                <MenuItem value="CAD">CAD</MenuItem>
                            </Select>
                            <TextField
                                type="number"
                                label="number"
                                value={amount.toFixed(2)}></TextField>
                        </FormControl>
                    </div>
                </CardContent>
            </Card>
            <div className="currencyResult">
                <span>Indicative Exachange Rate</span>
            </div>
            <Typography className="currencyResult2" >{currencyResult()}</Typography>
        </div>
    )
}

export default Convertor