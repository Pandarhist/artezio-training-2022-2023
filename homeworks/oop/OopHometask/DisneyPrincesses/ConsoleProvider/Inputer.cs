using System;
using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.ConsoleProvider
{
    public class Inputer : IInputer
    {
        public string ReadCommand()
        {
            var command = Console.ReadLine().Trim();

            return command;
        }
    }
}
