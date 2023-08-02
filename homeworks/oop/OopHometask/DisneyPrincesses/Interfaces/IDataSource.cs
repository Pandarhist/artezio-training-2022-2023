using DisneyPrincesses.Models;
using System.Collections.Generic;

namespace DisneyPrincesses.Interfaces
{
    public interface IDataSource
    {
        IEnumerable<Princess> GetData();
    }
}
