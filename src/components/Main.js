import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListComponent from "./main-components/List";
import axiosInstance from "./axios/Axios";
import FiltersComponent from "./main-components/Filters.js";

function Main() {

    const [launchesList, setLaunchesList] = useState([]);
    const [launchesListFiltered, setLaunchesListFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [launchesDateRange, setLaunchesDateRange] = useState([]);
    const [launchesName, setLaunchesName] = useState('');
    const [launchesFailed, setLaunchesFailed] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        //pobranie listy launches
        axiosInstance
            .get(`v5/launches`, {}, {
            })
            .then((res) => {
                res.data.map((launch) => {
                    //pobranie danych rakiety
                    var urlR = 'v4/rockets/' + launch.rocket;
                    axiosInstance
                        .get(urlR, {}, {
                        })
                        .then((res2) => {
                            //pobranie danych launchpada
                            var urlL = 'v4/launchpads/' + launch.launchpad;
                            axiosInstance
                                .get(urlL, {}, {
                                })
                                .then((res3) => {
                                    var p = [];

                                    var z = launch.links.flickr.original.concat(res2.data.flickr_images)

                                    for (var i = 0; i < z.length; i++) {
                                        var obj = {
                                            original: z[i],
                                            thumbnail: z[i]
                                        }
                                        p.push(obj);
                                    }

                                    var x = {
                                        date_utc: launch.date_utc,
                                        photos: launch.links.flickr.original,
                                        rocketPhotos: res2.data.flickr_images,
                                        rocketName: res2.data.name,
                                        success: launch.success,
                                        crew: launch.crew,
                                        launchpadName: res3.data.name,
                                        launchpadLocation: res3.data.locality + ' ' + res3.data.region,
                                        flight_number: launch.flight_number,
                                        name: launch.name,
                                        details: launch.details,
                                        allPhotos: p
                                    }

                                    setLaunchesList(launchesList => [...launchesList, x])
                                    setLaunchesListFiltered(launchesListFiltered => [...launchesListFiltered, x])
                                })
                        })
                })
            })

        setTimeout(waitTillLoaded, 4000);

    }, []);

    //spinner onload
    function waitTillLoaded() {
        setIsLoading(false);
    }

    //funkcje do imputów i search
    function handleCheckbox() {
        setLaunchesFailed(current => !current);
    };

    function handleNameInput(e) {
        setLaunchesName(e.target.value)
    };

    function handleDateRange(e) {
        setLaunchesDateRange([e[0], e[1]])
    };

    function clearDateRange() {
        setLaunchesDateRange([])
    };

    function handleSearch() {
        setLaunchesListFiltered([]);
        var list = launchesList;

        if (launchesFailed == true) {
            list = list.filter(function (obj) {
                return obj.success == true;
            });
            setLaunchesListFiltered(list);
        } else {
            setLaunchesListFiltered(list);
        }

        if (launchesName != null || launchesName != '') {
            list = list.filter(function (obj) {
                return obj.name.toString().toLowerCase().includes(launchesName.toString().toLowerCase());
            });
            setLaunchesListFiltered(list);
        }

        var datesFilter = launchesDateRange;
        if (launchesDateRange.length != 0) {
            list = list.filter(function (obj) {
                return (new Date(obj.date_utc) >= new Date(datesFilter[0]) && new Date(obj.date_utc) <= new Date(datesFilter[1]));
            });
            setLaunchesListFiltered(list);
        }
    };

    return (
        <div data-testid="main" className="main container">
            <FiltersComponent handleNameInput={handleNameInput} clearDateRange={clearDateRange} handleDateRange={handleDateRange} handleCheckbox={handleCheckbox} handleSearch={handleSearch} />
            <hr />
            <ListComponent launchesListFiltered={launchesListFiltered} isLoading={isLoading} />
        </div>
    );
}

export default Main;