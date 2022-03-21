using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected SalonDBContext context;
        internal DbSet<T> dbSet;

        public GenericRepository(SalonDBContext context)
        {
            this.context = context;
            dbSet = context.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {
            return dbSet;
        }

        public virtual T GetById(int id)
        {
            return context.Find<T>(id);
        }

        public virtual void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(T entity)
        {
            dbSet.Remove(entity);
        }

        public virtual void Update(T entity)
        {
            dbSet.Update(entity);
        }
    }
}
