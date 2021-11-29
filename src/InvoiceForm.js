import {
    useParams
} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import jsonData from './list_json.json'
import {Button, Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import {BsPlus, BsDash} from "react-icons/bs";
import React, {useState} from "react";
import Types from './Types';
import num2str from "./Num2Str";
import Lang from "./Lang";

function getTypes() {
    return Object.keys(Types).map(function (key, i) {
        return <option key={i} value={key}>{Types[key].title} ({Types[key].sum})</option>
    });
}

function InvoiceForm() {
    let {num} = useParams();
    let alertInit = false;
    let funded = [];

    if (num) {
        const data = [...jsonData]
        funded = data.filter((e) => e.num === num)
        alertInit = true;
    } else {
        funded.push({"num": "", "name": ""})
    }

    if (funded.length === 0) {
        funded.push({"num": "", "name": ""})
    }

    const [numField, setNumField] = useState(funded[0].num);
    const [nameField, setNameField] = useState(funded[0].name);
    const [targetField, setTargetField] = useState('vznos');
    const [counterField, setCounterField] = useState(0);
    const [alert, setAlert] = useState(alertInit);

    const getCounter = (params = false) => {
        if (counterField <= 0) {
            const data = localStorage.getItem('num_document_' + targetField)
            let counter = parseInt(data, 10);
            if (!counter) {
                counter = 1;
            }
            setCounterField(counter);
            return (params ? Types[targetField].prefix : '') + counter + (params ? Types[targetField].affix : '');
        }
        return (params ? Types[targetField].prefix : '') + counterField + (params ? Types[targetField].affix : '');
    }

    const changeCounter = (type) => {
        const data = localStorage.getItem('num_document_' + type)
        let counter = parseInt(data, 10);
        if (!counter) {
            counter = 1;
        }
        console.log(counter)
        setCounterField(counter);
    }

    const setCounter = (num) => {
        setCounterField(num);
        setAlert(false);
        localStorage.setItem('num_document_' + targetField, num);
    }

    const addCounter = () => {
        let num = getCounter();
        setCounter(++num)
    }

    const delCounter = () => {
        let num = getCounter();
        setCounter(--num)
    }

    const [sumField, setSumField] = useState(Types[targetField].sum);
    const [textField, setTextField] = useState(Types[targetField].text);

    const setType = (type) => {
        setTargetField(type)
        setSumField(Types[type].sum)
        setTextField(Types[type].text)
        changeCounter(type)
    }

    let date = new Date();
    let MyDateString;
    let MyDate = ('0' + date.getDate()).slice(-2);
    let MyMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    let MyYear = date.getFullYear();
    MyDateString = MyDate + '.'
        + MyMonth + '.'
        + MyYear;

    let nameArray = nameField.split(" ")
    let familyName = nameArray.shift()
    let firstName = nameArray.join(' ')
    return (
        <Container>
            <Row className="pb-5 pt-5 d-print-none">
                <Col sm={12}>
                    <Form>
                        <Form.Row>
                            <Col lg={1}>
                                <FormLabel htmlFor="num">{Lang.num}</FormLabel>
                                <Form.Control placeholder={Lang.num_text} value={numField} id="num"
                                              onChange={e => setNumField(e.target.value)}/>
                            </Col>
                            <Col lg={6}>
                                <FormLabel htmlFor="name">{Lang.name}</FormLabel>
                                <Form.Control placeholder={Lang.name_text} value={nameField} id="name"
                                              onChange={e => setNameField(e.target.value)}/>
                            </Col>
                            <Col lg={1} className="pr-0">
                                <FormLabel htmlFor="counter">{Lang.counter}</FormLabel>
                                <Form.Control isInvalid={alert} placeholder={Lang.counter_text} value={getCounter()}
                                              id="counter"
                                              onChange={e => setCounter(e.target.value)}/>
                            </Col>
                            <Col lg={1} className="pl-0 mt-auto">
                                <Button variant="outline-secondary" onClick={e => addCounter()}><BsPlus/></Button>
                                <Button variant="outline-secondary" onClick={e => delCounter()}><BsDash/></Button>
                            </Col>
                            <Col lg={3}>
                                <FormLabel htmlFor="type">{Lang.type}</FormLabel>
                                <Form.Control as="select" onChange={e => setType(e.target.value)} id="type">
                                    {getTypes()}
                                </Form.Control>

                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={1}>
                                <FormLabel htmlFor="sum">{Lang.sum}</FormLabel>
                                <Form.Control placeholder={Lang.sum_text} value={sumField} id="sum"
                                              onChange={e => setSumField(e.target.value)}/>
                            </Col>
                            <Col lg={6}>
                                <FormLabel htmlFor="text">{Lang.text}</FormLabel>
                                <Form.Control placeholder={Lang.text_text} value={textField} id="text"
                                              onChange={e => setTextField(e.target.value)}/>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
            <Row className="invoice" noGutters>
                <Col sm={7} className="invoice__left">
                    <Row>
                        <Col sm={3}>
                            {Lang.plot}{numField}
                        </Col>
                        <Col sm={{span: 7, offset: 2}}>
                            <div className="pl-3">{ReactHtmlParser(Lang.form_legend)}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-2" noGutters>
                        <Col sm={9}>
                            <div className="form-fields mt-4">

                                <div className="text-right">
                                    {Lang.form_okud}
                                </div>
                                <div className="text-right">
                                    <div className="form-fields_underline" style={{"width": "80%"}}>
                                        <div className="form-fields_underline--label">{Lang.form_org}</div>
                                        {Lang.title}
                                    </div>
                                    {Lang.form_okpo}
                                </div>
                                <div className="text-right pt-3">
                                    <div className="form-fields_underline w-95">
                                        <div className="form-fields_underline--label">{Lang.form_suborg}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3} className="pl-2">
                            <div className="table table_border">
                                <div className="legend">{Lang.form_cod}</div>
                                <div className="table_border--bold">{Lang.form_cod_val}</div>
                                <div className="table_border--bold">&nbsp;</div>
                                <div className="table_border--bold pt-3">&nbsp;</div>
                            </div>
                        </Col>
                    </Row>
                    <Row noGutters>
                        <Col sm={8} className="text-center mt-auto mb-3">
                            <div className="header">{Lang.form_title_left}</div>
                        </Col>
                        <Col sm={2}>
                            <div className="table table_border">
                                <div className="legend">{ReactHtmlParser(Lang.form_num)}</div>
                                <div className="table_border--bold border-right-0">{getCounter(true)}</div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="table table_border">
                                <div className="legend">{ReactHtmlParser(Lang.form_date)}</div>
                                <div
                                    className="table_border--bold border-left">{MyDateString}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row noGutters>
                        <Col sm={12}>
                            <div className="table table_border d-flex flex-row align-items-stretch">
                                <div className="d-flex flex-column border-right">
                                    <div className="legend mb-auto p-1">{Lang.form_debet}</div>
                                    <div className="table_border--bold-row-first">&nbsp;</div>
                                </div>

                                <div className="d-flex flex-column border-right">
                                    <div className="legend border-bottom p-1">{Lang.form_kredit}</div>
                                    <div className="d-flex flex-row">
                                        <div className="d-flex flex-column border-right w-10">
                                            <div className="mb-auto">&nbsp;</div>
                                            <div className="table_border--bold-row">&nbsp;</div>
                                        </div>
                                        <div className="d-flex flex-column border-right">
                                            <div className="legend mb-auto p-1">{ReactHtmlParser(Lang.form_kod_pod)}
                                            </div>
                                            <div className="table_border--bold-row">&nbsp;</div>
                                        </div>
                                        <div className="d-flex flex-column border-right">
                                            <div className="legend mb-auto p-1">{ReactHtmlParser(Lang.form_kor_schet)}
                                            </div>
                                            <div className="table_border--bold-row">&nbsp;</div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="legend mb-auto p-1">{ReactHtmlParser(Lang.form_kod_uchet)}
                                            </div>
                                            <div className="table_border--bold-row">&nbsp;</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column border-right">
                                    <div className="legend mb-auto p-1">{Lang.form_sum}</div>
                                    <div className="table_border--bold-row">{sumField}</div>
                                </div>

                                <div className="d-flex flex-column border-right">
                                    <div className="legend mb-auto p-1">{Lang.form_kod_cel}
                                    </div>
                                    <div className="table_border--bold-row">&nbsp;</div>
                                </div>

                                <div className="d-flex flex-column w-10">
                                    <div className="mb-auto">&nbsp;
                                    </div>
                                    <div className="table_border--bold-row-last">&nbsp;</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-fields">
                                <div className="text-left">
                                    {Lang.form_prinyto}
                                    <div className="form-fields_underline" style={{"width": "83%"}}>
                                        {nameField}
                                    </div>
                                </div>
                                <div className="text-left pt-3">
                                    {Lang.form_osnov}
                                    <div className="form-fields_underline" style={{"width": "83%"}}>
                                        {textField}
                                    </div>
                                </div>
                                <div className="text-left pt-3">
                                    <div className="form-fields_underline w-100">

                                    </div>
                                </div>

                                <div className="text-left">
                                    {Lang.form_summa}
                                    <div className="form-fields_underline" style={{"width": "88%"}}>
                                        <div className="form-fields_underline--label">{Lang.form_propis}</div>
                                        {num2str(sumField)}
                                    </div>
                                </div>
                                <div className="d-flex flex-row pt-3">
                                    <div className="text-right flex-fill w-75">
                                        <div className="form-fields_underline w-90">

                                        </div>
                                        {Lang.form_rub}
                                    </div>
                                    <div className="text-right flex-fill">
                                        <div className="form-fields_underline w-50">

                                        </div>
                                        {Lang.form_kop}
                                    </div>
                                </div>

                                <div className="text-left">
                                    {Lang.form_vtom}
                                    <div className="form-fields_underline" style={{"width": "83%"}}>

                                    </div>
                                </div>
                                <div className="text-left pt-3">
                                    {Lang.form_prilog}
                                    <div className="form-fields_underline" style={{"width": "82%"}}>

                                    </div>
                                </div>

                                <div className="d-flex flex-row pt-3 w-90">
                                    <div className="text-left flex-fill">
                                        {Lang.form_glav_buh}
                                        <div className="form-fields_underline w-50">
                                            &nbsp;
                                            <div className="form-fields_underline--label-50">{Lang.form_podpis}</div>
                                        </div>
                                    </div>
                                    <div className="text-left flex-fill">
                                        <div className="form-fields_underline w-100">
                                            &nbsp;
                                            <div
                                                className="form-fields_underline--label-50 text-nowrap">{Lang.form_podpis_ras}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row pt-3 w-90">
                                    <div className="text-left flex-fill">
                                        {Lang.form_poluchil}
                                        <div className="form-fields_underline w-50">
                                            &nbsp;
                                            <div className="form-fields_underline--label-50">{Lang.form_podpis}</div>
                                        </div>
                                    </div>
                                    <div className="text-left flex-fill">
                                        <div className="form-fields_underline w-100">
                                            {Lang.form_buh_podpis}
                                            <div
                                                className="form-fields_underline--label-50 text-nowrap">{Lang.form_podpis_ras}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </Col>

                    </Row>
                </Col>
                <Col sm={1} className="invoice__middle">
                    <div className="vl vl--b"/>
                    <div className="text">{Lang.form_linia}</div>
                    <div className="vl"/>
                    <div className="vl vl--bb"/>
                </Col>
                <Col sm={4} className="invoice__right">
                    <Row>
                        <Col sm={{span: 5, offset: 7}} className="text-right mb-3">
                            {Lang.plot}{numField}
                        </Col>
                        <Col sm={12}>
                            <div className="text-center">
                                <div className="form-fields_underline w-100">
                                    <div className="form-fields_underline--label">{Lang.form_org}</div>
                                    {Lang.title}
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} className="text-center mt-5 mb-3">
                            <div className="header">{Lang.form_title_right}</div>
                        </Col>
                        <Col>
                            <div className="form-fields">
                                <div className="text-left">
                                    {Lang.form_k_prih_orderu}
                                    <div className="form-fields_underline" style={{"width": "22%"}}>
                                        {getCounter(true)}
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="text-left flex-fill">
                                        {Lang.form_ot}
                                        <div className="form-fields_underline" style={{"width": "78%"}}>
                                            "{MyDate}"
                                        </div>
                                    </div>
                                    <div className="text-right flex-fill">
                                        <div className="form-fields_underline w-90">
                                            {MyMonth}
                                        </div>
                                    </div>
                                    <div className="text-right flex-fill">
                                        <div className="form-fields_underline" style={{"width": "78%"}}>
                                            {MyYear}
                                        </div>
                                        {Lang.form_god}
                                    </div>
                                </div>
                                <div className="text-left mt-3">
                                    {Lang.form_prinyto}
                                    <div className="form-fields_underline" style={{"width": "70%"}}>
                                        {familyName}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="form-fields_underline w-100">
                                        {firstName}
                                    </div>
                                </div>
                                <div className="text-left pt-3">
                                    {Lang.form_osnov}
                                    <div className="form-fields_underline" style={{"width": "72%"}}>
                                        {textField}
                                    </div>
                                </div>
                                <div className="text-left pt-3">
                                    <div className="form-fields_underline w-100">

                                    </div>
                                </div>
                                <div className="d-flex flex-row pt-3">
                                    {Lang.form_summa}
                                    <div className="text-right flex-fill w-50">
                                        <div className="form-fields_underline w-75">
                                            <div className="form-fields_underline--label">{Lang.form_cifri}</div>
                                            {sumField}
                                        </div>
                                        {Lang.form_rub}
                                    </div>
                                    <div className="text-right flex-fill w-25">
                                        <div className="form-fields_underline w-50">
                                            00
                                        </div>
                                        {Lang.form_kop}
                                    </div>
                                </div>
                                <div className="text-left mt-3">
                                    <div className="form-fields_underline w-100">
                                        <div className="form-fields_underline--label">{Lang.form_propis}</div>
                                        {num2str(sumField)}
                                    </div>
                                </div>
                                <div className="d-flex flex-row pt-3">
                                    <div className="text-right flex-fill w-75">
                                        <div className="form-fields_underline" style={{"width": "85%"}}>

                                        </div>
                                        {Lang.form_rub}
                                    </div>
                                    <div className="text-right flex-fill">
                                        <div className="form-fields_underline" style={{"width": "35%"}}>

                                        </div>
                                        {Lang.form_kop}
                                    </div>
                                </div>

                                <div className="text-left">
                                    {Lang.form_vtom}
                                    <div className="form-fields_underline" style={{"width": "70%"}}>

                                    </div>
                                </div>

                                <div className="d-flex flex-row mt-3 w-75">
                                    <div className="text-left flex-fill flex-grow-0">
                                        <div className="form-fields_underline">
                                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                        </div>
                                    </div>
                                    <div className="text-right flex-fill flex-grow-2">
                                        <div className="form-fields_underline w-90">
                                            &nbsp;
                                        </div>
                                    </div>
                                    <div className="text-right flex-fill flex-grow-1">
                                        <div className="form-fields_underline" style={{"width": "80%"}}>
                                            &nbsp;
                                        </div>
                                        {Lang.form_god}
                                    </div>
                                </div>

                                <div className="text-left mt-5">
                                    {Lang.form_pechat}

                                </div>

                                <div className="d-flex flex-row pt-5">
                                    <div className="text-left flex-fill flex-grow-2">
                                        {Lang.form_glav_buh}
                                        <div className="form-fields_underline" style={{"width": "35%"}}>
                                            &nbsp;
                                            <div className="form-fields_underline--label-50">{Lang.form_podpis}</div>
                                        </div>
                                    </div>
                                    <div className="text-left flex-fill flex-grow-1">
                                        <div className="form-fields_underline w-100">
                                            &nbsp;
                                            <div
                                                className="form-fields_underline--label-0 text-nowrap">{Lang.form_podpis_ras}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row pt-3">
                                    <div className="text-left flex-fill flex-grow-2">
                                        {Lang.form_poluchil}
                                        <div className="form-fields_underline" style={{"width": "40%"}}>
                                            &nbsp;
                                            <div className="form-fields_underline--label-50">{Lang.form_podpis}</div>
                                        </div>
                                    </div>
                                    <div className="text-left flex-fill flex-grow-0">
                                        <div className="form-fields_underline w-100">
                                            {Lang.form_buh_podpis}
                                            <div
                                                className="form-fields_underline--label-0 text-nowrap">{Lang.form_podpis_ras}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default InvoiceForm
