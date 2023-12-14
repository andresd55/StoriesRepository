namespace Stories.Api.Proxy.Services
{
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    using Newtonsoft.Json;

    using RestSharp;

    using Stories.Api.Core.Dtos;
    using Stories.Api.Core.Exceptions;
    using Stories.Api.Core.Services;
    using Stories.Api.Proxy.Interfaces;

    public class StoriesProxy : IStoriesProxy
    {
        private readonly ILogger<StoriesProxy> _logger;
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _configurationHackerApi;
        private readonly RestClient _client;
        private readonly string _endpoint;

        public StoriesProxy(ILogger<StoriesProxy> logger, IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _configurationHackerApi = _configuration.GetSection("HackerNewsApi");
            _endpoint = $"{_configurationHackerApi["baseUrl"]}";
            _client = new RestClient(_endpoint);
        }

        public async Task<ResponseService> GetItem(int id)
        {
            try
            {
                var getItemPath = $"{_configurationHackerApi["getItemPath"]}/{id}.json";
                var request = new RestRequest(getItemPath);
                var response = await _client.ExecuteGetAsync(request);

                Item? item = JsonConvert.DeserializeObject<Item>($"{response.Content}");
                ResponseService responseService = new ResponseService();
                responseService.Data = item;

                return responseService;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{nameof(GetItem)}: {ex.Message}");
                throw new UseCaseException(ex.Message, ex);
            }
        }

        public async Task<ResponseService> GetNewStories()
        {
            try
            {
                var getNewStoriesPath = $"{_configurationHackerApi["getNewStoriesIdsPath"]}.json";
                var request = new RestRequest(getNewStoriesPath);
                var response = await _client.ExecuteGetAsync(request);

                List<int>? storiesIds = JsonConvert.DeserializeObject<List<int>>($"{response.Content}");
                ResponseService responseService = new ResponseService();
                responseService.Data = storiesIds;

                return responseService;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{nameof(GetItem)}: {ex.Message}");
                throw new UseCaseException(ex.Message, ex);
            }
        }
    }
}