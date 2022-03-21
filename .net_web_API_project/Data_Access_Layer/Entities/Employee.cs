using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Data_Access_Layer.Entities
{
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        [MaxLength(15)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [JsonIgnore]
        public Guid Password { get; set; }
        [Required]
        public DateTime HireDate { get; set; }
        [Required]
        public Role Role { get; set; }
        [Required]
        public Qualification Qualification { get; set; }
        public virtual ProcedureType ProcedureType { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
        public virtual ICollection<MediaFile>? MediaFiles { get; set; }
    }
}
