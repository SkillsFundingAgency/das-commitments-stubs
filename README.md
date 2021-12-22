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

## Getting started

Running locally (requires [node.js](https://nodejs.org/)):

* Clone this repo locally
* Execute the `run.cmd` in the source folder

_This command file in turns executes `npm install` and then starts the application._

## Usage:

This stub api runs on localhost at port 3999.

Configure any applications so that they reference the stub, for example for accounts api:

`BaseUrl: http://localhost:3999/accounts-api/api`

