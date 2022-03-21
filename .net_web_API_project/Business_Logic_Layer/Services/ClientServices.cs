using Business_Logic_Layer.DBO.Clients;
using Business_Logic_Layer.DBO.Feedbacks;
using Business_Logic_Layer.DBO.Orders;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Business_Logic_Layer.Services
{
    public class ClientServices : IClientServices
    {
        private readonly IUnitOfWork _UnitOfWork;

        public ClientServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateClient(ClientViewModel client)
        {
            Client clientEntity = AutoMappers<ClientViewModel, Client>.Map(client);
            _UnitOfWork.Client.Add(clientEntity);
            _UnitOfWork.Complete();
        }
        
        public ClientViewModel GetClientById(int id)
        {
            var client = _UnitOfWork.Client.GetById(id);
            ClientViewModel clientModel = AutoMappers<Client, ClientViewModel>.Map(client);
            return clientModel;
        }

        public ClientToFeedbackCreationViewModel GetClientByEmail(string email)
        {
            var client = _UnitOfWork.Client.GetAll()
                .Include(o => o.Orders)
                .Include(f => f.Feedbacks)
                .FirstOrDefault(c => c.Email == email);
            ClientToFeedbackCreationViewModel clientModel = AutoMappers<Client, ClientToFeedbackCreationViewModel>.Map(client);
            return clientModel;
        }

        public IEnumerable<ClientsInformationViewModel> GetAllClients()
        {
            var clients = _UnitOfWork.Client.GetAll();
            IEnumerable<ClientsInformationViewModel> clientsModel =
                AutoMappers<Client, ClientsInformationViewModel>.MapIQueryable(clients);
            return clientsModel;
        }

        public void UpdateClient(ClientViewModel client)
        {
            var clientToUpdate = _UnitOfWork.Client.GetById(client.ClientId);
            clientToUpdate.FirstName = client.FirstName;
            clientToUpdate.LastName = client.LastName;
            clientToUpdate.PhoneNumber = client.PhoneNumber;
            clientToUpdate.Email = client.Email;
            _UnitOfWork.Complete();
        }

        public void DeleteClient(int id)
        {
            var clientToDelete = _UnitOfWork.Client.GetById(id);
            _UnitOfWork.Client.Delete(clientToDelete);
            _UnitOfWork.Complete();
        }

        public SelectList GetClientsSelectList()
        {
            var clients = _UnitOfWork.Client.GetAll();
            List<ClientViewModel> clientsModel = AutoMappers<Client, ClientViewModel>.MapIQueryable(clients).ToList();
            List<SelectListItem> items = new List<SelectListItem>(clientsModel.Count);
            foreach (var item in clientsModel)
            {
                items.Add(new SelectListItem
                {
                    Text = item.FirstName + " " + item.LastName,
                    Value = item.ClientId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
