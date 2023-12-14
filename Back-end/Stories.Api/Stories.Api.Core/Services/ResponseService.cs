namespace Stories.Api.Core.Services
{
    using Stories.Api.Core.Constants;

    public class ResponseService<T>
    {
        public int ResponseCode { get; set; }
        public string? Message { get; set; }
        public bool Status { get; set; }
        public T? Data { get; set; }
        public int Quantity { get; set; }

        public ResponseService()
        {
            ResponseCode = (int)GenericEnumerator.ResponseCode.InternalError;
            Status = false;
            Quantity = 0;
        }
    }

    public class ResponseService : ResponseService<object> { }
}
