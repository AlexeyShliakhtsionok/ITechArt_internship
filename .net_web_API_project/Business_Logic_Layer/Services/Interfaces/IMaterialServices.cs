using Business_Logic_Layer.DBO.Materials;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IMaterialServices
    {
        /// <summary>
        /// Method for getting of <c>Material</c> collection.
        /// </summary>
        /// <returns>Returns the collection of <c>MaterialsInformationViewModel</c> objects</returns>
        public IEnumerable<MaterialsInformationViewModel> GetAllMaterials();

        /// <summary>
        /// Search for <c>Material</c> object by its identifier
        /// </summary>
        /// <param name="id">Identifier of <c>Material</c> object</param>
        /// <returns>Returns <c>MaterialViewModel</c> object</returns>
        public MaterialViewModel GetMaterialById(int id);

        /// <summary>
        /// Adds the new <c>Material</c> object
        /// </summary>
        /// <param name="material"></param>
        public void CreateMaterial(MaterialViewModel material);

        /// <summary>
        /// Updates the amount of the certain material
        /// </summary>
        /// <param name="id">Identifier of <c>Material</c> object</param>
        /// <param name="amount">the new value of the MaterialAmount field</param>
        public void UpdateMaterialAmount(int id, int amount);

        /// <summary>
        /// Updates the certain <c>Material</c> object
        /// </summary>
        /// <param name="material"><c>Material</c> object</param>
        public void UpdateMaterial(MaterialViewModel material);

        /// <summary>
        /// Deletes the certain <c>Material</c> object by its identifier
        /// </summary>
        /// <param name="id">Identifier of <c>Material</c> object</param>
        public void DeleteMaterial(int id);

        /// <summary>
        /// Initializes a new instance of the <c>SelectList</c> class by using the specified items for the list,
        /// the data value field, the data text field, and a selected value. Using to pass the data to objects as is dropdown and select lists.
        /// </summary>
        /// <returns>Returns the instance of the <c>SelectList</c> class</returns>
        public SelectList GetMaterialsSelectList();
    }
}
