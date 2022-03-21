using AutoMapper;
using Business_Logic_Layer.DBO.Clients;
using Business_Logic_Layer.DBO.Employees;
using Business_Logic_Layer.DBO.Feedbacks;
using Business_Logic_Layer.DBO.MaterialManufacturers;
using Business_Logic_Layer.DBO.Materials;
using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.DBO.Orders;
using Business_Logic_Layer.DBO.Procedures;
using Business_Logic_Layer.DBO.ProcedureTypes;
using Data_Access_Layer.Entities;

namespace Business_Logic_Layer.Utilities
{
    public static class AutoMappers<TSource, TDestination> 
    {
        private static Mapper _autoMapper = new Mapper(new MapperConfiguration(cfg =>
        {
            {
                // Employee Mapping =============================================

                cfg.CreateMap<Employee, EmployeesInformationViewModel>()
                .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));

                cfg.CreateMap<Employee, EmployeeViewModel>();

                cfg.CreateMap<Employee, EmployeeInformationViewModel>()
                .ForMember(dest => dest.ProcedureType, opt =>
                opt.MapFrom(src => src.ProcedureType.ProcedureTypeName))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
                .ForMember(dest => dest.Qualification, opt =>
                opt.MapFrom(src => src.Qualification.ToString()));

                cfg.CreateMap<Employee, EmployeesAuthenticationModel>();

                cfg.CreateMap<Employee, EmployeeInformationViewModel>()
                .ForMember(dest => dest.ProcedureType, opt => opt.MapFrom(src => src.ProcedureType.ProcedureTypeName));
                
                cfg.CreateMap<EmployeeInformationViewModel, Employee>()
                .ForMember(dest => dest.Orders, opt => opt.Ignore())
                .ForMember(dest => dest.MediaFiles, opt => opt.Ignore())
                .ForMember(dest => dest.ProcedureType, opt => opt.Ignore());

                cfg.CreateMap<EmployeeViewModel, Employee>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());

                // Client Mapping ===============================================

                cfg.CreateMap<Client, ClientsInformationViewModel>()
                .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));
  
                cfg.CreateMap<Client, ClientViewModel>();

                cfg.CreateMap<ClientViewModel, Client>();

                cfg.CreateMap<Client, ClientToFeedbackCreationViewModel>();

                // Order Mapping ================================================

                cfg.CreateMap<Order, OrdersInformationViewModel>()
                    .ForMember(dest => dest.ClientFullName,
                    opt => opt.MapFrom(src => src.Client.FirstName + ' ' + src.Client.LastName))
                    .ForMember(dest => dest.ClientEmail, opt => opt.MapFrom(src => src.Client.Email))
                    .ForMember(dest => dest.ClientPhoneNumber, opt => opt.MapFrom(src => src.Client.PhoneNumber))
                    .ForMember(dest => dest.ProcedureName, opt => opt.MapFrom(src => src.Procedure.ProcedureName))
                    .ForMember(dest => dest.ProcedureCost, opt => opt.MapFrom(src => src.Procedure.ProcedurePrice))
                    .ForMember(dest => dest.EmployeeFullName, opt => opt.MapFrom(src => src.Employee.FirstName + ' ' + src.Employee.LastName))
                    .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.Employee.EmployeeId))
                    .ForMember(dest => dest.ProcedureId, opt => opt.MapFrom(src => src.Procedure.ProcedureId));

                cfg.CreateMap<Order, OrderViewModel>();

                cfg.CreateMap<OrderViewModel, Order>()
                    .ForMember(dest => dest.Client, opt => opt.Ignore())
                    .ForMember(dest => dest.Employee, opt => opt.Ignore())
                    .ForMember(dest => dest.Procedure, opt => opt.Ignore());

                // Feedback Mapping =============================================

                cfg.CreateMap<Feedback, FeedbackInformationViewModel>()
                   .ForMember(dest => dest.ClientFullName,
                opt => opt.MapFrom(src => src.Client.FirstName + " " + src.Client.LastName));

                cfg.CreateMap<FeedbackViewModel, Feedback>()
                   .ForMember(dest => dest.Client, opt => opt.Ignore());

                cfg.CreateMap<Feedback, FeedbackViewModel>();

                // Material Mapping =============================================  ?????????????????????

                cfg.CreateMap<Material, MaterialsInformationViewModel>()
                   .ForMember(dest => dest.MaterialName, opt => opt.MapFrom(src => src.MaterialName))
                   .ForMember(dest => dest.ProductionDate, opt => opt.MapFrom(src => src.ProductionDate))
                   .ForMember(dest => dest.BestBeforeDate, opt => opt.MapFrom(src => src.BestBeforeDate))
                   .ForMember(dest => dest.MaterialAmount, opt => opt.MapFrom(src => src.MaterialAmount))
                   .ForMember(dest => dest.MaterialManufacturer, opt => opt.MapFrom(src => src.MaterialManufacturer.ManufacturerName));

                cfg.CreateMap<Material, MaterialViewModel>()
                   .ForMember(dest => dest.MaterialManufacturer, opt => opt.MapFrom(m => m.MaterialManufacturer.ManufacturerId))
                   .ForMember(dest => dest.Procedures, opt => opt.Ignore());

                cfg.CreateMap<MaterialViewModel, Material>()
                   .ForMember(dest => dest.Procedures, opt => opt.Ignore())
                   .ForMember(dest => dest.MaterialManufacturer, opt => opt.Ignore());

                // MaterialManufacturer Mapping =================================

                cfg.CreateMap<MaterialManufacturer, MaterialManufacturerViewModel>().ReverseMap();

                // Procedure Mapping ============================================

                cfg.CreateMap<Procedure, ProceduresInformationViewModel>()
                   .ForMember(dest => dest.ProcedureType, 
                opt => opt.MapFrom(src => src.ProcedureType.ProcedureTypeName));

                cfg.CreateMap<Procedure, ProcedureViewModel>()
                   .ForMember(dest => dest.ProcedureType, opt =>
                    opt.MapFrom(src => src.ProcedureType.ProcedureTypeId))
                   .ForMember(dest => dest.Materials, opt =>
                    opt.Ignore());

                cfg.CreateMap<ProcedureViewModel, Procedure>()
                   .ForMember(dest => dest.Materials, opt => opt.Ignore())
                   .ForMember(dest => dest.ProcedureType, opt => opt.Ignore());

                // ProcedureType Mapping ========================================

                cfg.CreateMap<ProcedureType, ProcedureTypeViewModel>();
                
                cfg.CreateMap<ProcedureTypeViewModel, ProcedureType>();

                // Mediafiles Mapping ========================================

                cfg.CreateMap<MediaFile, MediafileViewModel>()
                   .ForMember(dest => dest.EmployeeFullname, opt =>
                opt.MapFrom(src => src.Employee.FirstName + " " + src.Employee.LastName))
                   .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.Employee.EmployeeId));

                cfg.CreateMap<MediafileViewModel, MediaFile>();
            }
        }));

        public static TDestination Map(TSource source)
        {
            return _autoMapper.Map<TDestination>(source);
        }

        public static IQueryable<TDestination> MapIQueryable(IQueryable<TSource> source)
        {
            List<TDestination> destinationList = new List<TDestination>();

            foreach (var item in source)
            {
                destinationList.Add(Map(item));
            }

            return destinationList.AsQueryable<TDestination>();
        }
    }
}

