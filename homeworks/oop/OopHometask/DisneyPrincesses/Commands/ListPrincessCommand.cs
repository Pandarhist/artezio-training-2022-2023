using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.Commands
{
    public class ListPrincessCommand : ConsoleCommand
    {
        private const string PrincessInfo = "\n{0}. {1}\n   Age: {2}\n   Hair: {3}\n   Eyes: {4}\n";
        private const string ListCommandName = "list";
        private const int ListParametersCount = 0;

        private readonly IPrincessStorage storage;
        private readonly IOutputer outputer;

        public ListPrincessCommand(IPrincessStorage storage, IOutputer outputer) : base(ListCommandName, ListParametersCount)
        {
            this.storage = storage;
            this.outputer = outputer;
        }

        public override bool Execute(string[] arguments)
        {
            CheckArgumentsCount(arguments);

            var princesses = storage.GetAll();

            foreach (var princess in princesses)
            {
                outputer.Show(string.Format(PrincessInfo, princess.Number, princess.Name, princess.Age, princess.HairColor, princess.EyeColor));
            }

            return StillWorking;
        }
    }
}
