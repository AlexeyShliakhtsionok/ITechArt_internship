using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int OrderId { get; set; }
        [Required]
        public DateTime DateOfService { get; set; }
        [Required]
        public bool IsCompleted { get; set; }
        [Required]
        public bool CreatedByClient { get; set; }
        public bool ProcessedByAdmimistrator { get; set; }
        public virtual Client Client { get; set; }
        public int ProcedureId { get; set; }
        public virtual Procedure Procedure { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
