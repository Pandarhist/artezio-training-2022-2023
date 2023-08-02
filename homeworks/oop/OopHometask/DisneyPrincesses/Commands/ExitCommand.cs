namespace DisneyPrincesses.Commands
{
    public class ExitCommand : ConsoleCommand
    {
        private const string ExitCommandName = "exit";
        private const int ExitParametersCount = 0;

        public ExitCommand() : base(ExitCommandName, ExitParametersCount) { }

        public override bool Execute(string[] arguments)
        {
            CheckArgumentsCount(arguments);

            return WorkIsOver;
        }
    }
}
