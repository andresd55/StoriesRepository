namespace Stories.Api.Core.Constants
{
    public class GenericEnumerator
    {
        public enum Status
        {
            successful,
            failed
        }

        public enum ResponseCode
        {
            Ok = 1,
            BadRequest = 2,
            NoContent = 3,
            InternalError = 4
        }
    }
}
