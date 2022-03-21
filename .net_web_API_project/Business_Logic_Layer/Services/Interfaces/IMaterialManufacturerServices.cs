using Business_Logic_Layer.DBO.MaterialManufacturers;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IMaterialManufacturerServices
    {
        /// <summary>
        /// Method for getting of <c>MaterialManufacturers</c> collection.
        /// </summary>
        /// <returns>Returns the collection of <c>MaterialManufacturerViewModel</c> objects</returns>
        public IEnumerable<MaterialManufacturerViewModel> GetAllMaterialManufacturers();

        /// <summary>
        /// Add <c>MaterialManufacturer</c> object and save it to database
        /// </summary>
        /// <param name="id"><c>MaterialManufacturer</c> identifier</param>
        public void CreateMaterialManufacturer(MaterialManufacturerViewModel materialManufacturer);

        /// <summary>
        /// Remove <c>MaterialManufacturer</c> object from database
        /// </summary>
        /// <param name="id"><c>MaterialManufacturer</c> identifier</param>
        public void DeleteMaterialManufacturer(int id);

        /// <summary>
        /// Initializes a new instance of the <c>SelectList</c> class by using the specified items for the list,
        /// the data value field, the data text field, and a selected value. Using to pass the data to objects as is dropdown and select lists.
        /// </summary>
        /// <returns>Returns the instance of the <c>SelectList</c> class</returns>
        public SelectList GetManufacturersSelectList();
    }
}
