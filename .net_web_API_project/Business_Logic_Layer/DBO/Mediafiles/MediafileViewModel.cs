using Business_Logic_Layer.DBO.Employees;
using Business_Logic_Layer.DBO.MaterialManufacturers;
using Business_Logic_Layer.DBO.Procedures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Mediafiles
{
    public class MediafileViewModel
    {
        public int FileId { get; set; }
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
        public string FileType { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsProfilePhoto { get; set; }
        public bool IsEmployeePhoto { get; set; }
        public bool IsPromoPhoto { get; set; }
        public string? EmployeeFullname { get; set; }
        public int? EmployeeId { get; set; }
    }
}
