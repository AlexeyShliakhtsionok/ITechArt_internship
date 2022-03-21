using Business_Logic_Layer.DBO.Employees;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IEmployeeServices
    {
        /// <summary>
        /// Method for getting of employees credentials info.
        /// </summary>
        /// <returns>Returns the collection of EmployeesAuthenticationModel objects</returns>
        public IEnumerable<EmployeesAuthenticationModel> GetEmployeesCredentials();

        /// <summary>
        /// Method for getting of employees collection.
        /// </summary>
        /// <returns>Returns the collection of EmployeesInformationViewModel objects</returns>
        public IEnumerable<EmployeesInformationViewModel> GetAllEmployees();

        /// <summary>
        /// Method for getting of employee main information.
        /// </summary>
        /// <param name="id">Identificator of the Employee object in database</param>
        /// <returns>Returns EmployeeInformationViewModel object.</returns>
        public EmployeeInformationViewModel GetEmployeeById(int id);

        /// <summary>
        /// Method for getting of employee main information.
        /// </summary>
        /// <param name="id">Identificator of the Employee object in database</param>
        /// <returns>Returns EmployeeInformationViewModel object.</returns>
        public EmployeeViewModel GetEmployeeViewModelById(int id);

        /// <summary>
        /// Method to search for certain Employee entity object by email.
        /// </summary>
        /// <param name="email">String value of email field of the Employee object.</param>
        /// <returns>Returns EmployeeViewModel entity.</returns>
        public EmployeeViewModel GetEmployeeByEmail(string email);

        /// <summary>
        /// Create the Employee type object in database.
        /// </summary>
        /// <param name="employee">Employee type object.</param>
        public void CreateEmoloyee(EmployeeViewModel employee);

        /// <summary>
        /// Update existing Employee type object in database.
        /// </summary>
        /// <param name="employee">Employee type object.</param>
        public void UpdateEmoloyee(EmployeeInformationViewModel employee);

        /// <summary>
        /// Delete existing Employee type object from the database.
        /// </summary>
        /// <param name="id">Identificator of the Employee object in database.</param>
        public void DeleteEmoloyee(int id);

        /// <summary>
        /// Method for getting the collection of employees having certain specialization (procedure type)
        /// </summary>
        /// <param name="id">ProcedureType identifier</param>
        /// <returns>Collection of employees with certain specialization</returns>
        public IEnumerable<EmployeeViewModel> GetAllEmployeesByProcedureType(int id);

        /// <summary>
        /// Initializes a new instance of the SelectList class by using the specified items for the list,
        /// the data value field, the data text field, and a selected value. Using to pass the data to objects as is dropdown and select lists.
        /// </summary>
        /// <returns>Returns the instance of the SelectList class</returns>
        public SelectList GetEmployeesSelectList();
    }
}
