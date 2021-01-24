namespace RuVdsTest
{
    /// <summary>
    /// Результат выполнения метода
    /// </summary>
    public class Result
    {
        /// <summary>
        /// Успешный результат?
        /// </summary>
        public bool Success { get; private set; }

        /// <summary>
        /// Текст ошибки
        /// </summary>
        public string Error { get; private set; }

        /// <summary>
        /// Hеуспешный результат?
        /// </summary>
        public bool Failure
        {
            get { return !Success; }
        }

        protected Result(bool success, string error)
        {
            Success = success;
            Error = error;
        }

        /// <summary>
        /// Создать неуспешный результат
        /// </summary>
        /// <param name="message">Текст ошибки</param>
        public static Result Fail(string message)
        {
            return new Result(false, message);
        }

        /// <summary>
        /// Создать неуспешный результат с значением внутри
        /// </summary>
        /// <param name="message">Текст ошибки</param>
        public static Result<T> Fail<T>(string message)
        {
            return new Result<T>(default, false, message);
        }

        /// <summary>
        /// Создать успешный результат 
        /// </summary>
        public static Result Ok()
        {
            return new Result(true, string.Empty);
        }

        /// <summary>
        /// Создать успешный результат с значением внутри
        /// </summary>
        public static Result<T> Ok<T>(T value)
        {
            return new Result<T>(value, true, string.Empty);
        }
    }

    /// <summary>
    /// Результат выполнения метода с значением внутри
    /// </summary>
    public class Result<T> : Result
    {
        /// <summary>
        /// Значение результата
        /// </summary>
        public T Value { get; private set; }

        protected internal Result( T value, bool success, string error)
            : base(success, error)
        {
            Value = value;
        }
    }
}
