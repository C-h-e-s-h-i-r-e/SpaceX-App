# SpaceX App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

To run the application u need Node.js and npm installed.\
Clone the repository into a folder.\
Run `npm install` to get all dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


Korzystając z SpaceX REST API wytworzono aplikację wyświetlającą listę odbytych startów. Lista
jest paginowana po 20 elementów, domyślnie posortowana od wg. daty, od najnowszego.
Lista prezentuje numer lotu oraz nazwę startu wraz z datą. Jeżeli dostępne są zdjęcia,
pierwsze jest umieszczone na miniaturze. Lista ma możliwość wyfiltrowania
nieudanych startów, pozwala na określenie zakresu dat oraz wyszukiwanie startu po nazwie. Po kliknięciu
w dany lot aplikacja wyświetla jego szczegóły - numer lotu, nazwę lotu, datę, liczbę załogi,
status lotu, opis, nazwę rakiety, nazwę i lokację miejsca startowego. Dodatkowo w szczegółach
znajduje się galeria zdjęć z lotu połączona ze zdjęciami samej rakiety.

Dodatki do aplikacji nieumieszczone na makiecie/w instrukcji:
1. Dodano licznik wyników pokazujący ilość wszystkich wyników bazujący na ustawieniach wyszukiwania.
2. Dodano spinner wyświetlany w momencie oczekiwania na pobranie i wyświetlenie listy startów
3. Zmieniono umiejscowienie strzałek nawigacyjnych karuzeli zdjęć w widoku szczegółów, by uzyskać lepszy wygląd komponentu na małych rozdzielczościach
4. Dodano sticky header w szczegółach, by dało się wyjść z widoku na każdym etapie przeglądania bez potrzeby scrollowania na górę strony.

