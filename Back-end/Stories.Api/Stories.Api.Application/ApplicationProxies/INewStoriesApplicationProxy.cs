using Stories.Api.Core.Entities;
namespace Stories.Api.Application.CasesUses
{
    using System.Collections.Generic;

    using Stories.Api.Core.Services;

    public interface INewStoriesApplicationProxy
    {
        Task<ResponseService> GetNewStoriesInfo();
        Task<List<Story>> GetStoriesValidatingCache();
        Task<List<Story>> GetAllStoriesInfo(List<int> newStoriesIds);
        void SetStoriesCache(List<Story> stories);
    }
}