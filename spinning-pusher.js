#!/usr/bin/env node --experimental-json-modules
import { entry_point } from '@cli-blaze/input'
import { spinit_process } from './lib/input/spinit/spinit_process.js'

// It gets the command line arguments splicing out from `process.argv` the paths for node and spinning-pusher.js
process.argv.splice( 0, 2 )

process.title = 'spinit'

/**
 * Entry point to spinning-pusher
 */
const spinit = await entry_point( process.argv, { spinit: spinit_process, executable:[ 'spinit' ] } )

switch ( Object.keys( spinit[ 'command' ] )[ 0 ] ) {

    default:

        break

}
