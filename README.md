# _Commitments stubs_


## What is this

_A single service encompassing multiple stubs for use by Commitments and related projects written in node.js._

## What APIs and endpoints are stubbed?

* MA Accounts API
    * Get legal entities for account
    * Get transfer connections for account
    * Get transfer allowance for account
* MA Accounts API v2
    * Get Users by Account
    * Get Accounts by User
* Provider Account API
    * Get Agreement endpoint
* Reservations Outer API
    * Get TransferValidity
* Courses API
    * All standards
    * Get standard by id
* Location Api
    * Search
    * Locations endpoint
* Levy Transfer Matching inner api
    * Get Pledge Application
 * Provider relationships
    * Get relationships by provider id

## Getting started

Running locally (requires [node.js](https://nodejs.org/)):

* Clone this repo locally
* Execute the `run.cmd` in the source folder

_This command file in turns executes `npm install` and then starts the application._

## Usage:

This stub api runs on localhost at port 3999.

Configure any applications so that they reference the stub, for example for accounts api:

`BaseUrl: http://localhost:3999/accounts-api/api`

## UI Stubs

Using UI stubs, eg. Reservations UI, requires that a certificate be installed so that the stub can run under HTTPS.

You will need to install [Chocolatey](https://docs.chocolatey.org/en-us/) if you do not already have it. To do this, run the following in a Powershell (as administrator) window:

`@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

Chocolatey will allow you to install the [mkcert utility](https://github.com/FiloSottile/mkcert), which simplifies certificate creation and installation. From a Powershell (as administrator) window:

`choco install mkcert`

You can now use mkcert to install the Root CA located in this repo at `certs/rootCA/rootCA.pem`.

To do this, first add an environment variable called `CAROOT` with a value equal to the rootCA folder in your local copy of the repo. For example, if you've cloned the repo to `c:\code\sfa-commitments-stubs`, the value will be `c:\code\sfa-commitments-stubs\certs\rootCA\`.

Verify the environment variable has been set correctly using the following Powershell command:

`dir env:`

You should see the correct path listed.

You can also verify that the mkcert utility has picked up this value by running the following Powershell command:

`mkcert -CAROOT`

This will display the same value.

Finally you can install the certificate with the following command:

`mkcert -install`

This will locate the Root CA and install it for you.

Now you can run the stubs and any UI elements, which run under port 4000 should display correctly, eg: https://localhost:4000/reservations-ui/10005077/reservations

