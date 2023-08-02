using DisneyPrincesses.Interfaces;

namespace DisneyPrincesses.Commands
{
    public class UpdatePrincessCommand : ConsoleCommand
    {
        private const string PrincessNotFound = "\n[INFO]: Princess with such id not found.\n";
        private const string PrincessUpdated = "\n[INFO]: Princess \"{0}\" has been updated.\n";
        private const string UpdateCommandName = "update";
        private const int UpdateParametersCount = 5;

        private readonly IPrincessStorage storage;
        private readonly IPrincessCreator creator;
        private readonly IOutputer outputer;

        public UpdatePrincessCommand(IPrincessStorage storage, IOutputer outputer, IPrincessCreator creator) : base(UpdateCommandName, UpdateParametersCount)
        {
            this.storage = storage;
            this.outputer = outputer;
            this.creator = creator;
        }

        public override bool Execute(string[] arguments)
        {
            CheckArgumentsCount(arguments);

            var princess = creator.Create(arguments);
            var message = PrincessNotFound;

            if (storage.Exists(princess.Number))
            {
                storage.Update(princess);
                message = string.Format(PrincessUpdated, princess.Name);
            }

            outputer.Show(message);

            return StillWorking;
        }
    }
}
