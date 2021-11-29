import './App.scss';
import {Nav, Navbar} from "react-bootstrap";
import {BsCardList} from "react-icons/bs";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from "react-router-dom";
import List from "./List";
import InvoiceForm from "./InvoiceForm";
import SearchNum from "./SearchNum";
import Lang from "./Lang";
import React from "react";

function App() {


    return (
        <div className="App">
            <Router>

                <Navbar bg="white" variant="light" className="d-print-none">
                    <Navbar.Brand as={Link} to="/">{Lang.title}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/list"><BsCardList alignmentBaseline="middle"/> {Lang.menu_list}
                        </Nav.Link>
                    </Nav>
                    <SearchNum/>
                </Navbar>

                <Switch>
                    <Route exact path="/">
                        <InvoiceForm/>
                    </Route>
                    <Route path="/list">
                        <List/>
                    </Route>
                    <Route path="/:num" children={<InvoiceForm/>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
