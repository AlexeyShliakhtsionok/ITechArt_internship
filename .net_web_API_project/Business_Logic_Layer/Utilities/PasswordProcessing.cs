using System.Text;
using XSystem.Security.Cryptography;

namespace Business_Logic_Layer.Utilities
{
    public static class PasswordProcessing
    {
        public static Guid GetPasswordGuid(string password)
        {
            byte[] passwordBytes = Encoding.Unicode.GetBytes(password);
            MD5CryptoServiceProvider provider = new MD5CryptoServiceProvider();
            byte[] byteHash = provider.ComputeHash(passwordBytes);
            string hash = string.Empty;
            foreach (byte b in byteHash)
            {
                hash += string.Format("{0:x2}", b);
            }
            return new Guid(hash);
        }
    }
}
