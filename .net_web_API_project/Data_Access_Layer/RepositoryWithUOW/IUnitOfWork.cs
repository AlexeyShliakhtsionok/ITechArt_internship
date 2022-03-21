using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;

namespace Data_Access_Layer.RepositoryWithUOW
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IClientRepository Client { get; }
        IFeedbackRepository Feedback { get; }
        IMaterialRepository Material { get; }
        IMaterialManufacturerRepository MaterialManufacturer { get; }
        IMediaFileRepository MediaFile { get; }
        IOrderRepository Order { get; }
        IProcedureRepository Procedure { get; }
        IProcedureTypeRepository ProcedureType { get; }

        /// <summary>
        /// The method for database changes saving.
        /// </summary>
        void Complete();

        /// <summary>
        /// An object method invoked to execute code required for memory cleanup and release and reset unmanaged resources,
        /// such as file handles and database connections
        /// </summary>
        void Dispose();
    }
}
