namespace Stories.Api.Application.CasesUses
{
    using System.Collections.Concurrent;

    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    using Stories.Api.Core.Constants;
    using Stories.Api.Core.Dtos;
    using Stories.Api.Core.Entities;
    using Stories.Api.Core.Exceptions;
    using Stories.Api.Core.Services;
    using Stories.Api.Proxy.Interfaces;
    using Stories.Api.Proxy.Services;

    public class NewStoriesApplicationProxy : INewStoriesApplicationProxy
    {
        private readonly ILogger<StoriesProxy> _logger;
        private readonly IStoriesProxy _storiesProxy;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration _configuration;

        public NewStoriesApplicationProxy(ILogger<StoriesProxy> logger, IStoriesProxy storiesProxy, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _storiesProxy = storiesProxy;
            _memoryCache = memoryCache;
            _configuration = configuration;
        }

        public async Task<ResponseService> GetNewStoriesInfo()
        {
            ResponseService response = new ResponseService();
            try
            {
                List<Story> stories = await this.GetStoriesValidatingCache();

                response.ResponseCode = stories.Any() ? (int)GenericEnumerator.ResponseCode.Ok : (int)GenericEnumerator.ResponseCode.NoContent;
                response.Message = stories.Any() ? GenericEnumerator.Status.successful.ToString() : GenericEnumerator.Status.failed.ToString();
                response.Status = stories.Any();
                response.Quantity = stories.Count;
                response.Data = stories;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{nameof(GetNewStoriesInfo)}: {ex.Message}");
                throw new UseCaseException(ex.Message, ex);
            }

            return response;
        }

        public async Task<List<Story>> GetStoriesValidatingCache() {
            var cacheKey = $"{_configuration["Cache:key"]}";

            List<Story>? stories = new List<Story>();
            ResponseService response = new ResponseService();

            if (!_memoryCache.TryGetValue(cacheKey, out stories))
            {
                response = await this._storiesProxy.GetNewStories();
                List<int>? newStoriesIds = response.Data as List<int>;

                if (newStoriesIds != null)
                {
                    stories = await this.GetAllStoriesInfo(newStoriesIds);
                    return stories;
                }
            }

            return stories ?? new List<Story>();
        }

        public async Task<List<Story>> GetAllStoriesInfo(List<int> newStoriesIds)
        {
            ConcurrentBag<Story> stories = new ConcurrentBag<Story>();
            var tasks = newStoriesIds.Select(async storyId =>
            {
                var response = await this._storiesProxy.GetItem(storyId);
                Item? item = response.Data as Item;

                if (item != null && !string.IsNullOrEmpty(item.Url))
                {
                    stories.Add(new()
                    {
                        Id = storyId,
                        Title = item.Title,
                        Link = item.Url
                    });
                }
            });
            await Task.WhenAll(tasks);
            this.SetStoriesCache(stories.ToList());
            return stories.ToList();
        }

        public void SetStoriesCache(List<Story> stories)
        {
            TimeSpan expirationInSeconds = TimeSpan.FromSeconds(
                            double.Parse($"{_configuration["Cache:expirationSeconds"]}")
                        );

            _memoryCache.Set(
                $"{_configuration["Cache:key"]}",
                stories,
                new MemoryCacheEntryOptions().SetAbsoluteExpiration(expirationInSeconds)
            );
        }
    }
}