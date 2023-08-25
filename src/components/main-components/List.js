import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ItemsComponent from './ListItems.js';

function List({ launchesListFiltered, isLoading }) {

    //funckja odpwiadajaca za pagination
    const Pagination = ({ nPages, currentPage, setCurrentPage, isListChanged, setIsListChanged }) => {

        if (JSON.stringify(launchesListFiltered) != JSON.stringify(isListChanged)) {
            setCurrentPage(1);
            setIsListChanged(launchesListFiltered)
        }

        const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

        const nextPage = () => {
            if (currentPage !== nPages) setCurrentPage(currentPage + 1)
        }
        const prevPage = () => {
            if (currentPage !== 1) setCurrentPage(currentPage - 1)
        }
        return (
            <nav>
                <ul className='pagination justify-content-center'>
                    <li className="page-item">
                        <a className="page-link"
                            onClick={prevPage}
                            href='#'>

                            Previous
                        </a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                            className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                            <a onClick={() => setCurrentPage(pgNumber)}
                                className='page-link'
                                href='#'>

                                {pgNumber}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link"
                            onClick={nextPage}
                            href='#'>

                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }

    const [isListChanged, setIsListChanged] = useState(launchesListFiltered);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);

    var data = launchesListFiltered;
    var data = launchesListFiltered.sort((obj1, obj2) =>
        new Date(obj2.date_utc) - new Date(obj1.date_utc));
    data = uniqBy(data, JSON.stringify)

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    //funkcja upewniajaca sie ze nie ma duplikatow na liscie
    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }

    return (
        <div data-testid="list" className="list container p-0 m-0">
            {(isLoading == true) ? (
                <div data-testid="spinner" className="row justify-content-center">
                    <Spinner className="" animation="border" variant="info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <span data-testid="list-items-counter">Ilość wyników : {data.length}</span>
                    {(data.length != 0) ? (
                        <>
                            <ItemsComponent currentItems={currentRecords} />
                            <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                isListChanged={isListChanged}
                                setIsListChanged={setIsListChanged}
                            />
                        </>
                    ) : (<></>)}
                </>
            )}
        </div>
    );
}

export default List;