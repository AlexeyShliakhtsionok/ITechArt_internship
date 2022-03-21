using Data_Access_Layer.RepositoryWithUOW.Repositories;
using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;

namespace Data_Access_Layer.RepositoryWithUOW
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly SalonDBContext _context;
        public IEmployeeRepository Employee { get; private set; }
        public IClientRepository Client { get; private set; }
        public IFeedbackRepository Feedback { get; private set; }
        public IMaterialManufacturerRepository MaterialManufacturer { get; private set; }
        public IMaterialRepository Material { get; private set; }
        public IMediaFileRepository MediaFile { get; private set; }
        public IOrderRepository Order { get; private set; }
        public IProcedureRepository Procedure { get; private set; }
        public IProcedureTypeRepository ProcedureType { get; private set; }


        public UnitOfWork(SalonDBContext context)
        {
            _context = context;
            Employee = new EmployeeRepository(context);
            Client = new ClientRepository(context);
            Feedback = new FeedbackRepository(context);
            MaterialManufacturer = new MaterialManufacturerRepository(context);
            Material = new MaterialRepository(context);
            MediaFile = new MediaFileRepository(context);
            Order = new OrderRepository(context);
            Procedure = new ProcedureRepository(context);
            ProcedureType = new ProcedureTypeRepository(context);
        }

        public void Complete()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
