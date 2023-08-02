namespace DisneyPrincesses.Interfaces
{
    public interface ICommandController
    {
        bool SelectCommand(string commandLine);

        bool Execute();
    }
}
