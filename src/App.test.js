import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import FiltersComponent from "./components/main-components/Filters.js";
import ListComponent from "./components/main-components/List";
import ItemsComponent from './components/main-components/ListItems.js';
import MainComponent from "./components/Main";

// mockup data for list test
var mockupData =
  [{
    "date_utc": "2006-03-24T22:30:00.000Z",
    "photos": [],
    "rocketPhotos": [
      "https://imgur.com/DaCfMsj.jpg",
      "https://imgur.com/azYafd8.jpg"
    ],
    "rocketName": "Falcon 1",
    "success": false,
    "crew": [],
    "launchpadName": "Kwajalein Atoll",
    "launchpadLocation": "Omelek Island Marshall Islands",
    "flight_number": '1',
    "name": "FalconSat",
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "allPhotos": [
      {
        "original": "https://imgur.com/DaCfMsj.jpg",
        "thumbnail": "https://imgur.com/DaCfMsj.jpg"
      },
      {
        "original": "https://imgur.com/azYafd8.jpg",
        "thumbnail": "https://imgur.com/azYafd8.jpg"
      }
    ]
  }
  ]

var mockupDataAlternative =
  [{
    "date_utc": "2006-03-24T22:30:00.000Z",
    "photos": [
      "https://imgur.com/DaCfMsj.jpg",
      "https://imgur.com/azYafd8.jpg"
    ],
    "rocketPhotos": [
      "https://imgur.com/DaCfMsj.jpg",
      "https://imgur.com/azYafd8.jpg"
    ],
    "rocketName": "Falcon 1",
    "success": true,
    "crew": [],
    "launchpadName": "Kwajalein Atoll",
    "launchpadLocation": "Omelek Island Marshall Islands",
    "flight_number": '1',
    "name": "FalconSat",
    "details": null,
    "allPhotos": [
      {
        "original": "https://imgur.com/DaCfMsj.jpg",
        "thumbnail": "https://imgur.com/DaCfMsj.jpg"
      },
      {
        "original": "https://imgur.com/azYafd8.jpg",
        "thumbnail": "https://imgur.com/azYafd8.jpg"
      }
    ]
  }
  ]

//mockup list for pegination test
var mockupList = []
for (var i = 0; i < 22; i++) {
  var x = {
    date_utc: '',
    photos: [],
    rocketPhotos: [],
    rocketName: '',
    success: true,
    crew: [],
    launchpadName: '',
    launchpadLocation: '',
    flight_number: i,
    name: '',
    details: '',
    allPhotos: []
  }
  mockupList.push(x);
}

//mockup functions for filters test
function handleCheckbox() { };
function handleNameInput() { };
function handleDateRange() { };
function clearDateRange() { };
function handleSearch() { };

test('test app', () => {
  render(<App />);
  expect(screen.getByTestId('main')).toBeInTheDocument();
  expect(screen.getByTestId('filters')).toBeInTheDocument();
  expect(screen.getByTestId('list')).toBeInTheDocument();
});

test('test components', () => {
  render(<MainComponent />);
  expect(screen.getByTestId('main')).toBeInTheDocument();
  expect(screen.getByTestId('filters')).toBeInTheDocument();
  expect(screen.getByTestId('list')).toBeInTheDocument();
});

test('test filters', () => {
  render(<FiltersComponent handleNameInput={handleNameInput} clearDateRange={clearDateRange} handleDateRange={handleDateRange} handleCheckbox={handleCheckbox} handleSearch={handleSearch} />);
  const filterComp = screen.getByTestId('filters')
  expect(filterComp).toBeInTheDocument();
});

test('test filters content', () => {
  render(<FiltersComponent handleNameInput={handleNameInput} clearDateRange={clearDateRange} handleDateRange={handleDateRange} handleCheckbox={handleCheckbox} handleSearch={handleSearch} />);
  const filtersNameInput = screen.getByTestId('name-input')
  const filtersDateInput = screen.getByTestId('date-input')
  const filtersCheckInput = screen.getByTestId('check-input')
  const filtersButton = screen.getByTestId('search-button')
  expect(filtersNameInput).toBeInTheDocument();
  expect(filtersDateInput).toBeInTheDocument();
  expect(filtersCheckInput).toBeInTheDocument();
  expect(filtersButton).toBeInTheDocument();
  const filtersNameLabel = screen.getByTestId('name-label')
  const filtersDateLabel = screen.getByTestId('date-label')
  const fitlersButtonText = screen.getByTestId('search-button')
  expect(filtersNameLabel.innerHTML).toBe('Nazwa lotu');
  expect(filtersDateLabel.innerHTML).toBe('Data lotu');
  expect(fitlersButtonText.innerHTML).toBe('Szukaj');
});

test('test list', () => {
  render(<ListComponent launchesListFiltered={mockupData} isLoading={false} />);
  const listComp = screen.getByTestId('list')
  expect(listComp).toBeInTheDocument();
});

test('test list spinner exist', () => {
  render(<ListComponent launchesListFiltered={mockupData} isLoading={true} />);
  expect(screen.getByTestId('spinner')).toBeTruthy();
});

test('test list spinner dont exist', () => {
  render(<ListComponent launchesListFiltered={mockupData} isLoading={false} />);
  expect(screen.queryByTestId('spinner')).toBeFalsy();
});

test('test list content with pegination', () => {
  render(<ListComponent launchesListFiltered={mockupList} isLoading={false} />);
  const listItems = screen.getAllByTestId('item');
  const listItemCounter = screen.getByTestId('list-items-counter');
  //pegination allow just 20 on screen
  expect(listItems.length).toBe(20)
  expect(listItemCounter.innerHTML).toBe('Ilość wyników : ' + mockupList.length)
});

test('test list item content', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const listItem = screen.getByTestId('item');
  expect(listItem).toBeInTheDocument();
  const listItemContentImg = screen.getByTestId('item-photo');
  const listItemContentCard = screen.getByTestId('item-card');
  expect(listItemContentImg).toBeInTheDocument();
  expect(listItemContentCard).toBeInTheDocument();
});

test('test item img', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const listItemContentImg = screen.getByTestId('item-photo');
  //place holder photo when there is no photo present from fligth
  expect(listItemContentImg.getAttribute('src')).toBe('jk-placeholder-image-300x203.jpg');
});

test('test item img alternative', () => {
  render(<ItemsComponent currentItems={mockupDataAlternative} />);
  const listItemContentImg = screen.getByTestId('item-photo');
  //in alternative there is photo to be used
  expect(listItemContentImg.getAttribute('src')).toBe('https://imgur.com/DaCfMsj.jpg');
});

test('test item card content', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentFlightNumber = screen.getByTestId('item-card-flight-number');
  const cardContentName = screen.getByTestId('item-card-name');
  const cardContentDate = screen.getByTestId('item-card-date');
  const cardContentButton = screen.getByTestId('item-card-button');
  expect(cardContentFlightNumber.innerHTML).toBe('#' + mockupData[0].flight_number);
  expect(cardContentName.innerHTML).toBe('<b>' + mockupData[0].name + '</b>');
  expect(cardContentDate.innerHTML).toBe(mockupData[0].date_utc.slice(0, mockupData[0].date_utc.indexOf('T')));
  expect(cardContentButton).toBeInTheDocument();
  expect(cardContentButton.innerHTML).toBe('Więcej');
});

test('test modal', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const modal = screen.getByTestId('item-modal');
  const modalHeader = screen.getByTestId('item-modal-header');
  const modalBody = screen.getByTestId('item-modal-body');
  expect(modal).toBeInTheDocument();
  expect(modalHeader).toBeInTheDocument();
  expect(modalBody).toBeInTheDocument();
});

test('test modal header', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const modalHeaderCloseButton = screen.getByTestId('modal-header-close-button');
  const modalHeaderTitle = screen.getByTestId('modal-header-title');
  expect(modalHeaderCloseButton).toBeInTheDocument();
  expect(modalHeaderTitle.innerHTML).toBe('Szczegóły startu #' + mockupData[0].flight_number);
});

test('test modal body content', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const modalBodyInfoCardOne = screen.getByTestId('modal-body-info-card-1');
  const modalBodyInfoCardTwo = screen.getByTestId('modal-body-info-card-2');
  const modalBodyCarouselCard = screen.getByTestId('modal-body-carousel-card');
  const modalBodyDetailsCard = screen.getByTestId('modal-body-details-card');
  expect(modalBodyInfoCardOne).toBeInTheDocument();
  expect(modalBodyInfoCardTwo).toBeInTheDocument();
  expect(modalBodyCarouselCard).toBeInTheDocument();
  expect(modalBodyDetailsCard).toBeInTheDocument();
});

test('test modal body info card one', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const infoCardOneName = screen.getByTestId('info-card-1-name');
  const infoCardOneDate = screen.getByTestId('info-card-1-date');
  const infoCardOneStauts = screen.getByTestId('info-card-1-status');
  expect(infoCardOneName.innerHTML).toBe('Lot:&nbsp;<b>' + mockupData[0].name + '</b>');
  expect(infoCardOneDate.innerHTML).toBe('Data lotu:&nbsp;<b>' + mockupData[0].date_utc.slice(0, mockupData[0].date_utc.indexOf('T')) + '</b>');
  //status is false so text for faliure is used
  expect(infoCardOneStauts.innerHTML).toBe('Status:&nbsp;<b>Nieudany</b>');
});

test('test modal body info card one alternative', () => {
  render(<ItemsComponent currentItems={mockupDataAlternative} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const infoCardOneName = screen.getByTestId('info-card-1-name');
  const infoCardOneDate = screen.getByTestId('info-card-1-date');
  const infoCardOneStauts = screen.getByTestId('info-card-1-status');
  expect(infoCardOneName.innerHTML).toBe('Lot:&nbsp;<b>' + mockupData[0].name + '</b>');
  expect(infoCardOneDate.innerHTML).toBe('Data lotu:&nbsp;<b>' + mockupData[0].date_utc.slice(0, mockupData[0].date_utc.indexOf('T')) + '</b>');
  //status is true so text for success is used
  expect(infoCardOneStauts.innerHTML).toBe('Status:&nbsp;<b>Udany</b>');
});

test('test modal body info card two', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const infoCardOneName = screen.getByTestId('info-card-2-crew');
  const infoCardOneDate = screen.getByTestId('info-card-2-rocket');
  const infoCardOneStauts = screen.getByTestId('info-card-2-start-location');
  expect(infoCardOneName.innerHTML).toBe('Załoga:&nbsp;<b>' + mockupData[0].crew.length + '</b>');
  expect(infoCardOneDate.innerHTML).toBe('Rakieta:&nbsp;<b>' + mockupData[0].rocketName + '</b>');
  expect(infoCardOneStauts.innerHTML).toBe('Start:&nbsp;<b>' + mockupData[0].launchpadName + ' ' + mockupData[0].launchpadLocation + '</b>');
});

test('test modal body carousel card', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const carouselContent = document.getElementsByClassName('image-gallery-image');
  expect(carouselContent.length).toBe(mockupData[0].allPhotos.length);
});

test('test modal body details card', () => {
  render(<ItemsComponent currentItems={mockupData} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const cardDetailsContent = screen.getByTestId('card-details-content');
  //there are details to be displayed
  expect(cardDetailsContent.innerHTML).toBe(mockupData[0].details);
});

test('test modal body details card alternative', () => {
  render(<ItemsComponent currentItems={mockupDataAlternative} />);
  const cardContentButton = screen.getByTestId('item-card-button');
  fireEvent(
    cardContentButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  const cardDetailsContent = screen.getByTestId('card-details-content');
  //there is no deatils to display so alternative text is used
  expect(cardDetailsContent.innerHTML).toBe('Brak opisu');
});