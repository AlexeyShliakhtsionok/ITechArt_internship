using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities
{
    public class Material
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int MaterialId { get; set; }
        [Required]
        [MaxLength(30)]
        public string MaterialName { get; set; }
        [Required]
        public double MaterialAmount { get; set; }
        [Required]
        public DateTime ProductionDate { get; set; }
        [Required]
        public DateTime BestBeforeDate { get; set; }

        public virtual MaterialManufacturer MaterialManufacturer { get; set; }
        public virtual ICollection<Procedure>? Procedures { get; set; }
    }
}
