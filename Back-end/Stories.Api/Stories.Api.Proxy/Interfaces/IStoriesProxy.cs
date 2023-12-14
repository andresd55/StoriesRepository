namespace Stories.Api.Proxy.Interfaces
{
    using Stories.Api.Core.Dtos;
    using Stories.Api.Core.Services;

    public interface IStoriesProxy
    {
        Task<ResponseService> GetItem(int id);
        Task<ResponseService> GetNewStories();
    }
}