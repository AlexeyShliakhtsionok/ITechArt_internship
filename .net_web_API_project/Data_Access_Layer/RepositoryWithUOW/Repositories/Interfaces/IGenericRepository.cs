using System.Linq.Expressions;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        /// <summary>
        /// The method for the receiving all database entity objects.
        /// </summary>
        /// <returns>A collection of certain entity objects.</returns>
        public IQueryable<T> GetAll();

        /// <summary>
        /// The method for the searching of certarin entity object by its identifyer.
        /// </summary>
        /// <returns>Database entity object.</returns>
        public T GetById(int id);

        /// <summary>
        /// The method for database entity creating.
        /// </summary>
        public void Add(T entity);

        /// <summary>
        /// The method for database entity deleting.
        /// </summary>
        public void Delete(T entity);

        /// <summary>
        /// The method for database entity updating.
        /// </summary>
        public void Update(T entity);
    }
}
