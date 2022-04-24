import { Blaze } from '@cli-blaze/decors'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { OftypesError, resolvers, undefined_ } from 'oftypes'
import { shadowing } from './shadowing.js'

/**
 * - spinit process
 *
 * @param {Object<{[unknown:string]: any}>} parsed - process.argv
 * @returns {Promise<{}>}
 */
export async function spinit_process( parsed ) {

    let break_for_loop = false
    const spinit = {
        command:{},
        flag:{}
    }
    
    for await ( const shadow of await shadowing(parsed.keys) ){
        if(shadow instanceof Error)
            await exit(shadow.message, new OftypesError('♠︎'), error_code.FLAG)
    }
    
    const spinit_commandKeys = Object.keys( spinit.command )
    for ( const selected_command in spinit_commandKeys ) {

        if ( !( parsed.keys.includes( spinit_commandKeys[ selected_command ] ) ) )
            delete spinit.command[ spinit_commandKeys[ selected_command ] ]
    }

    for ( const flag in parsed.keys ) {

        if ( break_for_loop )
            break

        switch ( parsed.keys[ flag ] ) {
            
            case 'version':

                console.log( await ( await import('../../../package.json', { assert: { type: 'json' } } ) ).default.version )
                process.exit(0)
                break
            
            default: {

                let error = `        command '${ Blaze.red(parsed.keys[ flag ]) }' not recognize
        run -> ${ Blaze.blue(process.title) } help        `

                await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.COMMAND )
            }
        }
    }

    const spinitFlags = Object.keys( parsed.object )

    for ( const flag in spinitFlags ) {

        switch ( spinitFlags[ flag ] ) {

            default: {
                let error = `        flag '${ Blaze.red(spinitFlags[ flag ]) }' not recognize
        run -> ${ Blaze.blue(process.title) } help        `

                await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.FLAG )
            }
        }
    }

    return spinit
}
