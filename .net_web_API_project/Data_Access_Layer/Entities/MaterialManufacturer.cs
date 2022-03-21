using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities
{
    public class MaterialManufacturer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ManufacturerId { get; set; }
        [Required]
        [MaxLength(30)]
        public string ManufacturerName { get; set; }
        [Required]
        [MaxLength(10)]
        public string MadeIn { get; set; }

        public virtual ICollection<Material>? Materials { get; set; }
    }
}
