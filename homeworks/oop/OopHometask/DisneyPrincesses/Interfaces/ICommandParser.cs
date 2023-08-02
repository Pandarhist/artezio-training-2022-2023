namespace DisneyPrincesses.Interfaces
{
    public interface ICommandParser
    {
        void ParseLine(string commandLine);

        string GetCommandName();

        string[] GetArguments();
    }
}
