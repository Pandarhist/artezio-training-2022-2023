using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.Commands
{
    public class GetPrincessCommand : ConsoleCommand
    {
        private const string PrincessInfo = "\n{0}. {1}\n   Age: {2}\n   Hair: {3}\n   Eyes: {4}\n";
        private const string PrincessNotFound = "\n[INFO]: Princess with such id not found.\n";
        private const string GetCommandName = "get";
        private const int GetParametersCount = 1;

        private readonly IPrincessStorage storage;
        private readonly IPrincessParser parser;
        private readonly IOutputer outputer;

        public GetPrincessCommand(IPrincessStorage storage, IOutputer outputer, IPrincessParser parser) : base(GetCommandName, GetParametersCount)
        {
            this.storage = storage;
            this.outputer = outputer;
            this.parser = parser;
        }

        public override bool Execute(string[] arguments)
        {
            CheckArgumentsCount(arguments);

            var id = parser.GetPrincessNumber(arguments[0]);
            var princess = storage.GetByNumber(id);
            var message = (princess is null) ? PrincessNotFound : string.Format(PrincessInfo, princess.Number, princess.Name, princess.Age, princess.HairColor, princess.EyeColor);

            outputer.Show(message);

            return StillWorking;
        }
    }
}
