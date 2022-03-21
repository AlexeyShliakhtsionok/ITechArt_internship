using Business_Logic_Layer.DBO.Clients;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientServices _clientServices;

        public ClientController(IClientServices clientServices, IOrderServices orderServices)
        {
            _clientServices = clientServices;
        }

        [HttpPost]
        [Route("DeleteClientById")]
        public void DeleteClient(int id)
        {
            _clientServices.DeleteClient(id);
        }

        [HttpGet]
        [Route("GetClientById")]
        public ActionResult<ClientViewModel> GetClientById(int id)
        {
            var client = _clientServices.GetClientById(id);
            if (client == null)
            {
                return NotFound("InvalidId");
            }

            return Ok(client);
        }

        [HttpGet]
        [Route("GetClientByEmail")]
        public ActionResult<ClientToFeedbackCreationViewModel> GetClientByEmail(string email)
        {
            var client = _clientServices.GetClientByEmail(email);
            if (client == null)
            {
                return NotFound("Sorry, but client with corresponding e-mail doesn't exist.");
            }

            return Ok(client);
        }

        [HttpGet]
        [Route("GetAllClients")]
        public ActionResult<IEnumerable<ClientsInformationViewModel>> GetClients(int elementsPerPage, int pageNumber, string sortBy)
        {
            var allClients = _clientServices.GetAllClients().OrderByDescending(n => n.FullName).ToList();
            if (sortBy == "asc")
            {
                allClients = _clientServices.GetAllClients().OrderBy(n => n.FullName).ToList();
            }

            double pagesCount = (double)allClients.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<ClientsInformationViewModel>[] pagedClients = new List<ClientsInformationViewModel>[(int)pagesCount];

            for (int j = 0; j < pagedClients.Length; j++)
            {
                pagedClients[j] = new List<ClientsInformationViewModel>();
            }

            for (int i = 0; i < pagedClients.Length; i++)
            {
                for (int j = 0; j < allClients.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedClients[i].Add(allClients[j]);
                }
            }

            var clients = pagedClients[pageNumber - 1];
            return Ok(new { clients, pagesCount, elementsPerPage, pageNumber, sortBy });
        }

        [HttpPost]
        [Route("CreateClient")]
        public void CreateClient([FromBody] ClientViewModel clientInput)
        {
            _clientServices.CreateClient(clientInput);
        }

        [HttpPost]
        [Route("UpdateClient")]
        public void UpdateClient([FromBody] ClientViewModel clientInput)
        {
            _clientServices.UpdateClient(clientInput);
        }
    }
}
