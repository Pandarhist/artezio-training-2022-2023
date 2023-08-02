namespace DisneyPrincesses.Interfaces
{
    public interface IPrincessParser
    {
        uint GetPrincessNumber(string value);

        string GetPrincessName(string value);

        int GetPrincessAge(string value);

        string GetHairColor(string name);

        string GetEyeColor(string name);
    }
}
