# Rampage Tech Checks

Rampage Tech Checks is a mobile web app which interfaces with the Rampage API to carry out and view FRA approved Tech Checks on competitors at robot combat competitions across the UK.

## Installation

Download the GitHub repo to run and you can run with PHP's internal web server.

```bash
php -S localhost:8070
```

## Usage

This app will try and talk to the live API for information; but this will not work for security reasons. Expect no data to appear from the API.

To enable development mode run in web console
```javascript
localStorage.addItem('development',true);
```

This only changes the API endpoint to a local installation of Rampage which is closed source. This is present for the Rampage development team for local development and debugging.

You can access the live version of this app at https://techchecks.rampagebots.co.uk where you will see data if you are marked by the Event organiser as a tech checker for an event.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.