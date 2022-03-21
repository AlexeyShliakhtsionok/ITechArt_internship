using Business_Logic_Layer.DBO.Employees;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Business_Logic_Layer.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public EmployeeServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateEmoloyee(EmployeeViewModel employee)
        {
            Employee employeeEntity = AutoMappers<EmployeeViewModel, Employee>.Map(employee);
            employeeEntity.Password = PasswordProcessing.GetPasswordGuid(employee.Password);
            employeeEntity.ProcedureType = _UnitOfWork.ProcedureType.GetById(employee.ProcedureTypeId);
            _UnitOfWork.Employee.Add(employeeEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteEmoloyee(int id)
        {
            var employeeToDelete =  _UnitOfWork.Employee.GetById(id);
             _UnitOfWork.Employee.Delete(employeeToDelete);
            _UnitOfWork.Complete();
        }

        public IEnumerable<EmployeesInformationViewModel> GetAllEmployees()
        {
            var employees = _UnitOfWork.Employee.GetAll();
           
            IQueryable<EmployeesInformationViewModel> employeesModel =
                AutoMappers<Employee, EmployeesInformationViewModel>.MapIQueryable(employees);

            return employeesModel;
        }

        public EmployeeInformationViewModel GetEmployeeById(int id)
        {
            var employee = _UnitOfWork.Employee.GetById(id);
            EmployeeInformationViewModel employeeModel = AutoMappers<Employee, EmployeeInformationViewModel>.Map(employee);
            return employeeModel;
        }

        public EmployeeViewModel GetEmployeeByEmail(string email)
        {
            var employee = _UnitOfWork.Employee.GetAll()
                .FirstOrDefault(i => i.Email == email);
            EmployeeViewModel employeeModel = AutoMappers<Employee, EmployeeViewModel>.Map(employee);
            return employeeModel;
        }

        public EmployeeViewModel GetEmployeeViewModelById(int id)
        {
            var employee = _UnitOfWork.Employee.GetAll()
                .Include(p => p.ProcedureType)
                .FirstOrDefault(i => i.EmployeeId == id);
            EmployeeViewModel employeeModel = AutoMappers<Employee, EmployeeViewModel>.Map(employee);
            return employeeModel;
        }

        public void UpdateEmoloyee(EmployeeInformationViewModel employee)
        {
            Employee employeeEntity = AutoMappers<EmployeeInformationViewModel, Employee>.Map(employee);
            var employeeToUpdate = _UnitOfWork.Employee.GetById(employee.EmployeeId);

            employeeToUpdate.ProcedureType = _UnitOfWork.ProcedureType.GetAll().FirstOrDefault(n => n.ProcedureTypeName == employee.ProcedureType);
            employeeToUpdate.FirstName = employeeEntity.FirstName;
            employeeToUpdate.LastName = employeeEntity.LastName;
            employeeToUpdate.Email = employeeEntity.Email;
            employeeToUpdate.HireDate = employeeEntity.HireDate;
            employeeToUpdate.PhoneNumber = employeeEntity.PhoneNumber;
            employeeToUpdate.Role = employeeEntity.Role;
            employeeToUpdate.Qualification = employeeEntity.Qualification;
            _UnitOfWork.Employee.Update(employeeToUpdate);
            _UnitOfWork.Complete();
         }

        public IEnumerable<EmployeeViewModel> GetAllEmployeesByProcedureType(int id)
        {
            var employees = _UnitOfWork.Employee.GetAll()
                .Include(x => x.MediaFiles)
                .Include(pt => pt.ProcedureType)
                .Include(o => o.Orders)
                .Where(pt => pt.ProcedureType.ProcedureTypeId == id);
            IQueryable<EmployeeViewModel> employeesModel = AutoMappers<Employee, EmployeeViewModel>.MapIQueryable(employees);
            return employeesModel;
        }

        public IEnumerable<EmployeesAuthenticationModel> GetEmployeesCredentials()
        {
            var employees = _UnitOfWork.Employee.GetAll();
            IQueryable <EmployeesAuthenticationModel > authenticationInfo =
                AutoMappers<Employee, EmployeesAuthenticationModel>.MapIQueryable(employees);
            return authenticationInfo;
        }

        public SelectList GetEmployeesSelectList()
        {
            var employees = _UnitOfWork.Employee.GetAll();
            List<EmployeeViewModel> employeeModel = AutoMappers<Employee, EmployeeViewModel>.MapIQueryable(employees).ToList();
            List<SelectListItem> items = new List<SelectListItem>(employeeModel.Count);
            foreach (var item in employeeModel)
            {
                items.Add(new SelectListItem
                {
                    Text = item.FirstName + " " + item.LastName,
                    Value = item.EmployeeId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
