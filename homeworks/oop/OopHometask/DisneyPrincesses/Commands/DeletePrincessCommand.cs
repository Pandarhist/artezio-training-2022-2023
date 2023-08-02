using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.Commands
{
    public class DeletePrincessCommand : ConsoleCommand
    {
        private const string PrincessRemoved = "\n[INFO]: Princess \"{0}\" has been removed.\n";
        private const string PrincessNotFound = "\n[INFO]: Princess with such id not found.\n";
        private const string DeleteCommandName = "delete";
        private const int DeleteParametersCount = 1;

        private readonly IPrincessStorage storage;
        private readonly IPrincessParser parser;
        private readonly IOutputer outputer;

        public DeletePrincessCommand(IPrincessStorage storage, IOutputer outputer, IPrincessParser parser) : base(DeleteCommandName, DeleteParametersCount)
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
            var message = PrincessNotFound;

            if (princess != null)
            {
                storage.Delete(id);
                message = string.Format(PrincessRemoved, princess.Name);
            }

            outputer.Show(message);

            return StillWorking;
        }
    }
}
