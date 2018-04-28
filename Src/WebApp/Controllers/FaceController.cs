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
using Microsoft.AspNetCore.ResponseCaching.Internal;
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
        
        [HttpPost]
       [Route("addtolist/{faceListId}")] public async Task<IActionResult> AddFaceTolist(string faceListId)
        {

            var file = Request.Form.Files[0];
            try
                {
                    var url = new Url($"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/{faceListId}/persistedFaces");
                    var id = await url.WithHeader("Ocp-Apim-Subscription-Key", "1c8723038192418da1e15f8a1f052a9e").SetQueryParams(new { userData ="test"})
                      .PostJsonAsync(file).ReceiveJson<string>();
                    return Ok(id);
                }
                catch (Exception e)
                {
                    return Ok(e);
                }
          
           
        }
        
        
        [HttpPut]
       [Route("facelist/{name}")] public async Task<IActionResult> Facelist(string name)
        {
            
            try
            {
                var url = new Url($"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/{name}");
                await url.WithHeader("Ocp-Apim-Subscription-Key", "1c8723038192418da1e15f8a1f052a9e")
                   .PutJsonAsync(new{name=name,userData=""});
                return Ok();
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        
        [HttpGet]
       [Route("facelist/{name}")] public async Task<IActionResult> GetFacelist(string name)
        {
            try
            {
                var url = new Url($"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/{name}");
             var data=   await url.WithHeader("Ocp-Apim-Subscription-Key", "1c8723038192418da1e15f8a1f052a9e")
                   .GetJsonAsync();
                return Ok(data);
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        
        
    }


    public class Putdata
    {

    }
}

