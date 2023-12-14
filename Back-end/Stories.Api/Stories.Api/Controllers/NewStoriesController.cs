using Microsoft.AspNetCore.Mvc;

using Stories.Api.Application.CasesUses;
using Stories.Api.Core.Services;

namespace Stories.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewStoriesController : ControllerBase
    {
        private INewStoriesApplicationProxy _newStoriesApplicationService { get; set; }

        public NewStoriesController(INewStoriesApplicationProxy newStoriesApplicationService)
        {
            _newStoriesApplicationService = newStoriesApplicationService;
        }

        [HttpGet(Name = "GetNewStories")]
        public Task<ResponseService> GetNewStories()
        {
            return this._newStoriesApplicationService.GetNewStoriesInfo();
        }
    }
}