using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

using BO;
using Lib.Data.Database;

namespace HotDealsAPI.Controllers
{
    [RoutePrefix("testAPI")]
    public class testAPIController : ApiController
    {
        [Route("testAPI")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult testAPI()
        {
            BO.RequestResult result = new BO.RequestResult();

            result.data = "sohai";

            return result;
        }
    }
}