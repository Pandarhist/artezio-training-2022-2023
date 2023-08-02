using System;
using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.ConsoleProvider
{
    public class Outputer : IOutputer
    {
        public void Show(string message)
        {
            Console.WriteLine(message);
        }
    }
}
