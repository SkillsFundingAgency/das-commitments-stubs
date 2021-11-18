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

## Getting started

Running locally:

* Clone this repo locally
* Open folder in node IDE (eg. Rider)
* Run `npm-install` to download all dependencies
* Configure as node.js application and run `server.js`

## Usage:

This stub api runs on localhost at port 3999.

Configure any applications so that they reference the stub, for example for accounts api:

`BaseUrl: http://localhost:3999/accounts-api/api`

