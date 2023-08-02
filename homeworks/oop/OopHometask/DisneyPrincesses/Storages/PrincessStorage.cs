using DisneyPrincesses.Interfaces;
using DisneyPrincesses.Models;
using System.Collections.Generic;

namespace DisneyPrincesses.Storages
{
    public class PrincessStorage : IPrincessStorage
    {
        private List<Princess> values;

        public PrincessStorage(IDataSource dataSource)
        {
            values = (List<Princess>)dataSource.GetData();
        }

        public void Add(Princess princess)
        {
            values.Add(princess);
        }

        public void Delete(uint number)
        {
            values.RemoveAll(item => item.Number == number);
        }

        public bool Exists(uint number)
        {
            return values.Exists(item => item.Number == number);
        }

        public IEnumerable<Princess> GetAll()
        {
            var princesses = new List<Princess>();

            foreach (var princess in values)
            {
                princesses.Add((Princess)princess.Clone());
            }

            return princesses;
        }

        public Princess GetByNumber(uint number)
        {
            var princess = values.Find(item => item.Number == number);

            return (princess is null) ? princess : (Princess)princess.Clone();
        }

        public void Update(Princess princess)
        {
            var item = values.Find(item => item.Number == princess.Number);

            item.Name = princess.Name;
            item.Age = princess.Age;
            item.HairColor = princess.HairColor;
            item.EyeColor = princess.EyeColor;
        }
    }
}
