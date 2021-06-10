### playwright-del-messenger

Automates deletion of Facebook Messenger's messages using [Playwright](https://playwright.dev/)

## Usage

### Clone the project

```
$ git clone https://github.com/rhanmiano/playwright-del-messenger.git

```

### Install the dependencies

`npm install`

### Run the script

`npm run go`

While on the terminal, the script will prompt for credentials. These credentials are your Facebook username and password to be used.

## What's happening?

- Script will prompt for `username` and `password`
- A Chromium browser context will open up
- Will go to [messenger website](https://www.messenger.com/)
- Will try to login with the provided credentials
- After successful login, the deletion will then takes place while there are message items (in the left section of the page)

## No it's not a phishing program

The script will be run in your local machine, and there will be no saving of your provided credentials to somewhere else. You may want to scan the code, before using it.

## Caveats

- Depending on internet speed, the events that will be performed in the automation such as clicking, and waiting for network response may not work as expected.
- The scroll behaviour of the section where the conversation items are present may cause the script to not properly select a message item to be deleted.
- This will try to delete all your messages from top to bottom. If you'll want a conversation to not be deleted at the moment of automation, you may want to ignore the message so that it will go to **spam** messages

## License

&copy; Rhan Miano | CC0 1.0 Universal
