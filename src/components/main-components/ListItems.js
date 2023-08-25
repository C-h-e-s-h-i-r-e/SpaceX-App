import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from '../../img/jk-placeholder-image-300x203.jpg';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageGallery from "react-image-gallery";

function Items({ currentItems }) {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        date_utc: '',
        photos: [],
        rocketPhotos: [],
        rocketName: '',
        success: '',
        crew: [],
        launchpadName: '',
        launchpadLocation: '',
        flight_number: '',
        name: '',
        details: '',
        allPhotos: []
    });

    //funkcja do otwierania i zamykania modala
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (

        <div className="items">

            {currentItems && currentItems.map((item, idx) => (
                <div data-testid="item" className="mainCard card my-5 shadow-lg" style={{ color: 'gray' }} key={idx}>

                    {(item.photos.length == 0) ? (
                        <img data-testid="item-photo" src={Photo} className="card-img-left" alt="..." />
                    ) : (
                        <img data-testid="item-photo" src={item.photos[0]} className="card-img-left" alt="..." />
                    )}
                    <div data-testid="item-card" className="mainCardBody card-body">
                        <p data-testid="item-card-flight-number" className="card-text">#{item.flight_number}</p>
                        <p data-testid="item-card-name" className="card-title h5 h4-sm"><b>{item.name}</b></p>
                        <p data-testid="item-card-date" className="card-text">{item.date_utc.slice(0, item.date_utc.indexOf('T'))}</p>
                        <button data-testid="item-card-button" className="btn btn-outline-info px-5 btn-lg" key={item.flight_number} onClick={() => { setModalData(item); handleShow(true); }}>
                            Więcej
                        </button>
                    </div>

                </div>

            ))}
            <Modal data-testid="item-modal" className="modal" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>

                <Modal.Header data-testid="item-modal-header" className="modalHeader row">
                    <Container>
                        <Row xs="auto" className="align-middle" >
                            <Col><CloseButton data-testid="modal-header-close-button" className="btn btn-lg" onClick={() => setShow(false)} /></Col>
                            <Col><div className="vr h-100"></div></Col>
                            <Col><Modal.Title data-testid="modal-header-title">Szczegóły startu #{modalData.flight_number}</Modal.Title></Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <div data-testid="item-modal-body" className="modalBody container justify-content-center">

                        <div className="colInfo1 pb-4">
                            <div className="card shadow-lg">
                                <div data-testid="modal-body-info-card-1" className="card-body m-4" style={{ color: 'gray' }}>
                                    <div data-testid="info-card-1-name">Lot:&nbsp;<b>{modalData.name}</b></div>
                                    <div data-testid="info-card-1-date">Data lotu:&nbsp;<b>{modalData.date_utc.slice(0, modalData.date_utc.indexOf('T'))}</b></div>
                                    <div data-testid="info-card-1-status">Status:&nbsp;<b>{(modalData.success == true) ? ('Udany') : ('Nieudany')}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="colInfo2 pb-4">
                            <div className="card shadow-lg">
                                <div data-testid="modal-body-info-card-2" className="card-body m-4" style={{ color: 'gray' }}>
                                    <div data-testid="info-card-2-crew">Załoga:&nbsp;<b>{modalData.crew.length}</b></div>
                                    <div data-testid="info-card-2-rocket">Rakieta:&nbsp;<b>{modalData.rocketName}</b></div>
                                    <div data-testid="info-card-2-start-location">Start:&nbsp;<b>{modalData.launchpadName} {modalData.launchpadLocation}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="rowCarousel pb-4">
                            <div data-testid="modal-body-carousel-card" className="card shadow-lg p-0 m-0">
                                <ImageGallery slideDuration={0} showIndex={true} showPlayButton={false} showFullscreenButton={false} items={modalData.allPhotos} />
                            </div>
                        </div>
                        <div className="rowDetails">
                            <div data-testid="modal-body-details-card" className="card shadow-lg">
                                <div data-testid="card-details-content" className="card-body text-center" style={{ color: 'gray' }}>
                                    {(modalData.details != null) ? (
                                        <>{modalData.details}</>
                                    ) : (
                                        <>Brak opisu</>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default Items;