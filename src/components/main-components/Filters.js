import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DateRangePicker } from 'rsuite';


function Filters({ handleNameInput, clearDateRange, handleDateRange, handleCheckbox, handleSearch }) {
    return (
        <div data-testid="filters" className="filters container p-0 m-0">

            <div className="colName px-4">
                <div data-testid="name-label" className="row align-left">
                    Nazwa lotu
                </div>
                <div className="row">
                    <input data-testid="name-input" type="text" placeholder="Wpisz nazwę" className="form-control form-control-md rounded input-lg" onChange={handleNameInput} ></input>
                </div>
            </div>
            <div className="colDate px-4">
                <div data-testid="date-label" className="row align-left">
                    Data lotu
                </div>
                <div className="row">
                    <DateRangePicker data-testid="date-input" placeholder="RRRR/MM/DD ~ RRRR/MM/DD" size="md" className="drp" showOneCalendar onClean={clearDateRange} onOk={handleDateRange} ></DateRangePicker>
                </div>
            </div>
            <div className="colCheck px-4">
                <div className="row">&nbsp;</div>
                <div data-testid="check" className="row rowCheck">
                    <input data-testid="check-input" className="form-check-input" type="checkbox" onChange={handleCheckbox} />
                    &nbsp;Pokaż tylko udane loty
                </div>
            </div>
            <div className="colButton px-4">
                <div className="row">&nbsp;</div>
                <div className="row">
                    <button data-testid="search-button" type="button" className="btn btn-info" style={{ color: 'gray' }} onClick={handleSearch}>Szukaj</button>
                </div>
            </div>

        </div>
    );

};

export default Filters;