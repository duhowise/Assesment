using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Face")]
    public class FaceController : Controller
    {
       
        

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]string value)
        {


            try
            {
                var url = new Url("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect");
                var id= await url.WithHeader("Ocp-Apim-Subscription-Key", "1c8723038192418da1e15f8a1f052a9e").WithHeader("COntent-Type", "application/octet-stream")
                    .SetQueryParams(new { returnFaceId = true, returnFaceLandmarks = true }).PostJsonAsync(Convert.FromBase64String(value)).ReceiveJson<string>();
                return Ok(id);
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        
        
    }
}
