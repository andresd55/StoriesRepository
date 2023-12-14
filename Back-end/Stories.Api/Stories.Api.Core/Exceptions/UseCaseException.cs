namespace Stories.Api.Core.Exceptions
{
    using System;
    using System.Runtime.Serialization;
    public class UseCaseException : Exception
    {
        public UseCaseException()
        {
        }

        public UseCaseException(string message) : base($"UseCase: {message}")
        {
        }

        public UseCaseException(string message, Exception innerException) : base($"UseCase: {message}", innerException)
        {
        }

        protected UseCaseException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
