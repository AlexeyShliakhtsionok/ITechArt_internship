using Business_Logic_Layer.DBO.Clients;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IClientServices
    {
        /// <summary>
        /// Method to get all Client type objects.
        /// </summary>
        /// <returns>Returns IEnumerable Client collection from database</returns>
        public IEnumerable<ClientsInformationViewModel> GetAllClients();

        /// <summary>
        /// Method to search for certain Client entity object by its identifyer.
        /// </summary>
        /// <param name="id">Identificator of the Client object in database</param>
        /// <returns>Returns ClientViewModel entity.</returns>
        public ClientViewModel GetClientById(int id);

        /// <summary>
        /// Method to search for certain Client entity object by email.
        /// </summary>
        /// <param name="email">String value of email field of the Client object.</param>
        /// <returns>Returns ClientViewModel entity.</returns>
        public ClientToFeedbackCreationViewModel GetClientByEmail(string email);

        /// <summary>
        /// Add new Client type object to database.
        /// </summary>
        /// <param name="client">Client type object.</param>
        public void CreateClient(ClientViewModel client);

        /// <summary>
        /// Update existing Client type object in database.
        /// </summary>
        /// <param name="client">Client type object.</param>
        public void UpdateClient(ClientViewModel client);

        /// <summary>
        /// Delete existing Client type object from the database.
        /// </summary>
        /// <param name="id">Identificator of the Client object in database.</param>
        public void DeleteClient(int id);

        /// <summary>
        /// Initializes a new instance of the SelectList class by using the specified items for the list,
        /// the data value field, the data text field, and a selected value. Using to pass the data to objects as is dropdown and select lists.
        /// </summary>
        /// <returns>Returns the instance of the SelectList class</returns>
        public SelectList GetClientsSelectList();
    }
}
