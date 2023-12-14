namespace Stories.Api.Test.StepDefinitions
{
    using Moq;

    using Stories.Api.Application.CasesUses;
    using Stories.Api.Core.Services;
    using Stories.Api.Proxy.Interfaces;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Caching.Memory;
    using Stories.Api.Proxy.Services;
    using Microsoft.Extensions.Configuration;
    using Stories.Api.Core.Dtos;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    [Binding]
    public sealed class NewStoriesStepDefinitions
    {
        private INewStoriesApplicationProxy _newStoriesApplicationService { get; set; }

        private Mock<ILogger<StoriesProxy>> loggerMock;

        private Mock<IStoriesProxy> storiesProxyMock;

        private IMemoryCache _memoryCache;

        IConfiguration configuration;

        ResponseService getStoriesResponse;

        public NewStoriesStepDefinitions()
        {
            loggerMock = new Mock<ILogger<StoriesProxy>>();
            storiesProxyMock = new Mock<IStoriesProxy>();

            HostApplicationBuilder builder = Host.CreateApplicationBuilder();
            builder.Services.AddMemoryCache();
            IHost host = builder.Build();
            _memoryCache =  host.Services.GetRequiredService<IMemoryCache>();

            var inMemorySettings = new Dictionary<string, string> {
            {"Cache:expirationSeconds", "60"},
            {"Cache:key", "newStoriesCache"}
            };

            configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();
        }

        [Given(@"the New Stories Ids")]
        private void GivenTheNewStoriesIds()
        {
            List<int>? storiesIds = new List<int>()
            {
                38267879,
                38266912,
                38249730,
                38265647,
                38263175,
                38243949,
                38252963,
                38236198
            };

            ResponseService response = new ResponseService();
            response.Data = storiesIds;
            response.Status = true;
            response.Quantity = 8;
            response.Message = "Success";

            this.storiesProxyMock.Setup(x => x.GetNewStories()).Returns(Task.FromResult(response));
        }

        [Given(@"the Item")]
        private void GivenTheItem()
        {
            Item item = new Item()
            {
                By = "dhouston",
                Descendants = 71,
                Id = 8863,
                Kids = new List<int>()
                {
                    8952,
                    9224,
                    8917,
                    8884,
                    8887
                },
                Score = 111,
                Time = 1175714200,
                Title = "My YC app: Dropbox - Throw away your USB drive",
                Type = "story",
                Url = "http://www.getdropbox.com/u/2/screencast.html"
            };

            ResponseService response = new ResponseService();
            response.Data = item;
            response.Status = true;
            response.Quantity = 1;
            response.Message = "Success";

            this.storiesProxyMock.Setup(x => x.GetItem(It.IsAny<int>())).Returns(Task.FromResult(response));
        }

        [When(@"make a GET request")]
        public async Task WhenIMakeAgetRequest()
        {
            _newStoriesApplicationService = new NewStoriesApplicationProxy(this.loggerMock.Object, this.storiesProxyMock.Object,
                _memoryCache, configuration);

            getStoriesResponse = await this._newStoriesApplicationService.GetNewStoriesInfo();
        }

        [Then(@"the response should be success")]
        private void ThenTheResponseShouldBeSuccess()
        {
            getStoriesResponse.Should().NotBeNull();
            getStoriesResponse.Data.Should().NotBeNull();
            getStoriesResponse.Status.Should().BeTrue();
            getStoriesResponse.Quantity.Should().BeGreaterThan(0);
        }
    }
}