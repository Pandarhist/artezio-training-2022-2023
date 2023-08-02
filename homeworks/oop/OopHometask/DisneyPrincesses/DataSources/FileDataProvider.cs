using DisneyPrincesses.Interfaces;
using DisneyPrincesses.Models;
using System.Collections.Generic;
using System.IO;

namespace DisneyPrincesses.DataSources
{
    public class FileDataProvider : IDataSource
    {
        private const string FileNotFound = "\n[ERROR]: The specified file was not found, check the file path.\n";
        private const char ParameterSeparator = '|';

        private readonly IPrincessCreator creator;
        private readonly string filePath;

        public FileDataProvider(string filePath, IPrincessCreator creator)
        {
            this.filePath = filePath;
            this.creator = creator;
        }

        public IEnumerable<Princess> GetData()
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException(FileNotFound);
            }

            var result = new List<Princess>();
            var lines = File.ReadAllLines(filePath);

            foreach (var line in lines)
            {
                var arguments = line.Split(ParameterSeparator);

                result.Add(creator.Create(arguments));
            }

            return result;
        }
    }
}
