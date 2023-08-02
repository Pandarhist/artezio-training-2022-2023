using DisneyPrincesses.Commands;
using DisneyPrincesses.Interfaces;
using System.Collections.Generic;

namespace DisneyPrincesses.Controllers
{
    public class CommandController : ICommandController
    {
        private const bool CommandExists = true;
        private const bool CommandNotFound = false;

        private readonly Dictionary<string, ConsoleCommand> commands;
        private readonly ICommandParser parser;

        private ConsoleCommand currentCommand;

        public CommandController(IDictionary<string, ConsoleCommand> commands, ICommandParser parser)
        {
            this.commands = (Dictionary<string, ConsoleCommand>)commands;
            this.parser = parser;
        }

        public bool Execute()
        {
            var arguments = parser.GetArguments();

            return currentCommand.Execute(arguments);
        }

        public bool SelectCommand(string commandLine)
        {
            parser.ParseLine(commandLine);

            if (!commands.TryGetValue(parser.GetCommandName(), out currentCommand))
            {
                return CommandNotFound;
            }

            return CommandExists;
        }
    }
}
