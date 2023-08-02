using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.Commands
{
    public class AddPrincessCommand : ConsoleCommand
    {
        private const string PrincessAlreadyExists = "\n[INFO]: Princess with id {0} already exists.\n";
        private const string PrincessAdded = "\n[INFO]: Princess \"{0}\" has been added.\n";
        private const string AddCommandName = "add";
        private const int AddParametersCount = 5;

        private readonly IPrincessStorage storage;
        private readonly IPrincessCreator creator;
        private readonly IOutputer outputer;

        public AddPrincessCommand(IPrincessStorage storage, IOutputer outputer, IPrincessCreator creator) : base(AddCommandName, AddParametersCount)
        {
            this.storage = storage;
            this.outputer = outputer;
            this.creator = creator;
        }

        public override bool Execute(string[] arguments)
        {
            CheckArgumentsCount(arguments);

            var princess = creator.Create(arguments);
            var message = string.Format(PrincessAlreadyExists, princess.Number);

            if (!storage.Exists(princess.Number))
            {
                storage.Add(princess);
                message = string.Format(PrincessAdded, princess.Name);
            }

            outputer.Show(message);

            return StillWorking;
        }
    }
}
