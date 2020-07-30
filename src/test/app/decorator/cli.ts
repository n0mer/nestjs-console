// tslint:disable:no-console
import { Command as CommanderCommand } from 'commander';

import { Command, Console } from '../../../decorators';

@Console()
export class CliWithDecorator {
    @Command({
        command: 'command <myArgument>',
        alias: 'c',
        description: 'description'
    })
    command(myArgument: string): string {
        console.log(myArgument);
        return myArgument;
    }

    @Command({
        command: 'asyncCommand <myArgument>',
        alias: 'ac',
        description: 'description'
    })
    async asyncCommand(myArgument: string): Promise<string> {
        // wait 1 second simulating async task
        return new Promise((ok) => {
            setTimeout(() => {
                console.log(myArgument);
                ok(myArgument);
            }, 0);
        });
    }

    @Command({
        command: 'commandWithNoArg',
        alias: 'cNoArg',
        description: 'description'
    })
    commandWithNoArg(): void {
        const res = 'commandWithNoArg executed';
        console.log(res);
    }

    @Command({
        command: 'asyncCommandWithNoArg',
        alias: 'acNoArg',
        description: 'description'
    })
    async asyncCommandWithNoArg(): Promise<void> {
        console.log('asyncCommandWithNoArg executed');
        return new Promise((ok) => {
            setTimeout(() => {
                ok();
            }, 0);
        });
    }

    @Command({
        command: 'commandWithError <myArgument>',
        alias: 'cErr',
        description: 'description'
    })
    commandWithError(myArgument: string): void {
        throw new Error(myArgument);
    }

    @Command({
        command: 'asyncCommandWithError <myArgument>',
        alias: 'acErr',
        description: 'description'
    })
    async asyncCommandWithError(myArgument: string): Promise<string> {
        // wait 1 second simulating async task
        return await new Promise((ok, fail) =>
            setTimeout(() => {
                fail(new Error(myArgument));
            }, 1000)
        );
    }

    @Command({
        command: 'command2 <myArgument> <myArgument2>',
        alias: 'c2',
        description: 'description'
    })
    command2(myArgument: string, myArgument2: string): string {
        const joinedArgs = `${myArgument}::${myArgument2}`;
        console.log(joinedArgs);
        return joinedArgs;
    }

    @Command({
        command: 'commandWithRequiredOption',
        options: [
            {
                flags: '-o,--requiredOptions [requiredOptions]',
                required: true
            }
        ]
    })
    commandWithRequiredOption(command: CommanderCommand) {
        const opts = command.opts();
        console.log(opts);
        return true;
    }
}
