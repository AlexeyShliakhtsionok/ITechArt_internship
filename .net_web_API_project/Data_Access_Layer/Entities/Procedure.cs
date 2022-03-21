using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Data_Access_Layer.Entities
{
    public class Procedure
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ProcedureId { get; set; }
        [Required]
        [MaxLength(25)]
        public string ProcedureName { get; set; }
        [MaxLength(250)]
        public string ProcedureDescription { get; set; }
        [Required]
        public TimeSpan TimeAmount { get; set; }

        [Required]
        public float ProcedurePrice { get; set; }
        public virtual ProcedureType ProcedureType { get; set; }
        public virtual ICollection<Material> Materials { get; set; }
    }
}
