using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Face")]
    public class FaceController : Controller
    {
        public FaceController()
        {
            
        }        

        [HttpPost]
       [Route("detect")] public async Task<IActionResult> Detect([FromBody]string image)
        {
          
            try
            {
                var url = new Url("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect");
                var id= await url.WithHeader("Ocp-Apim-Subscription-Key", "1c8723038192418da1e15f8a1f052a9e")
                    .SetQueryParams(new { returnFaceId = true, returnFaceLandmarks = true }).PostJsonAsync(image).ReceiveJson<object>();
                return Ok(id);
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        
        
    }
}

