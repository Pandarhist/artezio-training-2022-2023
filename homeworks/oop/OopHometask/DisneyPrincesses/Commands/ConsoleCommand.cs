using System;

namespace DisneyPrincesses.Commands
{
    public abstract class ConsoleCommand
    {
        protected const string InvalidParametersCount = "\n[ERROR]: Invalid parameters count. Valid: {0}.\n";
        protected const bool WorkIsOver = false;
        protected const bool StillWorking = true;

        private readonly int parametersCount;

        public string Name { get; }

        protected ConsoleCommand(string name, int parametersCount)
        {
            Name = name;
            this.parametersCount = parametersCount;
        }

        public abstract bool Execute(string[] arguments);

        protected void CheckArgumentsCount(string[] arguments)
        {
            if (parametersCount != arguments.Length)
            {
                throw new ArgumentException(string.Format(InvalidParametersCount, parametersCount));
            }
        }
    }
}
