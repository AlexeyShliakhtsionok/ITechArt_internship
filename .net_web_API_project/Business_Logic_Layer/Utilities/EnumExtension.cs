

using Business_Logic_Layer.DBO;

namespace Business_Logic_Layer.Utilities
{
    public static class EnumExtensions
    {
        /// <summary>
        /// Enum's extention method.
        /// </summary>
        /// <typeparam name="T">Any enum class</typeparam>
        /// <returns>Returns the list of enum's values represented by their string description.</returns>
        public static List<EnumValue> GetValues<T>()
        {
            List<EnumValue> values = new List<EnumValue>();
            foreach (var itemType in Enum.GetValues(typeof(T)))
            {
                values.Add(new EnumValue()
                {
                    Name = Enum.GetName(typeof(T), itemType),
                    Value = (int)itemType
                });
            }
            return values;
        }
    }
}
