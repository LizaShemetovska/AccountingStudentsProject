using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class PaginationModel
    {
        public int PageNumber { get; set; }
     
        public List<AppUser> Users { get; set; }
        public static int DefaultPageSize { get; set; } = 3;
    }
}
