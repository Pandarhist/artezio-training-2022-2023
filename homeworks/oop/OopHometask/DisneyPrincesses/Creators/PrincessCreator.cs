using DisneyPrincesses.Interfaces;
using DisneyPrincesses.Models;

namespace DisneyPrincesses.Creators
{
    public class PrincessCreator : IPrincessCreator
    {
        private readonly IPrincessParser parser;

        public PrincessCreator(IPrincessParser parser)
        {
            this.parser = parser;
        }

        public Princess Create(string[] arguments)
        {
            if (arguments.Length != 5)
            {
                throw new System.ArgumentException("\n[ERROR]: Invalid arguments count. Valid: 5.\n");
            }

            var number = parser.GetPrincessNumber(arguments[0].Trim());
            var name = parser.GetPrincessName(arguments[1].Trim());
            var age = parser.GetPrincessAge(arguments[2].Trim());
            var hairColor = parser.GetHairColor(arguments[3].Trim());
            var eyeColor = parser.GetEyeColor(arguments[4].Trim());

            return new Princess(number, name, age, hairColor, eyeColor);
        }
    }
}
