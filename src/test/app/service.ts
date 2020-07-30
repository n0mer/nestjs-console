// tslint:disable: no-console
import { Injectable } from '@nestjs/common';
import { Command } from 'commander';

import { ConsoleService } from '../../service';

@Injectable()
export class ServiceTest {
    constructor(private readonly consoleService: ConsoleService) {
        this.bindCommands();
    }

    protected bindCommands(): void {
        // get the cli
        const cli = this.consoleService.getCli();

        this.consoleService.createCommand(
            {
                command: 'command <myArgument>',
                description: 'description',
                alias: 'c',
                options: [{ flags: '-o, --optional [value]' }]
            },
            this.command,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'command2 <myArgument> <myArgument2>',
                description: 'description',
                alias: 'c2'
            },
            this.command2,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'asyncCommand <myArgument>',
                description: 'description',
                alias: 'ac'
            },
            this.asyncCommand,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'commandWithNoArg',
                description: 'description',
                alias: 'cNoArg'
            },
            this.commandWithNoArg,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'asyncCommandWithNoArg',
                description: 'description',
                alias: 'acNoArg'
            },
            this.asyncCommandWithNoArg,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'commandWithError <myArgument>',
                description: 'description',
                alias: 'cErr'
            },
            this.commandWithError,
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'asyncCommandWithError <myArgument>',
                description: 'description',
                alias: 'acErr'
            },
            this.asyncCommandWithError,
            cli
        );

        const subCommand = this.consoleService.createGroupCommand(
            {
                name: 'groupCommand',
                alias: 'gc',
                description: 'description'
            },
            cli
        );

        this.consoleService.createCommand(
            {
                command: 'subCommand1 <myArgument>',
                alias: 'sub1',
                description: 'description',
                options: [
                    {
                        flags: '-o, --optional [value]',
                        fn: (v): boolean => (v ? true : false)
                    }
                ]
            },
            this.command,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'asyncSubCommand1 <myArgument>',
                alias: 'acSub1',
                description: 'description'
            },
            this.asyncCommand,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'subCommandWithError <myArgument>',
                alias: 'subErr',
                description: 'description'
            },
            this.commandWithError,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'asyncSubCommandWithError <myArgument>',
                alias: 'acSubErr',
                description: 'description'
            },
            this.asyncCommandWithError,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'subCommandMerged <myArgument>'
            },
            this.command,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'subCommandWithNoArg',
                description: 'description',
                alias: 'subNoArg'
            },
            this.subCommandWithNoArg,
            subCommand
        );

        this.consoleService.createCommand(
            {
                command: 'asyncSubCommandWithNoArg',
                description: 'description',
                alias: 'acSubNoArg'
            },
            this.asyncSubCommandWithNoArg,
            subCommand
        );

        // this describe a required option, with optional value
        this.consoleService.createCommand(
            {
                command: 'commandWithRequiredOption',
                options: [
                    {
                        flags: '-o,--requiredOptions [requiredOptions]',
                        required: true
                    }
                ]
            },
            this.commandWithRequiredOption,
            cli
        );
    }

    command = (myArgument: string, options: { optional?: boolean }): string => {
        console.log(myArgument);
        if (options.optional) {
            console.log(options.optional);
        }
        return myArgument;
    };

    command2 = (myArgument: string, myArgument2: string): string => {
        const joinedArgs = `${myArgument}::${myArgument2}`;
        console.log(joinedArgs);
        return joinedArgs;
    };

    commandWithNoArg = (): void => {
        console.log('commandWithNoArg executed');
    };

    subCommandWithNoArg = (): void => {
        console.log('subCommandWithNoArg executed');
    };

    asyncCommandWithNoArg = async (): Promise<void> => {
        // wait 1 second simulating async task
        await new Promise((ok) =>
            setTimeout(() => {
                ok();
            }, 1000)
        );
        console.log('asyncCommandWithNoArg executed');
    };

    asyncSubCommandWithNoArg = async (): Promise<void> => {
        // wait 1 second simulating async task
        await new Promise((ok) =>
            setTimeout(() => {
                ok();
            }, 1000)
        );
        console.log('asyncSubCommandWithNoArg executed');
    };

    commandWithError = (myArgument: string): void => {
        throw new Error(myArgument);
    };

    asyncCommand = async (myArgument: string): Promise<string> => {
        // wait 1 second simulating async task
        return new Promise((ok) =>
            setTimeout(() => {
                console.log(myArgument);
                ok(myArgument);
            }, 1000)
        );
    };

    asyncCommandWithError = async (myArgument: string): Promise<void> => {
        // wait 1 second simulating async task
        await new Promise((ok, fail) =>
            setTimeout(() => {
                fail(new Error(myArgument));
            }, 1000)
        );
    };

    commandWithRequiredOption = (command: Command) => {
        const opts = command.opts();
        console.log(opts);
        return true;
    };
}
