using DisneyPrincesses.Interfaces;
using System;

namespace DisneyPrincesses.ConsoleProvider
{
    public class Terminal
    {
        private const string UnknownCommand = "\n[INFO]: Such command doesn't exist. Try again.\n";
        private const string ReadyToGo = "\tWelcome to the Disney princess app!\n\nEnter your commands below.\n";

        private readonly IInputer inputer;
        private readonly IOutputer outputer;
        private readonly ICommandController controller;

        private bool isProcessing = true;
        private string command = string.Empty;

        public Terminal(ICommandController controller, IInputer inputer, IOutputer outputer)
        {
            this.controller = controller;
            this.inputer = inputer;
            this.outputer = outputer;
        }

        public void Start()
        {
            outputer.Show(ReadyToGo);

            while (isProcessing)
            {
                command = inputer.ReadCommand();

                if (string.IsNullOrEmpty(command))
                {
                    continue;
                }

                if (!controller.SelectCommand(command))
                {
                    outputer.Show(UnknownCommand);

                    continue;
                }

                ExecuteCommand();
            }
        }

        private void ExecuteCommand()
        {
            try
            {
                isProcessing = controller.Execute();
            }
            catch (Exception ex)
            {
                outputer.Show(ex.Message);
            }
        }
    }
}
