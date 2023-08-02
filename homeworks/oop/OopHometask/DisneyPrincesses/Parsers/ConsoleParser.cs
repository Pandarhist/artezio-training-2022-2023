using DisneyPrincesses.Interfaces;
using System.Collections.Generic;

namespace DisneyPrincesses.Parsers
{
    public class ConsoleParser : ICommandParser
    {
        private const char Space = ' ';
        private const char Quote = '\"';
        private const int CommandPosition = 0;

        private string[] arguments;
        private string commandName;

        public ConsoleParser()
        {
            arguments = new string[] { };
            commandName = string.Empty;
        }

        public void ParseLine(string commandLine)
        {
            var parameters = new List<string>();

            for (var i = 0; i < commandLine.Length; i++)
            {
                if (commandLine[i] == Space)
                {
                    continue;
                }

                var startIndex = (commandLine[i] == Quote) ? i + 1 : i;
                var separator = (commandLine[i] == Quote) ? Quote : Space;
                var endSymbol = GetArgumentEndSymbol(startIndex, separator, commandLine);

                parameters.Add(commandLine.Substring(startIndex, endSymbol - startIndex));

                i = endSymbol;
            }

            commandName = parameters[CommandPosition];

            parameters.RemoveAt(CommandPosition);
            arguments = parameters.ToArray();
        }

        public string GetCommandName()
        {
            return commandName;
        }

        public string[] GetArguments()
        {
            var args = new string[arguments.Length];

            arguments.CopyTo(args, 0);

            return args;
        }

        private int GetArgumentEndSymbol(int startIndex, char separator, string line)
        {
            var lastSymbol = line.IndexOf(separator, startIndex);

            return (lastSymbol > -1) ? lastSymbol : line.Length;
        }
    }
}
