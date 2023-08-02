namespace DisneyPrincesses.Models
{
    public class Princess
    {
        public uint Number { get; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string HairColor { get; set; }

        public string EyeColor { get; set; }

        public Princess(uint number, string name, int age, string hairColor, string eyeColor)
        {
            Number = number;
            Name = name;
            Age = age;
            HairColor = hairColor;
            EyeColor = eyeColor;
        }

        public object Clone()
        {
            return new Princess(Number, Name, Age, HairColor, EyeColor);
        }
    }
}
