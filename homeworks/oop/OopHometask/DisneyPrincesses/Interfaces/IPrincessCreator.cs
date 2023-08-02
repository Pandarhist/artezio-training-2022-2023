using DisneyPrincesses.Models;

namespace DisneyPrincesses.Interfaces
{
    public interface IPrincessCreator
    {
        Princess Create(string[] arguments);
    }
}
