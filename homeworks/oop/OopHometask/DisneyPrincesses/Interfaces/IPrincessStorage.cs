using DisneyPrincesses.Models;
using System.Collections.Generic;

namespace DisneyPrincesses.Interfaces
{
    public interface IPrincessStorage
    {
        bool Exists(uint number);

        Princess GetByNumber(uint number);

        IEnumerable<Princess> GetAll();

        void Update(Princess princess);

        void Add(Princess princess);

        void Delete(uint number);
    }
}
