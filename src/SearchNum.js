import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import {Button, Form, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";

function SearchNum() {
    let search = useRef(null)
    let history = useHistory();

    const HandleSearch = () => {
        history.push("/" + search.current.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            HandleSearch()
        }
    }
    return (
        <Form inline>
            <FormControl ref={search} type="text" placeholder="Поиск по участку" onKeyDown={handleKeyDown}
                         className="mr-sm-2"/>
            <Button variant="outline-secondary" type="submit" onClick={HandleSearch}><BsSearch/></Button>
        </Form>
    )
}

export default SearchNum
