using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities
{
    public class ProcedureType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProcedureTypeId { get; set; }
        [Required]
        [MaxLength(25)]
        public string ProcedureTypeName { get; set; }
        public virtual ICollection<Procedure>? Procedures { get; set; }
        public virtual ICollection<Employee>? Employees { get; set; }
        public virtual MediaFile? MediaFile { get; set; }
    }
}

