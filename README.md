# menschel-audio

#### Installing Node.js and npm for Linux

``npm`` is bundled with Node.js, so you only need to install Node.js.   

Detailed download details for different Linux Node.js distros from [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions))

To install Node.js 7.x on Ubuntu 16.04, run
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Verify the installation of npm is successful:
```
npm -v
node -v
```
You need at least ```npm v5.3.0``` and ```node v8.3.0``` to proceed.

#### Installing yarn

_On Debian/Ubuntu_  
Configure the repository for download.
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
Then run
```
sudo apt-get update && sudo apt-get install yarn
```
Test that yarn has been successfully installed
```
yarn --version
```

#### Running the app

###### Start the server

Navigate to `menschel-fe/server` and run
```
yarn
yarn start
```

###### Start the frontend

In another terminal window, navigate to `menschel-fe` and run
```
yarn
yarn start
```

### To access the pi

connect to the pi via wifi or ethernet and enter `http://server.local` into the browser
or in terminal, `ssh parrot@server.local` or `ssh parrot@127.0.0.1.local`

### Raspberry Pi specific commands that are useful

If the pi starts up in terminal mode and you want the GUI
`sudo startx`

To open chromium browser
`chromium-browser`
or
`chromium-browser -no-sandbox`

To change ssid
```
sudo nano /etc/ssid.conf
sudo reboot
```

To change password
```
sudo nano /etc/hostapd/hostapd.conf
sudo reboot
```

To change hostname
```
sudo nano /etc/hostname
sudo nano /etc/hosts
sudo reboot
```

### Raspberry Pi specific files that are useful
 `/etc/network/interfaces` --> to switch the server pi between local networking & Internet
 `/etc/resolv.conf` --> to switch nameservers
