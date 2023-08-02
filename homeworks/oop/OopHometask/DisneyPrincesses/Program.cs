using DisneyPrincesses.Commands;
using DisneyPrincesses.ConsoleProvider;
using DisneyPrincesses.Controllers;
using DisneyPrincesses.Creators;
using DisneyPrincesses.DataSources;
using DisneyPrincesses.Interfaces;
using DisneyPrincesses.Parsers;
using DisneyPrincesses.Storages;
using System.Collections.Generic;


namespace DisneyPrincesses
{
    public class Program
    {
        static void Main(string[] args)
        {
            var eyeColors = new List<string>() { "Brown", "Blue", "Violet", "Hazel" };
            var hairColors = new List<string>() { "Black", "Blonde", "Platinum-blonde", "Strawberry-blonde", "Red", "Brown" };
            var princessParser = new PrincessParser(hairColors, eyeColors);
            var creator = new PrincessCreator(princessParser);
            var dataSource = new FileDataProvider(@"..\..\..\Resources\disney-princesses.txt", creator);
            var outputer = new Outputer();

            if (TryUploadData(outputer, dataSource, out IPrincessStorage storage))
            {
                var inputer = new Inputer();
                var parser = new ConsoleParser();
                #region Commands
                var listCommand = new ListPrincessCommand(storage, outputer);
                var getCommand = new GetPrincessCommand(storage, outputer, princessParser);
                var addCommand = new AddPrincessCommand(storage, outputer, creator);
                var updateCommand = new UpdatePrincessCommand(storage, outputer, creator);
                var deleteCommand = new DeletePrincessCommand(storage, outputer, princessParser);
                var exitCommand = new ExitCommand();
                var commands = new Dictionary<string, ConsoleCommand>()
            {
                { listCommand.Name,  listCommand},
                { getCommand.Name, getCommand },
                { addCommand.Name, addCommand },
                { updateCommand.Name, updateCommand },
                { deleteCommand.Name, deleteCommand },
                { exitCommand.Name, exitCommand },
            };
                #endregion
                var controller = new CommandController(commands, parser);
                var terminal = new Terminal(controller, inputer, outputer);

                terminal.Start();
            }
        }

        private static bool TryUploadData(IOutputer outputer, IDataSource dataSource, out IPrincessStorage storage)
        {
            try
            {
                storage = new PrincessStorage(dataSource);
            }
            catch (System.Exception ex)
            {
                outputer.Show(ex.Message);
                storage = null;

                return false;
            }

            return true;
        }
    }
}
